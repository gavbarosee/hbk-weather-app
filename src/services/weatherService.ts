import { config } from '../config/environment';
import type { WeatherAlertsResponse } from '../types/weather';

const BASE_URL = config.api.weatherServiceBaseUrl;

export const fetchWeatherAlerts = async (): Promise<WeatherAlertsResponse> => {
  const response = await fetch(`${BASE_URL}/alerts`);

  if (!response.ok) {
    throw new Error(`HTTP error status: ${response.status}`);
  }

  return response.json();
};
