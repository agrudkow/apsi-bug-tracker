import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Content from './dashboardContent';
import { theme, Copyright, Navigator, Header } from '../common';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Routes } from '../../utils';
import NewFormContent from './newFormContent';
import ProblemDetailsContent from './problemDetailsContent';
import ProblemForm from './problemFormContent';

const drawerWidth = 256;

interface Props{
  role: string;
}

export const Dashboard: React.FC<Props> = ({role}) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [headerDescription, setHeaderDescription] = React.useState<string>('');
  let { id } = useParams();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  useEffect(() => {
    if (id === Routes.Dashboard){
      setHeaderDescription('Problems Dashboard');
    }
    else if (id === Routes.Form){
      setHeaderDescription('New problem form')
    }
    else if (id === Routes.ProblemDetails){
      setHeaderDescription('Problem details')
    }
    else if (id === Routes.ProblemEditForm){
      setHeaderDescription('Problem form')
    }
  }, [id]);

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
          <Header onDrawerToggle={handleDrawerToggle} headerDescription={headerDescription}/>
          <Box
            component="main"
            sx={{ flex: 1, py: 6, px: 4, bgcolor: '#eaeff1' }}
          >
         {id===Routes.Dashboard && <Content />}
         {id===Routes.Form && <NewFormContent />}
         {id===Routes.ProblemDetails && <ProblemDetailsContent role={role}/>}
         {id===Routes.ProblemEditForm && <ProblemForm/>}
         
          </Box>
          <Box component="footer" sx={{ p: 2, bgcolor: '#eaeff1' }}>
            <Copyright />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
