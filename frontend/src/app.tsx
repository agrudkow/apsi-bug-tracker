import React from 'react';
import { Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';
import { Dashboard, SignIn } from './feature';
import { Routes } from './utils';


function App() {
  const [role, setRole]=React.useState<string>("User");
  React.useEffect(() => {
    localStorage.setItem("username", "Jan");
  }, []);
  return (
    <RouterRoutes>
      <Route path="/" element={<Navigate to={Routes.Login} />} />
      <Route path={Routes.Login} element={<SignIn setRole={setRole} />} />
      <Route path="/:id" element={<Dashboard role={role}/>} />
    </RouterRoutes>
  );
}

export default App;
