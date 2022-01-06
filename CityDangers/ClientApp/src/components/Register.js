import React, { useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useHistory } from 'react-router-dom';
import { NBLogReg } from './NBLogReg';


async function registerUser(credentials)
{
    return fetch('http://localhost:5000/api/user/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(credentials)
        })
        .then(data => data)
}


export function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("Timisoara");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  function validateForm() {
    return firstName.length > 0 && lastName.length > 0 && city.length > 0 && email.length > 0 && username.length > 0 && password.length > 0 ;
  }

  const handleSubmit = async e => {
    e.preventDefault();
    
   const response = await registerUser({
      firstName,
      lastName,
      city,
      email,
      username,
      password
    });
   console.log(response);
   if (!response.ok){
      history.push("/registerfailed");
   }
   else {
     history.push({pathname: "/registersuccess", state: username});
   }
   
  }

  return (
    <>
    <NBLogReg />
    
     <div className="cont register">

     <div className="headerHome"> 
     <h1> <b> City Dangers </b> </h1>
      <h2> Timișoara </h2> 
     </div>
     <h2 style={{margin:"40px auto"}}> Register </h2>
     <div className="register">
      <Form onSubmit={handleSubmit}>
      <Form.Group size="lg" controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            disabled='true'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <p>
        <Button  type="submit"   className="btn-custom login" disabled={!validateForm()}>
          Register
        </Button>                
        <Button className="btn-custom register" href="/"> Home </Button>
        </p>
      </Form>
    </div>
    </div>
    </>
  );
}