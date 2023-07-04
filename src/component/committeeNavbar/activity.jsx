import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
import { Card, Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import NavbarComm from './NavbarComm';

const Activity = () => {
  
  const [eventName, setEventName] = useState('');
  const searchParams = new URLSearchParams(window.location.search);
  const userEmail = searchParams.get('email');
  const eventId = searchParams.get('eventid');
  console.log('eventIdactivity:', eventId);
  useEffect(() => {
    const fetchEventName = async () => {
      try {
        const eventDocRef = doc(db, 'EventDetails', eventId);
        const eventDocSnapshot = await getDoc(eventDocRef);

        if (eventDocSnapshot.exists()) {
          const eventData = eventDocSnapshot.data();
          setEventName(eventData.eventName);
        } else {
          console.error('Event not found in Firebase');
        }
      } catch (error) {
        console.error('Error fetching event details from Firebase:', error);
      }
    };

    fetchEventName();
  }, [eventId]);

  const cardInfo = [
    {
      image: '/images/activity/quiz.jpg',
      description: 'Create your own quiz for the participants here',
      link: `/createquiz/?eventid=${eventId}&email=${encodeURIComponent(userEmail)}`,
      button: 'Create Quiz',
    },
    {
      image: '/images/activity/poll.jpg',
      description: 'Get live poll results from participants here',
      link: `/createlivepoll/?eventid=${eventId}&email=${encodeURIComponent(userEmail)}`,
      button: 'Create Poll',
    },
    {
      image: '/images/activity/luckydraw.jpg',
      description: 'Create a lucky draw session with participants',
      link: `/createluckydraw/?eventid=${eventId}&email=${encodeURIComponent(userEmail)}`,
      button: 'Create Lucky Draw',
    },
  ];

  const renderCard = (card, index) => {
    return (
      <Col key={index} md={4} className="mb-4">
        <Card style={{ height: '100%' }} className="card">
          <Card.Body>
            <Card.Img className="card-image" variant="top" src={card.image} />
            <Card.Text style={{ padding: '1rem', textAlign: 'center' }}>{card.description}</Card.Text>
            <Link to={card.link}>
              <Button variant="outline-primary" style={{ marginTop: '10px' }}>
                {card.button}
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </Col>
    );
  };

  return (
    <div>
      <NavbarComm 
      eventId={eventId}
      userEmail={userEmail}
      />
      <Container>
        <blockquote className="blockquote text-center">
          <h1
            className="mb=5"
            style={{ textAlign: 'center', fontWeight: 'bold', color: 'black', marginTop: '100px', marginLeft: '0%' }}
          >
            {eventName} Activity
          </h1>
          <footer>
            Welcome to Activities! Here you can choose games or activities for your event.
          </footer>
        </blockquote>
        <div className="grid" style={{ textAlign: 'center' }}>
          <Container className="body" style={{ marginTop: '100px', justifyContent: 'center', minHeight: '100vh' }}>
            <Row>
              {cardInfo.map(renderCard)}
            </Row>
          </Container>
        </div>
      </Container>
    </div>
  );
};

export default Activity;
