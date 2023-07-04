import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';

function Box() {
  const searchParams = new URLSearchParams(window.location.search);
  const userEmail = searchParams.get('email');
  const [events, setEvents] = useState([]);
  console.log(userEmail);
  useEffect(() => {
    const fetchEventDetails = async () => {
      const eventDetailsCollectionRef = collection(db, 'EventDetails');
      const eventDetailsSnapshot = await getDocs(eventDetailsCollectionRef);

      const eventData = eventDetailsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      setEvents(eventData);
    };

    fetchEventDetails();
  }, []);

  const renderEvent = (event) => {
    return (
      <Col key={event.id} md={3} className="mb-4">
        <Card style={{ height: '100%' }} className="card">
          <Card.Body>
            <Card.Title>{event.eventName}</Card.Title>
            <Link to={`/activity/?eventid=${event.id}&email=${encodeURIComponent(userEmail)}`}>
              <Button variant="outline-primary">Select Event</Button>
            </Link>
          </Card.Body>
        </Card>
      </Col>
    );
  };

  return (
    <Container>
      <div>
        <blockquote className="blockquote text-center">
          <h1 className="mb-5" style={{ textAlign: 'center', fontWeight: 'bold', color: 'black', marginTop: '100px', marginLeft: '0%' }}>Choose Your Event</h1>
          <footer>Welcome to Activity! Let's choose an event for which you want to create an activity!</footer>
        </blockquote>
        <div className="grid" style={{ textAlign: 'center' }}>
          <Container className="body" style={{ marginTop: '100px', justifyContent: 'center', minHeight: '100vh' }}>
            <Row>
              {events.map(renderEvent)}
            </Row>
          </Container>
        </div>
      </div>
    </Container>
  );
}

export default Box;
