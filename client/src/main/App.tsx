import React from 'react';
import './App.scss';
import LoginPage from './LoginPage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import HomePage from './HomePage';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route
          path="/"
          exact
          component={() => {
            return <Redirect to="/login" />;
          }}
        />
        <Route path="/login" component={LoginPage} />
        <Route path="/home" component={HomePage} />
      </Switch>
    </Router>
  );
};

export default App;
