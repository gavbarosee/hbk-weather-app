import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createTestAlert } from '../../../../services/__tests__/fixtures/weatherData';
import type { AlertProperties } from '../../../../types/weather';
import { WeatherAlertsTable } from '../index';
import type { SortDirection, SortField } from '../utils';

describe('WeatherAlertsTable', () => {
  const mockOnSort = vi.fn();

  const defaultProps = {
    alerts: [] as AlertProperties[],
    sortBy: 'effective' as SortField,
    sortDirection: 'desc' as SortDirection,
    onSort: mockOnSort,
    onAlertClick: () => {},
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Empty State', () => {
    it('renders EmptyState when alerts array is empty', () => {
      render(<WeatherAlertsTable {...defaultProps} />);

      expect(screen.getByTestId('empty-state')).toBeInTheDocument();
      expect(screen.getByText('No alerts found')).toBeInTheDocument();
      expect(screen.queryByTestId('table-header')).not.toBeInTheDocument();
    });

    it('does not render table components when alerts array is empty', () => {
      render(<WeatherAlertsTable {...defaultProps} />);

      expect(screen.queryByRole('table')).not.toBeInTheDocument();
      expect(screen.queryByTestId('table-header')).not.toBeInTheDocument();
    });
  });

  describe('Table Rendering', () => {
    const mockAlerts = [
      createTestAlert({
        id: 'alert-1',
        event: 'Winter Storm Warning',
        severity: 'Severe',
        areaDesc: 'Cook County',
      }),
      createTestAlert({
        id: 'alert-2',
        event: 'High Wind Warning',
        severity: 'Moderate',
        areaDesc: 'Lake County',
      }),
    ];

    it('renders table with alerts when alerts array is not empty', () => {
      render(<WeatherAlertsTable {...defaultProps} alerts={mockAlerts} />);

      expect(screen.getByRole('table')).toBeInTheDocument();
      expect(screen.getByTestId('table-header')).toBeInTheDocument();
      expect(screen.queryByTestId('empty-state')).not.toBeInTheDocument();
    });

    it('renders correct number of alert rows', () => {
      render(<WeatherAlertsTable {...defaultProps} alerts={mockAlerts} />);

      expect(screen.getByTestId('alert-row-alert-1')).toBeInTheDocument();
      expect(screen.getByTestId('alert-row-alert-2')).toBeInTheDocument();
      expect(screen.getAllByTestId(/^alert-row-/)).toHaveLength(2);
    });

    it('passes correct props to TableHeader', () => {
      render(
        <WeatherAlertsTable
          {...defaultProps}
          alerts={mockAlerts}
          sortBy="severity"
          sortDirection="asc"
        />
      );

      const tableHeader = screen.getByTestId('table-header');
      const sortButton = screen.getByTestId('sort-event');

      expect(tableHeader).toBeInTheDocument();
      expect(sortButton).toHaveAttribute('data-sort-by', 'severity');
      expect(sortButton).toHaveAttribute('data-sort-direction', 'asc');
    });

    it('renders each alert with correct data', () => {
      render(<WeatherAlertsTable {...defaultProps} alerts={mockAlerts} />);

      const alert1Row = screen.getByTestId('alert-row-alert-1');
      const alert2Row = screen.getByTestId('alert-row-alert-2');

      expect(alert1Row).toHaveTextContent('Winter Storm Warning');
      expect(alert1Row).toHaveTextContent('Severe');
      expect(alert2Row).toHaveTextContent('High Wind Warning');
      expect(alert2Row).toHaveTextContent('Moderate');
    });
  });

  describe('Sorting Functionality', () => {
    const mockAlerts = [
      createTestAlert({
        id: 'alert-1',
        event: 'Winter Storm Warning',
        severity: 'Severe',
      }),
    ];

    it('calls onSort when sort button is clicked', async () => {
      const user = userEvent.setup();
      render(<WeatherAlertsTable {...defaultProps} alerts={mockAlerts} />);

      const sortEventButton = screen.getByTestId('sort-event');
      await user.click(sortEventButton);

      expect(mockOnSort).toHaveBeenCalledWith('event');
      expect(mockOnSort).toHaveBeenCalledTimes(1);
    });

    it('calls onSort with correct field when severity sort is clicked', async () => {
      const user = userEvent.setup();
      render(<WeatherAlertsTable {...defaultProps} alerts={mockAlerts} />);

      const sortSeverityButton = screen.getByTestId('sort-severity');
      await user.click(sortSeverityButton);

      expect(mockOnSort).toHaveBeenCalledWith('severity');
      expect(mockOnSort).toHaveBeenCalledTimes(1);
    });

    it('does not call onSort when no alerts are present', () => {
      render(<WeatherAlertsTable {...defaultProps} />);

      expect(mockOnSort).not.toHaveBeenCalled();
    });
  });

  describe('Table Structure', () => {
    const mockAlert = createTestAlert({
      id: 'test-alert',
      event: 'Test Event',
      severity: 'Minor',
    });

    it('renders with correct table structure and styling', () => {
      render(<WeatherAlertsTable {...defaultProps} alerts={[mockAlert]} />);

      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();
      expect(table).toHaveAttribute(
        'class',
        expect.stringContaining('MuiTable-root')
      );
    });

    it('renders sticky header', () => {
      render(<WeatherAlertsTable {...defaultProps} alerts={[mockAlert]} />);

      const table = screen.getByRole('table');
      expect(table.getAttribute('class')).toMatch(/stickyHeader/);
    });

    it('renders table inside Paper container', () => {
      const { container } = render(
        <WeatherAlertsTable {...defaultProps} alerts={[mockAlert]} />
      );

      const paperElement = container.querySelector('.MuiPaper-root');
      expect(paperElement).toBeInTheDocument();
    });
  });

  describe('Props Validation', () => {
    it('handles single alert correctly', () => {
      const singleAlert = createTestAlert({
        id: 'single-alert',
        event: 'Single Event',
        severity: 'Extreme',
      });

      render(<WeatherAlertsTable {...defaultProps} alerts={[singleAlert]} />);

      expect(screen.getByTestId('alert-row-single-alert')).toBeInTheDocument();
      expect(screen.getAllByTestId(/^alert-row-/)).toHaveLength(1);
    });

    it('handles large number of alerts', () => {
      const manyAlerts = Array.from({ length: 50 }, (_, index) =>
        createTestAlert({
          id: `alert-${index}`,
          event: `Event ${index}`,
          severity: 'Minor',
        })
      );

      render(<WeatherAlertsTable {...defaultProps} alerts={manyAlerts} />);

      expect(screen.getAllByTestId(/^alert-row-/)).toHaveLength(50);
    });

    it('handles different sort directions correctly', () => {
      const mockAlert = createTestAlert({ id: 'test' });

      const { rerender } = render(
        <WeatherAlertsTable
          {...defaultProps}
          alerts={[mockAlert]}
          sortDirection="asc"
        />
      );

      expect(screen.getByTestId('sort-event')).toHaveAttribute(
        'data-sort-direction',
        'asc'
      );

      rerender(
        <WeatherAlertsTable
          {...defaultProps}
          alerts={[mockAlert]}
          sortDirection="desc"
        />
      );

      expect(screen.getByTestId('sort-event')).toHaveAttribute(
        'data-sort-direction',
        'desc'
      );
    });
  });
});
