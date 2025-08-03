import { SEVERITY_ORDER } from '../constants/app';
import type {
  AlertSeverity,
  SortDirection as SortDirectionType,
  SortField as SortFieldType,
} from '../types/enums';
import { SortDirection, SortField } from '../types/enums';
import type { AlertFilters, FilterOptions } from '../types/filters';
import type { AlertProperties } from '../types/weather';

/**
 * Client-side filtering utilities for weather alerts
 * These functions are used for table filtering
 */

export function filterBySeverity(
  alerts: AlertProperties[],
  severities: AlertSeverity[]
): AlertProperties[] {
  if (!severities.length) return alerts;
  return alerts.filter(alert =>
    severities.includes(alert.severity as AlertSeverity)
  );
}

export function filterByEvent(
  alerts: AlertProperties[],
  events: string[]
): AlertProperties[] {
  if (!events.length) return alerts;
  return alerts.filter(alert => events.includes(alert.event));
}

export function filterByStatus(
  alerts: AlertProperties[],
  statuses: string[]
): AlertProperties[] {
  if (!statuses.length) return alerts;
  return alerts.filter(alert => statuses.includes(alert.status));
}

export function filterBySearchText(
  alerts: AlertProperties[],
  searchText: string
): AlertProperties[] {
  if (!searchText.trim()) return alerts;

  const search = searchText.toLowerCase();
  return alerts.filter(alert => {
    const headline = alert.headline?.toLowerCase() || '';
    const description = alert.description?.toLowerCase() || '';
    const areaDesc = alert.areaDesc?.toLowerCase() || '';
    const event = alert.event?.toLowerCase() || '';

    return (
      headline.includes(search) ||
      description.includes(search) ||
      areaDesc.includes(search) ||
      event.includes(search)
    );
  });
}

export function applyAlertFilters(
  alerts: AlertProperties[],
  filters: AlertFilters
): AlertProperties[] {
  let filtered = alerts;

  if (filters.severity?.length) {
    filtered = filterBySeverity(filtered, filters.severity);
  }

  if (filters.event?.length) {
    filtered = filterByEvent(filtered, filters.event);
  }

  if (filters.status?.length) {
    filtered = filterByStatus(filtered, filters.status);
  }

  if (filters.searchText) {
    filtered = filterBySearchText(filtered, filters.searchText);
  }

  return filtered;
}

export function getFilterOptions(alerts: AlertProperties[]): FilterOptions {
  const extractUniqueValues = <T>(getValue: (alert: AlertProperties) => T) => {
    const allValues = alerts.map(getValue);
    const uniqueValues = [...new Set(allValues)];
    return uniqueValues.filter(Boolean);
  };

  return {
    severities: extractUniqueValues(alert => alert.severity),
    events: extractUniqueValues(alert => alert.event),
    statuses: extractUniqueValues(alert => alert.status),
  };
}

export function sortAlerts(
  alerts: AlertProperties[],
  sortBy: SortFieldType,
  sortDirection: SortDirectionType = SortDirection.DESC
): AlertProperties[] {
  const compareByDate = (dateA: string, dateB: string) => {
    const timeA = new Date(dateA).getTime();
    const timeB = new Date(dateB).getTime();
    return timeA - timeB;
  };

  const compareBySeverity = (severityA: string, severityB: string) => {
    const getSeverityRank = (severity: string) =>
      SEVERITY_ORDER[severity as keyof typeof SEVERITY_ORDER] || 0;

    const rankA = getSeverityRank(severityA);
    const rankB = getSeverityRank(severityB);
    return rankA - rankB;
  };

  const compareByText = (textA: string | null, textB: string | null) => {
    const safeTextA = textA || '';
    const safeTextB = textB || '';
    return safeTextA.localeCompare(safeTextB);
  };

  const sorted = [...alerts].sort((alertA, alertB) => {
    let comparison = 0;

    switch (sortBy) {
      case SortField.EFFECTIVE:
        comparison = compareByDate(alertA.effective, alertB.effective);
        break;
      case SortField.EXPIRES:
        comparison = compareByDate(alertA.expires, alertB.expires);
        break;
      case SortField.SEVERITY:
        comparison = compareBySeverity(alertA.severity, alertB.severity);
        break;
      case SortField.EVENT:
        comparison = compareByText(alertA.event, alertB.event);
        break;
    }

    const isAscending = sortDirection === SortDirection.ASC;
    return isAscending ? comparison : -comparison;
  });

  return sorted;
}
