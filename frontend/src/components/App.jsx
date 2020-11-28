import React from 'react';
import { HashRouter, Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute} from '../util/route_util';
import { AuthForm } from './user_auth/auth_form';
import { Settings } from './settings';
import { BeanForm } from './beans/bean_form';
import { Home } from './home';


export const App = () => (
  <HashRouter>
    <div className="main">
      <AuthRoute exact path="/" component={AuthForm} />
      <Switch>
        <ProtectedRoute path="/beans/new" component={BeanForm} />
        <ProtectedRoute path="/settings" component={Settings} />
        <ProtectedRoute exact path="/" component={Home} />
      </Switch>
    </div>
  </HashRouter>
);