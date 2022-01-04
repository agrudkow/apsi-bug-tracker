import React from 'react';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { Logo } from '../../assets';
import { Copyright, theme } from '../common';
import { Routes } from '../../utils';

interface Props{
  setRole: Function;
}

export const SignIn: React.FC<Props> = ({setRole}) => {
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setRole("Admin");
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    navigate(`../${Routes.Dashboard}`, { replace: true });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#eaeff1' }}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              bgcolor: '#eaeff1',
            }}
          >
            <div>
              <Logo style={{ margin: '-300px' }} />
            </div>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1, bgcolor: '#eaeff1' }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
            <Box component="footer" sx={{ p: 2, bgcolor: '#eaeff1' }}>
              <Copyright />
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};
