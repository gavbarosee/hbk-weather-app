import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import type { AlertProperties } from '../../../../../../types/weather';

interface TechnicalDetailsSectionProps {
  alert: AlertProperties;
}

export const TechnicalDetailsSection: React.FC<
  TechnicalDetailsSectionProps
> = ({ alert }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Technical Details
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
            bgcolor: 'grey.50',
            borderRadius: 1,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Alert ID
          </Typography>
          <Typography
            variant="body2"
            fontFamily="monospace"
            bgcolor="grey.100"
            px={1}
            py={0.5}
            borderRadius={0.5}
          >
            {alert.id}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
            bgcolor: 'grey.50',
            borderRadius: 1,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Message Type
          </Typography>
          <Typography variant="body2">{alert.messageType}</Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
            bgcolor: 'grey.50',
            borderRadius: 1,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Sender
          </Typography>
          <Typography variant="body2">{alert.senderName}</Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
            bgcolor: 'grey.50',
            borderRadius: 1,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Language
          </Typography>
          <Typography variant="body2">{alert.language}</Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
            bgcolor: 'grey.50',
            borderRadius: 1,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Scope
          </Typography>
          <Typography variant="body2">{alert.scope}</Typography>
        </Box>

        {alert.parameters?.AWIPSIdentifier && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 2,
              bgcolor: 'grey.50',
              borderRadius: 1,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              AWIPS Identifier
            </Typography>
            <Typography
              variant="body2"
              fontFamily="monospace"
              bgcolor="grey.100"
              px={1}
              py={0.5}
              borderRadius={0.5}
            >
              {alert.parameters.AWIPSIdentifier.join(', ')}
            </Typography>
          </Box>
        )}

        {alert.web && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 2,
              bgcolor: 'grey.50',
              borderRadius: 1,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Web Link
            </Typography>
            <Button
              variant="outlined"
              size="small"
              href={alert.web}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on NWS
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};
