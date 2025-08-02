import { Typography } from '@mui/material';
import React from 'react';

interface HeadlineCellProps {
  headline?: string | null;
}

export const HeadlineCell: React.FC<HeadlineCellProps> = ({ headline }) => {
  return (
    <Typography
      variant="body2"
      sx={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        maxWidth: 250,
      }}
    >
      {headline || 'No headline'}
    </Typography>
  );
};
