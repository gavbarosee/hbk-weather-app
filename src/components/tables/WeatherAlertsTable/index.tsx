import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { PAGINATION, TABLE_CONFIG } from '../../../constants/app';
import type { PaginationState } from '../../../types/components';
import type { SortDirection, SortField } from '../../../types/enums';
import type { AlertProperties } from '../../../types/weather';
import { AlertRow, EmptyState, TableHeader } from './components';

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
  const [pagination, setPagination] = useState<PaginationState>({
    page: 0,
    rowsPerPage: PAGINATION.DEFAULT_PAGE_SIZE,
  });

  // reset to first page when alerts data changes (due to filtering/searching)
  useEffect(() => {
    setPagination(prev => ({ ...prev, page: 0 }));
  }, [alerts.length]);

  if (alerts.length === 0) {
    return <EmptyState />;
  }

  // calculate which alerts to display based on pagination
  const startIndex = pagination.page * pagination.rowsPerPage;
  const endIndex = startIndex + pagination.rowsPerPage;
  const paginatedAlerts = alerts.slice(startIndex, endIndex);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPagination({
      page: 0, // reset to first page when changing rows per page
      rowsPerPage: parseInt(event.target.value, 10),
    });
  };

  return (
    <Paper sx={{ width: '100%' }} elevation={2}>
      <TablePagination
        rowsPerPageOptions={PAGINATION.PAGE_SIZE_OPTIONS}
        labelRowsPerPage="Weather alerts per page"
        component="div"
        count={alerts.length}
        rowsPerPage={pagination.rowsPerPage}
        page={pagination.page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <TableContainer
        sx={{
          maxHeight: TABLE_CONFIG.MAX_HEIGHT,
          overflow: 'auto',
          '& .MuiTable-root': {
            minWidth: TABLE_CONFIG.MIN_WIDTH,
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
            {paginatedAlerts.map(alert => (
              <AlertRow
                key={alert.id}
                alert={alert}
                onAlertClick={onAlertClick}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
