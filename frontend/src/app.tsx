import React from 'react';
import { Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';
import { Dashboard, SignIn } from './feature';
import { Routes } from './utils';

function App() {
  return (
    <RouterRoutes>
      <Route path="/" element={<Navigate to={Routes.Login} />} />
      <Route path={Routes.Dashboard} element={<Dashboard />} />
      <Route path={Routes.Login} element={<SignIn />} />
    </RouterRoutes>
  );
}

export default App;
