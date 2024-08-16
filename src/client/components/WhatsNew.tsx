import React from 'react';
import { Box, Typography } from '@mui/material';

const WhatsNew: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'inline-block',
        p: 3,
        height: '100vh',
        width: '100%',
        textAlign: 'center',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Typography variant="h1" sx={{ fontWeight: 'bold' }}>
        What's New
      </Typography>
    </Box>
  );
};

export default WhatsNew;
