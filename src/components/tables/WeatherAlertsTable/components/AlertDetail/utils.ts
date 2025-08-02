import { statusColors } from '../../../../../theme';

// helper function to get color by type and key
const getColorByType = (
  type: 'status' | 'urgency' | 'certainty',
  key: string
): string => {
  const colorMap = statusColors[type];
  const normalizedKey = key.toLowerCase() as keyof typeof colorMap;
  return colorMap[normalizedKey] || colorMap.default;
};

export const getStatusColor = (status: string) => {
  return getColorByType('status', status);
};

export const getUrgencyColor = (urgency: string) => {
  return getColorByType('urgency', urgency);
};

export const getCertaintyColor = (certainty: string) => {
  return getColorByType('certainty', certainty);
};

export const getTimeUntilExpiry = (expiresString: string) => {
  const expires = new Date(expiresString);
  const now = new Date();
  const diffMs = expires.getTime() - now.getTime();

  if (diffMs <= 0) {
    return 'Expired';
  }

  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) {
    return `${diffDays} day${diffDays > 1 ? 's' : ''} remaining`;
  } else if (diffHours > 0) {
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} remaining`;
  } else {
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} remaining`;
  }
};

export const isExpired = (expiresString: string) => {
  return new Date(expiresString) <= new Date();
};
