import type {
  AlertProperties,
  WeatherAlertsResponse,
} from '../../../types/weather';

export const mockAlertProperties: AlertProperties = {
  '@id': 'https://api.weather.gov/alerts/urn:oid:2.49.0.1.840.0.123abc',
  '@type': 'wx:Alert',
  id: 'urn:oid:2.49.0.1.840.0.123abc',
  areaDesc: 'Cook County',
  geocode: {
    SAME: ['017031'],
    UGC: ['ILZ014'],
  },
  affectedZones: ['https://api.weather.gov/zones/forecast/ILZ014'],
  references: [],
  sent: '2024-01-15T12:00:00-06:00',
  effective: '2024-01-15T12:00:00-06:00',
  onset: '2024-01-15T15:00:00-06:00',
  expires: '2024-01-15T18:00:00-06:00',
  ends: '2024-01-15T18:00:00-06:00',
  status: 'Actual',
  messageType: 'Alert',
  category: 'Met',
  severity: 'Severe',
  certainty: 'Likely',
  urgency: 'Expected',
  event: 'Winter Storm Warning',
  eventCode: {
    SAME: ['WSW'],
    NationalWeatherService: ['WSW'],
  },
  sender: 'w-nws.webmaster@noaa.gov',
  senderName: 'NWS Chicago IL',
  headline:
    'Winter Storm Warning issued January 15 at 12:00PM CST until January 15 at 6:00PM CST by NWS Chicago IL',
  description:
    'Heavy snow expected. Total snow accumulations of 8 to 12 inches expected.',
  instruction:
    'If you must travel, keep an extra flashlight, food, and water in your vehicle in case of an emergency.',
  response: 'Prepare',
  code: 'WSW',
  language: 'en-US',
  scope: 'Public',
  web: 'https://www.weather.gov/lot/wswcook',
  parameters: {
    AWIPSIdentifier: ['WSWLOT'],
    WMOIdentifier: ['WWUS73 KLOT 151800'],
    NWSHeadline: ['Winter Storm Warning'],
  },
};

export const mockActiveAlertsResponse: WeatherAlertsResponse = {
  '@context': {
    '@version': '1.1',
    wx: 'https://api.weather.gov/ontology#',
  },
  type: 'FeatureCollection',
  features: [
    {
      id: 'mock-alert-1',
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-88.5, 41.5],
            [-88.0, 41.5],
            [-88.0, 42.0],
            [-88.5, 42.0],
            [-88.5, 41.5],
          ],
        ],
      },
      properties: mockAlertProperties,
    },
    {
      id: 'mock-alert-2',
      type: 'Feature',
      geometry: null,
      properties: {
        ...mockAlertProperties,
        id: 'urn:oid:2.49.0.1.840.0.456def',
        event: 'High Wind Warning',
        severity: 'Moderate',
        headline:
          'High Wind Warning issued January 15 at 12:00PM CST until January 15 at 8:00PM CST',
      },
    },
  ],
  title: 'Current watches, warnings, and advisories',
  updated: '2024-01-15T18:00:00Z',
};

export const mockDateRangeAlertsResponse: WeatherAlertsResponse = {
  '@context': {
    '@version': '1.1',
    wx: 'https://api.weather.gov/ontology#',
  },
  type: 'FeatureCollection',
  features: [
    {
      id: 'mock-historical-alert',
      type: 'Feature',
      geometry: null,
      properties: {
        ...mockAlertProperties,
        id: 'urn:oid:2.49.0.1.840.0.789ghi',
        event: 'Tornado Watch',
        severity: 'Extreme',
        expires: '2024-01-10T22:00:00-06:00',
        status: 'Expired',
      },
    },
  ],
  title: 'Weather alerts for date range',
  updated: '2024-01-15T18:00:00Z',
};

export const mockAlertByIdResponse: WeatherAlertsResponse = {
  '@context': {
    '@version': '1.1',
    wx: 'https://api.weather.gov/ontology#',
  },
  type: 'FeatureCollection',
  features: [
    {
      id: 'specific-alert',
      type: 'Feature',
      geometry: null,
      properties: mockAlertProperties,
    },
  ],
  title: 'Weather alert details',
  updated: '2024-01-15T18:00:00Z',
};

export const createMockAlert = (
  overrides: Partial<AlertProperties> = {}
): AlertProperties => ({
  ...mockAlertProperties,
  ...overrides,
});

export const createMockResponse = (
  features: Array<{ id: string; properties: AlertProperties }> = []
): WeatherAlertsResponse => ({
  '@context': {
    '@version': '1.1',
    wx: 'https://api.weather.gov/ontology#',
  },
  type: 'FeatureCollection',
  features: features.map(feature => ({
    id: feature.id,
    type: 'Feature',
    geometry: null,
    properties: feature.properties,
  })),
  title: 'Test weather alerts',
  updated: new Date().toISOString(),
});

export const createTestAlert = (
  overrides: Partial<AlertProperties> = {}
): AlertProperties => ({
  '@id': 'https://api.weather.gov/alerts/test',
  '@type': 'wx:Alert',
  id: 'test-id',
  areaDesc: 'Test Area',
  geocode: { SAME: [], UGC: [] },
  affectedZones: [],
  references: [],
  sent: '2024-01-15T12:00:00Z',
  effective: '2024-01-15T12:00:00Z',
  onset: null,
  expires: '2024-01-15T18:00:00Z',
  ends: null,
  status: 'Actual',
  messageType: 'Alert',
  category: 'Met',
  severity: 'Severe',
  certainty: 'Likely',
  urgency: 'Expected',
  event: 'Winter Storm Warning',
  eventCode: { SAME: [], NationalWeatherService: [] },
  sender: 'test@weather.gov',
  senderName: 'Test Weather Service',
  headline: 'Test Weather Alert',
  description: 'Test description',
  instruction: null,
  response: 'Prepare',
  code: 'TEST',
  language: 'en-US',
  scope: 'Public',
  web: 'https://weather.gov',
  parameters: {},
  ...overrides,
});
