import { Box } from '@mui/material';
import { WeatherAlertsFilters } from './components';
import { AlertDetail } from './components/tables/WeatherAlertsTable/components';
import {
  ErrorState,
  HeaderBar,
  LoadingState,
  ResultsSection,
} from './components/ui';
import {
  useAlertFilters,
  useAlertSelection,
  useDateRange,
  useWeatherAlerts,
} from './hooks';

function App() {
  // date range management
  const { dateRange, setDateRange } = useDateRange();

  // data fetching with reactquery
  const { data: alerts = [], isLoading, error } = useWeatherAlerts(dateRange);

  // filtering and sorting
  const {
    filters,
    setFilters,
    sortBy,
    sortDirection,
    filteredAlerts,
    filterOptions,
    handleSort,
    totalAlerts,
    filteredCount,
  } = useAlertFilters(alerts);

  // alert selection for detail dialog
  const { selectedAlert, handleAlertClick, handleCloseAlert } =
    useAlertSelection();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <HeaderBar title="Weather Alerts Dashboard" />

      {/* MAIN CONTENT */}
      <Box
        sx={{
          pt: { xs: 1, sm: 2, md: 3, lg: 4 },
          pb: { xs: 3, sm: 4, md: 6, lg: 10 },
          px: { xs: 2, sm: 4, md: 6, lg: 8, xl: 12 },
          maxWidth: '1400px',
          mx: 'auto',
        }}
      >
        {/* FILTERS SECTION */}
        <Box sx={{ mb: 3 }}>
          <WeatherAlertsFilters
            filters={filters}
            onFiltersChange={setFilters}
            availableOptions={filterOptions}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
          />
        </Box>

        {/* LOADING STATE */}
        <LoadingState isLoading={isLoading} />

        {/* ERROR STATE */}
        <ErrorState error={error} />

        {/* RESULTS SECTION */}
        {!isLoading && !error && (
          <ResultsSection
            alerts={filteredAlerts}
            sortBy={sortBy}
            sortDirection={sortDirection}
            onSort={handleSort}
            onAlertClick={handleAlertClick}
            filteredCount={filteredCount}
            totalAlerts={totalAlerts}
          />
        )}
      </Box>

      {/* ALERT DETAIL DIALOG */}
      <AlertDetail alert={selectedAlert} onClose={handleCloseAlert} />
    </Box>
  );
}

export default App;
