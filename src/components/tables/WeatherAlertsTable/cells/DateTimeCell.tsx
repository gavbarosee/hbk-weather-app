import { AccessTime } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { formatDateTime } from '../utils';

interface DateTimeCellProps {
  dateTime: string;
  showIcon?: boolean;
}

export const DateTimeCell: React.FC<DateTimeCellProps> = ({
  dateTime,
  showIcon = false,
}) => {
  const content = (
    <Typography
      variant="body2"
      sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
    >
      {formatDateTime(dateTime)}
    </Typography>
  );

  if (showIcon) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <AccessTime color="action" sx={{ fontSize: 16 }} />
        {content}
      </Box>
    );
  }

  return content;
};
