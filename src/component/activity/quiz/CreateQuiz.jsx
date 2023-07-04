import React, { useState, useEffect } from "react";
import { ListGroup, Card, Modal, Form, InputGroup, Row, Col, Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { db } from "../../../firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore";
import NavbarComm from '../../committeeNavbar/NavbarComm';
import QRCode from 'qrcode.react'; // Import the QRCode component

function CreateQuiz() {
  const searchParams = new URLSearchParams(window.location.search);
  const userEmail = searchParams.get('email');
  const eventId = searchParams.get('eventid');
  const [quiz, setQuiz] = useState([]);
  const shareLink = `http://localhost:3000/login?role=Participant&eventid=${eventId}`; // Added 'shareLink' constant
  console.log("useremail", userEmail);
  useEffect(() => {
    const fetchCreateQuiz = async () => {
      const CreateQuizCollectionRef = collection(db, 'CreateQuiz');
      const eventDetailsSnapshot = await getDocs(CreateQuizCollectionRef);

      const QuizData = eventDetailsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      setQuiz(QuizData);
    };

    fetchCreateQuiz();
  }, []);
  
  const [show, setShow] = useState(false);
  const [quizTitle, setQuizTitle] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [quizCards, setQuizCards] = useState([]);
  const quizzesCollectionRef = collection(db, "CreateQuiz");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    // Fetch existing quiz data from the database
    const fetchQuizzes = async () => {
      const querySnapshot = await getDocs(quizzesCollectionRef);
      const quizzesData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        quizzesData.push({
          id: doc.id,
          title: data.quizTitle,
          description: data.quizDescription,
          
          // Add other quiz data fields as needed
        });
      });
      setQuizCards(quizzesData);
    };

    fetchQuizzes();
  }, []);

  // QUIZCREATE
  const handleCreateQuiz = async () => {
    // Check if the quiz already exists in the database
    const quizzesQuery = query(quizzesCollectionRef, where("quizTitle", "==", quizTitle));
    const querySnapshot = await getDocs(quizzesQuery);

    if (querySnapshot.empty) {
      // Quiz does not exist, proceed with adding the data
      await addDoc(quizzesCollectionRef, {
        quizTitle,
        quizDescription,
        eventID: eventId
        // Add other quiz data fields as needed
      });
      handleClose();
      setShowSuccessPopup(true);
      console.log("Quiz created successfully!");
    } else {
      // Quiz already exists, handle accordingly (e.g., display an error message)
      console.log("Quiz already exists in the database");
    }
  };
  
  // QUIZ DELETE
  const handleDeleteQuiz = async (quizId) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      // Delete the quiz document
      await deleteDoc(doc(quizzesCollectionRef, quizId));
      console.log("Quiz deleted successfully!");
  
      // Delete the corresponding data in the "Quiz" table
      const quizTableRef = collection(db, "Quiz");
      const querySnapshot = await getDocs(query(quizTableRef, where("quizID", "==", quizId)));
      querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });
  
      // Update the quiz cards after deleting the quiz
      const updatedQuizCards = quizCards.filter((card) => card.id !== quizId);
      setQuizCards(updatedQuizCards);
    }
  };

  // const handleDeleteQuiz = async (quizId) => {
  //   if (window.confirm("Are you sure you want to delete this quiz?")) {
  //     await deleteDoc(doc(quizzesCollectionRef, quizId));
  //     console.log("Quiz deleted successfully!");
  //     // Update the quiz cards after deleting the quiz
  //     const updatedQuizCards = quizCards.filter((card) => card.id !== quizId);
  //     setQuizCards(updatedQuizCards);
  //   }
  // };

  // Modal POPUP for quiz success
  const handlePopupClose = () => {
    setShowSuccessPopup(false);
    window.location.reload(); // Reload the page after the popup is closed
  };

  // COPYLINK
  const [showCopyModal, setShowCopyModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink).then(() => {
      setCopySuccess(true);
      setShowCopyModal(true);
    });
  };
  const handleCloseCopyModal = () => {
    setShowCopyModal(false);
  };
  // FINISH COPYLINK

  const renderQuiz = (quiz) => {
    return(
    <div>
        <blockquote className="blockquote text-center">
          <Link to={`/activity/?eventid=${eventId}&email=${encodeURIComponent(userEmail)}`}>
            <Button variant="outline-dark" style={{ marginTop: '0px', float: 'left' }}>
              Back
            </Button>
          </Link>
          <br/>
          <h1 className="mb=5" style={{ textAlign: 'center', fontWeight: 'bold', color: 'black', marginTop: '10px', marginLeft: '0%' }}>Quiz</h1>
          <footer>Create Your Own Quiz Here</footer>
        </blockquote>
    </div>
    );
  };

  return (
    <div>
      <NavbarComm 
      eventId={eventId}
      userEmail={userEmail}
      />
    <Container className="p-3">
      {renderQuiz(quiz)}
      <div>
        <Button className="col-12 text-center" style={{ marginBottom: '50px' }} onClick={handleShow}>
          +
        </Button>
      </div>
      <div>
        {/* Popup question */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              Create Quiz
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="quizTitle">
                <Form.Label>Quiz Title:</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    placeholder="Insert your quiz title"
                    aria-describedby="inputGroupPrepend"
                    required
                    value={quizTitle}
                    onChange={(e) => setQuizTitle(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your Quiz Title.
                  </Form.Control.Feedback>
                </InputGroup>
                <Form.Text className="text-muted">
                  Please insert your Quiz Title.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="quizDescription">
                <Form.Label>Description:</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    placeholder="Insert your description"
                    aria-describedby="inputGroupPrepend"
                    required
                    value={quizDescription}
                    onChange={(e) => setQuizDescription(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your description.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-primary" style={{ marginTop: '10px' }} onClick={handleCreateQuiz}>
              Create
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <Container className="justify-content-center">
        <Row xs={1} md={3} className="g-4">
          {quizCards.map((quiz) => (
            <Col key={quiz.id} className="d-flex justify-content-center">
              <Card style={{ width: '18rem' }} >
                <Card.Body>
                  <Card.Title>{quiz.title}</Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>Description: {quiz.description}</ListGroup.Item>
                  {/* <ListGroup.Item>Question Total: {quiz.length}</ListGroup.Item> */}
                </ListGroup>
                <Card.Body>
                  <div style={{ float: 'right' }}>
                    <Link to={`/createquizdetails/?eventid=${eventId}&email=${userEmail}&quizid=${quiz.id}`}>
                      <Button variant="outline-dark text-center" style={{ marginRight: '3px' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                        </svg>
                      </Button>
                    </Link>
                    <Button variant="outline-dark text-center" style={{ marginRight: '3px' }} onClick={() => handleDeleteQuiz(quiz.id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                      </svg>
                    </Button>
                    <Button variant="outline-dark text-center" onClick={handleCopyLink}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-share-fill" viewBox="0 0 16 16">
                        <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5Z" />
                      </svg>
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      {/* Quiz created Modal */}
      <Modal show={showSuccessPopup} onHide={handlePopupClose}>
        <Modal.Header closeButton>
          <Modal.Title>Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your quiz has been created successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary" onClick={handlePopupClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Copy Success Modal */}
      <Modal show={showCopyModal} onHide={handleCloseCopyModal}>
        <Modal.Header closeButton>
          <Modal.Title>Link Copied</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-center">The link has been successfully copied to the clipboard.</p>
          <p className="text-center">Below is the qr code shareable to the participant</p>
          {/* Add the QRCode component */}
          <br/>
          <p style={{ textAlign: 'center', marginTop: '10px' }}>
            <QRCode value={shareLink} size={200} />
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCopyModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>      
      
    </Container>
    </div>
  );
}

export default CreateQuiz;
