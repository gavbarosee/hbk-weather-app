import { Clear } from '@mui/icons-material';
import {
  Box,
  Chip,
  IconButton,
  InputAdornment,
  Typography,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React from 'react';
import { DATE_RANGE_PRESETS } from '../../../constants/app';

interface DateRangeFilterProps {
  dateRange: {
    startDate: Date | null;
    endDate: Date | null;
  };
  onDateRangeChange: (range: {
    startDate: Date | null;
    endDate: Date | null;
  }) => void;
}

export const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
  dateRange,
  onDateRangeChange,
}) => {
  const handleClearStartDate = () => {
    onDateRangeChange({ ...dateRange, startDate: null });
  };

  const handleClearEndDate = () => {
    onDateRangeChange({ ...dateRange, endDate: null });
  };

  const handlePresetRange = (startDate: Date, endDate: Date) => {
    onDateRangeChange({ startDate, endDate });
  };

  const getPresetRanges = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    return [
      {
        label: 'Today',
        startDate: today,
        endDate: new Date(
          today.getTime() + DATE_RANGE_PRESETS.MILLISECONDS_PER_DAY - 1
        ), // end of today
      },
      {
        label: 'Past Week',
        startDate: new Date(
          today.getTime() -
            DATE_RANGE_PRESETS.DAYS_IN_WEEK *
              DATE_RANGE_PRESETS.MILLISECONDS_PER_DAY
        ),
        endDate: now,
      },
      {
        label: 'Past Month',
        startDate: new Date(
          today.getTime() -
            DATE_RANGE_PRESETS.DAYS_IN_MONTH *
              DATE_RANGE_PRESETS.MILLISECONDS_PER_DAY
        ),
        endDate: now,
      },
      {
        label: 'Past Quarter',
        startDate: new Date(
          today.getTime() -
            DATE_RANGE_PRESETS.DAYS_IN_QUARTER *
              DATE_RANGE_PRESETS.MILLISECONDS_PER_DAY
        ),
        endDate: now,
      },
      {
        label: 'Past Year',
        startDate: new Date(
          today.getTime() -
            DATE_RANGE_PRESETS.DAYS_IN_YEAR *
              DATE_RANGE_PRESETS.MILLISECONDS_PER_DAY
        ),
        endDate: now,
      },
    ];
  };

  const handleClearAll = () => {
    onDateRangeChange({ startDate: null, endDate: null });
  };

  // helper function to check if current date range matches a preset
  const isPresetActive = (presetStartDate: Date, presetEndDate: Date) => {
    if (!dateRange.startDate || !dateRange.endDate) return false;

    // allow for small time differences (within 1 minute) to account for timing variations
    const timeTolerance = 60 * 1000; // 1 minute in milliseconds

    const startDiff = Math.abs(
      dateRange.startDate.getTime() - presetStartDate.getTime()
    );
    const endDiff = Math.abs(
      dateRange.endDate.getTime() - presetEndDate.getTime()
    );

    return startDiff <= timeTolerance && endDiff <= timeTolerance;
  };

  return (
    <Box
      data-testid="date-range-filter"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Start Date"
          value={dateRange.startDate}
          onChange={newValue =>
            onDateRangeChange({ ...dateRange, startDate: newValue })
          }
          slotProps={{
            textField: {
              size: 'small',
              sx: {
                width: '100%',
              },
              InputProps: {
                endAdornment: dateRange.startDate ? (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="clear start date"
                      onClick={handleClearStartDate}
                      edge="end"
                      size="small"
                      data-testid="clear-start-date-button"
                    >
                      <Clear />
                    </IconButton>
                  </InputAdornment>
                ) : null,
              },
            },
          }}
        />
        <DatePicker
          label="End Date"
          value={dateRange.endDate}
          onChange={newValue =>
            onDateRangeChange({ ...dateRange, endDate: newValue })
          }
          slotProps={{
            textField: {
              size: 'small',
              sx: {
                width: '100%',
              },
              InputProps: {
                endAdornment: dateRange.endDate ? (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="clear end date"
                      onClick={handleClearEndDate}
                      edge="end"
                      size="small"
                      data-testid="clear-end-date-button"
                    >
                      <Clear />
                    </IconButton>
                  </InputAdornment>
                ) : null,
              },
            },
          }}
        />

        {/* DATE RANGE PRESETS */}
        <Box sx={{ mt: 2 }}>
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              mb: 1,
              display: 'block',
              fontWeight: 500,
            }}
          >
            Quick Date Range Select:
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
              alignItems: 'center',
            }}
          >
            {getPresetRanges().map(preset => {
              const isActive = isPresetActive(preset.startDate, preset.endDate);
              return (
                <Chip
                  key={preset.label}
                  label={preset.label}
                  variant={isActive ? 'filled' : 'outlined'}
                  size="small"
                  clickable
                  onClick={() =>
                    handlePresetRange(preset.startDate, preset.endDate)
                  }
                  sx={{
                    borderColor: 'primary.main',
                    color: isActive ? 'primary.contrastText' : 'primary.main',
                    backgroundColor: isActive ? 'primary.main' : 'transparent',
                    '&:hover': {
                      backgroundColor: 'primary.light',
                      color: 'primary.main',
                      borderColor: 'primary.main',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                  data-testid={`preset-${preset.label.toLowerCase().replace(/\s+/g, '-')}`}
                />
              );
            })}
            <Chip
              label="Clear Dates"
              variant="outlined"
              size="small"
              clickable
              onClick={handleClearAll}
              sx={{
                borderColor: 'error.main',
                color: 'error.main',
                '&:hover': {
                  backgroundColor: 'error.light',
                  color: 'error.main',
                  borderColor: 'error.main',
                },
                transition: 'all 0.2s ease-in-out',
              }}
              data-testid="preset-clear-all"
            />
          </Box>
        </Box>
      </LocalizationProvider>
    </Box>
  );
};
