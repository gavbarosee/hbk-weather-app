import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { config } from '../../config/environment';
import type { WeatherAlertsResponse } from '../../types/weather';
import { ERROR_MESSAGES } from '../constants';
import { weatherService } from '../weatherService';
import {
  createMockResponse,
  mockActiveAlertsResponse,
  mockAlertByIdResponse,
  mockDateRangeAlertsResponse,
} from './fixtures/weatherData';

const server = setupServer();

const API_BASE = config.api.weatherServiceBaseUrl;
const ENDPOINTS = {
  activeAlerts: `${API_BASE}/alerts/active`,
  alerts: `${API_BASE}/alerts`,
  alertById: `${API_BASE}/alerts/:id`,
} as const;

const mockResponse = (endpoint: string, response: WeatherAlertsResponse) => {
  server.use(http.get(endpoint, () => HttpResponse.json(response)));
};

const mockHttpError = (endpoint: string, status: number) => {
  server.use(http.get(endpoint, () => new HttpResponse(null, { status })));
};

const mockNetworkError = (endpoint: string) => {
  server.use(http.get(endpoint, () => HttpResponse.error()));
};

describe('WeatherService', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  describe('getActiveAlerts', () => {
    it('should fetch and return active alerts successfully', async () => {
      mockResponse(ENDPOINTS.activeAlerts, mockActiveAlertsResponse);

      const alerts = await weatherService.getActiveAlerts();

      expect(alerts).toHaveLength(2);
      expect(alerts[0]).toEqual(
        mockActiveAlertsResponse.features[0].properties
      );
    });

    it('should handle empty response', async () => {
      mockResponse(ENDPOINTS.activeAlerts, createMockResponse([]));

      const alerts = await weatherService.getActiveAlerts();
      expect(alerts).toHaveLength(0);
    });

    it('should handle HTTP errors', async () => {
      mockHttpError(ENDPOINTS.activeAlerts, 500);

      await expect(weatherService.getActiveAlerts()).rejects.toThrow(
        ERROR_MESSAGES.ACTIVE_ALERTS_FAILED
      );
    });

    it('should handle network failures', async () => {
      mockNetworkError(ENDPOINTS.activeAlerts);

      await expect(weatherService.getActiveAlerts()).rejects.toThrow(
        ERROR_MESSAGES.ACTIVE_ALERTS_FAILED
      );
    });
  });

  describe('getAlertsByDateRange', () => {
    const startDate = new Date('2024-01-01');
    const endDate = new Date('2024-01-31');

    it('should fetch alerts for a date range successfully', async () => {
      server.use(
        http.get('*/alerts', ({ request }) => {
          const url = new URL(request.url);
          if (url.searchParams.has('start') && url.searchParams.has('end')) {
            return HttpResponse.json(mockDateRangeAlertsResponse);
          }
          return new HttpResponse(null, { status: 404 });
        })
      );

      const alerts = await weatherService.getAlertsByDateRange(
        startDate,
        endDate
      );

      expect(alerts).toHaveLength(1);
      expect(alerts[0]).toEqual(
        mockDateRangeAlertsResponse.features[0].properties
      );
    });

    it('should handle HTTP errors', async () => {
      server.use(
        http.get('*/alerts', () => new HttpResponse(null, { status: 400 }))
      );

      await expect(
        weatherService.getAlertsByDateRange(startDate, endDate)
      ).rejects.toThrow(ERROR_MESSAGES.DATE_RANGE_ALERTS_FAILED);
    });
  });

  describe('getAlertById', () => {
    const alertId = 'urn:oid:2.49.0.1.840.0.123abc';

    it('should fetch a specific alert by ID successfully', async () => {
      mockResponse(ENDPOINTS.alertById, mockAlertByIdResponse);

      const alert = await weatherService.getAlertById(alertId);

      expect(alert).toEqual(mockAlertByIdResponse.features[0].properties);
    });

    it('should return null when alert is not found', async () => {
      mockResponse(ENDPOINTS.alertById, createMockResponse([]));

      const alert = await weatherService.getAlertById('non-existent');
      expect(alert).toBeNull();
    });

    it('should handle HTTP errors', async () => {
      mockHttpError(ENDPOINTS.alertById, 404);

      await expect(weatherService.getAlertById('test-id')).rejects.toThrow(
        ERROR_MESSAGES.ALERT_BY_ID_FAILED
      );
    });
  });
});
