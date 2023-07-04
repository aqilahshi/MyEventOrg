import React from 'react';
import NavbarPart from './NavbarPart';
import { Container } from 'react-bootstrap';

function ParticipantPage() {
  const searchParams = new URLSearchParams(window.location.search);
  const eventId = searchParams.get('eventid');
  const participantMatricNo = searchParams.get('matricno');
  return (
    <div>
      <NavbarPart
      eventId={eventId}
      participantMatricNo={participantMatricNo} 
      />
      <Container>
        <h1 className='text-center' style={{marginTop:"200px"}}>Welcome to MyEventOrg</h1>
        <h3 className='text-center' >
         😄 Please select your desired page using the navbar provided. 😄
         </h3>
      </Container>
    </div>
  );
};

export default ParticipantPage;