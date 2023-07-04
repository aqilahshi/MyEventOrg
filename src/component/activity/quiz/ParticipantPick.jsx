import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { db } from '../../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import NavbarPart from '../../participant/NavbarPart';

function Box() {
  const searchParams = new URLSearchParams(window.location.search);
  const eventId = searchParams.get('eventid');
  const participantMatricNo = searchParams.get('matricno');
  console.log('eventID:', eventId);
  console.log('matricno:', participantMatricNo);
  const [quizs, setquizs] = useState([]);

  useEffect(() => {
    const fetchquizDetails = async () => {
      const quizDetailsCollectionRef = collection(db, 'CreateQuiz');
      const quizDetailsSnapshot = await getDocs(quizDetailsCollectionRef);

      const quizData = quizDetailsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      setquizs(quizData);
    };

    fetchquizDetails();
  }, []);

  const renderquiz = (quiz) => {
    return (
      <Col key={quiz.id} md={3} className="mb-4">
        <Card style={{ height: '100%' }} className="card">
          <Card.Body>
            <Card.Title>{quiz.quizTitle}</Card.Title>
            <Card.Body>{quiz.quizDescription}</Card.Body>
            <Link to={`/playquiz/${eventId}/${quiz.id}/${participantMatricNo}`}>
              <Button variant="outline-primary">Select quiz</Button>
            </Link>
          </Card.Body>
        </Card>
      </Col>
    );
  };

  return (
    <div>
      <NavbarPart  
      participantMatricNo={participantMatricNo}
      eventId={eventId}/>
      <Container>
        <blockquote className="blockquote text-center">
          <h1 className="mb-5" style={{ textAlign: 'center', fontWeight: 'bold', color: 'black', marginTop: '50px', marginLeft: '0%' }}>Choose Your Quiz</h1>
          <footer>Let's Play a quiz! Pick a quiz card to start!</footer>
        </blockquote>
        <div className="grid" style={{ textAlign: 'center' }}>
          <Container className="body" style={{ marginTop: '5 0px', justifyContent: 'center', minHeight: '100vh' }}>
            <Row>
              {quizs.map(renderquiz)}
            </Row>
          </Container>
        </div>
      </Container>
  </div>
  );
}

export default Box;
