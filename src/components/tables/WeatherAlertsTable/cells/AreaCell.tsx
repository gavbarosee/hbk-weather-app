import { LocationOn } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import React from 'react';

interface AreaCellProps {
  areaDesc: string;
}

export const AreaCell: React.FC<AreaCellProps> = ({ areaDesc }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <LocationOn color="action" sx={{ fontSize: 16 }} />
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          maxWidth: { xs: 90, sm: 120 },
          fontSize: { xs: '0.75rem', sm: '0.875rem' },
        }}
      >
        {areaDesc}
      </Typography>
    </Box>
  );
};
