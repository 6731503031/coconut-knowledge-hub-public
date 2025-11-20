import React from 'react';
import { useAuth } from '../context/AuthContext'; 

import { Navigate } from 'react-router-dom'; 

function ProtectedRoute({ children, allowedUserType }) {

  const { token, userType } = useAuth();


  if (!token) {
  
    return <Navigate to="/login" replace />;
  }


  if (allowedUserType && userType !== allowedUserType) {
   
    return <Navigate to="/" replace />; 
  }


  return children;
}

export default ProtectedRoute;