import { Box } from '@mui/material';
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
  return (
    <Box
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
            },
          }}
        />
      </LocalizationProvider>
    </Box>
  );
};
