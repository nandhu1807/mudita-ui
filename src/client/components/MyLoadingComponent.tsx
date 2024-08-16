import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

interface MyLoadingComponentProps {
  isLoading: boolean;
  error?: string;
}

const MyLoadingComponent: React.FC<MyLoadingComponentProps> = ({ isLoading, error }) => {
  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Typography variant="h6" color="error">
          Sorry, there was a problem loading the page: {error}
        </Typography>
      </Box>
    );
  }

  return null;
};

export default MyLoadingComponent;
