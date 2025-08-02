import { Clear } from '@mui/icons-material';
import type { SelectChangeEvent } from '@mui/material';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React from 'react';
import type { AlertSeverity } from '../types/weather';
import type { AlertFilters as AlertFiltersType } from '../utils/alertFilters';

interface AlertFiltersProps {
  filters: AlertFiltersType;
  onFiltersChange: (filters: AlertFiltersType) => void;
  availableOptions: {
    severities: string[];
    events: string[];
    statuses: string[];
  };
  dateRange: {
    startDate: Date | null;
    endDate: Date | null;
  };
  onDateRangeChange: (range: {
    startDate: Date | null;
    endDate: Date | null;
  }) => void;
}

export const AlertFilters: React.FC<AlertFiltersProps> = ({
  filters,
  onFiltersChange,
  availableOptions,
  dateRange,
  onDateRangeChange,
}) => {
  const handleSeverityChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    onFiltersChange({
      ...filters,
      severity:
        typeof value === 'string'
          ? (value.split(',') as AlertSeverity[])
          : (value as AlertSeverity[]),
    });
  };

  const handleEventChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    onFiltersChange({
      ...filters,
      event: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const handleStatusChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    onFiltersChange({
      ...filters,
      status: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const removeSeverity = (severityToRemove: string) => {
    onFiltersChange({
      ...filters,
      severity: (filters.severity || []).filter(s => s !== severityToRemove),
    });
  };

  const removeEvent = (eventToRemove: string) => {
    onFiltersChange({
      ...filters,
      event: (filters.event || []).filter(e => e !== eventToRemove),
    });
  };

  const removeStatus = (statusToRemove: string) => {
    onFiltersChange({
      ...filters,
      status: (filters.status || []).filter(s => s !== statusToRemove),
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      severity: [],
      event: [],
      status: [],
      searchText: '',
    });
  };

  const handleSearchTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onFiltersChange({
      ...filters,
      searchText: event.target.value,
    });
  };

  return (
    <Card elevation={2} sx={{ width: '100%' }}>
      <CardContent sx={{ p: { xs: 1.5, sm: 2, md: 3 } }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant="h6">Filter & Search Alerts</Typography>
          <Button
            startIcon={<Clear />}
            variant="outlined"
            size="small"
            onClick={clearAllFilters}
            disabled={
              !filters.searchText &&
              (!filters.severity || filters.severity.length === 0) &&
              (!filters.event || filters.event.length === 0) &&
              (!filters.status || filters.status.length === 0)
            }
          >
            Clear All
          </Button>
        </Box>

        {/* Date Range Section */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Date Range
          </Typography>
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
        </Box>

        {/* Search Section */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Text Search
          </Typography>
          <TextField
            label="Search alerts"
            value={filters.searchText || ''}
            onChange={handleSearchTextChange}
            placeholder="Search headlines, descriptions, areas..."
            size="small"
            fullWidth
            sx={{ maxWidth: { xs: '100%', sm: 400 } }}
          />
        </Box>

        {/* Filter Section */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Filter Options
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: '1fr 1fr',
                md: '1fr 1fr 1fr',
              },
              gap: { xs: 1.5, sm: 2 },
              width: '100%',
            }}
          >
            {/* Severity Filter */}
            <FormControl size="small" fullWidth>
              <InputLabel id="severity-label">Severity</InputLabel>
              <Select
                labelId="severity-label"
                label="Severity"
                multiple
                value={filters.severity || []}
                onChange={handleSeverityChange}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: 300,
                      overflow: 'auto !important',
                      scrollbarWidth: 'thin',
                      scrollbarColor: '#c1c1c1 #f1f1f1',
                      '&::-webkit-scrollbar': {
                        width: '12px !important',
                        backgroundColor: '#f1f1f1',
                        display: 'block !important',
                      },
                      '&::-webkit-scrollbar-track': {
                        backgroundColor: '#f1f1f1 !important',
                        borderRadius: '6px',
                      },
                      '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#c1c1c1 !important',
                        borderRadius: '6px',
                        border: '2px solid #f1f1f1',
                        '&:hover': {
                          backgroundColor: '#a1a1a1 !important',
                        },
                      },
                    },
                  },
                  autoFocus: false,
                  disableScrollLock: true,
                }}
                renderValue={selected => (
                  <Box
                    sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}
                    onClick={e => e.stopPropagation()}
                  >
                    {selected.map(value => (
                      <Chip
                        key={value}
                        label={value}
                        size="small"
                        onDelete={event => {
                          event.preventDefault();
                          event.stopPropagation();
                          removeSeverity(value);
                        }}
                        onMouseDown={event => {
                          event.preventDefault();
                          event.stopPropagation();
                          removeSeverity(value);
                        }}
                        deleteIcon={<Clear />}
                      />
                    ))}
                  </Box>
                )}
              >
                {availableOptions.severities.map(severity => (
                  <MenuItem key={severity} value={severity}>
                    {severity}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Event Filter */}
            <FormControl size="small" fullWidth>
              <InputLabel id="event-label">Event Type</InputLabel>
              <Select
                labelId="event-label"
                label="Event Type"
                multiple
                value={filters.event || []}
                onChange={handleEventChange}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: 300,
                      overflow: 'auto !important',
                      scrollbarWidth: 'thin',
                      scrollbarColor: '#c1c1c1 #f1f1f1',
                      '&::-webkit-scrollbar': {
                        width: '12px !important',
                        backgroundColor: '#f1f1f1',
                        display: 'block !important',
                      },
                      '&::-webkit-scrollbar-track': {
                        backgroundColor: '#f1f1f1 !important',
                        borderRadius: '6px',
                      },
                      '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#c1c1c1 !important',
                        borderRadius: '6px',
                        border: '2px solid #f1f1f1',
                        '&:hover': {
                          backgroundColor: '#a1a1a1 !important',
                        },
                      },
                    },
                  },
                  autoFocus: false,
                  disableScrollLock: true,
                }}
                renderValue={selected => (
                  <Box
                    sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}
                    onClick={e => e.stopPropagation()}
                  >
                    {selected.map(value => (
                      <Chip
                        key={value}
                        label={value}
                        size="small"
                        onDelete={event => {
                          event.preventDefault();
                          event.stopPropagation();
                          removeEvent(value);
                        }}
                        onMouseDown={event => {
                          event.preventDefault();
                          event.stopPropagation();
                          removeEvent(value);
                        }}
                        deleteIcon={<Clear />}
                      />
                    ))}
                  </Box>
                )}
              >
                {availableOptions.events.map(event => (
                  <MenuItem key={event} value={event}>
                    {event}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Status Filter */}
            <FormControl size="small" fullWidth>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                label="Status"
                multiple
                value={filters.status || []}
                onChange={handleStatusChange}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: 300,
                      overflow: 'auto !important',
                      scrollbarWidth: 'thin',
                      scrollbarColor: '#c1c1c1 #f1f1f1',
                      '&::-webkit-scrollbar': {
                        width: '12px !important',
                        backgroundColor: '#f1f1f1',
                        display: 'block !important',
                      },
                      '&::-webkit-scrollbar-track': {
                        backgroundColor: '#f1f1f1 !important',
                        borderRadius: '6px',
                      },
                      '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#c1c1c1 !important',
                        borderRadius: '6px',
                        border: '2px solid #f1f1f1',
                        '&:hover': {
                          backgroundColor: '#a1a1a1 !important',
                        },
                      },
                    },
                  },
                  autoFocus: false,
                  disableScrollLock: true,
                }}
                renderValue={selected => (
                  <Box
                    sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}
                    onClick={e => e.stopPropagation()}
                  >
                    {selected.map(value => (
                      <Chip
                        key={value}
                        label={value}
                        size="small"
                        onDelete={event => {
                          event.preventDefault();
                          event.stopPropagation();
                          removeStatus(value);
                        }}
                        onMouseDown={event => {
                          event.preventDefault();
                          event.stopPropagation();
                          removeStatus(value);
                        }}
                        deleteIcon={<Clear />}
                      />
                    ))}
                  </Box>
                )}
              >
                {availableOptions.statuses.map(status => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
