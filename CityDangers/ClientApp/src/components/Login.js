import React, { useState } from 'react';
import { Button, Form } from "react-bootstrap";
import { useHistory } from 'react-router-dom';

async function loginUser(credentials)
{
 
  return fetch('http://localhost:5000/api/user/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(credentials)
    })
    .then(data => data)
}

export function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  let history = useHistory();

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  const handleSubmit = async e => {
    e.preventDefault();
    
  const response = await loginUser({
      username,
      password
    });
  
  if(response.ok)
  {
      history.push({ pathname:"/", state: username});  
  }
  else{
      history.push("/loginfailed");  
  }

  }

  return (
    <div className="logIn">
      <Form onSubmit={handleSubmit}>
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
        <Button  type="submit" className="btn-custom login">
          Log in
        </Button>                
        <Button className="btn-custom register" href="/register"> Register </Button>
        </p>
      </Form>
    </div>
  );
}
