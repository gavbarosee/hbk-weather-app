import { Info } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import React from 'react';
import type { AlertProperties } from '../../../../../../types/weather';

interface DescriptionSectionProps {
  alert: AlertProperties;
}

export const DescriptionSection: React.FC<DescriptionSectionProps> = ({
  alert,
}) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Description
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
        <Info color="primary" sx={{ mt: 0.5 }} />
        <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
          {alert.description}
        </Typography>
      </Box>
    </Box>
  );
};
