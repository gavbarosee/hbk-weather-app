import { Clear } from '@mui/icons-material';
import { Box, IconButton, InputAdornment } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React from 'react';

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

  return (
    <Box
      data-testid="date-range-filter"
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 2,
        flexWrap: 'wrap',
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
                minWidth: { xs: '100%', sm: 160 },
                maxWidth: { xs: '100%', sm: 200 },
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
                minWidth: { xs: '100%', sm: 160 },
                maxWidth: { xs: '100%', sm: 200 },
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
      </LocalizationProvider>
    </Box>
  );
};
