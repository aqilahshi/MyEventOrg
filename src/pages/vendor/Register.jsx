import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Row, Col } from 'react-bootstrap';
import { useState, useEffect } from "react";
import { db } from '../../firebase';
import { collection, addDoc, getDocs, serverTimestamp  } from "firebase/firestore";
import { Link } from 'react-router-dom';
// import VendorSidebar from '../../component/vendor/Sidebar';


import "./Vendor.css"; // Import custom CSS file for additional styling

const Register = () => {
  const [vendorfname, setVendorFirstname] = useState("");
  const [vendorlname, setVendorLastname] = useState("");
  const [businessname, setBusinessName] = useState("");
  const [businessdesc, setBusinessDesc] = useState("");
  const [vendorusername, setvendorusername] = useState("");
  const [vendorpassword, setvendorpassword] = useState("");
  const [vendoremail, setvendoremail] = useState("");
  const [vendoraddress, setvendoraddress] = useState("");
  const [vendorphone, setvendorphone] = useState("");



  const Submit = async (y) => {
    y.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "Vendorwaitinglist"), {
        vendorusername: vendorusername,
        vendorfname: vendorfname,
        vendorlname: vendorlname,
        businessname: businessname,
        businessdesc: businessdesc,
        vendorpassword: vendorpassword,
        vendoremail: vendoremail,
        vendoraddress: vendoraddress,
        vendorphone: vendorphone,
        datecreated: serverTimestamp(),
        status: 'Pending'
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (y) {
      console.error("Error adding document: ", y);
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
        <br/><h2>Register New Account</h2>
        <div className="form-section">
          <div>
          <br/><h5>Vendor Details</h5>
              <Form onSubmit={Submit}>
                
              <Row className="mb-3">
                  <Form.Group as={Col} controlId="vendorfname">
                    <Form.Label>Vendor Firstname</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      onChange={(e) => setVendorFirstname(e.target.value)}
                      value={vendorfname}
                    />
                  </Form.Group>
                
                  <Form.Group as={Col} controlId="vendorlname">
                    <Form.Label>Vendor Lastname</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      onChange={(e) => setVendorLastname(e.target.value)}
                      value={vendorlname}
                    />
                  </Form.Group>
                </Row>
                
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="businessname">
                    <Form.Label>Business Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      onChange={(e) => setBusinessName(e.target.value)}
                      value={businessname}
                    />
                  </Form.Group>
                </Row>


                <Row className="mb-3">
                  <Form.Group as={Col} controlId="businessdesc">
                    <Form.Label>Business Desription</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      onChange={(e) => setBusinessDesc(e.target.value)}
                      value={businessdesc}
                    />
                  </Form.Group>
                </Row>

                <br/><h5>Account Contact</h5>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="vendorphone">
                    <Form.Label>Business Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      onChange={(e) => setvendorphone(e.target.value)}
                      value={vendorphone}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="vendoremail">
                    <Form.Label>Business Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder=""
                      onChange={(e) => setvendoremail(e.target.value)}
                      value={vendoremail}
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="vendoraddress">
                    <Form.Label>Business Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      onChange={(e) => setvendoraddress(e.target.value)}
                      value={vendoraddress}
                    />
                  </Form.Group>
                </Row>


                <br/><h5>Account Setup</h5>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="vendorusername">
                    <Form.Label>Business Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      onChange={(e) => setvendorusername(e.target.value)}
                      value={vendorusername}
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="vendorpassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder=""
                      // onChange={(e) => setvendorpassword(e.target.value)}
                      value={vendorpassword}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="vendorpassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder=""
                      onChange={(e) => setvendorpassword(e.target.value)}
                      value={vendorpassword}
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
