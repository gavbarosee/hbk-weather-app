import { Clear } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import type { AlertFilters } from '../../../utils/alertFilters';

interface FilterHeaderProps {
  onClearAll: () => void;
  filters: AlertFilters;
}

export const FilterHeader: React.FC<FilterHeaderProps> = ({
  onClearAll,
  filters,
}) => {
  const hasActiveFilters =
    !!filters.searchText ||
    (filters.severity && filters.severity.length > 0) ||
    (filters.event && filters.event.length > 0) ||
    (filters.status && filters.status.length > 0);

  return (
    <Box
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
      >
        Clear All
      </Button>
    </Box>
  );
};
