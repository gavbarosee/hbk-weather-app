import { LocationOn } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import React from 'react';
import type { AlertProperties } from '../../../../../../types/weather';

interface LocationSectionProps {
  alert: AlertProperties;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ alert }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Location
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          p: 2,
          bgcolor: 'grey.50',
          borderRadius: 1,
        }}
      >
        <LocationOn color="primary" />
        <Typography variant="body1">{alert.areaDesc}</Typography>
      </Box>
    </Box>
  );
};
