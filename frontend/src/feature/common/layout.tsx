import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Routes as RouterRoutes,
  Route,
  useParams,
  useLocation,
} from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { theme, Copyright, Navigator, Header } from '../common';
import { Routes } from '../../utils';

const drawerWidth = 256;

export const Layout: React.FC = ({ children }) => {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [headerDescription, setHeaderDescription] = useState<string>('');
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    if (pathname.includes(`${Routes.Dashboard}`)) {
      setHeaderDescription('Problems Dashboard');
    } else if (pathname === `/${Routes.Form}`) {
      setHeaderDescription('New problem form');
    } else if (pathname.includes(`${Routes.ProblemEditForm}`)) {
      setHeaderDescription('Problem form');
    }
  }, [pathname]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <CssBaseline />
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          {isSmUp ? null : (
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
            />
          )}
          <Navigator
            PaperProps={{ style: { width: drawerWidth } }}
            sx={{ display: { sm: 'block', xs: 'none' } }}
          />
        </Box>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Header
            onDrawerToggle={handleDrawerToggle}
            headerDescription={headerDescription}
          />
          <Box
            component="main"
            sx={{ flex: 1, py: 6, px: 4, bgcolor: '#eaeff1' }}
          >
            {children}
          </Box>
          <Box component="footer" sx={{ p: 2, bgcolor: '#eaeff1' }}>
            <Copyright />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
