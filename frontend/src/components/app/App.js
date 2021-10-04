import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';
import Download from '../download/Download';
import Error from '../error/Error';
import Home from '../home/Home';
import Login from '../login/Login';
import Privacy from '../privacy/Privacy';
import Terms from '../terms/Terms';
import Support from '../support/Support';
import './App.scss';

export default function App() {
  return (
    <div className="app">
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/privacy' component={Privacy}/>
        <Route exact path='/terms' component={Terms}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/dashboard' component={Dashboard}/>
        <Route exact path='/download' component={Download}/>
        <Route exact path='/support' component={Support}/>
        <Route exact path='/error' component={Error}/>
      </Switch>
    </div>
  );
}