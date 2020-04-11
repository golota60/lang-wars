import React, { FunctionComponent } from 'react';
import './App.scss';
import LoginPage from './LoginPage';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import HomePage from './HomePage';
import NotFoundPage from './NotFoundPage';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

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
    { path: '/*', name: 'Not Found', Component: NotFoundPage },
  ];

  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="page-fade" timeout={300}>
        <Switch location={location}>
          {routes.map(({ path, Component }) => (
            <Route
              exact
              path={path}
              key={path}
              component={() => (
                <div className="page-wrapper">
                  <Component />
                </div>
              )}
            ></Route>
          ))}
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default App;
