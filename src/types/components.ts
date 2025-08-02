import type { SortDirection, SortField } from './enums';
import type { AlertProperties } from './weather';

export interface BaseComponentProps {
  className?: string;
  'data-testid'?: string;
}

export interface PaginationState {
  page: number;
  rowsPerPage: number;
}

export interface TableProps extends BaseComponentProps {
  alerts: AlertProperties[];
  sortBy: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
  onAlertClick: (alert: AlertProperties) => void;
}

export interface SortingState {
  sortBy: SortField;
  sortDirection: SortDirection;
}

export interface AlertStats {
  total: number;
  filtered: number;
}
