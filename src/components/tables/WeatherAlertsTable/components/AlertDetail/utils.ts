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
  const expiryTime = new Date(expiresString);
  const currentTime = new Date();
  const timeDifferenceMs = expiryTime.getTime() - currentTime.getTime();

  if (timeDifferenceMs <= 0) {
    return 'Expired';
  }

  const formatTimeRemaining = (value: number, unit: string) => {
    const pluralizedUnit = value === 1 ? unit : `${unit}s`;
    return `${value} ${pluralizedUnit} remaining`;
  };

  const MILLISECONDS_PER_MINUTE = 1000 * 60;
  const MILLISECONDS_PER_HOUR = MILLISECONDS_PER_MINUTE * 60;
  const HOURS_PER_DAY = 24;

  const totalHours = Math.floor(timeDifferenceMs / MILLISECONDS_PER_HOUR);
  const totalDays = Math.floor(totalHours / HOURS_PER_DAY);

  if (totalDays > 0) {
    return formatTimeRemaining(totalDays, 'day');
  } else if (totalHours > 0) {
    return formatTimeRemaining(totalHours, 'hour');
  } else {
    const totalMinutes = Math.floor(timeDifferenceMs / MILLISECONDS_PER_MINUTE);
    return formatTimeRemaining(totalMinutes, 'minute');
  }
};

export const isExpired = (expiresString: string) => {
  return new Date(expiresString) <= new Date();
};
