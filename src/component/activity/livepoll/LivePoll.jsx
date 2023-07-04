import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Card, Modal, Alert} from 'react-bootstrap';
import { db } from '../../../firebase';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Link, useLocation } from 'react-router-dom';
import QRCode from 'qrcode.react'; // Import the QRCode component
import NavbarComm from '../../committeeNavbar/NavbarComm';

const LivePollCreator = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const userEmail = searchParams.get('email');
  const eventId = searchParams.get('eventid');
  useEffect(() => {

    checkExistingLivePoll();
  }, [eventId]);

  const checkExistingLivePoll = async () => {
    const querySnapshot = await getDocs(query(pollCollectionRef, where('eventID', '==', eventId)));

    if (!querySnapshot.empty) {
      const docData = querySnapshot.docs[0].data();
      setLiveQuestion(docData.liveQuestion);
      setLiveOption1(docData.liveOption1);
      setLiveOption2(docData.liveOption2);
      setPollCreated(true);
    }
  };
  const location = useLocation(); // Added 'location' constant
  const shareLink = `http://localhost:3000/login?role=Participant&eventid=${eventId}`; // Added 'shareLink' constant
  const [liveQuestion, setLiveQuestion] = useState('');
  const [liveOption1, setLiveOption1] = useState('');
  const [liveOption2, setLiveOption2] = useState('');
  const [pollCreated, setPollCreated] = useState(false);
  const [editing, setEditing] = useState(false);
  const pollCollectionRef = collection(db, 'LivePoll');
  const [copySuccess, setCopySuccess] = useState(false);
  
  const handleCreatePoll = async () => {
    await addDoc(pollCollectionRef, {
      liveQuestion,
      liveOption1,
      liveOption2,
      eventID: eventId
      // Add other poll data fields as needed
    });
    console.log('Live Poll created successfully!');
    setPollCreated(true);
  };

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink).then(() => {
      setCopySuccess(true);
      setShowModal(true);
    });
  };

  const handleUpdatePoll = async () => {
  const querySnapshot = await getDocs(query(pollCollectionRef, where('eventID', '==', eventId)));
  if (!querySnapshot.empty) {
    const docId = querySnapshot.docs[0].id;
    const pollDocRef = doc(db, 'LivePoll', docId);
    await updateDoc(pollDocRef, {
      liveQuestion,
      liveOption1,
      liveOption2
      // Update other poll data fields as needed
    });
    console.log('Live Poll updated successfully!');
    setEditing(false);
  }
};

  const handleDeletePoll = async () => {
    if (window.confirm('Are you sure you want to delete this live poll?')) {
      const querySnapshot = await getDocs(query(pollCollectionRef, where('eventID', '==', eventId)));
      if (!querySnapshot.empty) {
        const docId = querySnapshot.docs[0].id;
        const pollDocRef = doc(db, 'LivePoll', docId);
        await deleteDoc(pollDocRef);
        console.log('Live poll deleted successfully!');
        setPollCreated(false);
        setLiveQuestion('');
        setLiveOption1('');
        setLiveOption2('');
      }
    }
  };

  return (
    <div >
      <NavbarComm 
      eventId={eventId}
      userEmail={userEmail}/>
      <Container className='mt-3'>
      <Link to={`/activity/?eventid=${eventId}&email=${encodeURIComponent(userEmail)}`}><Button variant="outline-dark" style={{marginTop:'0px', float:'left', marginBottom:'50px'}}>
        Back
      </Button></Link>
      {pollCreated ? (
        <Card>
          {editing ? (
            <Card.Body>
              <Card.Title>Edit Live Poll</Card.Title>
              <Form>
                <Form.Group className='mb-3'>
                  <Form.Label>Question</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter question'
                    value={liveQuestion}
                    onChange={(e) => setLiveQuestion(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>Option 1</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter option 1'
                    value={liveOption1}
                    onChange={(e) => setLiveOption1(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>Option 2</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter option 2'
                    value={liveOption2}
                    onChange={(e) => setLiveOption2(e.target.value)}
                  />
                </Form.Group>
                {/* Add other poll data fields as needed */}
                <Button variant='primary' onClick={handleUpdatePoll}>
                  Save Changes
                </Button>
                <Button variant='outline-dark ml-2' onClick={() => setEditing(false)}>
                  Cancel
                </Button>
              </Form>
            </Card.Body>
          ) : (
            <Card.Body>
              <Card.Title>Live Poll Created</Card.Title>
              <Card.Text>
                Question: {liveQuestion}
                <br />
                Option 1: {liveOption1}
                <br />
                Option 2: {liveOption2}
                {/* Add other poll data fields as needed */}
              </Card.Text>
              <div style={{ float: 'right' }}>
                <Button variant='outline-dark text-center' style={{ marginRight: '3px' }} onClick={() => setEditing(true)}>
                  <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-pencil' viewBox='0 0 16 16'>
                    <path d='M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z' />
                  </svg>
                </Button>
                <Button variant="outline-dark text-center" style={{ marginRight: '3px' }} onClick={() => handleDeletePoll()}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                  </svg>
                </Button>
              </div>
            </Card.Body>
          )}
        </Card>
      ) : (
        <Card>
          <Card.Body>
            <Card.Title>Create Live Poll</Card.Title>
            <Form>
              <Form.Group className='mb-3'>
                <Form.Label>Question</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter question'
                  value={liveQuestion}
                  onChange={(e) => setLiveQuestion(e.target.value)}
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Option 1</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter option 1'
                  value={liveOption1}
                  onChange={(e) => setLiveOption1(e.target.value)}
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Option 2</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter option 2'
                  value={liveOption2}
                  onChange={(e) => setLiveOption2(e.target.value)}
                />
              </Form.Group>
              {/* Add other poll data fields as needed */}
              <Button variant='primary' onClick={handleCreatePoll}>
                Create Poll
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}
      {pollCreated && (
        <Card className="mt-4">
          {/* Add the QRCode component */}
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <QRCode value={shareLink} size={200} />
          </div>
          <Card.Header as="h5">Share Live Poll</Card.Header>
          <Card.Body>
            <Card.Text>Share the live poll link with participants:</Card.Text>
            <Form.Control type="text" value={shareLink} readOnly />
            <Button variant="primary" onClick={handleCopyLink} style={{marginTop:'10px', float:'right'}}>
              Copy Link
            </Button>
            {copySuccess && (
              <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Share Poll Link</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Alert variant="success" className='text-center'> 
                    Poll link copied to clipboard. Share this link with participants:
                    <br />
                  </Alert>
                </Modal.Body>
              </Modal>
            )}
          </Card.Body>
        </Card>
      )}
      </Container>
    </div>
  );
};

export default LivePollCreator;
