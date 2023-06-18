import React from "react";
import { Card, Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

const CommitteePage = () => {
  const cardInfo = [
    {
      image: "/images/activity/quiz.jpg",
      description: "Create your own quiz for the participants here",
      link: "/createquiz",
      button: "Create Quiz"
    },
    {
      image: "/images/activity/poll.jpg",
      description: "Get live poll results from participants here",
      link: "/createlivepoll",
      button: "Create Poll"
    },
    {
      image: "/images/activity/luckydraw.jpg",
      description: "Create a lucky draw session with participants",
      link: "/createluckydraw",
      button: "Create Lucky Draw"
    }
  ];

  const renderCard = (card, index) => {
    return (
      <Col key={index} md={4} className="mb-4">
        <Card style={{ height: "100%" }} className="card"> {/* Fixed height for the card */}
          <Card.Body>
            <Card.Img className="card-image" variant="top" src={card.image} />
            <Card.Text style={{ padding: '1rem', textAlign: "center" }}>{card.description}</Card.Text>
            <Link to={card.link}><Button variant="outline-primary" style={{ marginTop: '10px' }}>{card.button}</Button></Link>
          </Card.Body>
        </Card>
      </Col>
    );
  };

  return (
    <Container>
      <div>
        <blockquote className="blockquote text-center">
          <h1 className="mb=5" style={{ textAlign: 'center', fontWeight: 'bold', color: 'black', marginTop: '100px', marginLeft: '0%' }}>Activities</h1>
          <footer>Welcome to Activity! Here you can choose games or activities for your event.</footer>
        </blockquote>
        <div className="grid" style={{ textAlign: 'center' }}>
          <Container className="body" style={{ marginTop: '100px', justifyContent: 'center', minHeight: '100vh' }}>
            <Row>
              {cardInfo.map(renderCard)}
            </Row>
          </Container>
        </div>
      </div>
    </Container>
  );
};

export default CommitteePage;
