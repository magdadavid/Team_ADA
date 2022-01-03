import React, { Component } from "react";
import Button from "react-bootstrap/Button";

export class RegisterFailed extends Component {

    render () {
        return (
         <div className='registerstatus'>
             <p> The account was not created </p>
             <Button className="btnok" href="/register"> Try again </Button>
          </div>
        );
      }
}