import type { AlertSeverity } from './enums';

export interface AlertFilters {
  severity?: AlertSeverity[];
  event?: string[];
  status?: string[];
  searchText?: string;
}

export interface FilterOptions {
  severities: string[];
  events: string[];
  statuses: string[];
}

export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}
