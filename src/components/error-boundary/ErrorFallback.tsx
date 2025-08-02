import { Refresh } from '@mui/icons-material';
import { Alert, Box, Button, Typography } from '@mui/material';
import React from 'react';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Alert
        severity="error"
        action={
          <Button
            color="inherit"
            size="small"
            startIcon={<Refresh />}
            onClick={resetErrorBoundary}
          >
            Try Again
          </Button>
        }
      >
        <Typography variant="h6" gutterBottom>
          Something went wrong
        </Typography>
        <Typography variant="body2">
          The weather dashboard encountered an error. Please try again or
          refresh the page.
        </Typography>

        {import.meta.env.DEV && (
          <Box
            sx={{ mt: 2, p: 2, bgcolor: 'rgba(0,0,0,0.05)', borderRadius: 1 }}
          >
            <Typography
              variant="caption"
              component="pre"
              sx={{ fontSize: '0.7rem' }}
            >
              {error.message}
            </Typography>
          </Box>
        )}
      </Alert>
    </Box>
  );
};
