import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap';
import { useState, useEffect } from "react";
import { db } from '../../firebase';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

const AddNewAdmin = () => {
    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [username, setusername] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const navigate = useNavigate();

    const Submit = async (y) => {
    y.preventDefault();

    const currentDate = new Date();
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
        timeZone: "Asia/Singapore", // Use your desired time zone
        timeZoneName: "short",
      };
    const datecreated = currentDate.toLocaleString("en-US", options);

    const role = "Admin";

    const confirmed = window.confirm("Are you sure you want to add this admin?");

    if (confirmed) {
      try {
        const docRef = await addDoc(collection(db, "User"), {
          firstname: firstname,
          lastname: lastname,
          username: username,
          email: email,
          password: password,
          role: role,
          datecreated: datecreated,
        });
        console.log("Document written with ID: ", docRef.id);
        alert("Success: Admin added."); // Display success message
        navigate("/manageadmin"); // Redirect to /manageadmin page
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
};


  const [todos, setTodos] = useState([]);

  const fetchPost = async () => {

    await getDocs(collection(db, "User"))
      .then((querySnapshot) => {
        const newData = querySnapshot.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }));
        setTodos(newData);
        console.log(todos, newData);
      })
  }

  useEffect(() => {
    fetchPost();
  }, []);


  return (
    <div className="vendorpage">
      <h4>Add New Admin</h4>
      <div className="form-section">
        <div>
          <Form onSubmit={Submit}>
            <Row className="mb-3">
                <Col>
                    <Form.Group as={Col} controlId="firstname">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                        type="text"
                        // placeholder="Enter first name"
                        onChange={(e) => setfirstname(e.target.value)}
                        value={firstname} required 
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group as={Col} controlId="lastname">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                        type="text"
                        // placeholder="Enter last name"
                        onChange={(e) => setlastname(e.target.value)}
                        value={lastname} required 
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Form.Group as={Col} controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                        type="text"
                        // placeholder="Enter username"
                        onChange={(e) => setusername(e.target.value)}
                        value={username} required 
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group as={Col} controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                        type="text"
                        // placeholder="Enter password"
                        onChange={(e) => setpassword(e.target.value)}
                        value={password} required 
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Form.Group as={Col} controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                    type="email"
                    // placeholder="Enter email"
                    onChange={(e) => setemail(e.target.value)}
                    value={email} required 
                    />
                </Form.Group>
            </Row>
            <br/>
            <Button variant="secondary" type="submit">Submit</Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddNewAdmin;