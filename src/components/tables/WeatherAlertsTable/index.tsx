import { Paper, Table, TableBody, TableContainer } from '@mui/material';
import React from 'react';
import type { AlertProperties } from '../../../types/weather';
import { AlertRow, EmptyState, TableHeader } from './components';
import type { SortDirection, SortField } from './utils';

interface WeatherAlertsTableProps {
  alerts: AlertProperties[];
  sortBy: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
  onAlertClick: (alert: AlertProperties) => void;
}

export const WeatherAlertsTable: React.FC<WeatherAlertsTableProps> = ({
  alerts,
  sortBy,
  sortDirection,
  onSort,
  onAlertClick,
}) => {
  if (alerts.length === 0) {
    return <EmptyState />;
  }

  return (
    <TableContainer
      component={Paper}
      sx={{
        width: '100%',
        maxHeight: {
          xs: 'calc(100vh - 250px)',
          sm: 'calc(100vh - 200px)',
          md: 600,
        },
        overflow: 'auto',
        '& .MuiTable-root': {
          minWidth: { xs: 650, sm: 750 },
        },
      }}
    >
      <Table stickyHeader>
        <TableHeader
          sortBy={sortBy}
          sortDirection={sortDirection}
          onSort={onSort}
        />
        <TableBody>
          {alerts.map(alert => (
            <AlertRow
              key={alert.id}
              alert={alert}
              onAlertClick={onAlertClick}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
