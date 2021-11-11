import React from 'react';
import { Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';
import { ExampleView } from './feature';
import { Routes } from './utils';

function App() {
  return (
    <RouterRoutes>
      <Route path='/' element={<Navigate to={Routes.Example} />} />
      <Route path={Routes.Example} element={<ExampleView />} />
      <Route path='test' element={<div>Test root</div>} />
    </RouterRoutes>
  );
}

export default App;
