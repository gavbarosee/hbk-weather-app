export interface WeatherAlert {
  id: string;
  type: string;
  geometry: unknown; // could be null or coordinates
  properties: AlertProperties;
}

export interface AlertProperties {
  id: string;
  areaDesc: string;
  geocode: {
    FIPS: string[];
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
  severity: string;
  certainty: string;
  urgency: string;
  event: string;
  sender: string;
  senderName: string;
  headline: string | null;
  description: string;
  instruction: string | null;
  response: string;
  parameters: Record<string, unknown>;
}

export interface WeatherAlertsResponse {
  '@context': unknown;
  type: 'FeatureCollection';
  features: WeatherAlert[];
  title: string;
  updated: string;
}
