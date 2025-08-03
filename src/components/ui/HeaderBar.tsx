import { AppBar, Toolbar, Typography } from '@mui/material';
import React from 'react';

interface HeaderBarProps {
  title: string;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({ title }) => {
  return (
    <AppBar position="static" elevation={1}>
      <Toolbar
        sx={{
          px: { xs: 2, sm: 4, md: 6, lg: 8, xl: 12 },
          maxWidth: '1400px',
          mx: 'auto',
          width: '100%',
        }}
      >
        <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
