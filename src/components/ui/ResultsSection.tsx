import { Box, Typography } from '@mui/material';
import React from 'react';
import type { AlertProperties } from '../../types/weather';
import { WeatherAlertsTable } from '../tables/WeatherAlertsTable';
import type {
  SortDirection,
  SortField,
} from '../tables/WeatherAlertsTable/utils';

interface ResultsSectionProps {
  alerts: AlertProperties[];
  sortBy: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
  onAlertClick: (alert: AlertProperties) => void;
  filteredCount: number;
  totalAlerts: number;
}

export const ResultsSection: React.FC<ResultsSectionProps> = ({
  alerts,
  sortBy,
  sortDirection,
  onSort,
  onAlertClick,
  filteredCount,
  totalAlerts,
}) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          p: { xs: 1.5, sm: 2, md: 3 },
          bgcolor: 'background.paper',
          borderRadius: '4px 4px 0 0',
          width: '100%',
        }}
      >
        <Typography variant="h6" component="h2">
          Weather Alerts ({filteredCount})
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
          Showing {filteredCount} of {totalAlerts} total alerts
        </Typography>
      </Box>

      <WeatherAlertsTable
        alerts={alerts}
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSort={onSort}
        onAlertClick={onAlertClick}
      />
    </Box>
  );
};
