import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";


function LoginPage(){

  const searchParams = new URLSearchParams(window.location.search);
  const role = searchParams.get('role');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();
    // Handle sign-in logic here, e.g., make an API request
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate(`/${role}?email=${email}`);
    } catch (err) {
      setErr(true);
    };
  };

  return (
    <div className="login-form-container">
      
      <div className="welcome-message">You are signing in as: {role}!</div>
      
      <Form onSubmit={handleSubmit} className="login-form">
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="submit-button">
          Sign In
        </Button>
        {err && <span>Something went wrong</span>}
      </Form>
    </div>
  );
  };
export default LoginPage;