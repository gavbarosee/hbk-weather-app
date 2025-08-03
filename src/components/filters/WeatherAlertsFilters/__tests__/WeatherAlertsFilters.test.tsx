import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { AlertSeverity } from '../../../../types/enums';
import type { AlertFilters } from '../../../../types/filters';
import { WeatherAlertsFilters } from '../index';

describe('WeatherAlertsFilters', () => {
  const mockOnFiltersChange = vi.fn();
  const mockOnDateRangeChange = vi.fn();

  const defaultProps = {
    filters: {
      severity: [] as AlertSeverity[],
      event: [],
      status: [],
      searchText: '',
    } as AlertFilters,
    onFiltersChange: mockOnFiltersChange,
    availableOptions: {
      severities: ['Minor', 'Moderate', 'Severe', 'Extreme'],
      events: ['Winter Storm Warning', 'High Wind Warning'],
      statuses: ['Actual', 'Test'],
    },
    dateRange: {
      startDate: null,
      endDate: null,
    },
    onDateRangeChange: mockOnDateRangeChange,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Component Rendering', () => {
    it('renders all filter sections', () => {
      render(<WeatherAlertsFilters {...defaultProps} />);

      expect(screen.getByTestId('filter-header')).toBeInTheDocument();
      expect(screen.getByTestId('date-range-filter')).toBeInTheDocument();
      expect(screen.getByTestId('search-text-filter')).toBeInTheDocument();
      expect(screen.getByTestId('multi-select-severity')).toBeInTheDocument();
      expect(screen.getByTestId('multi-select-event-type')).toBeInTheDocument();
      expect(screen.getByTestId('multi-select-status')).toBeInTheDocument();
    });

    it('renders section titles', () => {
      render(<WeatherAlertsFilters {...defaultProps} />);

      expect(screen.getByText('Date Range')).toBeInTheDocument();
      expect(screen.getByText('Text Search')).toBeInTheDocument();
      expect(screen.getByText('Filter Options')).toBeInTheDocument();
    });

    it('passes correct props to FilterHeader', () => {
      render(<WeatherAlertsFilters {...defaultProps} />);

      expect(screen.getByTestId('filter-header')).toBeInTheDocument();
      expect(screen.getByTestId('clear-all-button')).toBeInTheDocument();
    });
  });

  describe('Search Text Filter', () => {
    it('handles search text changes', async () => {
      const user = userEvent.setup();
      render(<WeatherAlertsFilters {...defaultProps} />);

      const searchInput = screen.getByLabelText('Search alerts');
      await user.type(searchInput, 'storm');

      expect(mockOnFiltersChange).toHaveBeenCalled();

      expect(mockOnFiltersChange).toHaveBeenLastCalledWith({
        ...defaultProps.filters,
        searchText: 'm',
      });
    });

    it('displays current search text', () => {
      const propsWithSearchText = {
        ...defaultProps,
        filters: { ...defaultProps.filters, searchText: 'winter storm' },
      };

      render(<WeatherAlertsFilters {...propsWithSearchText} />);

      const searchInput = screen.getByDisplayValue('winter storm');
      expect(searchInput).toBeInTheDocument();
    });

    it('shows clear button when search text exists', () => {
      const propsWithSearchText = {
        ...defaultProps,
        filters: { ...defaultProps.filters, searchText: 'test' },
      };

      render(<WeatherAlertsFilters {...propsWithSearchText} />);

      expect(screen.getByTestId('clear-search-button')).toBeInTheDocument();
    });

    it('clears search text when clear button is clicked', async () => {
      const user = userEvent.setup();
      const propsWithSearchText = {
        ...defaultProps,
        filters: { ...defaultProps.filters, searchText: 'test' },
      };

      render(<WeatherAlertsFilters {...propsWithSearchText} />);

      const clearButton = screen.getByTestId('clear-search-button');
      await user.click(clearButton);

      expect(mockOnFiltersChange).toHaveBeenCalledWith({
        ...defaultProps.filters,
        searchText: '',
      });
    });
  });

  describe('Date Range Filter', () => {
    it('shows clear buttons when dates are selected', () => {
      const propsWithDates = {
        ...defaultProps,
        dateRange: {
          startDate: new Date('2024-01-01'),
          endDate: new Date('2024-01-31'),
        },
      };

      render(<WeatherAlertsFilters {...propsWithDates} />);

      expect(screen.getByTestId('clear-start-date-button')).toBeInTheDocument();
      expect(screen.getByTestId('clear-end-date-button')).toBeInTheDocument();
    });

    it('clears start date when clear button is clicked', async () => {
      const user = userEvent.setup();
      const propsWithStartDate = {
        ...defaultProps,
        dateRange: {
          startDate: new Date('2024-01-01'),
          endDate: null,
        },
      };

      render(<WeatherAlertsFilters {...propsWithStartDate} />);

      const clearButton = screen.getByTestId('clear-start-date-button');
      await user.click(clearButton);

      expect(mockOnDateRangeChange).toHaveBeenCalledWith({
        startDate: null,
        endDate: null,
      });
    });

    it('clears end date when clear button is clicked', async () => {
      const user = userEvent.setup();
      const propsWithEndDate = {
        ...defaultProps,
        dateRange: {
          startDate: null,
          endDate: new Date('2024-01-31'),
        },
      };

      render(<WeatherAlertsFilters {...propsWithEndDate} />);

      const clearButton = screen.getByTestId('clear-end-date-button');
      await user.click(clearButton);

      expect(mockOnDateRangeChange).toHaveBeenCalledWith({
        startDate: null,
        endDate: null,
      });
    });

    describe('Date Range Presets', () => {
      it('renders all preset buttons', () => {
        render(<WeatherAlertsFilters {...defaultProps} />);

        expect(screen.getByTestId('preset-today')).toBeInTheDocument();
        expect(screen.getByTestId('preset-past-week')).toBeInTheDocument();
        expect(screen.getByTestId('preset-past-month')).toBeInTheDocument();
        expect(screen.getByTestId('preset-past-quarter')).toBeInTheDocument();
        expect(screen.getByTestId('preset-past-year')).toBeInTheDocument();
        expect(screen.getByTestId('preset-clear-all')).toBeInTheDocument();
      });

      it('sets today range when Today preset is clicked', async () => {
        const user = userEvent.setup();
        render(<WeatherAlertsFilters {...defaultProps} />);

        const todayButton = screen.getByTestId('preset-today');
        await user.click(todayButton);

        expect(mockOnDateRangeChange).toHaveBeenCalled();
        const call = mockOnDateRangeChange.mock.calls[0][0];

        expect(call.startDate).toBeInstanceOf(Date);
        expect(call.endDate).toBeInstanceOf(Date);

        const today = new Date();
        const startDate = call.startDate as Date;
        const endDate = call.endDate as Date;

        expect(startDate.getDate()).toBe(today.getDate());
        expect(startDate.getMonth()).toBe(today.getMonth());
        expect(startDate.getFullYear()).toBe(today.getFullYear());

        expect(endDate.getDate()).toBe(today.getDate());
        expect(endDate.getMonth()).toBe(today.getMonth());
        expect(endDate.getFullYear()).toBe(today.getFullYear());
      });

      it('sets past week range when Past Week preset is clicked', async () => {
        const user = userEvent.setup();
        render(<WeatherAlertsFilters {...defaultProps} />);

        const pastWeekButton = screen.getByTestId('preset-past-week');
        await user.click(pastWeekButton);

        expect(mockOnDateRangeChange).toHaveBeenCalled();
        const call = mockOnDateRangeChange.mock.calls[0][0];

        expect(call.startDate).toBeInstanceOf(Date);
        expect(call.endDate).toBeInstanceOf(Date);

        const now = new Date();
        const startDate = call.startDate as Date;
        const daysDiff = Math.floor(
          (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
        );
        expect(daysDiff).toBe(7);
      });

      it('sets past month range when Past Month preset is clicked', async () => {
        const user = userEvent.setup();
        render(<WeatherAlertsFilters {...defaultProps} />);

        const pastMonthButton = screen.getByTestId('preset-past-month');
        await user.click(pastMonthButton);

        expect(mockOnDateRangeChange).toHaveBeenCalled();
        const call = mockOnDateRangeChange.mock.calls[0][0];

        expect(call.startDate).toBeInstanceOf(Date);
        expect(call.endDate).toBeInstanceOf(Date);

        const now = new Date();
        const startDate = call.startDate as Date;
        const daysDiff = Math.floor(
          (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
        );
        expect(daysDiff).toBe(30);
      });

      it('clears both dates when Clear Dates preset is clicked', async () => {
        const user = userEvent.setup();
        const propsWithDates = {
          ...defaultProps,
          dateRange: {
            startDate: new Date('2024-01-01'),
            endDate: new Date('2024-01-31'),
          },
        };

        render(<WeatherAlertsFilters {...propsWithDates} />);

        const clearAllButton = screen.getByTestId('preset-clear-all');
        await user.click(clearAllButton);

        expect(mockOnDateRangeChange).toHaveBeenCalledWith({
          startDate: null,
          endDate: null,
        });
      });

      it('displays Quick Date Range Select label', () => {
        render(<WeatherAlertsFilters {...defaultProps} />);

        expect(
          screen.getByText('Quick Date Range Select:')
        ).toBeInTheDocument();
      });

      it('shows active state for current preset when dates match', () => {
        const now = new Date();
        const today = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate()
        );
        const pastWeekStart = new Date(
          today.getTime() - 7 * 24 * 60 * 60 * 1000
        );

        const propsWithPastWeek = {
          ...defaultProps,
          dateRange: {
            startDate: pastWeekStart,
            endDate: now,
          },
        };

        render(<WeatherAlertsFilters {...propsWithPastWeek} />);

        const pastWeekButton = screen.getByTestId('preset-past-week');

        expect(pastWeekButton).toBeInTheDocument();
        expect(pastWeekButton).toHaveClass('MuiChip-filled');
      });

      it('shows no active state when no preset matches current dates', () => {
        const customDateRange = {
          ...defaultProps,
          dateRange: {
            startDate: new Date('2024-01-01'),
            endDate: new Date('2024-01-15'),
          },
        };

        render(<WeatherAlertsFilters {...customDateRange} />);

        const todayButton = screen.getByTestId('preset-today');
        const pastWeekButton = screen.getByTestId('preset-past-week');
        const pastMonthButton = screen.getByTestId('preset-past-month');

        expect(todayButton).toHaveClass('MuiChip-outlined');
        expect(pastWeekButton).toHaveClass('MuiChip-outlined');
        expect(pastMonthButton).toHaveClass('MuiChip-outlined');
      });
    });
  });

  describe('Multi-Select Filters', () => {
    it('renders all multi-select filters with correct labels', async () => {
      render(<WeatherAlertsFilters {...defaultProps} />);

      const severitySelect = screen.getByTestId('severity-select');
      const eventSelect = screen.getByTestId('event-type-select');
      const statusSelect = screen.getByTestId('status-select');

      expect(severitySelect).toBeInTheDocument();
      expect(eventSelect).toBeInTheDocument();
      expect(statusSelect).toBeInTheDocument();

      const severityLabels = screen.getAllByText('Severity');
      const eventLabels = screen.getAllByText('Event Type');
      const statusLabels = screen.getAllByText('Status');

      expect(severityLabels[0]).toBeInTheDocument();
      expect(eventLabels[0]).toBeInTheDocument();
      expect(statusLabels[0]).toBeInTheDocument();
    });

    it('displays selected severity filters as chips', () => {
      const propsWithSeverity = {
        ...defaultProps,
        filters: {
          ...defaultProps.filters,
          severity: ['Severe', 'Extreme'] as AlertSeverity[],
        },
      };

      render(<WeatherAlertsFilters {...propsWithSeverity} />);

      expect(screen.getByTestId('chip-severe')).toBeInTheDocument();
      expect(screen.getByTestId('chip-extreme')).toBeInTheDocument();
    });

    it('displays selected event filters as chips', () => {
      const propsWithEvent = {
        ...defaultProps,
        filters: {
          ...defaultProps.filters,
          event: ['Winter Storm Warning'],
        },
      };

      render(<WeatherAlertsFilters {...propsWithEvent} />);

      expect(
        screen.getByTestId('chip-winter-storm-warning')
      ).toBeInTheDocument();
    });

    it('displays selected status filters as chips', () => {
      const propsWithStatus = {
        ...defaultProps,
        filters: {
          ...defaultProps.filters,
          status: ['Actual'],
        },
      };

      render(<WeatherAlertsFilters {...propsWithStatus} />);

      expect(screen.getByTestId('chip-actual')).toBeInTheDocument();
    });

    it('renders severity dropdown and can be interacted with', async () => {
      const user = userEvent.setup();
      render(<WeatherAlertsFilters {...defaultProps} />);

      const severitySelect = screen.getByTestId('severity-select');
      expect(severitySelect).toBeInTheDocument();

      await user.click(severitySelect);
    });
  });

  describe('Clear All Functionality', () => {
    it('shows disabled clear all button when no filters are active', () => {
      render(<WeatherAlertsFilters {...defaultProps} />);

      const clearAllButton = screen.getByTestId('clear-all-button');
      expect(clearAllButton).toBeDisabled();
    });

    it('enables clear all button when filters are active', () => {
      const propsWithFilters = {
        ...defaultProps,
        filters: {
          ...defaultProps.filters,
          searchText: 'storm',
        },
      };

      render(<WeatherAlertsFilters {...propsWithFilters} />);

      const clearAllButton = screen.getByTestId('clear-all-button');
      expect(clearAllButton).not.toBeDisabled();
    });

    it('clears all filters when clear all is clicked', async () => {
      const user = userEvent.setup();
      const propsWithFilters = {
        ...defaultProps,
        filters: {
          severity: ['Severe'] as AlertSeverity[],
          event: ['Winter Storm Warning'],
          status: ['Actual'],
          searchText: 'storm',
        },
        dateRange: {
          startDate: new Date('2024-01-01'),
          endDate: new Date('2024-01-31'),
        },
      };

      render(<WeatherAlertsFilters {...propsWithFilters} />);

      const clearAllButton = screen.getByTestId('clear-all-button');
      await user.click(clearAllButton);

      expect(mockOnFiltersChange).toHaveBeenCalledWith({
        severity: [],
        event: [],
        status: [],
        searchText: '',
      });

      expect(mockOnDateRangeChange).toHaveBeenCalledWith({
        startDate: null,
        endDate: null,
      });
    });
  });

  describe('Filter State Management', () => {
    it('handles removing severity chips', async () => {
      const user = userEvent.setup();
      const propsWithSeverity = {
        ...defaultProps,
        filters: {
          ...defaultProps.filters,
          severity: ['Severe', 'Extreme'] as AlertSeverity[],
        },
      };

      render(<WeatherAlertsFilters {...propsWithSeverity} />);

      const severeChip = screen.getByTestId('chip-severe');
      const deleteButton = severeChip.querySelector('.MuiChip-deleteIcon');

      if (deleteButton) {
        await user.click(deleteButton);

        expect(mockOnFiltersChange).toHaveBeenCalledWith({
          ...defaultProps.filters,
          severity: ['Extreme'],
        });
      }
    });

    it('handles empty available options gracefully', () => {
      const emptyOptionsProps = {
        ...defaultProps,
        availableOptions: {
          severities: [],
          events: [],
          statuses: [],
        },
      };

      render(<WeatherAlertsFilters {...emptyOptionsProps} />);

      expect(screen.getByTestId('multi-select-severity')).toBeInTheDocument();
      expect(screen.getByTestId('multi-select-event-type')).toBeInTheDocument();
      expect(screen.getByTestId('multi-select-status')).toBeInTheDocument();
    });

    it('handles complex filter combinations', () => {
      const complexFilters = {
        ...defaultProps,
        filters: {
          severity: ['Severe', 'Extreme'] as AlertSeverity[],
          event: ['Winter Storm Warning', 'High Wind Warning'],
          status: ['Actual'],
          searchText: 'emergency alert',
        },
      };

      render(<WeatherAlertsFilters {...complexFilters} />);

      expect(screen.getByTestId('chip-severe')).toBeInTheDocument();
      expect(screen.getByTestId('chip-extreme')).toBeInTheDocument();
      expect(
        screen.getByTestId('chip-winter-storm-warning')
      ).toBeInTheDocument();
      expect(screen.getByTestId('chip-high-wind-warning')).toBeInTheDocument();
      expect(screen.getByTestId('chip-actual')).toBeInTheDocument();

      expect(screen.getByDisplayValue('emergency alert')).toBeInTheDocument();
    });
  });
});
