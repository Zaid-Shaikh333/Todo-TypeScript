import React, { useContext } from 'react';
import { Navigate, Route, RouteProps, Routes } from 'react-router-dom';
import { AuthContext } from './AuthContext';

interface PrivateRouteProps {
  // path: string;
  children: React.ReactNode;
}

function PrivateRoute({  children }: PrivateRouteProps) {
  const { user } = useContext(AuthContext);

  return user ? (
    <>{children}</>
    
  ) : (
    <Navigate to="/login" replace />
  );
}

export default PrivateRoute;
