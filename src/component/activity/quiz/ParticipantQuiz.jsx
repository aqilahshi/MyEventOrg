//Ada bug where the qiz if participantMarks == 0 the quiz are still available to user
//Ada bug which confetti xnak show despite meeting the condition. Maybe sebab window.location.reload
//Ada bug tak kira markah betul betul
import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col, Form } from 'react-bootstrap';
import Confetti from 'react-confetti';
import { useParams } from 'react-router-dom';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";
import { db } from "../../../firebase";
import NavbarPart from '../../participant/NavbarPart';

function ParticipantPlayQuiz() {
  const { quizId } = useParams();
  const { eventId } = useParams();
  const { participantMatricNo } = useParams();
  console.log('quizID:', quizId);
  console.log('eventID:', eventId);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [message, setMessage] = useState('');
  const [validationError, setValidationError] = useState('');
  const [questions, setQuestions] = useState([]);
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [eventName, setEventName] = useState('');
  const [totMarks, setTotalMarks] = useState(0); // New state to keep track of total marks
  const [completedQuiz, setCompletedQuiz] = useState(false);
  const [loading, setLoading] = useState(true); // State to track loading status
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    // Fetch quiz data from Firestore
    const fetchQuizData = async () => {
      try {
        const quizRef = collection(db, 'Quiz');
        const q = query(quizRef, where('quizID', '==', quizId));
        const quizSnapshot = await getDocs(q);
        const quizData = quizSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            ...data,
            options: [data.quizOption1, data.quizOption2, data.quizOption3, data.quizOption4]
          };
        });
        setQuestions(quizData);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };
    

    fetchQuizData();
  }, [quizId]);

  useEffect(() => {
    const percentage = (correctAnswers / (correctAnswers + wrongAnswers)) * 100;
  
    if (percentage > 20) {
      setShowConfetti(true);
    } else {
      setShowConfetti(false);
    }
  }, [correctAnswers, wrongAnswers]);
  
  

  // Listen to changes in totalmarks
  useEffect(() => {
    // Calculate total marks whenever correctAnswers changes
    setTotalMarks(correctAnswers);
  }, [correctAnswers]);
  
  const handleAnswerSelection = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const handleNextQuestion = async () => {
    if (!selectedAnswer) {
      setValidationError('Please select an answer.');
      return;
    }
  
    setValidationError('');
  
    const currentQuestion = questions[correctAnswers + wrongAnswers];
  
    if (selectedAnswer === currentQuestion.quizCorrectAns) {
      setCorrectAnswers(correctAnswers + 1);
  
      const percentage = ((correctAnswers + 1) / questions.length) * 100;
      if (percentage > 20) {
        setShowConfetti(true);
      }
    } else {
      setWrongAnswers(wrongAnswers + 1);
    }
  
    // Check if it's the last question
    if (correctAnswers + wrongAnswers === questions.length - 1) {
      await updateParticipantMarks();
      setShowResult(true);
      window.location.reload();
    }
  
    setSelectedAnswer('');
  };
  
  
  useEffect(() => {
    // Check if participant has completed the quiz
    const checkQuizCompletion = async () => {
      try {
        const participantRef = collection(db, 'Participant');
        const q = query(participantRef, where('participantMatricNo', '==', participantMatricNo));
        const participantSnapshot = await getDocs(q);

        if (!participantSnapshot.empty) {
          const participantDoc = participantSnapshot.docs[0];
          const participantData = participantDoc.data();
          const participantMarks = participantData.participantMarks || 0;

          if (participantMarks > 0) {
            setCompletedQuiz(true);
          }
        }
      } catch (error) {
        console.error('Error checking quiz completion:', error);
      }
    };

    checkQuizCompletion();
  }, [participantMatricNo]);

  //to update marks
  const updateParticipantMarks = async () => {
    try {
      const participantRef = collection(db, 'Participant');
      const q = query(participantRef, where('participantMatricNo', '==', participantMatricNo));
      const participantSnapshot = await getDocs(q);
  
      if (!participantSnapshot.empty) {
        const participantDoc = participantSnapshot.docs[0];
        const participantData = participantDoc.data();
        const totalMarks = participantData.participantMarks || 0;
        const updatedMarks = totalMarks + totMarks;
  
        await updateDoc(participantDoc.ref, { participantMarks: updatedMarks });
        console.log(`Participant ${participantMatricNo} marks updated: ${updatedMarks}`);
  
        if (totalMarks > 0) {
          setMessage(`Your marks have been updated. Total marks: ${updatedMarks}`);
        }
      } else {
        console.log(`Participant ${participantMatricNo} not found`);
      }
    } catch (error) {
      console.error('Error updating participant marks:', error);
    }
  };
  
  useEffect(() => {
    
    // Check if participantMarks exist in Participant table
    const checkParticipantMarks = async () => {
      try {
        const participantRef = collection(db, 'Participant');
        const q = query(participantRef, where('participantMatricNo', '==', participantMatricNo));
        const participantSnapshot = await getDocs(q);
  
        if (!participantSnapshot.empty) {
          const participantDoc = participantSnapshot.docs[0];
          const participantData = participantDoc.data();
          const totalMarks = participantData.participantMarks || 0;
          const percentage = (totalMarks / questions.length) * 100;

          if (totalMarks > 0) {
            if (percentage <= 20) {
              setMessage(`Ouhh, nice try! Your correct answer is ${totalMarks} out of ${questions.length} questions.`);
            } else {
              setMessage(`Congratulations! Your correct answer is ${totalMarks} out of ${questions.length} questions.`);
            }
          }
          else{
          if (percentage <= 20) {
            setMessage(`Ouhh, nice try! Your correct answer is ${totalMarks} out of ${questions.length} questions.`);
          } else {
            setMessage(`Congratulations! Your correct answer is ${totalMarks} out of ${questions.length} questions.`);
          }
        }
        }
        
      } catch (error) {
        console.error('Error checking participant marks:', error);
      }
    };
  
    checkParticipantMarks();
  }, [correctAnswers, questions.length]);

  // Call data from CreateQuiz
  useEffect(() => {
    const fetchCreateQuiz = async () => {
      try {
        const quizRef = collection(db, 'CreateQuiz');
        const docRef = doc(quizRef, quizId);
        const quizSnapshot = await getDoc(docRef);
        
        if (quizSnapshot.exists()) {
          const quizData = quizSnapshot.data();
          const { quizTitle, quizDescription } = quizData;
          setQuizTitle(quizTitle);
          setQuizDescription(quizDescription);
          // Use the quizTitle and quizDescription as needed
          console.log('Quiz Title:', quizTitle);
          console.log('Quiz Description:', quizDescription);
        } else {
          console.log('Quiz not found');
        }
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };
    fetchCreateQuiz()
  },[quizId]);

  // Call data from Event
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventRef = collection(db, 'EventDetails');
        const docRef = doc(eventRef, eventId);
        const eventSnapshot = await getDoc(docRef);
        
        if (eventSnapshot.exists()) {
          const eventData = eventSnapshot.data();
          const { eventName } = eventData;
          setEventName(eventName);
          // Use the quizTitle and quizDescription as needed
          console.log('EventName:', eventName);
        } else {
          console.log('Event not found');
        }
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    };
    fetchEvent()
  },[eventId]);

  return (
    <div>
    <NavbarPart 
      participantMatricNo={participantMatricNo}
      eventId={eventId}/>
    <Container style={{ marginTop: '40px' }}>
      <h1 className='text-center mb-3'>{eventName}</h1>
      <h6 className='text-center'>Quiz Title: {quizTitle}</h6>
      <h6 className='text-center'>Quiz Description: {quizDescription}</h6>
      <Row className="justify-content-center" style={{ marginTop: '30px' }}>
        <Col>
          {showResult || completedQuiz ? (
            <Card>
              <Card.Body>
                <Card.Title className='text-center'>Results</Card.Title>
                <Card.Text className='text-center'>{message}</Card.Text>
                {showConfetti && (
                  <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} />
                )}
              </Card.Body>
            </Card>
          ) : (
            <>
              {questions.length > 0 ? (
                <Card>
                  <Card.Body>
                    <Card.Title>{questions[correctAnswers + wrongAnswers]?.quizQuestion}</Card.Title>
                    <Form>
                      <Form.Group>
                        <div className="d-flex flex-column">
                          {questions[correctAnswers + wrongAnswers]?.options?.map((option, index) => (
                            <div className="d-flex align-items-start" key={index}>
                              <Form.Check
                                type="radio"
                                label={option}
                                name="answer"
                                value={option}
                                checked={selectedAnswer === option}
                                onChange={handleAnswerSelection}
                                disabled={completedQuiz} // Disable the radio button if the quiz is already completed
                              />
                            </div>
                          ))}
                        </div>
                      </Form.Group>
                      {validationError && <div className="text-danger">{validationError}</div>}
                    </Form>
                  </Card.Body>
                </Card>
              ) : (
                <div className='text-center'>Loading quiz data...</div>
              )}
            </>
          )}
        </Col>
      </Row>
      {!completedQuiz && correctAnswers + wrongAnswers !== questions.length && (
        <Row className="mt-3">
          <Col className="d-flex justify-content-end">
            <Button
              variant="primary"
              onClick={handleNextQuestion}
              // disabled={completedQuiz} // Disable the button if the quiz is already completed
            >
              {correctAnswers + wrongAnswers === questions.length - 1 ? 'Submit' : 'Next Question'}
            </Button>
          </Col>
        </Row>
      )}
    </Container>
    </div>
  );
}

export default ParticipantPlayQuiz;
