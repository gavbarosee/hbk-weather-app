import { AlertSeverity } from '../../../types/enums';

export type SeverityColor =
  | 'error'
  | 'warning'
  | 'info'
  | 'success'
  | 'default';

export const getSeverityColor = (severity: AlertSeverity): SeverityColor => {
  switch (severity) {
    case AlertSeverity.EXTREME:
      return 'error';
    case AlertSeverity.SEVERE:
      return 'warning';
    case AlertSeverity.MODERATE:
      return 'info';
    case AlertSeverity.MINOR:
      return 'success';
    default:
      return 'default';
  }
};

export const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleString();
};

export const formatDateTimeWithZone = (dateString: string) => {
  return new Date(dateString).toLocaleString(undefined, {
    timeZoneName: 'short',
  });
};

export type { SortDirection, SortField } from '../../../types/enums';
