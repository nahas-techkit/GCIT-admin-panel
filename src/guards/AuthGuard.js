import React from 'react';
import LoginPage from '../pages/LoginPage';


function AuthGuard({ children }) {
    
  const user = localStorage.getItem('user');
  if (!user) return <LoginPage />;
  return children;
}

export default AuthGuard;
