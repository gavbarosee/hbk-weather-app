import { AccessTime } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import React from 'react';
import type { AlertProperties } from '../../../../../../types/weather';
import { formatDateTime } from '../../../utils';
import { getTimeUntilExpiry, isExpired } from '../utils';

interface TimingSectionProps {
  alert: AlertProperties;
}

export const TimingSection: React.FC<TimingSectionProps> = ({ alert }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Timing
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 2,
        }}
      >
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <AccessTime color="primary" />
            <Typography variant="body2" color="text.secondary">
              Sent
            </Typography>
          </Box>
          <Typography variant="body1">{formatDateTime(alert.sent)}</Typography>
        </Box>

        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <AccessTime color="primary" />
            <Typography variant="body2" color="text.secondary">
              Effective
            </Typography>
          </Box>
          <Typography variant="body1">
            {formatDateTime(alert.effective)}
          </Typography>
        </Box>

        {alert.onset && (
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <AccessTime color="primary" />
              <Typography variant="body2" color="text.secondary">
                Onset
              </Typography>
            </Box>
            <Typography variant="body1">
              {formatDateTime(alert.onset)}
            </Typography>
          </Box>
        )}

        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <AccessTime color="primary" />
            <Typography variant="body2" color="text.secondary">
              Expires
            </Typography>
          </Box>
          <Typography
            variant="body1"
            color={isExpired(alert.expires) ? 'error.main' : 'text.primary'}
          >
            {formatDateTime(alert.expires)} ({getTimeUntilExpiry(alert.expires)}
            )
          </Typography>
        </Box>

        {alert.ends && (
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <AccessTime color="primary" />
              <Typography variant="body2" color="text.secondary">
                Ends
              </Typography>
            </Box>
            <Typography variant="body1">
              {formatDateTime(alert.ends)}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};
