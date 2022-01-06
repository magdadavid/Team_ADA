import React, { Component } from "react";
import { Login } from './Login'
import { HomeLoggedIn} from './HomeLoggedIn';
import { HomeLoggedOut } from './HomeLoggedOut';
import { useLocation } from 'react-router-dom'; 
import { useHistory } from "react-router-dom";

export function Home(props) {
    const location = useLocation();
    let history = useHistory();

    if (!location.state)
    {
        
       history.replace({pathname: "/profile", state: null});
       return (
           <div> ERORR</div>
       )
    }
    if (location.state == "lo")
     return(
        <div>
           <HomeLoggedOut />
        </div>
    )
    if (location.state)
    return(
        <div>
            <HomeLoggedIn username={location.state} />
        </div>

    )
      
};