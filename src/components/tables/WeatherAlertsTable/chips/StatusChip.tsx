import { Chip } from '@mui/material';
import React from 'react';

interface StatusChipProps {
  status: string;
}

export const StatusChip: React.FC<StatusChipProps> = ({ status }) => {
  return (
    <Chip
      label={status}
      variant="outlined"
      size="small"
      sx={{ fontWeight: 600 }}
    />
  );
};
