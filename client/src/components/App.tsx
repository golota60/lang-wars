import React from 'react';
import './App.scss';
import LoginPage from './LoginPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import RegisterPage from './RegisterPage';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
            </Switch>
        </Router>
    );
}

export default App;