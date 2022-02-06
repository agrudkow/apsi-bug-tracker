import React from 'react';
import { Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';
import { Dashboard, SignIn } from './feature';
import { Layout } from './feature/common';
import { NewFormContent } from './feature/dashboard/newFormContent';
import { ProblemFormContent } from './feature/dashboard/problemFormContent';
import { Routes } from './utils';

function App() {
  const [role, setRole] = React.useState<string>('User');
  React.useEffect(() => {
    localStorage.setItem('username', '');
    localStorage.setItem('isLoggedOut', 'false')
    localStorage.setItem('isProblemDeleted', 'false')
    localStorage.setItem('isProblemSubmitted', 'false')
    localStorage.setItem('isProblemUpdated', 'false')
  }, []);
  return (
    <RouterRoutes>
      <Route path="/" element={<Navigate to={Routes.Login} />} />
      <Route path={Routes.Login} element={<SignIn setRole={setRole} />} />
      <Route
        path={Routes.Dashboard}
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      />
      <Route
        path={Routes.Form}
        element={
          <Layout>
            <NewFormContent />
          </Layout>
        }
      />
      <Route
        path={`${Routes.ProblemEditForm}/:id`}
        element={
          <Layout>
            <ProblemFormContent role={role} />
          </Layout>
        }
      />
    </RouterRoutes>
  );
}

export default App;
