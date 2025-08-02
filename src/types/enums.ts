export const AlertSeverity = {
  MINOR: 'Minor',
  MODERATE: 'Moderate',
  SEVERE: 'Severe',
  EXTREME: 'Extreme',
} as const;

export const SortDirection = {
  ASC: 'asc',
  DESC: 'desc',
} as const;

export const SortField = {
  EFFECTIVE: 'effective',
  EXPIRES: 'expires',
  SEVERITY: 'severity',
  EVENT: 'event',
} as const;

export const AlertStatus = {
  ACTUAL: 'Actual',
  EXERCISE: 'Exercise',
  SYSTEM: 'System',
  TEST: 'Test',
  DRAFT: 'Draft',
} as const;

export const MessageType = {
  ALERT: 'Alert',
  UPDATE: 'Update',
  CANCEL: 'Cancel',
  ACK: 'Ack',
  ERROR: 'Error',
} as const;

// Type definitions
export type AlertSeverity = (typeof AlertSeverity)[keyof typeof AlertSeverity];
export type SortDirection = (typeof SortDirection)[keyof typeof SortDirection];
export type SortField = (typeof SortField)[keyof typeof SortField];
export type AlertStatus = (typeof AlertStatus)[keyof typeof AlertStatus];
export type MessageType = (typeof MessageType)[keyof typeof MessageType];
