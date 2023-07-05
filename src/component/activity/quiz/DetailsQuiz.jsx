import {React, useState, useEffect} from 'react';
import { ListGroup, Card, Modal, Form, InputGroup, Row, Col, Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { db } from "../../../firebase";
import { useParams } from 'react-router-dom';
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";
import NavbarComm from '../../committeeNavbar/NavbarComm';

function DetailsQuiz(){
  const searchParams = new URLSearchParams(window.location.search);
  const quizID = searchParams.get('quizid');
  const eventId = searchParams.get('eventid');
  const userEmail = searchParams.get('email');
  console.log('EventID:' , eventId);
  console.log('QuizID:' , quizID);
  const [show, setShow] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [quizQuestion, setquestion] = useState("");
  const [quizOption1, setoption1] = useState("");
  const [quizOption2, setoption2] = useState("");
  const [quizOption3, setoption3] = useState("");
  const [quizOption4, setoption4] = useState("");
  const [quizCorrectAns, setanswer] = useState("");
  const [quizCards, setQuizCards] = useState([]);
  const [editingQuizId, setEditingQuizId] = useState(null); // Track the quiz being edited
  const quizzesCollectionRef = collection(db, "Quiz");
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setEditingQuizId(null); // Reset the editingQuizId when the modal is closed
  };
  const [showDuplicateMessage, setShowDuplicateMessage] = useState(false); // State variable for duplicate message

  const handlePopupClose = () => {
    setShowSuccessPopup(false);
    window.location.reload(); // Reload the page after the popup is closed
  };

  const handleCreateQuiz = async () => {
    // Check if the quiz already exists in the database
    const quizzesQuery = query(quizzesCollectionRef, where("quizQuestion", "==", quizQuestion));
    const querySnapshot = await getDocs(quizzesQuery);
  
    // Check if the quiz question already exists in the database
    if (querySnapshot.size === 0) {
      // Quiz does not exist, proceed with adding the data
  
      // Check if any of the options are duplicate
      const options = [quizOption1, quizOption2, quizOption3, quizOption4];
      const duplicateOption = options.find((option, index) => options.indexOf(option) !== index);
  
      if (duplicateOption) {
        console.log("Duplicate option found:", duplicateOption);
        setShowDuplicateMessage(true);
        return; // Exit the function if duplicate option found
      }
      
      await addDoc(quizzesCollectionRef, {
        quizQuestion,
        quizOption1,
        quizOption2,
        quizOption3,
        quizOption4,
        quizCorrectAns,
        quizID: quizID
        // Add other quiz data fields as needed
      });
      handleClose();
      setShowSuccessPopup(true);
      setShowDuplicateMessage(false);
      console.log("Quiz created successfully!");
    } else {
      // Quiz already exists, handle accordingly (e.g., display an error message)
      console.log("Quiz already exists in the database");
    }
  };

  const handleDeleteQuiz = async (quizId) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      // await deleteDoc(doc(quizzesCollectionRef, quizId));

      // Delete the corresponding data in the "Quiz" table
      const quizTableRef = collection(db, "Quiz");
      const querySnapshot = await getDocs(query(quizTableRef, where("id", "==", quizId)));
      querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      console.log("Quiz deleted successfully!");

      });

      // Update the quiz cards after deleting the quiz
      setQuizCards(prevCards => prevCards.filter((card) => card.id !== quizId));
    }
  };
  
  // const handleEditQuiz = async (quizId) => {
  //   // Find the quiz card being edited
  //   const quizCard = quizCards.find((card) => card.id === quizId);
  
  // const handleEditQuiz = async (quizId) => {
  //   // Find the quiz card being edited
  //   const quizCard = quizCards.find((card) => card.id === quizId);
  
  //   if (quizCard) {
  //     // Set the values of the quiz being edited in the state variables
  //     setquestion(quizCard.quizQuestion);
  //     setoption1(quizCard.quizOption1);
  //     setoption2(quizCard.quizOption2);
  //     setoption3(quizCard.quizOption3);
  //     setoption4(quizCard.quizOption4);
  //     setanswer(quizCard.quizCorrectAns);
  //     setEditingQuizId(quizId); // Set the editingQuizId to the id of the quiz being edited
  //     setShow(true); // Open the modal for editing the quiz
  //   }
  // };
  const handleEditQuiz = async (quizId) => {
    // Create a query to find the quiz card with the specified ID
    const quizTableRef = collection(db, "Quiz");
    const q = query(quizTableRef, where("id", "==", quizId));
  
    try {
      // Execute the query and get the matching documents
      const querySnapshot = await getDocs(q);
  
      // Check if any documents were found
      if (!querySnapshot.empty) {
        // Get the first matching document
        const quizDoc = querySnapshot.docs[0];
        const quizData = quizDoc.data();
  
        // Set the values of the quiz being edited in the state variables
        setquestion(quizData.quizQuestion);
        setoption1(quizData.quizOption1);
        setoption2(quizData.quizOption2);
        setoption3(quizData.quizOption3);
        setoption4(quizData.quizOption4);
        setanswer(quizData.quizCorrectAns);
        setEditingQuizId(quizData.id); // Set the editingQuizId to the id of the quiz being edited
        setShow(true); // Open the modal for editing the quiz
      } else {
        console.log("Document does not exist");
      }
    } catch (error) {
      console.log("Error getting documents:", error);
    }
  };
  
  const handleUpdateQuiz = async () => {
    // Check if any of the options are duplicate
    const options = [quizOption1, quizOption2, quizOption3, quizOption4];
    const duplicateOption = options.find((option, index) => options.indexOf(option) !== index);
  
    if (duplicateOption) {
      console.log("Duplicate option found:", duplicateOption);
      setShowDuplicateMessage(true);
      return; // Exit the function if duplicate option found
    }
  
    // Update the quiz in the database
    const quizRef = doc(quizzesCollectionRef, editingQuizId);
    await updateDoc(quizRef, {
      quizQuestion,
      quizOption1,
      quizOption2,
      quizOption3,
      quizOption4,
      quizCorrectAns,
      // Add other quiz data fields as needed
    });
    handleClose();
    setShowSuccessPopup(true);
    setShowDuplicateMessage(false);
    console.log("Quiz updated successfully!");
  };

  useEffect(() => {
    const fetchQuizData = async () => {
      const q = query(collection(db, 'Quiz'), where('quizID', '==', quizID));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.size > 0) {
        const documents = querySnapshot.docs.map((doc) => doc.data());
        setQuizCards(documents);
        console.log('Quizzes found with the specified quizID');
      } else {
        console.log('No quizzes found with the specified quizID');
      }
    };

    fetchQuizData();
  }, []);

  // const quizRef = doc(db, "Quiz", quizID);
  // useEffect(() => {
  //   const fetchQuizzes = async () => {
  //     const docSnapshot = await getDoc(quizRef);
  //     if (docSnapshot.exists()) {
  //       const data = docSnapshot.data();
  //       setquestion(data.quizQuestion);
  //       setoption1(data.quizOption1);
  //       setoption2(data.quizOption2);
  //       setoption3(data.quizOption3);
  //       setoption4(data.quizOption4);
  //       setanswer(data.quizCorrectAns);
  //       console.log("Quiz found in the database");
  //     } else {
  //       console.log("Quiz not found in the database");
  //     }
  //   };

  //   fetchQuizzes();
  // }, [quizRef]);

  // useEffect(() => {
  //   // Fetch existing quiz data from the database
  //   const fetchQuizzes = async () => {
  //     const querySnapshot = await getDocs(quizzesCollectionRef);
  //     const quizzesData = [];
  //     querySnapshot.forEach((doc) => {
  //       const data = doc.data();
  //       quizzesData.push({
  //         id: doc.id,
  //         quizQuestion: data.quizQuestion,
  //         quizOption1: data.quizOption1,
  //         quizOption2: data.quizOption2,
  //         quizOption3: data.quizOption3,
  //         quizOption4: data.quizOption4,
  //         quizCorrectAns: data.quizCorrectAns,
  //         // Add other quiz data fields as needed
  //       });
  //     });
  //     setQuizCards(quizzesData);
  //   };

  //   fetchQuizzes();
  // }, []);

  // Call CreateQuiz Data
  const [quizDescription, setQuizDescription] = useState(null);
  const [quizTitle, setQuizTitle] = useState('');

  useEffect(() => {
    const fetchQuizData = async () => {
      const quizDocRef = doc(db, 'CreateQuiz', quizID);
      const docSnapshot = await getDoc(quizDocRef);

      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        setQuizTitle(data.quizTitle);
        setQuizDescription(data.quizDescription);
      } else {
        console.log('Quiz not found in the database');
      }
    };

    fetchQuizData();
  }, [quizID]);

  return(
    <div>
    <NavbarComm 
      eventId={eventId}
      userEmail={userEmail}
      />
    <Container>
    <blockquote className="blockquote text-center">
      <Link to={`/createquiz/?eventid=${eventId}&email=${userEmail}`}><Button variant="outline-dark" style={{marginTop:'10px', float:'left'}}>
        Back
      </Button></Link>
      <br/>
      <h1 className="mb=5" style={{textAlign: 'center', fontWeight: 'bold', color: 'black', marginTop:'10px'}}>{quizTitle}</h1>
      <footer className='text-center'>{quizDescription}</footer>
      </blockquote>
      <div>
      <Button className="col-12 text-center" style={{marginBottom:'50px'}} onClick={handleShow}>
        +
      </Button>
    </div>
    <div>
      {/* Popup question */}
      <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {editingQuizId ? "Edit Quiz" : "Create Quiz"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
                  <Form.Label>Quiz Question:</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="text"
                      placeholder="Insert your quiz question"
                      aria-describedby="inputGroupPrepend"
                      required
                      value={quizQuestion}
                      onChange={(e) => setquestion(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter your Quiz question.
                    </Form.Control.Feedback>
                  </InputGroup>
                  <Form.Text className="text-muted">
                  Please insert your quiz question.
                  </Form.Text>    
                  </Form.Group>
              <Form.Group className="mb-3">
                  <Form.Label>Option 1:</Form.Label>
                  <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    placeholder="Insert option"
                    aria-describedby="inputGroupPrepend"
                    required
                    value={quizOption1}
                    onChange={(e) => setoption1(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your description.
                  </Form.Control.Feedback>
                </InputGroup>    
              </Form.Group>
              <Form.Group className="mb-3">
                  <Form.Label>Option 2:</Form.Label>
                  <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    placeholder="Insert option"
                    aria-describedby="inputGroupPrepend"
                    required
                    value={quizOption2}
                    onChange={(e) => setoption2(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your description.
                  </Form.Control.Feedback>
                </InputGroup>    
              </Form.Group>
              <Form.Group className="mb-3">
                  <Form.Label>Option 3:</Form.Label>
                  <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    placeholder="Insert option"
                    aria-describedby="inputGroupPrepend"
                    required
                    value={quizOption3}
                    onChange={(e) => setoption3(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your description.
                  </Form.Control.Feedback>
                </InputGroup>    
              </Form.Group>
              <Form.Group className="mb-3">
                  <Form.Label>Option 4:</Form.Label>
                  <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    placeholder="Insert option"
                    aria-describedby="inputGroupPrepend"
                    required
                    value={quizOption4}
                    onChange={(e) => setoption4(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your description.
                  </Form.Control.Feedback>
                </InputGroup>    
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Correct Answer:</Form.Label>
                <Form.Select
                  aria-label="Select correct answer"
                  required
                  value={quizCorrectAns}
                  onChange={(e) => setanswer(e.target.value)}
                >
                  <option value="">Select the correct answer option</option>
                  <option value={quizOption1}>Option 1</option>
                  <option value={quizOption2}>Option 2</option>
                  <option value={quizOption3}>Option 3</option>
                  <option value={quizOption4}>Option 4</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Please select a correct answer.
                </Form.Control.Feedback>
              </Form.Group>
          </Form>
          </Modal.Body>
          <Modal.Footer>
            {showDuplicateMessage && <span className="text-danger ml-2">Duplicate option answers</span>}
            <Button variant="outline-primary" style={{marginTop: '10px'}} onClick={editingQuizId ? handleUpdateQuiz : handleCreateQuiz}>
              {editingQuizId ? "Update" : "Create"}
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
                  <Card.Title>{quiz.quizQuestion}</Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>A: {quiz.quizOption1}</ListGroup.Item>
                  <ListGroup.Item>B: {quiz.quizOption2}</ListGroup.Item>
                  <ListGroup.Item>C: {quiz.quizOption3}</ListGroup.Item>
                  <ListGroup.Item>D: {quiz.quizOption4}</ListGroup.Item>
                  <ListGroup.Item>Correct Answer: {quiz.quizCorrectAns}</ListGroup.Item>
                </ListGroup>
                <Card.Body>
                  <div style={{ float: 'right' }}>
                      <Button variant="outline-dark text-center" style={{ marginRight: '3px' }} onClick={() => handleEditQuiz(quiz.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                        </svg>
                      </Button>
                    <Button variant="outline-dark text-center" style={{ marginRight: '3px' }} onClick={() => handleDeleteQuiz(quiz.id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                      </svg>
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    <Modal show={showSuccessPopup} onHide={handlePopupClose}>
        <Modal.Header closeButton>
          <Modal.Title>Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your question has been created successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary" onClick={handlePopupClose}>
            Close
          </Button>
        </Modal.Footer>
    </Modal>
    <br/>
    </Container>
    </div>
  )
}

export default DetailsQuiz;