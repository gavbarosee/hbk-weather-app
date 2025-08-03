import { Clear } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import React from 'react';

interface SearchTextFilterProps {
  searchText: string;
  onSearchTextChange: (value: string) => void;
}

export const SearchTextFilter: React.FC<SearchTextFilterProps> = ({
  searchText,
  onSearchTextChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchTextChange(event.target.value);
  };

  const handleClear = () => {
    onSearchTextChange('');
  };

  return (
    <TextField
      data-testid="search-text-filter"
      label="Search alerts"
      value={searchText || ''}
      onChange={handleChange}
      placeholder="Search headlines, descriptions, areas..."
      size="small"
      fullWidth
      sx={{ width: '100%' }}
      InputProps={{
        endAdornment: searchText ? (
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
