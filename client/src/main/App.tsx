import React from 'react';
import './App.scss';
import LoginPage from './LoginPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={LoginPage} />
            </Switch>
        </Router>
    );
}

export default App;