import { Box, Typography } from '@mui/material';
import React from 'react';

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  sx?: object;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  children,
  sx = {},
}) => {
  return (
    <Box sx={{ mb: 3, ...sx }}>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        {title}
      </Typography>
      {children}
    </Box>
  );
};
