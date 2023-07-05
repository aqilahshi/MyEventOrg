import React, { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

function LoginPage() {
  const searchParams = new URLSearchParams(window.location.search);
  const roleInherited = searchParams.get('role');
  const eventId = searchParams.get('eventid'); // Extract the event id from the URL
  console.log('roleInherited:', roleInherited);
  console.log('eventId:', eventId);
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
      const userEmail = userDoc.data().email; // Get the user's email value
      if (roleInherited === 'Participant'){
        // Check if the provided password matches the stored password
        if (userDoc.data().password !== loginPassword) {
          setError('Invalid password.');
          return;
        }

        if (userDoc.data().role !== roleInherited) {
          setError('Invalid role or event id.');
          return;
        }
      }
      if (roleInherited === 'Committee'){
        // Check if the provided password matches the stored password
        if (userDoc.data().password !== loginPassword) {
          setError('Invalid password.');
          return;
        }

        if (userDoc.data().role !== roleInherited) {
          setError('Invalid role');
          return;
        }
      }
      const userRole = userDoc.data().role;
      const cookies = new Cookies();
      // User login successful
      setError('');
      
      // Save session ID in sessionStorage or localStorage
      sessionStorage.setItem('sessionId', userDoc.id);
      sessionStorage.setItem('sessionUsername', userDoc.data().username);

      switch (userRole) {
        case 'Admin':
          navigate('/admindashboard');
          break;

        case 'Vendor':
          navigate('/vendordashboard');
          break;

        case 'Participant':
          const q2 = query(collection(db, 'Participant'), where('participantEmail', '==', loginEmail));
          const querySnapshot2 = await getDocs(q2);
            
          // Check if a participant with the provided email exists
          if (querySnapshot2.empty) {
            setError('Invalid email. Participant not found.');
            return;
          }
          
          const participantDoc = querySnapshot2.docs[0];
          const participantMatricNo = participantDoc.data().participantMatricNo;
          const username = participantDoc.data().participantUsername; // Extract the username
          
           cookies.set('loggedInUser', { 
            username: username,
            useremail: userEmail,
            role: userRole,
            matricno: participantMatricNo
            }, { path: '/chatcommpart' });
          
          navigate(`/participants?email=${encodeURIComponent(userEmail)}&eventid=${encodeURIComponent(eventId)}`); // Pass email and event ID as URL parameters
          break;

        case 'Lecturer':
          navigate('/import');
          break;

        case 'Committee':
          const q3 = query(collection(db, 'Committee'), where('committeeEmail', '==', loginEmail));
          const querySnapshot3 = await getDocs(q3);
            console.log('committeeloginemail', loginEmail);
          // Check if a participant with the provided email exists
          if (querySnapshot3.empty) {
            setError('Invalid email. Committee not found.');
            return;
          }
          
          const committeeDoc = querySnapshot3.docs[0];
          const committeeMatricNo = committeeDoc.data().committeeMatricNo;
          const committeeUsername = committeeDoc.data().committeeUsername; // Extract the username
          
           cookies.set('committeeUser', { 
            username: committeeUsername,
            useremail: userEmail,
            role: userRole,
            eventid: eventId,
            matricno: committeeMatricNo
            }, { path: '/chatting' });
          navigate(`/committee?email=${encodeURIComponent(userEmail)}`);
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