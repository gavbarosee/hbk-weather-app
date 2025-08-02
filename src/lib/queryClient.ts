import { QueryClient } from '@tanstack/react-query';

export const TWO_MINUTES = 1000 * 60 * 2;
export const FIVE_MINUTES = 1000 * 60 * 5;
export const TEN_MINUTES = 1000 * 60 * 10;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: FIVE_MINUTES, // cache data for 5 minutes
      gcTime: TEN_MINUTES, // keep data in cache for 10 minutes after components unmount
      retry: 1,
      refetchOnWindowFocus: true, // refetch on window focus for fresh data
      refetchOnReconnect: true, // refetch when coming back online
    },
    mutations: {
      retry: 1,
    },
  },
});
