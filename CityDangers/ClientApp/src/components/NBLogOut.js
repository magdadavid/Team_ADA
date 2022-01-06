import React, { useState } from 'react';
import Navbar from 'react-bootstrap/NavBar';
import Nav from 'react-bootstrap/Nav';
import Container  from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { ReactComponent as Logo } from '../img/danger.svg';
import './NavMenu.css';


export function NBLogOut()
{
return(
  
    <Navbar bg="dark" fixed="top" variant='dark'>
    <Container >
    <Navbar.Brand className="ms-auto" >
     <Logo className="logo"/> City Dangers Timișoara
    </Navbar.Brand>
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        <Nav.Link href="/login" className="nbtext">Log In</Nav.Link>
        <Nav.Link href="/register" className="nbtext">Register</Nav.Link>
      </Nav>
    </Navbar.Collapse>
    </Container>
   </Navbar>
   
);

}