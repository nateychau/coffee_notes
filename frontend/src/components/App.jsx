import React from 'react';
import { HashRouter, Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute} from '../util/route_util';
import { AuthForm } from './user_auth/auth_form';
import { Home } from './home';
import { Settings } from './settings';


export const App = () => (
  <HashRouter>
    <div className="main">
      <AuthRoute path="/" component={AuthForm} />
      <Switch>
        <ProtectedRoute path="/settings" component={Settings} />
        <ProtectedRoute exact path="/" component={Home} />
      </Switch>
    </div>
  </HashRouter>
);