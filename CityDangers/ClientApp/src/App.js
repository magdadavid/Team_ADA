import React, { Component } from 'react';
import { HomeLogin } from './components/HomeLogin';
import { Route } from 'react-router';
import { Register } from './components/Register';
import { RegisterSuccess } from './components/RegisterSuccess';
import { RegisterFailed } from './components/RegisterFailed';
import { Home } from './components/Home';
import { LoginFailed } from './components/LoginFailed';
import './app.css';


export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
     
      <div>
        <Route exact path='/' component={HomeLogin} />
        <Route path='/register' component={Register} /> 
        <Route path='/registersuccess' component={RegisterSuccess} />
        <Route path='/registerfailed' component={RegisterFailed} />
        <Route path='/home' component={Home} />
        <Route path='/loginfailed' component={LoginFailed} />
      </div>

    );
  }
}
