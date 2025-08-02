import { useQuery } from '@tanstack/react-query';
import { FIVE_MINUTES, TEN_MINUTES, TWO_MINUTES } from '../lib/queryClient';
import { weatherService } from '../services/weatherService';

export const QUERY_KEYS = {
  weatherAlerts: {
    all: ['weatherAlerts'] as const,
    active: () => [...QUERY_KEYS.weatherAlerts.all, 'active'] as const,
    dateRange: (startDate: Date, endDate: Date) =>
      [
        ...QUERY_KEYS.weatherAlerts.all,
        'dateRange',
        startDate.toISOString(),
        endDate.toISOString(),
      ] as const,
    byId: (id: string) =>
      [...QUERY_KEYS.weatherAlerts.all, 'byId', id] as const,
  },
};

export function useActiveAlerts() {
  return useQuery({
    queryKey: QUERY_KEYS.weatherAlerts.active(),
    queryFn: () => weatherService.getActiveAlerts(),
    staleTime: TWO_MINUTES, // weather alerts change frequently
    refetchInterval: FIVE_MINUTES, // auto-refetch every 5 minutes
  });
}

export function useAlertsByDateRange(
  startDate: Date | null,
  endDate: Date | null
) {
  return useQuery({
    queryKey:
      startDate && endDate
        ? QUERY_KEYS.weatherAlerts.dateRange(startDate, endDate)
        : [],
    queryFn: () => weatherService.getAlertsByDateRange(startDate!, endDate!),
    enabled: !!(startDate && endDate), // only run if both dates are provided
    staleTime: FIVE_MINUTES, // historical data doesn't change as much
  });
}

export function useAlertById(id: string | null) {
  return useQuery({
    queryKey: id ? QUERY_KEYS.weatherAlerts.byId(id) : [],
    queryFn: () => weatherService.getAlertById(id!),
    enabled: !!id, // only run if ID is provided
    staleTime: TEN_MINUTES,
  });
}

// combined hook that decides which query to use based on date range
export function useWeatherAlerts(dateRange: {
  startDate: Date | null;
  endDate: Date | null;
}) {
  const activeAlertsQuery = useActiveAlerts();
  const dateRangeQuery = useAlertsByDateRange(
    dateRange.startDate,
    dateRange.endDate
  );

  // if the date range is specified, use date range query, otherwise use active alerts
  const hasDateRange = dateRange.startDate && dateRange.endDate;

  return {
    data: hasDateRange ? dateRangeQuery.data : activeAlertsQuery.data,
    isLoading: hasDateRange
      ? dateRangeQuery.isLoading
      : activeAlertsQuery.isLoading,
    error: hasDateRange ? dateRangeQuery.error : activeAlertsQuery.error,
    isError: hasDateRange ? dateRangeQuery.isError : activeAlertsQuery.isError,
    refetch: hasDateRange ? dateRangeQuery.refetch : activeAlertsQuery.refetch,
    isFetching: hasDateRange
      ? dateRangeQuery.isFetching
      : activeAlertsQuery.isFetching,
  };
}
