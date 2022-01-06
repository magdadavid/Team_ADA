import React, { Component } from "react";
import { Login } from './Login';
import { NBLogReg } from './NBLogReg';


export class HomeLogin extends Component {

    render () {
        return (
          <>
          <NBLogReg />
         <div className='cont logIn'>
             <div className='headerHome'>
             <h1> <b> City Dangers </b> </h1>
             <h2> Timișoara </h2> 
             </div>    
         < Login />
          </div>
          </>
        );
      }
}