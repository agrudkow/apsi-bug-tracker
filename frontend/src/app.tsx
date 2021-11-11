import React from 'react';
import { Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';
import { Paperbase } from './feature';
import { Routes } from './utils';

function App() {
  return (
    <RouterRoutes>
      <Route path="/" element={<Navigate to={Routes.Paperbase} />} />
      <Route path={Routes.Paperbase} element={<Paperbase />} />
      <Route path="test" element={<div>Test root</div>} />
    </RouterRoutes>
  );
}

export default App;
