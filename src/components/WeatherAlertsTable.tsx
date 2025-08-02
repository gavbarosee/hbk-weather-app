import { AccessTime, LocationOn, Warning } from '@mui/icons-material';
import {
  Box,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from '@mui/material';
import React from 'react';
import type { AlertProperties } from '../types/weather';

interface WeatherAlertsTableProps {
  alerts: AlertProperties[];
  sortBy: 'effective' | 'expires' | 'severity' | 'event';
  sortDirection: 'asc' | 'desc';
  onSort: (field: 'effective' | 'expires' | 'severity' | 'event') => void;
}

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'Extreme':
      return 'error';
    case 'Severe':
      return 'warning';
    case 'Moderate':
      return 'info';
    case 'Minor':
      return 'success';
    default:
      return 'default';
  }
};

const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleString();
};

export const WeatherAlertsTable: React.FC<WeatherAlertsTableProps> = ({
  alerts,
  sortBy,
  sortDirection,
  onSort,
}) => {
  const handleSort = (
    field: 'effective' | 'expires' | 'severity' | 'event'
  ) => {
    onSort(field);
  };

  // Empty state
  if (alerts.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8, bgcolor: 'background.paper' }}>
        <Warning sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No alerts found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Try adjusting your filters to see more results.
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer
      component={Paper}
      sx={{
        width: '100%',
        maxHeight: {
          xs: 'calc(100vh - 250px)',
          sm: 'calc(100vh - 200px)',
          md: 600,
        },
        overflow: 'auto',
        '& .MuiTable-root': {
          minWidth: { xs: 650, sm: 750 },
        },
      }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                minWidth: { xs: 140, sm: 160 },
                width: { xs: '25%', sm: 'auto' },
              }}
            >
              <TableSortLabel
                active={sortBy === 'event'}
                direction={sortBy === 'event' ? sortDirection : 'asc'}
                onClick={() => handleSort('event')}
              >
                Event Type
              </TableSortLabel>
            </TableCell>
            <TableCell
              sx={{
                minWidth: { xs: 80, sm: 100 },
                width: { xs: '15%', sm: 'auto' },
              }}
            >
              <TableSortLabel
                active={sortBy === 'severity'}
                direction={sortBy === 'severity' ? sortDirection : 'asc'}
                onClick={() => handleSort('severity')}
              >
                Severity
              </TableSortLabel>
            </TableCell>
            <TableCell
              sx={{ display: { xs: 'none', md: 'table-cell' }, minWidth: 200 }}
            >
              Headline
            </TableCell>
            <TableCell
              sx={{
                minWidth: { xs: 100, sm: 120 },
                width: { xs: '20%', sm: 'auto' },
              }}
            >
              <TableSortLabel
                active={sortBy === 'effective'}
                direction={sortBy === 'effective' ? sortDirection : 'asc'}
                onClick={() => handleSort('effective')}
              >
                Area
              </TableSortLabel>
            </TableCell>
            <TableCell
              sx={{
                minWidth: { xs: 100, sm: 120 },
                width: { xs: '20%', sm: 'auto' },
              }}
            >
              <TableSortLabel
                active={sortBy === 'effective'}
                direction={sortBy === 'effective' ? sortDirection : 'asc'}
                onClick={() => handleSort('effective')}
              >
                Effective
              </TableSortLabel>
            </TableCell>
            <TableCell
              sx={{
                minWidth: { xs: 100, sm: 120 },
                width: { xs: '20%', sm: 'auto' },
              }}
            >
              <TableSortLabel
                active={sortBy === 'expires'}
                direction={sortBy === 'expires' ? sortDirection : 'asc'}
                onClick={() => handleSort('expires')}
              >
                Expires
              </TableSortLabel>
            </TableCell>
            <TableCell
              sx={{ display: { xs: 'none', sm: 'table-cell' }, minWidth: 100 }}
            >
              Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {alerts.map(alert => (
            <TableRow
              key={alert.id}
              hover
              sx={{
                cursor: 'pointer',
                '&:hover': { backgroundColor: 'action.hover' },
              }}
            >
              {/* Event Type */}
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Warning
                    color={
                      getSeverityColor(alert.severity) === 'error'
                        ? 'error'
                        : 'warning'
                    }
                    sx={{ fontSize: 18 }}
                  />
                  <Box>
                    <Typography variant="body2" fontWeight="medium" noWrap>
                      {alert.event}
                    </Typography>
                    {/* Show headline better on mobile layouts */}
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        display: { xs: 'block', md: 'none' },
                        mt: 0.3,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        maxWidth: { xs: 120, sm: 140 },
                        fontSize: '0.7rem',
                      }}
                    >
                      {alert.headline || 'No headline'}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>

              {/* Severity */}
              <TableCell>
                <Chip
                  label={alert.severity}
                  color={
                    getSeverityColor(alert.severity) as
                      | 'error'
                      | 'warning'
                      | 'info'
                      | 'success'
                      | 'default'
                  }
                  size="small"
                  sx={{ fontWeight: 600 }}
                />
              </TableCell>

              <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                <Typography
                  variant="body2"
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: 250,
                  }}
                >
                  {alert.headline || 'No headline'}
                </Typography>
              </TableCell>

              {/* Area */}
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOn color="action" sx={{ fontSize: 16 }} />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      maxWidth: { xs: 90, sm: 120 },
                      fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    }}
                  >
                    {alert.areaDesc}
                  </Typography>
                </Box>
              </TableCell>

              {/* Effective Date */}
              <TableCell>
                <Typography
                  variant="body2"
                  sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                >
                  {formatDateTime(alert.effective)}
                </Typography>
              </TableCell>

              {/* Expires Date */}
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AccessTime color="action" sx={{ fontSize: 16 }} />
                  <Typography
                    variant="body2"
                    sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                  >
                    {formatDateTime(alert.expires)}
                  </Typography>
                </Box>
              </TableCell>

              {/* Status */}
              <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                <Chip
                  label={alert.status}
                  variant="outlined"
                  size="small"
                  sx={{ fontWeight: 600 }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
