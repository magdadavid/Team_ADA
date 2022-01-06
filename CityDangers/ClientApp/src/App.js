import React, { Component } from 'react';
import { HomeLogin } from './components/HomeLogin';
import { Route } from 'react-router';
import { Register } from './components/Register';
import { RegisterSuccess } from './components/RegisterSuccess';
import { RegisterFailed } from './components/RegisterFailed';
import { Home } from './components/Home';
import { LoginFailed } from './components/LoginFailed';
import { Profile } from './components/Profile';

import './app.css';



export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
   
      <div>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={HomeLogin} />
        <Route exact path='/register' component={Register} /> 
        <Route exact path='/registersuccess' component={RegisterSuccess} />
        <Route exact path='/registerfailed' component={RegisterFailed} />
        <Route exact path='/loginfailed' component={LoginFailed} />
        <Route exact path='/profile' component={Profile} />
      </div>
    
    );
  }
}
