import React, { useState } from 'react';
import { Container, Nav, Navbar }  from 'react-bootstrap';
import { ReactComponent as Logo } from '../img/danger.svg';
import './NavMenu.css';


export function NBLogReg()
{
return(
  <>
    <Navbar bg="dark" fixed='top' variant='dark'>
    <Container >
    <Navbar.Brand className="ms-auto" >
     <Logo className="logo"/> City Dangers Timișoara
    </Navbar.Brand>
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        <Nav.Link href="/" className="nbtext">Home</Nav.Link>
      </Nav>
    </Navbar.Collapse>
    </Container>
   </Navbar>
   </>
);

}