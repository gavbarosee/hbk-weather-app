import { Chip } from '@mui/material';
import React from 'react';
import type { AlertSeverity } from '../../../../types/enums';
import { getSeverityColor } from '../utils';

interface SeverityChipProps {
  severity: AlertSeverity;
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
