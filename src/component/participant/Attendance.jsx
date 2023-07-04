import React from 'react';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { db } from "../../firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

function Attendance() {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const email1 = searchParams.get('email');
  const eventId = searchParams.get('eventid');
  console.log('email:', email1);
  console.log('eventId:', eventId);
  const usersCollectionRef = collection(db, "Participant");
  const [newName, setNewName] = useState("");
  const [newMatNo, setNewMatNo] = useState(0);
  const [newPhone, setPhone] = useState(0);
  const [newStudy, setStudy] = useState(0);
  const [newSchool, setSchool] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    checkUserExistence();
  }, []);
  
  const checkUserExistence = async () => {
    const usersQuery = query(
      usersCollectionRef,
      where("participantEmail", "==", email1),
      where("eventID", "==", eventId)
    );
    const querySnapshot = await getDocs(usersQuery);

    if (!querySnapshot.empty) {
      const participant = querySnapshot.docs[0].data();
      const participantMatricNo = participant.participantMatricNo;
      navigate(`/participantpage?eventid=${encodeURIComponent(eventId)}&matricno=${encodeURIComponent(participantMatricNo)}`);
    }
  };

  const createUser = async (e) => {
    e.preventDefault(); // Prevent form submission

    try {
      await addDoc(usersCollectionRef, {
        participantUsername: newName,
        participantEmail: email1,
        participantMatricNo: newMatNo,
        participantPhoneNo: newPhone,
        participantYear: newStudy,
        participantSchool: newSchool,
        eventID: eventId
      });

      navigate(`/participantpage?eventid=${encodeURIComponent(eventId)}&matricno=${encodeURIComponent(newMatNo)}`);
    } catch (error) {
      setError("Failed to create user. Please try again.");
    }
  };

  
  return (
    <div className='container attendance p-3'>
        <blockquote className="mt-5 blockquote text-center">
        <p>Email: {email1}</p>
            <h1 className="mt-5 mb=0">Welcome to MyEventOrg</h1>
            <footer>Please enter below details for your attendance record.</footer>
        </blockquote>
        {error && <p className="text-danger">{error}</p>}
        <Form>
        <Form.Group className="mb-3">
            <Form.Label>Your Username</Form.Label>
            <InputGroup hasValidation>
            <Form.Control
              type="text"
              placeholder="Insert your username"
              aria-describedby="inputGroupPrepend"
              required
              onChange={(event) => { 
                setNewName(event.target.value);
              }}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a proper username.
            </Form.Control.Feedback>
          </InputGroup>
            <Form.Text className="text-muted">
            Please insert a proper username.
            </Form.Text>
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Your email'
            className='bg-secondary text-white'
            value={email1 || ''}
            readOnly
          />
          <Form.Text className='text-muted'>
            We'll never share your email with anyone else.
          </Form.Text>        
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Matric number</Form.Label>
            <InputGroup hasValidation>
            <Form.Control
              type="text"
              placeholder="Insert matric number"
              aria-describedby="inputGroupPrepend"
              required
              onChange={(event) => { 
                setNewMatNo(event.target.value);
              }}
            />
            <Form.Control.Feedback type="invalid">
              Please enter your matric number.
            </Form.Control.Feedback>
          </InputGroup>
            <Form.Text className="text-muted">
            Please enter your matric number.
            </Form.Text>
        </Form.Group>
        {/* Phone number form */}
        <Form.Group md="4" className="mb-3" controlId="validationCustomUsername">
          <Form.Label>Phone number</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">+60</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Insert phone number"
              aria-describedby="inputGroupPrepend"
              required
              onChange={(event) => { 
                setPhone( '60' + event.target.value);
              }}
            />
            <Form.Control.Feedback type="invalid">
              Please enter your phone number.
            </Form.Control.Feedback>
          </InputGroup>
          <Form.Text className="text-muted">
            Please enter your phone number.
            </Form.Text>
        </Form.Group>
        {/* Select Year of Study */}
        <Form.Group className="mb-3">
            <Form.Label>Year of Study</Form.Label>
            <Form.Select 
              aria-label="Default select example"
              onChange={(event) => { 
                setStudy(event.target.value);
              }}
            >
                <option>--Select Year of Study--</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </Form.Select>
        </Form.Group>
        {/* Select school */}
        <Form.Group className="mb-3">
            <Form.Label>School</Form.Label>
            <Form.Select aria-label="Default select example"
              onChange={(event) => { 
                setSchool(event.target.value);
              }}
            >
                <option>--Select School--</option>

                <option value="School of Housing, Building and Planning">School of Housing, Building and Planning</option>
                <option value="School of Industrial Technology">School of Industrial Technology</option>
                <option value="School of Pharmaceutical Sciences">School of Pharmaceutical Sciences</option>
                <option value="School of Computer Sciences">School of Computer Sciences</option>

                <option value="School of Educational Studies">School of Educational Studies</option>
                <option value="School of Management">School of Management</option>
                <option value="Graduate School of Business">Graduate School of Business (GSB)</option>
                <option value="School of Communication">School of Communication</option>
                <option value="School of the Art">School of the Art</option>

                <option value="School of Languages, Literacies and Translation">School of Languages, Literacies and Translation</option>
                <option value="School of Humanities">School of Humanities</option>
                <option value="School of Social Sciences">School of Social Sciences</option>

                <option value="School of Biological Sciences">School of Biological Sciences</option>
                <option value="School of Chemical Sciences">School of Chemical Sciences</option>
                <option value="School of Mathematical Sciences">School of Mathematical Sciences</option>
                <option value="School of Physics">School of Physics</option>

                <option value="School of Distance Education">School of Distance Education</option>
                <option value="Institute of Postgraduate Studies">Institute of Postgraduate Studies</option>
                <option value="Centre for Development of Academic Excellence &amp; Student Development (CDAE)">Centre for Development of Academic Excellence &amp; Student Development (CDAE)</option>

                <option value="School of Electrical and Electronic Engineering">School of Electrical and Electronic Engineering</option>
                <option value="School of Materials and Mineral Resources Engineering">School of Materials and Mineral Resources Engineering</option>
                <option value="School of Aerospace Engineering">School of Aerospace Engineering</option>
                <option value="School of Chemical Engineering">School of Chemical Engineering</option>
                <option value="School of Civil Engineering">School of Civil Engineering</option>
                <option value="School of Mechanical Engineering">School of Mechanical Engineering</option>

                <option value="School of Health Sciences">School of Health Sciences</option>
                <option value="School of Medical Sciences">School of Medical Sciences</option>
                <option value="School of Dental Sciences">School of Dental Sciences</option>

                <option value="School of Computer Science">School of Computer Science</option>
                <option value="School of Chemical Science">School of Chemical Science</option>
                <option value="School of Mathematics">School of Mathematics</option>
                <option value="School of Pharmacy">School of Pharmacy</option>
                <option value="School of Physics">School of Physics</option>
                <option value="School of Language and Literature">School of Language and Literature</option>
                <option value="School of Art">School of Art</option>

            </Form.Select>
        </Form.Group>
        <p></p>
        <Button variant="primary" type="submit" onClick={createUser}> 
            Submit
        </Button>
        </Form>
        {error && <p>{error}</p>}
    </div>
  );
}

export default Attendance;