import React, { Component } from "react";
import { Login } from './Login'


export class HomeLogin extends Component {

    render () {
        return (
         <div className='container logIn'>
             <div className='headerHome'>
             <h1> <b> City Dangers </b> </h1>
             <h2> Timișoara </h2> 
             </div>    
         < Login />
          </div>
        );
      }
}