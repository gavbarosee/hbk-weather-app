import { config } from '../config/environment';
import type { AlertProperties, WeatherAlertsResponse } from '../types/weather';

class WeatherService {
  private readonly baseUrl: string;
  private readonly userAgent = 'HBK Weather App/1.0';

  constructor() {
    this.baseUrl = config.api.weatherServiceBaseUrl;
  }

  // Make HTTP request with proper headers
  private async makeRequest(url: string): Promise<WeatherAlertsResponse> {
    const response = await fetch(url, {
      headers: {
        'User-Agent': this.userAgent,
        Accept: 'application/geo+json',
      },
    });

    if (!response.ok) {
      throw new Error(
        `HTTP error status: ${response.status} - ${response.statusText}`
      );
    }

    return response.json();
  }

  // Get all currently active alerts
  async getActiveAlerts(): Promise<AlertProperties[]> {
    try {
      const response = await this.makeRequest(`${this.baseUrl}/alerts/active`);
      return response.features.map(feature => feature.properties);
    } catch (error) {
      console.error('Error fetching active alerts:', error);
      throw new Error('Failed to fetch active weather alerts');
    }
  }

  // Get all alerts within a date range (includes active + expired)
  async getAlertsByDateRange(
    startDate: Date,
    endDate: Date
  ): Promise<AlertProperties[]> {
    try {
      const params = new URLSearchParams({
        start: startDate.toISOString(),
        end: endDate.toISOString(),
      });

      const response = await this.makeRequest(
        `${this.baseUrl}/alerts?${params.toString()}`
      );

      return response.features.map(feature => feature.properties);
    } catch (error) {
      console.error('Error fetching alerts by date range:', error);
      throw new Error(
        'Failed to fetch weather alerts for the specified date range'
      );
    }
  }

  // Get a specific alert by ID
  async getAlertById(id: string): Promise<AlertProperties | null> {
    try {
      const response = await this.makeRequest(`${this.baseUrl}/alerts/${id}`);
      return response.features?.[0]?.properties || null;
    } catch (error) {
      console.error('Error fetching alert by ID:', error);
      throw new Error('Failed to fetch weather alert details');
    }
  }
}

export const weatherService = new WeatherService();
