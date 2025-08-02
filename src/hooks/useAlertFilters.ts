import { useMemo, useState } from 'react';
import type { AlertProperties } from '../types/weather';
import type { AlertFilters as AlertFiltersType } from '../utils/alertFilters';
import {
  applyAlertFilters,
  getFilterOptions,
  sortAlerts,
} from '../utils/alertFilters';

export type SortField = 'effective' | 'expires' | 'severity' | 'event';
export type SortDirection = 'asc' | 'desc';

export function useAlertFilters(alerts: AlertProperties[] = []) {
  const [filters, setFilters] = useState<AlertFiltersType>({});
  const [sortBy, setSortBy] = useState<SortField>('effective');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  // memoized filtered and sorted alerts
  const filteredAlerts = useMemo(() => {
    let result = applyAlertFilters(alerts, filters);
    result = sortAlerts(result, sortBy, sortDirection);
    return result;
  }, [alerts, filters, sortBy, sortDirection]);

  // memoized filter options based on all available alerts
  const filterOptions = useMemo(() => getFilterOptions(alerts), [alerts]);

  const handleSort = (field: SortField) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('desc');
    }
  };

  const resetFilters = () => {
    setFilters({});
  };

  const resetSort = () => {
    setSortBy('effective');
    setSortDirection('desc');
  };

  return {
    // state
    filters,
    sortBy,
    sortDirection,

    // derived data
    filteredAlerts,
    filterOptions,

    // functions
    setFilters,
    handleSort,
    resetFilters,
    resetSort,

    // stats
    totalAlerts: alerts.length,
    filteredCount: filteredAlerts.length,
  };
}
