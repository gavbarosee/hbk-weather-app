import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import React from 'react';
import type { SortDirection, SortField } from '../utils';

interface TableHeaderProps {
  sortBy: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  sortBy,
  sortDirection,
  onSort,
}) => {
  const handleSort = (field: SortField) => {
    onSort(field);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell
          sx={{
            minWidth: { xs: 140, sm: 160 },
            width: { xs: '25%', sm: 'auto' },
          }}
        >
          <TableSortLabel
            active={sortBy === 'event'}
            direction={sortBy === 'event' ? sortDirection : 'asc'}
            onClick={() => handleSort('event')}
          >
            Event Type
          </TableSortLabel>
        </TableCell>
        <TableCell
          sx={{
            minWidth: { xs: 80, sm: 100 },
            width: { xs: '15%', sm: 'auto' },
          }}
        >
          <TableSortLabel
            active={sortBy === 'severity'}
            direction={sortBy === 'severity' ? sortDirection : 'asc'}
            onClick={() => handleSort('severity')}
          >
            Severity
          </TableSortLabel>
        </TableCell>
        <TableCell
          sx={{ display: { xs: 'none', md: 'table-cell' }, minWidth: 200 }}
        >
          Headline
        </TableCell>
        <TableCell
          sx={{
            minWidth: { xs: 100, sm: 120 },
            width: { xs: '20%', sm: 'auto' },
          }}
        >
          <TableSortLabel
            active={sortBy === 'effective'}
            direction={sortBy === 'effective' ? sortDirection : 'asc'}
            onClick={() => handleSort('effective')}
          >
            Area
          </TableSortLabel>
        </TableCell>
        <TableCell
          sx={{
            minWidth: { xs: 100, sm: 120 },
            width: { xs: '20%', sm: 'auto' },
          }}
        >
          <TableSortLabel
            active={sortBy === 'effective'}
            direction={sortBy === 'effective' ? sortDirection : 'asc'}
            onClick={() => handleSort('effective')}
          >
            Effective
          </TableSortLabel>
        </TableCell>
        <TableCell
          sx={{
            minWidth: { xs: 100, sm: 120 },
            width: { xs: '20%', sm: 'auto' },
          }}
        >
          <TableSortLabel
            active={sortBy === 'expires'}
            direction={sortBy === 'expires' ? sortDirection : 'asc'}
            onClick={() => handleSort('expires')}
          >
            Expires
          </TableSortLabel>
        </TableCell>
        <TableCell
          sx={{ display: { xs: 'none', sm: 'table-cell' }, minWidth: 100 }}
        >
          Status
        </TableCell>
      </TableRow>
    </TableHead>
  );
};
