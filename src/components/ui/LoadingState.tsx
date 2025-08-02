import { Box, CircularProgress, Typography } from '@mui/material';
import React from 'react';

interface LoadingStateProps {
  isLoading: boolean;
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  isLoading,
  message = 'Loading weather alerts...',
}) => {
  if (!isLoading) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 300,
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <CircularProgress />
      <Typography variant="body2" color="textSecondary">
        {message}
      </Typography>
    </Box>
  );
};
