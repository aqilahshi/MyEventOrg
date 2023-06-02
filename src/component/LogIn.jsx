import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const HomePage = () => {
  const handleLogin = (role) => {
    // Handle login logic here, such as redirecting to the appropriate page based on the role
    // You can use React Router or any other method for navigation
    console.log(`Logging in as ${role}`);
  };

  return (
    <div
      style={{
        backgroundImage: `url("./images/USM.jpg")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          padding: '20px',
          borderRadius: '10px',
          textAlign: 'center',
        }}
      >
        <h1 style={{ color: 'black', marginBottom: '50px' }}>Welcome to MyEventOrg Application!</h1>
        <h1 style={{ color: 'black', marginBottom: '30px' }}>Log In as</h1>
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} sm={6} md={4} lg={3} className="mb-3 mt-5">
              <Button variant="primary" block onClick={() => handleLogin('participant')}>
                Participant
              </Button>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs={12} sm={6} md={4} lg={3} className="mb-3">
              <Button variant="primary" block onClick={() => handleLogin('committee')}>
                Committee
              </Button>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs={12} sm={6} md={4} lg={3} className="mb-3">
              <Button variant="primary" block onClick={() => handleLogin('vendors')}>
                Vendors
              </Button>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs={12} sm={6} md={4} lg={3} className="mb-3">
              <Button variant="primary" block onClick={() => handleLogin('lecturers')}>
                Lecturers
              </Button>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs={12} sm={6} md={4} lg={3} className="mb-3">
              <Button variant="primary" block onClick={() => handleLogin('admin')}>
                Admin
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default HomePage;
