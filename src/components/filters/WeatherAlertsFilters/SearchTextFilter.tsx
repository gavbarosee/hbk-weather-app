import { Clear } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface SearchTextFilterProps {
  searchText: string;
  onSearchTextChange: (value: string) => void;
}

export const SearchTextFilter: React.FC<SearchTextFilterProps> = ({
  searchText,
  onSearchTextChange,
}) => {
  const [localSearchText, setLocalSearchText] = useState(searchText || '');

  // debounce search updates
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearchTextChange(localSearchText);
    }, 300); // 300ms

    return () => clearTimeout(timeoutId);
  }, [localSearchText, onSearchTextChange]);

  useEffect(() => {
    setLocalSearchText(searchText || '');
  }, [searchText]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchText(event.target.value);
  };

  const handleClear = () => {
    setLocalSearchText('');
  };

  return (
    <TextField
      data-testid="search-text-filter"
      label="Search alerts"
      value={localSearchText}
      onChange={handleChange}
      placeholder="Search headlines, descriptions, areas..."
      size="small"
      fullWidth
      sx={{ width: '100%' }}
      InputProps={{
        endAdornment: localSearchText ? (
          <InputAdornment position="end">
            <IconButton
              aria-label="clear search"
              onClick={handleClear}
              edge="end"
              size="small"
              data-testid="clear-search-button"
            >
              <Clear />
            </IconButton>
          </InputAdornment>
        ) : null,
      }}
    />
  );
};
