import React from 'react';
import { Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';
import { Paperbase, SignIn } from './feature';
import { Routes } from './utils';

function App() {
  return (
    <RouterRoutes>
      <Route path="/" element={<Navigate to={Routes.Paperbase} />} />
      <Route path={Routes.Paperbase} element={<Paperbase />} />
      <Route path={Routes.Login} element={<SignIn />} />
    </RouterRoutes>
  );
}

export default App;
