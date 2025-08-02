import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  // reset to first page when alerts data changes (due to filtering/searching)
  useEffect(() => {
    setPage(0);
  }, [alerts.length]);

  if (alerts.length === 0) {
    return <EmptyState />;
  }

  // calculate which alerts to display based on pagination
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedAlerts = alerts.slice(startIndex, endIndex);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // reset to first page when changing rows per page
  };

  return (
    <Paper sx={{ width: '100%' }}>
      <TablePagination
        rowsPerPageOptions={[25, 50, 100]}
        component="div"
        count={alerts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <TableContainer
        sx={{
          maxHeight: {
            xs: 'calc(100vh - 300px)', // Account for pagination component
            sm: 'calc(100vh - 250px)',
            md: 550,
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
