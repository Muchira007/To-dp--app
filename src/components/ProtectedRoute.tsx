// src/components/ProtectedRoute.tsx

import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const ProtectedRoute: React.FC<{ element: React.ReactNode, path: string }> = ({ element, path }) => {
  const isAuthenticated = useSelector<RootState, boolean>(state => state.auth.isAuthenticated);

  return isAuthenticated ? <Route path={path} element={element} /> : <Navigate to="/" />;
};

export default ProtectedRoute;
