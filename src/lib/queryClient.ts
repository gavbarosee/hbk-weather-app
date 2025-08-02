import { QueryClient } from '@tanstack/react-query';
import { CACHE_TIMES } from '../constants/app';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: CACHE_TIMES.FIVE_MINUTES, // cache data for 5 minutes
      gcTime: CACHE_TIMES.TEN_MINUTES, // keep data in cache for 10 minutes after components unmount
      retry: 1,
      refetchOnWindowFocus: true, // refetch on window focus for fresh data
      refetchOnReconnect: true, // refetch when coming back online
    },
    mutations: {
      retry: 1,
    },
  },
});
