import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';

const HomePage = () => {
  return (
    <div
      style={{
        backgroundImage: `url("./images/login/images.jpg")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
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
        }}>
          
        <h1 style={{ color: 'black', marginBottom: '50px' }}>Welcome to MyEventOrg Application!</h1>
        <h1 style={{ color: 'black', marginBottom: '30px' }}>Log In as</h1>
        
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} sm={6} md={4} lg={3} className="mb-3 mt-5">
              <Link to='/login?role=Participant'><Button variant="primary" >
                Participant
              </Button></Link>
            </Col>
          </Row>
          
           <Row className="justify-content-center">
            <Col xs={12} sm={6} md={4} lg={3} className="mb-3">
            <Link to='/login?role=Committee'><Button variant="primary" >
                Committee
              </Button></Link>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col xs={12} sm={6} md={4} lg={3} className="mb-3">
            <Link to='/login?role=Vendor'><Button variant="primary" >
                Vendor
              </Button></Link>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col xs={12} sm={6} md={4} lg={3} className="mb-3">
            <Link to='/login?role=Lecturer'><Button variant="primary" >
                Lecturer
              </Button></Link>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col xs={12} sm={6} md={4} lg={3} className="mb-3">
            <Link to='/login?role=Admin'><Button variant="primary" >
                Admin
              </Button></Link>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default HomePage;
