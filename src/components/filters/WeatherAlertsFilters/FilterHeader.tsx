import { Clear } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import type { AlertFilters } from '../../../types/filters';

interface FilterHeaderProps {
  onClearAll: () => void;
  filters: AlertFilters;
  dateRange: {
    startDate: Date | null;
    endDate: Date | null;
  };
}

export const FilterHeader: React.FC<FilterHeaderProps> = ({
  onClearAll,
  filters,
  dateRange,
}) => {
  const hasActiveFilters =
    !!filters.searchText ||
    (filters.severity && filters.severity.length > 0) ||
    (filters.event && filters.event.length > 0) ||
    (filters.status && filters.status.length > 0) ||
    !!dateRange.startDate ||
    !!dateRange.endDate;

  return (
    <Box
      data-testid="filter-header"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2,
      }}
    >
      <Typography variant="h6">Filter & Search Alerts</Typography>
      <Button
        startIcon={<Clear />}
        variant="outlined"
        size="small"
        onClick={onClearAll}
        disabled={!hasActiveFilters}
        data-testid="clear-all-button"
      >
        Clear All
      </Button>
    </Box>
  );
};
