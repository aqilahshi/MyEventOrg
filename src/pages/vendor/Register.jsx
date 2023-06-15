import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Row, Col } from 'react-bootstrap';
import { useState, useEffect } from "react";
import { db } from '../../firebase';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { Link } from 'react-router-dom';
// import VendorSidebar from '../../component/vendor/Sidebar';


import "./Vendor.css"; // Import custom CSS file for additional styling

const Register = () => {
  const [Status, setStatus] = useState("Enabled");
  const [Visibility, setVisibility] = useState("Visible");
  const [MStock, setMStock] = useState("Yes");
  const [SAvailability, setSAvailability] = useState("Yes");

  const [vendorname, setVendorName] = useState("");

  const Submit = async (y) => {
    y.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "vendor"), {
        vendorname: vendorname,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (y) {
      console.error("Error adding document: ", y);
    }
  };

  const [todos, setTodos] = useState([]);

  const fetchPost = async () => {

    await getDocs(collection(db, "vendor"))
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


  const onOptionChange = e => {
    setStatus(e.target.value);
  };

  const [currentFile, setFile] = React.useState();
  const [previewImage, setPreview] = React.useState();
  const [success, setSuccess] = React.useState(false);

  const selectFile = function (e) {
    setFile(e.target.files[0]);

    let reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const submit2 = function () {
    let fd = new FormData();

    fd.append("file", currentFile);

    let request = new XMLHttpRequest();

    request.onreadystatechange = function (state) {
      if (
        state.originalTarget.readyState === 4 &&
        state.originalTarget.status === 200
      ) {
        setSuccess(true);
      }
    };

    request.open(
      "POST",
      "https://us-central1-tutorial-e6ea7.cloudfunctions.net/fileUpload",
      true
    );
    request.send(fd);
  };
  

  return (
      <div className="register-container">
        <h1>Register New Account</h1>
        <div className="form-section">
          <div>
            <h5>Vendor Details</h5>
              <Form onSubmit={Submit}>
                
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="vendorname">
                    <Form.Label>Vendor Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter vendor name"
                      onChange={(e) => setVendorName(e.target.value)}
                      value={vendorname}
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="vendorname">
                    <Form.Label>Vendor Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter vendor name"
                      onChange={(e) => setVendorName(e.target.value)}
                      value={vendorname}
                    />
                  </Form.Group>
                </Row>
                <Button type="submit">Submit</Button>
              </Form>
            </div>
        </div>
      </div>
  );
};

export default Register;
