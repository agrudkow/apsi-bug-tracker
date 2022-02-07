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
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';


interface Props{
  setRole: Function;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const SignIn: React.FC<Props> = ({setRole}) => {
  const navigate = useNavigate();
  
  const [openPopUp, setOpenPopUp] = React.useState(false);

  React.useEffect(() => {
    if (localStorage.getItem('isLoggedOut')==='true')
    {
      setOpenPopUp(true);
      localStorage.setItem('isLoggedOut', 'false');
    }
  }, []);

  const handleClosePopUp = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenPopUp(false);
  };


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setRole("User");
    event.preventDefault();
    
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    if (email !== null){
      localStorage.setItem('username', email.toString().split("@")[0]);
    }

    navigate(`../${Routes.Dashboard}/${localStorage.getItem('username')}`, { replace: true });
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
      <Snackbar open={openPopUp} anchorOrigin={{vertical: 'bottom', horizontal: 'center' }} autoHideDuration={3000} onClose={handleClosePopUp}>
        <Alert onClose={handleClosePopUp} severity="success" sx={{ width: '100%' }}>
          You have been logged out
        </Alert>
      </Snackbar>

    </ThemeProvider>
  );
};
