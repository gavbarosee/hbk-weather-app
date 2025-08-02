import { TableCell, TableRow } from '@mui/material';
import React from 'react';
import type { AlertProperties } from '../../../../types/weather';
import { AreaCell, DateTimeCell, EventTypeCell, HeadlineCell } from '../cells';
import { SeverityChip, StatusChip } from '../chips';

interface AlertRowProps {
  alert: AlertProperties;
}

export const AlertRow: React.FC<AlertRowProps> = ({ alert }) => {
  return (
    <TableRow
      key={alert.id}
      hover
      sx={{
        cursor: 'pointer',
        '&:hover': { backgroundColor: 'action.hover' },
      }}
    >
      {/* Event Type */}
      <TableCell>
        <EventTypeCell
          event={alert.event}
          severity={alert.severity}
          headline={alert.headline}
        />
      </TableCell>

      {/* Severity */}
      <TableCell>
        <SeverityChip severity={alert.severity} />
      </TableCell>

      {/* Headline */}
      <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
        <HeadlineCell headline={alert.headline} />
      </TableCell>

      {/* Area */}
      <TableCell>
        <AreaCell areaDesc={alert.areaDesc} />
      </TableCell>

      {/* Effective Date */}
      <TableCell>
        <DateTimeCell dateTime={alert.effective} />
      </TableCell>

      {/* Expires Date */}
      <TableCell>
        <DateTimeCell dateTime={alert.expires} showIcon />
      </TableCell>

      {/* Status */}
      <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
        <StatusChip status={alert.status} />
      </TableCell>
    </TableRow>
  );
};
