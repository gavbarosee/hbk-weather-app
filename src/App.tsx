import {
  Alert,
  AppBar,
  Box,
  CircularProgress,
  CssBaseline,
  Toolbar,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { AlertFilters } from './components/AlertFilters';
import { WeatherAlertsTable } from './components/WeatherAlertsTable';
import { weatherService } from './services/weatherService';
import type { AlertProperties } from './types/weather';
import type { AlertFilters as AlertFiltersType } from './utils/alertFilters';
import {
  applyAlertFilters,
  getFilterOptions,
  sortAlerts,
} from './utils/alertFilters';

function App() {
  const [alerts, setAlerts] = useState<AlertProperties[]>([]);
  const [filteredAlerts, setFilteredAlerts] = useState<AlertProperties[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter and sort state
  const [filters, setFilters] = useState<AlertFiltersType>({});
  const [sortBy, setSortBy] = useState<
    'effective' | 'expires' | 'severity' | 'event'
  >('effective');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [dateRange, setDateRange] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    const loadAlerts = async () => {
      try {
        setLoading(true);
        setError(null);

        let alertsData: AlertProperties[];

        // if date range is specified, we use it, otherwise we get active alerts
        if (dateRange.startDate && dateRange.endDate) {
          alertsData = await weatherService.getAlertsByDateRange(
            dateRange.startDate,
            dateRange.endDate
          );
        } else {
          alertsData = await weatherService.getActiveAlerts();
        }

        setAlerts(alertsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load alerts');
        console.error('Error loading alerts:', err);
      } finally {
        setLoading(false);
      }
    };

    loadAlerts();
  }, [dateRange]);

  // Apply filters and sorting whenever alerts or filters change
  useEffect(() => {
    let result = applyAlertFilters(alerts, filters);
    result = sortAlerts(result, sortBy, sortDirection);
    setFilteredAlerts(result);
  }, [alerts, filters, sortBy, sortDirection]);

  const handleSort = (
    field: 'effective' | 'expires' | 'severity' | 'event'
  ) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('desc');
    }
  };

  const filterOptions = getFilterOptions(alerts);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <CssBaseline />

      {/* Header */}
      <AppBar position="static" elevation={1}>
        <Toolbar>
          <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
            Weather Alerts Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        sx={{
          width: '100%',
          py: { xs: 1, sm: 2, md: 3 },
          px: { xs: 1, sm: 2, md: 3 },
          maxWidth: { xs: '100vw', sm: '100%' },
        }}
      >
        {/* Filters Section */}
        <Box sx={{ mb: 3 }}>
          <AlertFilters
            filters={filters}
            onFiltersChange={setFilters}
            availableOptions={filterOptions}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
          />
        </Box>

        {/* Loading State */}
        {loading && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: 300,
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <CircularProgress />
            <Typography variant="body2" color="textSecondary">
              Loading weather alerts...
            </Typography>
          </Box>
        )}

        {/* Error State */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Results */}
        {!loading && !error && (
          <Box sx={{ width: '100%' }}>
            {/* Results Header */}
            <Box
              sx={{
                p: { xs: 1.5, sm: 2, md: 3 },
                borderBottom: 1,
                borderColor: 'divider',
                bgcolor: 'background.paper',
                borderRadius: '4px 4px 0 0',
                width: '100%',
              }}
            >
              <Typography variant="h6" component="h2">
                Weather Alerts ({filteredAlerts.length})
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ mt: 0.5 }}
              >
                Showing {filteredAlerts.length} of {alerts.length} total alerts
              </Typography>
            </Box>

            {/* Table */}
            <WeatherAlertsTable
              alerts={filteredAlerts}
              sortBy={sortBy}
              sortDirection={sortDirection}
              onSort={handleSort}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default App;
