import { Box, Card, CardContent } from '@mui/material';
import React from 'react';
import type { AlertSeverity } from '../../../types/weather';
import type { AlertFilters as AlertFiltersType } from '../../../utils/alertFilters';
import { FilterSection } from '../../ui/FilterSection';
import { DateRangeFilter } from './DateRangeFilter';
import { FilterHeader } from './FilterHeader';
import { MultiSelectFilter } from './MultiSelectFilter';
import { SearchTextFilter } from './SearchTextFilter';

interface WeatherAlertsFiltersProps {
  filters: AlertFiltersType;
  onFiltersChange: (filters: AlertFiltersType) => void;
  availableOptions: {
    severities: string[];
    events: string[];
    statuses: string[];
  };
  dateRange: {
    startDate: Date | null;
    endDate: Date | null;
  };
  onDateRangeChange: (range: {
    startDate: Date | null;
    endDate: Date | null;
  }) => void;
}

export const WeatherAlertsFilters: React.FC<WeatherAlertsFiltersProps> = ({
  filters,
  onFiltersChange,
  availableOptions,
  dateRange,
  onDateRangeChange,
}) => {
  const handleSeverityChange = (values: string[]) => {
    onFiltersChange({
      ...filters,
      severity: values as AlertSeverity[],
    });
  };

  const handleEventChange = (values: string[]) => {
    onFiltersChange({
      ...filters,
      event: values,
    });
  };

  const handleStatusChange = (values: string[]) => {
    onFiltersChange({
      ...filters,
      status: values,
    });
  };

  const removeSeverity = (severityToRemove: string) => {
    onFiltersChange({
      ...filters,
      severity: (filters.severity || []).filter(s => s !== severityToRemove),
    });
  };

  const removeEvent = (eventToRemove: string) => {
    onFiltersChange({
      ...filters,
      event: (filters.event || []).filter(e => e !== eventToRemove),
    });
  };

  const removeStatus = (statusToRemove: string) => {
    onFiltersChange({
      ...filters,
      status: (filters.status || []).filter(s => s !== statusToRemove),
    });
  };

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

        <FilterSection title="Date Range">
          <DateRangeFilter
            dateRange={dateRange}
            onDateRangeChange={onDateRangeChange}
          />
        </FilterSection>

        <FilterSection title="Text Search">
          <SearchTextFilter
            searchText={filters.searchText || ''}
            onSearchTextChange={handleSearchTextChange}
          />
        </FilterSection>

        <FilterSection title="Filter Options">
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: '1fr 1fr',
                md: '1fr 1fr 1fr',
              },
              gap: { xs: 1.5, sm: 2 },
              width: '100%',
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
      </CardContent>
    </Card>
  );
};
