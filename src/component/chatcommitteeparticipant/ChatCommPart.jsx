import React, { useState, useEffect } from 'react';
import { Container, Form, Button, ListGroup } from 'react-bootstrap';
import NavbarPart from '../participant/NavbarPart';
import { addDoc, 
         collection, 
         onSnapshot, 
         serverTimestamp,
         query,
         where, 
         orderBy
        } from 'firebase/firestore';
import { db } from '../../firebase'

function ChatCommPart(){
  const searchParams = new URLSearchParams(window.location.search);
  const eventId = searchParams.get('eventid');
  const participantMatricNo = searchParams.get('matricno');
  const [newMessage, setNewMessage] = useState("");
  const messageRef = collection(db, "Messages")
  const [username, setUsername] = useState(""); // State to store the username
  const [MatricNo, setMatricNo] = useState(""); // State to store the username
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const queryMessages = query(messageRef, where("eventId", "==", eventId), orderBy("createdAt"));
    const unsubscribe = onSnapshot(queryMessages, (snapshot) =>{
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({...doc.data(), id: doc.id})
      });
      setMessages(messages);    
    });
    return () => unsubscribe();
  }, [])

  // start to get cookie
  useEffect(() => {
    // Retrieve the cookie value
    const cookieValue = getCookie("loggedInUser"); // Replace "your_cookie_name" with the actual cookie name

    // Parse the cookie value and extract the username
    const cookieObject = JSON.parse(decodeURIComponent(cookieValue));
    const usernameFromCookie = cookieObject.username;
    const matricnoFromCookie = cookieObject.matricno;

    // Set the username state
    setUsername(usernameFromCookie);
    setMatricNo(matricnoFromCookie)
  }, []);
   // Function to get the value of a cookie by its name
   function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  // end to get cookie

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(newMessage === "") return;

    await addDoc(messageRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      username: username,
      eventId
    });

    setNewMessage("")
  };

  return (
    <div style={{height: '100vh'}}>
      <NavbarPart participantMatricNo={participantMatricNo} eventId={eventId} />
      <Container>
        <div>
          <h1 className='mt-3 text-center mb-3'>Welcome to Chat {username}!</h1>
        </div>
        <ListGroup style={{ overflow: 'auto', maxHeight: '70vh', wordWrap: 'break-word' }}>
          {messages.map((message) => (
            <ListGroup.Item key={message.id}>
              <strong>{message.username} {MatricNo}</strong>: {message.text}
            </ListGroup.Item>
          ))}
        </ListGroup>
        <Form onSubmit={handleSubmit} className='mb-5' style={{ display: 'flex', alignItems: 'flex-end' }}>
          <div style={{ flexGrow: 1, marginRight: '1rem' }}>
            <Form.Control
              type="text"
              placeholder="Type your message here"
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
            />
          </div>
          <Button type="submit" className="mt-2" style={{ width: '100px' }}>
            Send
          </Button>
        </Form>
      </Container>
    </div>
  );
  // return (
  //   <div>
  //     <NavbarPart 
  //     participantMatricNo={participantMatricNo}
  //     eventId={eventId}/>
  //     <Container>
  //       <div>
  //         <h1>Welcome to Chat!</h1>
  //       </div>
  //     {/* <div>{messages.map((message) => <h1 key={message.id}>{message.text}</h1>)}</div> */}
  //       <div>{messages.map((message) => 
  //         <div key={message.id}>
  //           <span>{message.username}</span>
  //           {message.text}
  //         </div>)}
  //       </div>
  //       <Form onSubmit={handleSubmit}>
  //         <input 
  //         type="text" 
  //         placeholder='Type your message here'
  //         onChange={(e) => setNewMessage(e.target.value)}
  //         value={newMessage}
  //         />
  //         <Button type="submit" >
  //           Send
  //         </Button>
  //       </Form>
  //     </Container>
  //   </div>
  // );
};

export default ChatCommPart;