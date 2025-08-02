import { useState } from 'react';
import type { DateRange } from '../types/filters';

export function useDateRange() {
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });

  const updateDateRange = (newRange: {
    startDate: Date | null;
    endDate: Date | null;
  }) => {
    setDateRange(newRange);
  };

  const clearDateRange = () => {
    setDateRange({
      startDate: null,
      endDate: null,
    });
  };

  const hasDateRange = !!(dateRange.startDate && dateRange.endDate);

  return {
    dateRange,
    setDateRange: updateDateRange,
    clearDateRange,
    hasDateRange,
  };
}
