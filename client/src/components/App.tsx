import React, { FunctionComponent, useState } from 'react';
import './App.scss';
import LoginPage from './pages/LoginPage';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import FriendsPage from './pages/FriendsPage';
import UserContext from '../contexts/UserContext';
import { UserDataInterface } from '../utils/fetches';
import ChooseLangugagePage from './pages/ChooseLanguagePage';

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
    {
      path: '/language',
      name: 'Choose Language',
      Component: ChooseLangugagePage,
    },
    { path: '/*', name: 'Not Found', Component: NotFoundPage },
  ];

  const location = useLocation();
  const [user, setUser] = useState<UserDataInterface>({} as UserDataInterface);

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        classNames="page-fade"
        mountOnEnter
        unmountOnExit
        timeout={300}
      >
        {/* User context to be used in all routes */}
        <UserContext.Provider
          value={{
            user,
            setUser: (newUser: UserDataInterface) => {
              setUser(newUser);
            },
          }}
        >
          <div className="page-wrapper">
            <Switch location={location}>
              {routes.map(({ path, Component }) => (
                <Route exact path={path} component={Component} key={path} />
              ))}
            </Switch>
          </div>
        </UserContext.Provider>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default App;
