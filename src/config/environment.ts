export const config = {
  api: {
    weatherServiceBaseUrl:
      import.meta.env.VITE_WEATHER_API_BASE_URL ||
      (() => {
        throw new Error('VITE_WEATHER_API_BASE_URL not configured');
      })(),
  },
} as const;
