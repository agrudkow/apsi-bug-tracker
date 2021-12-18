import React from 'react';
import { Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';
import { Dashboard, SignIn } from './feature';
import { Routes } from './utils';

function App() {
  return (
    <RouterRoutes>
      <Route path="/" element={<Navigate to={Routes.Login} />} />
      <Route path={Routes.Login} element={<SignIn />} />
      <Route path="/:id" element={<Dashboard />} />
    </RouterRoutes>
  );
}

export default App;
