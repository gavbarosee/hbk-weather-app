export const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'Extreme':
      return 'error';
    case 'Severe':
      return 'warning';
    case 'Moderate':
      return 'info';
    case 'Minor':
      return 'success';
    default:
      return 'default';
  }
};

export const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleString();
};

export type SortField = 'effective' | 'expires' | 'severity' | 'event';
export type SortDirection = 'asc' | 'desc';
