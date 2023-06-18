import React, { useState, useEffect } from 'react';
import { shuffle } from 'lodash';
import { Button, Container, Row, Col } from 'react-bootstrap';
import Confetti from 'react-confetti';
import './Luckydraw.css';
import { db } from "../../../firebase";


const LuckyDrawAlgo = () => {
  const [names, setNames] = useState([]);
  const [startClicked, setStartClicked] = useState(false);
  const [winner, setWinner] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const startRaffle = () => {
    if (names.length <= 1 || startClicked) {
      return;
    }

    setStartClicked(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await db.collection('Participant').get();
        const participants = snapshot.docs.map(doc => doc.data());
        const matricnos = participants.map(participant => participant.matricno);
        setNames(matricnos);
      } catch (error) {
        console.error('Error fetching participants:', error);
      }
    };

    fetchData();

    return () => {
      // Clean up any Firebase listeners or resources here if necessary
    };
  }, []);

  useEffect(() => {
    let filteringTimer;
    if (startClicked) {
      filteringTimer = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * names.length);
        const filteredNames = names.filter((_, index) => index !== randomIndex);

        setNames(filteredNames);

        if (filteredNames.length === 1) {
          clearInterval(filteringTimer);
          setWinner(filteredNames[0]);
          setShowConfetti(true);
        }
      }, 100);
    }

    return () => {
      clearInterval(filteringTimer);
    };
  }, [names, startClicked]);

  const restartRaffle = () => {
    setStartClicked(false);
    setWinner(null);
    setShowConfetti(false);
  };

  const shuffleNames = () => {
    setNames(shuffle(names));
    setWinner(null);
    setShowConfetti(false);
  };

  return (
    <div className="lucky-draw-container">
      <div className="lucky-draw-controls">
        {!startClicked && (
          <>
            <Button variant="primary" onClick={startRaffle} disabled={names.length <= 1}>
              Start
            </Button>
            <span style={{ marginLeft: '20px' }}></span>
            <Button variant="secondary" onClick={shuffleNames}>
              Shuffle
            </Button>
          </>
        )}
      </div>
      <Container className="name-buttons">
        <Row className="justify-content-center">
          {names.map((name, index) => (
            <Col key={index} xs={6} sm={4} md={3} lg={2} className="name-button text-center">
              <Button variant="primary" disabled={startClicked}>
                {name}
              </Button>
            </Col>
          ))}
        </Row>
      </Container>
      {winner && (
        <div className="raffle-ends">
          {showConfetti && (
            <div className="confetti-container">
              <Confetti width={window.innerWidth} height={window.innerHeight} />
            </div>
          )}
          <h3>Congratulations! {winner} has won!</h3>
          <Button variant="outline-primary" onClick={restartRaffle}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="#CE00E0">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
            Replay
          </Button>
        </div>
      )}
    </div>
  );
};

export default LuckyDrawAlgo;
