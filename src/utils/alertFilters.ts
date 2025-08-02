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
  return alerts.filter(
    alert =>
      alert.headline?.toLowerCase().includes(search) ||
      alert.description?.toLowerCase().includes(search) ||
      alert.areaDesc?.toLowerCase().includes(search) ||
      alert.event?.toLowerCase().includes(search)
  );
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
  return {
    severities: [...new Set(alerts.map(alert => alert.severity))].filter(
      Boolean
    ),
    events: [...new Set(alerts.map(alert => alert.event))].filter(Boolean),
    statuses: [...new Set(alerts.map(alert => alert.status))].filter(Boolean),
  };
}

export function sortAlerts(
  alerts: AlertProperties[],
  sortBy: SortFieldType,
  sortDirection: SortDirectionType = SortDirection.DESC
): AlertProperties[] {
  const sorted = [...alerts].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case SortField.EFFECTIVE:
        comparison =
          new Date(a.effective).getTime() - new Date(b.effective).getTime();
        break;
      case SortField.EXPIRES:
        comparison =
          new Date(a.expires).getTime() - new Date(b.expires).getTime();
        break;
      case SortField.SEVERITY: {
        comparison =
          (SEVERITY_ORDER[a.severity as keyof typeof SEVERITY_ORDER] || 0) -
          (SEVERITY_ORDER[b.severity as keyof typeof SEVERITY_ORDER] || 0);
        break;
      }
      case SortField.EVENT:
        comparison = (a.event || '').localeCompare(b.event || '');
        break;
    }

    return sortDirection === SortDirection.ASC ? comparison : -comparison;
  });

  return sorted;
}
