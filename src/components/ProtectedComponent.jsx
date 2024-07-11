
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import supabase from '../supaBaseClient';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const session = supabase.auth.session

  return session? <Component {...rest} />: <Navigate to="/login" />
};

export default ProtectedRoute;
