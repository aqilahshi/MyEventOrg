import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
// import { useHistory } from 'react-router-dom';

  const LoginPage = ({ handleRoleSelection }) => {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const handleLogin = (e) => {
      e.preventDefault();
      // Rest of the login logic
      console.log('Username:', username);
      console.log('Password:', password);
      console.log('handleRoleSelection', handleRoleSelection);
  
      // Reset the form
      // setUsername('');
      // setPassword('');

      // Perform user authentication with your backend server
    // Replace this with your actual authentication logic
    if (username === 'admin' && password === 'admin' && role === 'admin') {
      // Successful login for admin
      localStorage.setItem('userRole', 'admin');
      
    } else if (
      username === 'participant' &&
      password === 'participant' &&
      role === 'participant'
    ) {
      // Successful login for participant
      localStorage.setItem('userRole', 'participant');
      
    } else if (
      username === 'vendor' &&
      password === 'vendor' &&
      role === 'vendor'
    ) {
      // Successful login for vendor
      localStorage.setItem('userRole', 'vendor');
     
    } else {
      // Failed login
      alert('Invalid credentials');
    }

    };
  
return (
    <Container>
      <h1>Login</h1>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );

};

export default LoginPage;
