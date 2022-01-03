import React, { Component } from "react";
import Button from "react-bootstrap/Button";

export class LoginFailed extends Component {

    render () {
        return (
         <div className='registerstatus'>
             <p> Incorrect username or password </p>
             <Button className="btnok" href="/"> Try again </Button>
          </div>
        );
      }
}