import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';

const Verify = () => {
  const { id } = useParams();
  const [vendorfname, setVendorFname] = useState('');
  const [vendorlname, setVendorLname] = useState('');
  const [vendorusername, setVendorUsername] = useState('');
  const [businessname, setBusinessName] = useState("");
  const [businessdesc, setBusinessDesc] = useState("");
  const [vendoremail, setvendoremail] = useState("");
  const [vendoraddress, setvendoraddress] = useState("");
  const [vendorphone, setvendorphone] = useState("");
  const [selectedOption, setSelectedOption] = useState('');
  const [status, setVendorStatus] = useState('');
const [comment, setComment] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const vendorWaitingListRef = collection(db, 'Vendorwaitinglist');
        const q = query(vendorWaitingListRef, where('__name__', '==', id));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const docData = querySnapshot.docs[0].data();
          console.log('Document data:', docData);
          setVendorFname(docData.vendorfname);
          setVendorLname(docData.vendorlname);
          setBusinessName(docData.businessname);
          setBusinessDesc(docData.businessdesc);
          setvendoremail(docData.vendoremail);
          setvendoraddress(docData.vendoraddress);
          setvendorphone(docData.vendorphone);
          setVendorUsername(docData.vendorusername);
          
        } else {
          console.log('No matching documents found');
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };

    fetchData();
  }, [id]);

  console.log('vendorfname:', vendorfname);
  console.log('vendorlname:', vendorlname);
  console.log('vendorusername:', vendorusername);

  const handleSave = async () => {
    try {
      const vendorWaitingListRef = collection(db, 'Vendorwaitinglist');
      const vendorDocRef = doc(vendorWaitingListRef, id);
      await updateDoc(vendorDocRef, {
        status: status,
        comment: comment
      });
      console.log('Data saved successfully!');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };
  

  return (
    <div className="vendorpage">
      <h2>Verify {vendorusername}</h2>
      <br/><h5>Vendor Details</h5>
      <Form>
        <Container>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="vendorfname">
              <Form.Label>Vendor Firstname</Form.Label>
              <Form.Control type="text" disabled placeholder={vendorfname} />
            </Form.Group>

            <Form.Group as={Col} controlId="vendorlname">
              <Form.Label>Vendor Lastname</Form.Label>
              <Form.Control type="text" disabled placeholder={vendorlname} />
            </Form.Group>
          </Row>
          <Row className="mb-3">
                  <Form.Group as={Col} controlId="businessname">
                    <Form.Label>Business Name</Form.Label>
                    <Form.Control
                      type="text" disabled
                      placeholder={businessname}
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="businessdesc">
                    <Form.Label>Business Desription</Form.Label>
                    <Form.Control
                      type="text" disabled
                      placeholder={businessdesc}
                    />
                  </Form.Group>
                </Row>

                <br/><h5>Account Contact</h5>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="vendorphone">
                    <Form.Label>Business Phone Number</Form.Label>
                    <Form.Control
                      type="text" disabled
                      placeholder={vendorphone}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="vendoremail">
                    <Form.Label>Business Email</Form.Label>
                    <Form.Control
                      type="email" disabled
                      placeholder={vendoremail}
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="vendoraddress">
                    <Form.Label>Business Address</Form.Label>
                    <Form.Control
                      type="text" disabled
                      placeholder={vendoraddress}
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                <Form.Group controlId="status">
                    <Form.Label>Vendor Status</Form.Label>
                    <Form.Select
                        onChange={(e) => setVendorStatus(e.target.value)}
                        value={status}
                    >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approve</option>
                        <option value="Rejected">Reject</option>
                    </Form.Select>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                <Form.Group controlId="comment">
                <Form.Label>Comment</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                />
                </Form.Group>
                </Row>


        </Container>
      </Form>
      <Button>Cancel</Button>
      <Button onClick={handleSave}>Save</Button>

    </div>
  );
};

export default Verify;
