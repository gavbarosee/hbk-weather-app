import { Warning } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import React from 'react';

export const EmptyState: React.FC = () => {
  return (
    <Box
      data-testid="empty-state"
      sx={{ textAlign: 'center', py: 8, bgcolor: 'background.paper' }}
    >
      <Warning sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
      <Typography variant="h6" color="text.secondary" gutterBottom>
        No alerts found
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Try adjusting your filters to see more results.
      </Typography>
    </Box>
  );
};
