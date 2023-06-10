import React, { useContext } from 'react';
import { Navigate, Route, RouteProps } from 'react-router-dom';
import { AuthContext } from './AuthContext';

interface PrivateRouteProps {
  path: string;
  element: React.ReactElement<RouteProps>;
}

function PrivateRoute({ path, element }: PrivateRouteProps) {
  const { user } = useContext(AuthContext);

  return user ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
}

export default PrivateRoute;
