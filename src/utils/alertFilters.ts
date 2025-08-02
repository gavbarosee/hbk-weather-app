import type { AlertProperties, AlertSeverity } from '../types/weather';

/**
 * Client-side filtering utilities for weather alerts
 * These functions are used for table filtering
 */

export interface AlertFilters {
  severity?: AlertSeverity[];
  event?: string[];
  status?: string[];
  searchText?: string;
}

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

export function getFilterOptions(alerts: AlertProperties[]) {
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
  sortBy: 'effective' | 'expires' | 'severity' | 'event',
  sortDirection: 'asc' | 'desc' = 'desc'
): AlertProperties[] {
  const sorted = [...alerts].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case 'effective':
        comparison =
          new Date(a.effective).getTime() - new Date(b.effective).getTime();
        break;
      case 'expires':
        comparison =
          new Date(a.expires).getTime() - new Date(b.expires).getTime();
        break;
      case 'severity': {
        const severityOrder = {
          Extreme: 4,
          Severe: 3,
          Moderate: 2,
          Minor: 1,
          Unknown: 0,
        };

        comparison =
          (severityOrder[a.severity as keyof typeof severityOrder] || 0) -
          (severityOrder[b.severity as keyof typeof severityOrder] || 0);
        break;
      }
      case 'event':
        comparison = (a.event || '').localeCompare(b.event || '');
        break;
    }

    return sortDirection === 'asc' ? comparison : -comparison;
  });

  return sorted;
}
