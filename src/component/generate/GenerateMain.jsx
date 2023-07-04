import React from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import NavbarComm from '../committeeNavbar/NavbarComm';
import { Link } from 'react-router-dom';

function GenerateMain() {
  const searchParams = new URLSearchParams(window.location.search);
  const userEmail = searchParams.get('email');
  const eventId = searchParams.get('eventid');

  return (
    <div>
      <NavbarComm eventId={eventId} userEmail={userEmail} />
      <Container>
        <h1 className='text-center mt-5'>Generate files here</h1>
        <Row>
          <Col>
            <Card style={{width: '75%', margin: '0 auto', marginTop: '30px'}}>
              <Card.Body>
                <Card.Title className='text-center'>Generate Participant Attendance Sheet</Card.Title>
                <Link to={`/generateattendance/?eventid=${eventId}&email=${encodeURIComponent(userEmail)}`}>
                  <div className='d-flex justify-content-center'>
                  <Button variant="primary">Generate</Button>
                  </div>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card style={{width: '75%', margin: '0 auto', marginTop: '30px'}}>
              <Card.Body>
                <Card.Title className='text-center'>Generate Event Committee Lists</Card.Title>
                  <Link to={`/generatecommittee/?eventid=${eventId}&email=${encodeURIComponent(userEmail)}`}>
                  <div className='d-flex justify-content-center'>
                    <Button variant="primary">Generate</Button>
                  </div>
                  </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default GenerateMain;
