export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 25,
  PAGE_SIZE_OPTIONS: [25, 50, 100],
} as const;

export const TABLE_CONFIG = {
  MIN_WIDTH: { xs: 650, sm: 750 },
  MAX_HEIGHT: {
    xs: 'calc(100vh - 300px)',
    sm: 'calc(100vh - 250px)',
    md: 550,
  },
} as const;

export const SEVERITY_ORDER = {
  Extreme: 4,
  Severe: 3,
  Moderate: 2,
  Minor: 1,
  Unknown: 0,
} as const;

export const CACHE_TIMES = {
  TWO_MINUTES: 1000 * 60 * 2,
  FIVE_MINUTES: 1000 * 60 * 5,
  TEN_MINUTES: 1000 * 60 * 10,
} as const;

export const REFETCH_INTERVALS = {
  ACTIVE_ALERTS: 1000 * 60 * 5, // 5 minutes for active alerts
} as const;

export const DATE_RANGE_PRESETS = {
  DAYS_IN_WEEK: 7,
  DAYS_IN_MONTH: 30,
  DAYS_IN_QUARTER: 90,
  DAYS_IN_YEAR: 365,
  MILLISECONDS_PER_DAY: 24 * 60 * 60 * 1000,
} as const;

export const UI_TIMING = {
  SEARCH_DEBOUNCE_MS: 300,
} as const;
