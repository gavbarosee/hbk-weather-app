import { describe, expect, it } from 'vitest';
import { createTestAlert } from '../../services/__tests__/fixtures/weatherData';
import type { AlertSeverity } from '../../types/enums';
import {
  applyAlertFilters,
  filterByEvent,
  filterBySearchText,
  filterBySeverity,
  filterByStatus,
  getFilterOptions,
  sortAlerts,
} from '../alertFilters';

describe('alertFilters', () => {
  describe('filterBySeverity', () => {
    it('should filter alerts by severity levels', () => {
      const alerts = [
        createTestAlert({ severity: 'Severe' }),
        createTestAlert({ severity: 'Moderate' }),
        createTestAlert({ severity: 'Extreme' }),
      ];

      const result = filterBySeverity(alerts, ['Severe', 'Extreme']);

      expect(result).toHaveLength(2);
      expect(result.map(a => a.severity)).toEqual(['Severe', 'Extreme']);
    });
  });

  describe('filterByEvent', () => {
    it('should filter alerts by event types', () => {
      const alerts = [
        createTestAlert({ event: 'Winter Storm Warning' }),
        createTestAlert({ event: 'High Wind Warning' }),
        createTestAlert({ event: 'Tornado Watch' }),
      ];

      const result = filterByEvent(alerts, [
        'Winter Storm Warning',
        'Tornado Watch',
      ]);

      expect(result).toHaveLength(2);
      expect(result.map(a => a.event)).toEqual([
        'Winter Storm Warning',
        'Tornado Watch',
      ]);
    });
  });

  describe('filterByStatus', () => {
    it('should filter alerts by status', () => {
      const alerts = [
        createTestAlert({ status: 'Actual' }),
        createTestAlert({ status: 'Test' }),
        createTestAlert({ status: 'Expired' }),
      ];

      const result = filterByStatus(alerts, ['Actual', 'Test']);

      expect(result).toHaveLength(2);
      expect(result.map(a => a.status)).toEqual(['Actual', 'Test']);
    });
  });

  describe('filterBySearchText', () => {
    it('should search across multiple fields and handle edge cases', () => {
      const alerts = [
        createTestAlert({
          headline: 'Winter Storm Warning',
          description: 'Heavy snow expected',
          areaDesc: 'Cook County',
          event: 'Winter Storm Warning',
        }),
        createTestAlert({
          headline: 'High Wind Alert',
          description: 'Strong winds forecast',
          areaDesc: 'Lake County',
          event: 'Wind Advisory',
        }),
      ];

      const stormResult = filterBySearchText(alerts, 'storm');
      expect(stormResult).toHaveLength(1);
      expect(stormResult[0].headline).toBe('Winter Storm Warning');

      const lakeResult = filterBySearchText(alerts, 'lake');
      expect(lakeResult).toHaveLength(1);
      expect(lakeResult[0].areaDesc).toBe('Lake County');

      const caseResult = filterBySearchText(alerts, 'WINTER');
      expect(caseResult).toHaveLength(1);

      const emptyResult = filterBySearchText(alerts, '');
      expect(emptyResult).toEqual(alerts);
    });
  });

  describe('applyAlertFilters', () => {
    it('should apply multiple filters together', () => {
      const alerts = [
        createTestAlert({
          severity: 'Severe',
          event: 'Winter Storm Warning',
          status: 'Actual',
        }),
        createTestAlert({
          severity: 'Moderate',
          event: 'High Wind Warning',
          status: 'Test',
        }),
        createTestAlert({
          severity: 'Severe',
          event: 'Tornado Watch',
          status: 'Actual',
        }),
      ];

      const filters = {
        severity: ['Severe'] as AlertSeverity[],
        status: ['Actual'],
      };

      const result = applyAlertFilters(alerts, filters);

      expect(result).toHaveLength(2);
      result.forEach(alert => {
        expect(alert.severity).toBe('Severe');
        expect(alert.status).toBe('Actual');
      });
    });

    it('should return all alerts when no filters applied', () => {
      const alerts = [createTestAlert(), createTestAlert()];
      const result = applyAlertFilters(alerts, {});

      expect(result).toEqual(alerts);
    });
  });

  describe('getFilterOptions', () => {
    it('should extract unique filter options and filter out falsy values', () => {
      const alerts = [
        createTestAlert({
          severity: 'Severe',
          event: 'Winter Storm Warning',
          status: 'Actual',
        }),
        createTestAlert({
          severity: 'Moderate',
          event: 'High Wind Warning',
          status: 'Test',
        }),
        createTestAlert({
          severity: 'Severe',
          event: 'Winter Storm Warning',
          status: 'Actual',
        }),
        createTestAlert({ severity: 'Extreme', event: '', status: 'Actual' }),
      ];

      const options = getFilterOptions(alerts);

      expect(options.severities).toEqual(['Severe', 'Moderate', 'Extreme']);
      expect(options.events).toEqual([
        'Winter Storm Warning',
        'High Wind Warning',
      ]);
      expect(options.statuses).toEqual(['Actual', 'Test']);
    });
  });

  describe('sortAlerts', () => {
    it('should sort by different fields and directions without mutating original', () => {
      const alerts = [
        createTestAlert({
          effective: '2024-01-01T12:00:00Z',
          severity: 'Minor',
        }),
        createTestAlert({
          effective: '2024-01-03T12:00:00Z',
          severity: 'Extreme',
        }),
        createTestAlert({
          effective: '2024-01-02T12:00:00Z',
          severity: 'Moderate',
        }),
      ];
      const originalOrder = [...alerts];

      const dateDesc = sortAlerts(alerts, 'effective');
      expect(dateDesc[0].effective).toBe('2024-01-03T12:00:00Z');

      const dateAsc = sortAlerts(alerts, 'effective', 'asc');
      expect(dateAsc[0].effective).toBe('2024-01-01T12:00:00Z');

      const severityDesc = sortAlerts(alerts, 'severity');
      expect(severityDesc.map(a => a.severity)).toEqual([
        'Extreme',
        'Moderate',
        'Minor',
      ]);

      expect(alerts).toEqual(originalOrder);
    });
  });
});
