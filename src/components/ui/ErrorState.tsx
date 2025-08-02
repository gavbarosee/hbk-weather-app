import { Alert } from '@mui/material';
import React from 'react';

interface ErrorStateProps {
  error: Error | null;
  message?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ error, message }) => {
  if (!error) return null;

  const errorMessage =
    message ||
    (error instanceof Error ? error.message : 'Failed to load alerts');

  return (
    <Alert severity="error" sx={{ mb: 3 }}>
      {errorMessage}
    </Alert>
  );
};
