export interface WeatherAlert {
  id: string;
  type: string;
  geometry: {
    type: 'Polygon';
    coordinates: number[][][];
  } | null;
  properties: AlertProperties;
}

export interface AlertProperties {
  '@id': string;
  '@type': string;
  id: string;
  areaDesc: string;
  geocode: {
    SAME: string[];
    UGC: string[];
  };
  affectedZones: string[];
  references: unknown[];
  sent: string;
  effective: string;
  onset: string | null;
  expires: string;
  ends: string | null;
  status: string;
  messageType: string;
  category: string;
  severity: AlertSeverity;
  certainty: string;
  urgency: string;
  event: string;
  eventCode: {
    SAME: string[];
    NationalWeatherService: string[];
  };
  sender: string;
  senderName: string;
  headline: string | null;
  description: string;
  instruction: string | null;
  response: string;
  code: string;
  language: string;
  scope: string;
  web: string;
  parameters: {
    AWIPSIdentifier?: string[];
    WMOIdentifier?: string[];
    NWSHeadline?: string[];
    eventMotionDescription?: string[];
    [key: string]: string[] | undefined;
  };
}

export interface WeatherAlertsResponse {
  '@context': unknown;
  type: 'FeatureCollection';
  features: WeatherAlert[];
  title: string;
  updated: string;
  pagination?: {
    next: string;
  };
}

export type AlertSeverity = 'Minor' | 'Moderate' | 'Severe' | 'Extreme';
