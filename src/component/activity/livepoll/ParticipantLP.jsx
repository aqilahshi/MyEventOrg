import React, { useState, useEffect } from 'react';
import { Container, Card, Form } from 'react-bootstrap';
import { db } from '../../../firebase';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import NavbarPart from '../../participant/NavbarPart';

function LivePollParticipant() {
  const searchParams = new URLSearchParams(window.location.search);
  const eventId = searchParams.get('eventid');
  const participantMatricNo = searchParams.get('matricno');
  console.log('eventID:', eventId);
  console.log('matricno:', participantMatricNo);
  const navigate = useNavigate();
  const [liveQuestion, setLiveQuestion] = useState('');
  const [liveOption1, setLiveOption1] = useState('');
  const [liveOption2, setLiveOption2] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [noLivePoll, setNoLivePoll] = useState(false);

  useEffect(() => {
    if (eventId) {
      fetchLivePollData();
    } else {
      setNoLivePoll(true);
    }
  }, [eventId]);
  

  const fetchLivePollData = async () => {
    const pollCollectionRef = collection(db, 'LivePoll');
    const querySnapshot = await getDocs(query(pollCollectionRef, where('eventID', '==', eventId)));
  
    if (!querySnapshot.empty) {
      const docData = querySnapshot.docs[0].data();
      setLiveQuestion(docData.liveQuestion);
      setLiveOption1(docData.liveOption1);
      setLiveOption2(docData.liveOption2);
      setNoLivePoll(false); // Set noLivePoll to false when a live poll is found
    } else {
      setNoLivePoll(true);
      setLiveQuestion('');
      setLiveOption1('');
      setLiveOption2('');
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const participantResponse = {
      participantLiveOption: selectedOption,
    };

    const participantCollectionRef = collection(db, 'Participant');
    const querySnapshot = await getDocs(
      query(participantCollectionRef, where('participantMatricNo', '==', participantMatricNo), where('eventID', '==', eventId))
    );

    if (!querySnapshot.empty) {
      const participantDocRef = querySnapshot.docs[0].ref;

      try {
        await updateDoc(participantDocRef, participantResponse);
        console.log('Participant response updated successfully!');
        navigate(`/resultlivepoll?eventid=${encodeURIComponent(eventId)}&matricno=${encodeURIComponent(participantMatricNo)}`);
      } catch (error) {
        console.log('Error recording participant response:', error);
      }
    } else {
      console.log('Participant not found for the given matric number and event ID.');
    }
  };

  //Check if participant already submit redirect to next page
  useEffect(() => {
    if (eventId) {
      fetchLivePollData();
      checkParticipantResponse();
    } else {
      setNoLivePoll(true);
    }
  }, [eventId]);
  
  const checkParticipantResponse = async () => {
    const participantCollectionRef = collection(db, 'Participant');
    const querySnapshot = await getDocs(
      query(
        participantCollectionRef,
        where('participantMatricNo', '==', participantMatricNo),
        where('eventID', '==', eventId)
      )
    );
  
    if (!querySnapshot.empty) {
      const participantDoc = querySnapshot.docs[0];
      const participantData = participantDoc.data();
      const participantResponse = participantData.participantLiveOption;
  
      if (participantResponse) {
        navigate(`/resultlivepoll?eventid=${encodeURIComponent(eventId)}&matricno=${encodeURIComponent(participantMatricNo)}`);
      }
    }
  };
  
  
  return (
    <div>
    <NavbarPart 
      participantMatricNo={participantMatricNo}
      eventId={eventId}/>
    <Container className='mt-5'>
      {noLivePoll ? (
        <Card>
          <Card.Body>
            <Card.Text>No Live Poll Created for this event. Until next time!</Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <Card>
          <Card.Body>
            <Card.Title>Live Poll</Card.Title>
            {liveQuestion && (
              <>
                <Card.Text>
                  Question: {liveQuestion}
                  <br />
                  Option 1: {liveOption1}
                  <br />
                  Option 2: {liveOption2}
                </Card.Text>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className='mb-3'>
                    <Form.Label>Choose an option:</Form.Label>
                    <Form.Check
                      type='radio'
                      label={liveOption1}
                      name='liveOption'
                      value={liveOption1}
                      checked={selectedOption === liveOption1}
                      onChange={handleOptionChange}
                    />
                    <Form.Check
                      type='radio'
                      label={liveOption2}
                      name='liveOption'
                      value={liveOption2}
                      checked={selectedOption === liveOption2}
                      onChange={handleOptionChange}
                    />
                  </Form.Group>
                  <button type='submit' className='btn btn-primary'>
                    Submit
                  </button>
                </Form>
              </>
            )}
          </Card.Body>
        </Card>
      )}
    </Container>
    </div>
  );
  
}

export default LivePollParticipant;
