import React, { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import { Link, useNavigate } from 'react-router-dom';

function LoginPage() {
  const searchParams = new URLSearchParams(window.location.search);
  const roleInherited = searchParams.get('role');

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Query the Firestore collection for the provided email
      const q = query(collection(db, 'User'), where('email', '==', loginEmail));
      const querySnapshot = await getDocs(q);

      // Check if a user with the provided email exists
      if (querySnapshot.empty) {
        setError('Invalid email. User not found.');
        return;
      }

      // Find the user document
      const userDoc = querySnapshot.docs[0];

      // Check if the provided password matches the stored password
      if (userDoc.data().password !== loginPassword) {
        setError('Invalid password.');
        return;
      }

      if (userDoc.data().role !== roleInherited) {
        setError(`You are not ${roleInherited}.`);
        return;
      }

      const userRole = userDoc.data().role;

      // User login successful
      setError('');

      switch (userRole) {
        case 'Admin':
          navigate('/admindashboard');
          break;
        case 'Vendor':
          navigate('/vendordashboard');
          break;
        case 'Participant':
          navigate('/participants');
          break;
        case 'Lecturer':
          navigate('/import');
          break;
        case 'Committee':
          navigate('/gg');
          break;
        default:
          setError('Invalid role.');
          break;
      }

      console.log('User logged in successfully!');
    } catch (error) {
      console.error('Error logging in: ', error);
      setError('An error occurred while logging in.');
    }
  };

  return (
    <Container className='vendorpage'>
      <h2>{roleInherited} Login</h2>
      {error && <Alert variant='danger'>{error}</Alert>}
      <Form onSubmit={handleLogin}>
        <Form.Group controlId='email'>
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type='email'
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type='password'
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Login
        </Button>
      </Form>
      {roleInherited === 'Vendor' && (
        <p>
          Don't have an account? <Link to='/register'>Register</Link>
        </p>
      )}
    </Container>
  );
}

export default LoginPage;