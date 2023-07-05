import React, { useEffect, useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { collection, addDoc, query, where, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { useLocation } from 'react-router-dom';

const Chat = () => {
  const location = useLocation();
  const navigate = useLocation();

  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const sessionID = searchParams.get('sessionID');
    const vendorID = searchParams.get('vendorID');

    const chatRef = collection(db, 'VEChat'); // Replace 'VEChat' with the actual collection name

    // Create a query to fetch the chat messages
    const chatQuery = query(
      chatRef,
      where('sessionID', '==', sessionID),
      where('vendorID', '==', vendorID),
      orderBy('timestamp')
    );

    const unsubscribe = onSnapshot(chatQuery, (snapshot) => {
      const messages = snapshot.docs.map((doc) => doc.data());
      setChatMessages(messages);
    });

    return () => {
      // Unsubscribe from the listener when the component unmounts
      unsubscribe();
    };
  }, [location.search]);

  const handleSendMessage = async () => {
    const searchParams = new URLSearchParams(location.search);
    const sessionID = searchParams.get('sessionID');
    const vendorID = searchParams.get('vendorID');

    const chatRef = collection(db, 'VEChat'); // Replace 'VEChat' with the actual collection name

    // Create a new chat message document
    await addDoc(chatRef, {
      sessionID: sessionID,
      vendorID: vendorID,
      message: message,
      timestamp: serverTimestamp()
    });

    setMessage('');
    navigate(`/chatpage?sessionID=${sessionID}&vendorID=${vendorID}`);
  };

  return (
    <Card>
      <Card.Body>
        {/* Display the chat messages */}
        {chatMessages.map((chatMessage, index) => (
          <p key={index}>
            {chatMessage.sender}: {chatMessage.message}
          </p>
        ))}
      </Card.Body>
      <Card.Footer>
        <Form onSubmit={handleSendMessage}>
          <Form.Control
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button variant="primary" type="submit">
            Send
          </Button>
        </Form>
      </Card.Footer>
    </Card>
  );
};

export default Chat;
