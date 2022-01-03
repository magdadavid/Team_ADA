import React, { Component } from "react";
import Button from "react-bootstrap/Button";

export class RegisterSuccess extends Component {

    render () {
        return (
         <div className='registerstatus'>
             <p> The account was created successfully </p>
             <Button className="btnok" href="/"> OK </Button>
          </div>
        );
      }
}