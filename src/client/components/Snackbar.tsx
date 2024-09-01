import React from 'react';
import { Snackbar as MuiSnackbar, Alert } from '@mui/material';

interface SnackbarProps {
  open: boolean;
  onClose: () => void;
  message: string;
}

const Snackbar: React.FC<SnackbarProps> = ({ open, onClose, message }) => {
  return (
    <MuiSnackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      sx={{
        '.MuiSnackbarContent-root': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 'auto',
          maxWidth: '100%',
          padding: 2,
          margin: '0 auto',
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        },
      }}
    >
      <Alert onClose={onClose} severity="success" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </MuiSnackbar>
  );
};

export default Snackbar;
