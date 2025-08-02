import { Box, Chip, Typography } from '@mui/material';
import React from 'react';
import type { AlertProperties } from '../../../../../../types/weather';
import { getSeverityColor } from '../../../utils';
import { getCertaintyColor, getStatusColor, getUrgencyColor } from '../utils';

interface AlertInformationSectionProps {
  alert: AlertProperties;
}

export const AlertInformationSection: React.FC<
  AlertInformationSectionProps
> = ({ alert }) => {
  const severityColor = getSeverityColor(alert.severity);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Alert Information
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 2,
        }}
      >
        {alert.headline && (
          <Box sx={{ gridColumn: { md: '1 / -1' } }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Headline
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {alert.headline}
            </Typography>
          </Box>
        )}

        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Severity
          </Typography>
          <Chip
            label={alert.severity}
            size="small"
            color={severityColor}
            sx={{
              fontWeight: 600,
            }}
          />
        </Box>

        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Certainty
          </Typography>
          <Chip
            label={alert.certainty}
            size="small"
            sx={{
              backgroundColor: getCertaintyColor(alert.certainty),
              color: 'white',
              fontWeight: 600,
            }}
          />
        </Box>

        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Urgency
          </Typography>
          <Chip
            label={alert.urgency}
            size="small"
            sx={{
              backgroundColor: getUrgencyColor(alert.urgency),
              color: 'white',
              fontWeight: 600,
            }}
          />
        </Box>

        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Status
          </Typography>
          <Chip
            label={alert.status}
            size="small"
            sx={{
              backgroundColor: getStatusColor(alert.status),
              color: 'white',
              fontWeight: 600,
            }}
          />
        </Box>

        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Category
          </Typography>
          <Typography variant="body1">{alert.category}</Typography>
        </Box>

        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Response
          </Typography>
          <Typography variant="body1">{alert.response}</Typography>
        </Box>
      </Box>
    </Box>
  );
};
