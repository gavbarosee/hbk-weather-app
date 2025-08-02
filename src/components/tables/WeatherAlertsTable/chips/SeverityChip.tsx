import { Chip } from '@mui/material';
import React from 'react';
import { getSeverityColor } from '../utils';

interface SeverityChipProps {
  severity: string;
}

export const SeverityChip: React.FC<SeverityChipProps> = ({ severity }) => {
  return (
    <Chip
      label={severity}
      color={
        getSeverityColor(severity) as
          | 'error'
          | 'warning'
          | 'info'
          | 'success'
          | 'default'
      }
      size="small"
      sx={{ fontWeight: 600 }}
    />
  );
};
