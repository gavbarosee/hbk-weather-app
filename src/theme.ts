import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
  },
});

// Color constants for weather alerts
const ALERT_COLORS = {
  ERROR: '#d32f2f', // red
  WARNING: '#ed6c02', // orange
  INFO: '#0288d1', // blue
  SUCCESS: '#2e7d32', // green
  NEUTRAL: '#757575', // grey
} as const;

// Status colors for weather alerts
export const statusColors = {
  status: {
    actual: ALERT_COLORS.ERROR, // error red
    exercise: ALERT_COLORS.WARNING, // warning orange
    system: ALERT_COLORS.INFO, // info blue
    test: ALERT_COLORS.SUCCESS, // success green
    draft: ALERT_COLORS.NEUTRAL, // grey
    default: ALERT_COLORS.NEUTRAL, // grey
  },
  urgency: {
    immediate: ALERT_COLORS.ERROR, // error red
    expected: ALERT_COLORS.WARNING, // warning orange
    future: ALERT_COLORS.INFO, // info blue
    past: ALERT_COLORS.SUCCESS, // success green
    unknown: ALERT_COLORS.NEUTRAL, // grey
    default: ALERT_COLORS.NEUTRAL, // grey
  },
  certainty: {
    observed: ALERT_COLORS.ERROR, // error red
    likely: ALERT_COLORS.WARNING, // warning orange
    possible: ALERT_COLORS.INFO, // info blue
    unlikely: ALERT_COLORS.SUCCESS, // success green
    unknown: ALERT_COLORS.NEUTRAL, // grey
    default: ALERT_COLORS.NEUTRAL, // grey
  },
};
