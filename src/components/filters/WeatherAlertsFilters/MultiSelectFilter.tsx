import { Clear } from '@mui/icons-material';
import type { SelectChangeEvent } from '@mui/material';
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import React from 'react';

interface MultiSelectFilterProps {
  label: string;
  labelId: string;
  value: string[];
  options: string[];
  onChange: (values: string[]) => void;
  onRemove: (valueToRemove: string) => void;
}

const MENU_PROPS = {
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
};

export const MultiSelectFilter: React.FC<MultiSelectFilterProps> = ({
  label,
  labelId,
  value,
  options,
  onChange,
  onRemove,
}) => {
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const eventValue = event.target.value;
    const newValues =
      typeof eventValue === 'string' ? eventValue.split(',') : eventValue;
    onChange(newValues);
  };

  const handleChipDelete = (valueToRemove: string) => {
    return (event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      onRemove(valueToRemove);
    };
  };

  const renderValue = (selected: string[]) => (
    <Box
      sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}
      onClick={e => e.stopPropagation()}
    >
      {selected.map(val => (
        <Chip
          key={val}
          label={val}
          size="small"
          onDelete={handleChipDelete(val)}
          onMouseDown={handleChipDelete(val)}
          deleteIcon={<Clear />}
        />
      ))}
    </Box>
  );

  return (
    <FormControl size="small" fullWidth>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        label={label}
        multiple
        value={value}
        onChange={handleChange}
        MenuProps={MENU_PROPS}
        renderValue={renderValue}
      >
        {options.map(option => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
