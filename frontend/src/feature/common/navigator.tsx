import * as React from 'react';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import { Logo_white } from '../../assets';
import { Routes } from '../../utils';
import { useNavigate } from 'react-router';


const item = {
  py: '2px',
  px: 3,
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
};

const buttonView = {
  px: 3,
};

export function Navigator(props: DrawerProps) {
  const { ...other } = props;
  const navigate = useNavigate();
  
  const formHandler = () =>{
    navigate(`../${Routes.Form}`, { replace: true });
  }
  const dashboardHandler = () =>{
    navigate(`../${Routes.Dashboard}`, { replace: true });
  }

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem
          sx={{ ...item, ...itemCategory, fontSize: 45, color: '#fff', p: 0,  }}
        >
          <Logo_white/>
        </ListItem>
        <ListItem sx={{ ...item, ...itemCategory, cursor: 'pointer' }} onClick={dashboardHandler}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText>Problems Dashboard</ListItemText>
        </ListItem>
        <ListItem>
          <Button
            variant="contained"
            size="large"
            sx={{ ...buttonView, fontSize: 20, margin: 0.5, padding: 1.5 }}
            onClick = {formHandler}
          >
            Report new problem
          </Button>
        </ListItem>
      </List>
    </Drawer>
  );
}
