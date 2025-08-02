import { Close, Warning } from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
} from '@mui/material';
import React from 'react';
import type { AlertProperties } from '../../../../../types/weather';
import {
  AlertInformationSection,
  DescriptionSection,
  InstructionsSection,
  LocationSection,
  TechnicalDetailsSection,
  TimingSection,
} from './sections';

interface AlertDetailProps {
  alert: AlertProperties | null;
  onClose: () => void;
}

export const AlertDetail: React.FC<AlertDetailProps> = ({ alert, onClose }) => {
  if (!alert) return null;

  return (
    <Dialog
      open={true}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { maxHeight: '90vh' },
      }}
    >
      <DialogTitle>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Warning color="error" />
            <Typography variant="h6">{alert.event}</Typography>
          </Box>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <AlertInformationSection alert={alert} />
          <Divider />
          <TimingSection alert={alert} />
          <Divider />
          <LocationSection alert={alert} />
          <Divider />
          <DescriptionSection alert={alert} />
          <InstructionsSection alert={alert} />
          <Divider />
          <TechnicalDetailsSection alert={alert} />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
