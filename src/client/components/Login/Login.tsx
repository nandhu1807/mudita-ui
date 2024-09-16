import React from 'react';
import { TextField, Button, Typography, Container, Grid, Paper } from '@mui/material';
import '../../styles/login.css';

interface LoginProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  email: string;
  password: string;
  error: string;
}

const Login: React.FC<LoginProps> = ({ onSubmit, onEmailChange, onPasswordChange, email, password, error }) => {
  return (
    <Container className={'login-container'} component="main" maxWidth={false}>
      <Grid container direction="column" alignItems="center" justifyContent="center" style={{ minHeight: '100vh' }}>
        <Grid item style={{ width: '30%' }}>
          <Paper elevation={3} style={{ padding: 20, width: '100%' }}>
            <Typography variant="h4" align="center" gutterBottom style={{ fontWeight: 'bold' }} mb={2}>
              Welcome to Mudita
            </Typography>
            <form onSubmit={onSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} mb={1}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Username"
                    name="email"
                    autoComplete="off"
                    value={email}
                    onChange={onEmailChange}
                    placeholder="Enter your Username"
                    aria-label="Username"
                  />
                </Grid>
                <Grid item xs={12} mb={1}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={onPasswordChange}
                    placeholder="Enter your password"
                    aria-label="Password"
                  />
                </Grid>
                {error && (
                  <Grid item xs={12}>
                    <Typography color="error" align="center">
                      {error}
                    </Typography>
                  </Grid>
                )}
                <Grid item xs={12} mb={1}>
                  <Button type="submit" fullWidth variant="contained" color="primary">
                    Login
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
