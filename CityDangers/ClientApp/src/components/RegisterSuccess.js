import React, { Component } from "react";
import { Button } from "react-bootstrap";
import {useLocation, useHistory} from 'react-router-dom';

export function RegisterSuccess(){
  const location = useLocation();
  let history = useHistory();
   
  const handleOK = async e => {
    e.preventDefault();
    history.push({ pathname:"/", state: location.state});
  }
  return (
         <div className='registerstatus'>
             <p> The account was created successfully </p>
             <Button className="btnok" onClick={handleOK}> OK </Button>
          </div>
  );
      
}