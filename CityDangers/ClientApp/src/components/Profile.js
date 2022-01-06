import React, { Component } from "react";
import { ViewProfile } from './ViewProfile';
import { HomeLogin } from './HomeLogin';
import { useLocation } from 'react-router-dom'; 
import { useHistory } from "react-router-dom";

export function Profile() {
    const token = useLocation();
    let history = useHistory();
    if (!token.state)
    {
      history.replace({pathname: "/", state: "lo"});
    
    }
    if (token.state)
    return(
        <div>
            <ViewProfile username={token.state} />
        </div>

    )
    return(
        <div>
           <HomeLogin />
        </div>  
    ); 
};