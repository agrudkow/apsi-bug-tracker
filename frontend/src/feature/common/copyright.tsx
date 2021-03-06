import React from 'react'
import { Link, Typography } from '@mui/material';


export const Copyright: React.FC = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:3000">
        ASPI BugTracker
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}
