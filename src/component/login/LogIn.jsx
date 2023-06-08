import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
<<<<<<< Updated upstream

=======
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
>>>>>>> Stashed changes

function LoginPage() {
  const searchParams = new URLSearchParams(window.location.search);
  const role = searchParams.get('role');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
<<<<<<< Updated upstream
  
  const handleSubmit = (e) => {
=======
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
>>>>>>> Stashed changes
    e.preventDefault();
    // Handle sign-in logic here, e.g., make an API request

    console.log('Sign-in details:', { role, email, password });
    // Reset form fields
    setEmail('');
    setPassword('');
  };


  // return <div>Welcome, {role}!</div>;

  return (
    <div className="login-form-container">
      
      <div className="welcome-message">You sign in as: {role}!
      <p>We will collect your name later!!!!</p></div>
      
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
      </Form>
    </div>
  );
}

export default LoginPage;