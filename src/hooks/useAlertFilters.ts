import { useMemo, useState } from 'react';
import type {
  SortDirection as SortDirectionType,
  SortField as SortFieldType,
} from '../types/enums';
import { SortDirection, SortField } from '../types/enums';
import type { AlertFilters } from '../types/filters';
import type { AlertProperties } from '../types/weather';
import {
  applyAlertFilters,
  getFilterOptions,
  sortAlerts,
} from '../utils/alertFilters';

export function useAlertFilters(alerts: AlertProperties[] = []) {
  const [filters, setFilters] = useState<AlertFilters>({});
  const [sortBy, setSortBy] = useState<SortFieldType>(SortField.EFFECTIVE);
  const [sortDirection, setSortDirection] = useState<SortDirectionType>(
    SortDirection.DESC
  );

  // memoized filtered and sorted alerts
  const filteredAlerts = useMemo(() => {
    let result = applyAlertFilters(alerts, filters);
    result = sortAlerts(result, sortBy, sortDirection);
    return result;
  }, [alerts, filters, sortBy, sortDirection]);

  // memoized filter options based on all available alerts
  const filterOptions = useMemo(() => getFilterOptions(alerts), [alerts]);

  const handleSort = (field: SortFieldType) => {
    if (sortBy === field) {
      setSortDirection(
        sortDirection === SortDirection.ASC
          ? SortDirection.DESC
          : SortDirection.ASC
      );
    } else {
      setSortBy(field);
      setSortDirection(SortDirection.DESC);
    }
  };

  const resetFilters = () => {
    setFilters({});
  };

  const resetSort = () => {
    setSortBy(SortField.EFFECTIVE);
    setSortDirection(SortDirection.DESC);
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
