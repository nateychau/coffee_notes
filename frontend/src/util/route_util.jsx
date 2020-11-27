import React from 'react';
import { Route, Redirect, withRouter } from "react-router-dom";

// const loggedIn = window.currentUser;

const Auth = ({ component: Component, path, exact }) => (
  <Route
    path={path}
    exact={exact}
    render={(props) =>
      !window.currentUser ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

const Protected = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      window.currentUser ? <Component {...props} /> : <Redirect to="/" />
    }    
  />
);

export const AuthRoute = withRouter(Auth);
export const ProtectedRoute = withRouter(Protected)