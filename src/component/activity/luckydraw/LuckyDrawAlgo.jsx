import React, { useState, useEffect } from 'react';
import { shuffle } from 'lodash';
import { Button, Container, Row, Col } from 'react-bootstrap';
import Confetti from 'react-confetti';
import './Luckydraw.css';
import { Link} from 'react-router-dom';
import { db } from '../../../firebase';
import {
  collection,
  getDocs,
  where,
  query
} from 'firebase/firestore';
import NavbarComm from '../../committeeNavbar/NavbarComm';

const LuckyDrawAlgo = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const userEmail = searchParams.get('email');
  const eventId = searchParams.get('eventid');
  const [names, setNames] = useState([]);
  const [startClicked, setStartClicked] = useState(false);
  const [winner, setWinner] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const participantsCollectionRef = collection(db, 'Participant');
  const startRaffle = () => {
    if (names.length <= 1 || startClicked) {
      return;
    }

    setStartClicked(true);
  };

  useEffect(() => {
    let filteringTimer;

    const fetchParticipants = async () => {
      try {
        const querySnapshot = await getDocs(
          query(
            participantsCollectionRef,
            where('eventID', '==', eventId)
          )
        );
        const participantsData = querySnapshot.docs.map(doc => doc.data());
        const matricnos = participantsData.map(
          participant => participant.participantMatricNo
        );
        setNames(matricnos);
      } catch (error) {
        console.error('Error fetching participants:', error);
      }
    };

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
    } else {
      fetchParticipants();
    }

    return () => {
      clearInterval(filteringTimer);
    };
  }, [participantsCollectionRef, startClicked, names]);

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
    <div>
      <NavbarComm 
      eventId={eventId} 
      userEmail={userEmail}/>
      <Container
        className="justify-content-center align-text-center"
        style={{ marginTop: '30px' }}
      >
        <div>
          <Link to={`/activity/?eventid=${eventId}&email=${encodeURIComponent(userEmail)}`}>
            <Button variant="outline-dark" style={{ marginTop: '0px', float: 'left' }}>
              Back
            </Button>
          </Link>
        </div>

        {names.length == 0 && winner === null ? (
          <div className="no-participants-message text-center">
            <p>There are no participants filling the attendance yet. </p>
            <p>Please share the link with them to allow this functionality to work :)</p>
          </div>
        ) : (
          <div className="d-flex justify-content-center lucky-draw-controls">
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
        )}

        {names.length > 0 && (
          <Container className="name-buttons">
            <Row className="justify-content-center">
              {names.map((name, index) => (
                <Col
                  key={index}
                  xs={6}
                  sm={4}
                  md={3}
                  lg={2}
                  className="name-button text-center "
                >
                  <Button variant="primary" disabled={startClicked}>
                    {name}
                  </Button>
                </Col>
              ))}
            </Row>
          </Container>
        )}

        {winner && (
          <div className="raffle-ends ">
            {showConfetti && (
              <div className="confetti-container">
                <Confetti width={window.innerWidth} height={window.innerHeight} />
              </div>
            )}
            <h3 className='text-center'>Congratulations! {winner} has won!</h3>
            <div className="d-flex justify-content-center">
            <Button className='align-items-center' variant="outline-primary" onClick={restartRaffle}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="#CE00E0"
              >
                <path
                  fillRule="evenodd"
                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                  clipRule="evenodd"
                />
              </svg>
              Replay
            </Button>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default LuckyDrawAlgo;
