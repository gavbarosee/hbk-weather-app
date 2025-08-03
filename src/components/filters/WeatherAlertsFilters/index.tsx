import { Box, Card, CardContent } from '@mui/material';
import React from 'react';
import type { AlertSeverity } from '../../../types/enums';
import type {
  AlertFilters,
  DateRange,
  FilterOptions,
} from '../../../types/filters';
import { FilterSection } from '../../ui/FilterSection';
import { DateRangeFilter } from './DateRangeFilter';
import { FilterHeader } from './FilterHeader';
import { MultiSelectFilter } from './MultiSelectFilter';
import { SearchTextFilter } from './SearchTextFilter';

interface WeatherAlertsFiltersProps {
  filters: AlertFilters;
  onFiltersChange: (filters: AlertFilters) => void;
  availableOptions: FilterOptions;
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
}

export const WeatherAlertsFilters: React.FC<WeatherAlertsFiltersProps> = ({
  filters,
  onFiltersChange,
  availableOptions,
  dateRange,
  onDateRangeChange,
}) => {
  // generic filter handler factory to reduce repetition
  const createFilterHandler = <T extends keyof AlertFilters>(filterKey: T) => ({
    onChange: (values: AlertFilters[T]) => {
      onFiltersChange({
        ...filters,
        [filterKey]: values,
      });
    },
    onRemove: (valueToRemove: string) => {
      const currentValues = (filters[filterKey] as string[]) || [];
      const updatedValues = currentValues.filter(
        item => item !== valueToRemove
      );
      onFiltersChange({
        ...filters,
        [filterKey]: updatedValues,
      });
    },
  });

  const severityHandlers = createFilterHandler('severity');
  const eventHandlers = createFilterHandler('event');
  const statusHandlers = createFilterHandler('status');

  const handleSeverityChange = (values: string[]) => {
    severityHandlers.onChange(values as AlertSeverity[]);
  };
  const handleEventChange = eventHandlers.onChange;
  const handleStatusChange = statusHandlers.onChange;

  const removeSeverity = severityHandlers.onRemove;
  const removeEvent = eventHandlers.onRemove;
  const removeStatus = statusHandlers.onRemove;

  const clearAllFilters = () => {
    onFiltersChange({
      severity: [],
      event: [],
      status: [],
      searchText: '',
    });
    onDateRangeChange({
      startDate: null,
      endDate: null,
    });
  };

  const handleSearchTextChange = (value: string) => {
    onFiltersChange({
      ...filters,
      searchText: value,
    });
  };

  return (
    <Card elevation={2} sx={{ width: '100%' }}>
      <CardContent sx={{ p: { xs: 1.5, sm: 2, md: 3 } }}>
        <FilterHeader
          filters={filters}
          dateRange={dateRange}
          onClearAll={clearAllFilters}
        />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: '1fr 1fr',
            },
            gap: { xs: 2, md: 3 },
            alignItems: 'start',
          }}
        >
          {/* DATE RANGE INPUTS */}
          <FilterSection title="Date Range">
            <DateRangeFilter
              dateRange={dateRange}
              onDateRangeChange={onDateRangeChange}
            />
          </FilterSection>

          {/* SEARCH AND FILTER OPTIONS */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <FilterSection title="Text Search">
              <SearchTextFilter
                searchText={filters.searchText || ''}
                onSearchTextChange={handleSearchTextChange}
              />
            </FilterSection>

            <FilterSection title="Filter Options">
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1.5,
                }}
              >
                <MultiSelectFilter
                  label="Severity"
                  labelId="severity-label"
                  value={filters.severity || []}
                  options={availableOptions.severities}
                  onChange={handleSeverityChange}
                  onRemove={removeSeverity}
                />

                <MultiSelectFilter
                  label="Event Type"
                  labelId="event-label"
                  value={filters.event || []}
                  options={availableOptions.events}
                  onChange={handleEventChange}
                  onRemove={removeEvent}
                />

                <MultiSelectFilter
                  label="Status"
                  labelId="status-label"
                  value={filters.status || []}
                  options={availableOptions.statuses}
                  onChange={handleStatusChange}
                  onRemove={removeStatus}
                />
              </Box>
            </FilterSection>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
