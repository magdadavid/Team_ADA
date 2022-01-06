import React, { useState } from 'react';
import Navbar from 'react-bootstrap/NavBar';
import Nav from 'react-bootstrap/Nav';
import Container  from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { ReactComponent as Logo } from '../img/danger.svg';
import { useHistory } from 'react-router-dom';
import './NavMenu.css';


export function NBLogIn(props)
{
let history = useHistory();
const logOut = async e => {
        e.preventDefault();
        history.push({ pathname:"/", state: null});
}
const gotoProfile = async e => {
   e.preventDefault();
   history.push({ pathname: "/profile", state: props.user});
}

const gotoHome = async e => {
  e.preventDefault();
  history.push({ pathname:"/", state: props.user});
}
       
     
var text = "Hi,  " + props.user;
return(
  <>
    <Navbar bg="dark" fixed='top' variant='dark'>
    <Container >
    <Navbar.Brand className="ms-auto"  >
     <Logo className="logo"/> City Dangers Timișoara
    </Navbar.Brand>
    <Nav className="ml-auto" >
    <NavDropdown title={text} id="basic-nav-dropdown" >
          <NavDropdown.Item onClick={gotoHome}>Home</NavDropdown.Item>
          <NavDropdown.Item onClick={gotoProfile}>Profile</NavDropdown.Item>
          <NavDropdown.Item onClick={logOut}>Log out</NavDropdown.Item>
    </NavDropdown>
    </Nav>
    </Container>
   </Navbar>
   </>
);

}