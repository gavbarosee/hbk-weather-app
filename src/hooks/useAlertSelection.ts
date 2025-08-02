import { useState } from 'react';
import type { AlertProperties } from '../types/weather';

export function useAlertSelection() {
  const [selectedAlert, setSelectedAlert] = useState<AlertProperties | null>(
    null
  );

  const handleAlertClick = (alert: AlertProperties) => {
    setSelectedAlert(alert);
  };

  const handleCloseAlert = () => {
    setSelectedAlert(null);
  };

  const isAlertSelected = (alertId: string) => {
    return selectedAlert?.id === alertId;
  };

  return {
    selectedAlert,
    handleAlertClick,
    handleCloseAlert,
    isAlertSelected,
  };
}
