import { Warning } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { getSeverityColor } from '../utils';

interface EventTypeCellProps {
  event: string;
  severity: string;
  headline?: string | null;
}

export const EventTypeCell: React.FC<EventTypeCellProps> = ({
  event,
  severity,
  headline,
}) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Warning
        color={getSeverityColor(severity) === 'error' ? 'error' : 'warning'}
        sx={{ fontSize: 18 }}
      />
      <Box>
        <Typography variant="body2" fontWeight="medium" noWrap>
          {event}
        </Typography>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            display: { xs: 'block', md: 'none' },
            mt: 0.3,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            maxWidth: { xs: 120, sm: 140 },
            fontSize: '0.7rem',
          }}
        >
          {headline || 'No headline'}
        </Typography>
      </Box>
    </Box>
  );
};
