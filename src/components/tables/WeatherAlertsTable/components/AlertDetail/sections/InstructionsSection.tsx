import { Security } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import React from 'react';
import type { AlertProperties } from '../../../../../../types/weather';

interface InstructionsSectionProps {
  alert: AlertProperties;
}

export const InstructionsSection: React.FC<InstructionsSectionProps> = ({
  alert,
}) => {
  if (!alert.instruction) return null;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Instructions
      </Typography>
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          p: 2,
          bgcolor: 'grey.50',
          borderRadius: 1,
        }}
      >
        <Security color="primary" sx={{ mt: 0.5 }} />
        <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
          {alert.instruction}
        </Typography>
      </Box>
    </Box>
  );
};
