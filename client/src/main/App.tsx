import React, { FunctionComponent } from 'react';
import './App.scss';
import LoginPage from './LoginPage';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import HomePage from './HomePage';
import NotFoundPage from './NotFoundPage';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import FriendsPage from './FriendsPage';

interface RouteInterface {
  path: string;
  name: string;
  Component: FunctionComponent;
}

const App = () => {
  const routes: Array<RouteInterface> = [
    { path: '/', name: 'Root', Component: () => <Redirect to="/login" /> },
    { path: '/login', name: 'Login', Component: LoginPage },
    { path: '/home', name: 'Home', Component: HomePage },
    { path: '/friends', name: 'Friends', Component: FriendsPage },
    { path: '/*', name: 'Not Found', Component: NotFoundPage },
  ];

  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        classNames="page-fade"
        mountOnEnter
        unmountOnExit
        timeout={300}
      >
        <div className="page-wrapper">
          <Switch location={location}>
            {routes.map(({ path, Component }) => (
              <Route exact path={path} component={Component} key={path} />
            ))}
          </Switch>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default App;
