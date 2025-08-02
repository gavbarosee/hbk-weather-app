export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'actual':
      return '#d32f2f'; // error red
    case 'exercise':
      return '#ed6c02'; // warning orange
    case 'system':
      return '#0288d1'; // info blue
    case 'test':
      return '#2e7d32'; // success green
    case 'draft':
    default:
      return '#757575'; // grey
  }
};

export const getUrgencyColor = (urgency: string) => {
  switch (urgency.toLowerCase()) {
    case 'immediate':
      return '#d32f2f'; // error red
    case 'expected':
      return '#ed6c02'; // warning orange
    case 'future':
      return '#0288d1'; // info blue
    case 'past':
      return '#2e7d32'; // success green
    case 'unknown':
    default:
      return '#757575'; // grey
  }
};

export const getCertaintyColor = (certainty: string) => {
  switch (certainty.toLowerCase()) {
    case 'observed':
      return '#d32f2f'; // error red
    case 'likely':
      return '#ed6c02'; // warning orange
    case 'possible':
      return '#0288d1'; // info blue
    case 'unlikely':
      return '#2e7d32'; // success green
    case 'unknown':
    default:
      return '#757575'; // grey
  }
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
