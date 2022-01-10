import React, { Component } from "react";
import { Button } from "react-bootstrap";

export class LoginFailed extends Component {

    render () {
        return (
         <div className='registerstatus'>
             <p> Incorrect username or password </p>
             <Button className="btnok" href="/login"> Try again </Button>
          </div>
        );
      }
}