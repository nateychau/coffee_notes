import React from 'react';
import { HashRouter } from 'react-router-dom';
import { AuthForm } from './user_auth/auth_form';

export const App = () => (
  <HashRouter>
    <div className="main">
      <AuthForm/>
    </div>
  </HashRouter>
);