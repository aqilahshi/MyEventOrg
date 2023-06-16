import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './Teams.css';
import Teams from './Teams';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Content() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    eventName: '',
    organization: '',
    venue: '',
    eventDetails: '',
    startDate: null,
    startTime: null,
    endDate: null,
    endTime: null
  });

  const handleClose = () => {
    setShowModal(false);
    // Reset the form data
    setFormData({
      eventName: '',
      organization: '',
      venue: '',
      eventDetails: '',
      startDate: null,
      startTime: null,
      endDate: null,
      endTime: null
    });
  };

  const handleShow = () => setShowModal(true);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value
    }));
  };

  const handleDateChange = (date, id) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: date
    }));
  };

  const handleCreate = () => {
    // Save form data to Firebase Firestore
    addDoc(collection(db, 'Teams'), formData)
      .then(() => {
        console.log('Form data saved to Firestore!');
        handleClose();
      })
      .catch((error) => {
        console.error('Error saving form data to Firestore: ', error);
      });
  };

  return (
    <div className="content" style={{ backgroundColor: '#f8f8f8' }}>
      <button className="team-button" onClick={handleShow}>
        Create or Join Team
      </button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a Team</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="eventName">
              <Form.Label>Event Name:</Form.Label>
              <Form.Control
                type="text"
                value={formData.eventName}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="organization">
              <Form.Label>Organization:</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={formData.organization}
                onChange={handleInputChange}
              >
                <option>--Organization--</option>
                <option value="1">CS Society</option>
                <option value="2">Others</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="venue">
              <Form.Label>Venue:</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={formData.venue}
                onChange={handleInputChange}
              >
                <option>--Venue--</option>
                <option value="ELL">ELL</option>
                <option value="CS Lounge">CS Lounge</option>
                <option value="FYP Lab">FYP Lab</option>
                <option value="Dewan Tengku Syed Putra">Dewan Tengku Syed Putra</option>
                <option value="Dewan Utama Pelajar">Dewan Utama Pelajar</option>
                <option value="Dewan Utama Desasiswa">Dewan Utama Desasiswa</option>
                <option value="Dewan Budaya">Dewan Budaya</option>
                <option value="Stadium Azman Hashim">Stadium Azman Hashim</option>
                <option value="Padang Kawad">Padang Kawad</option>
                <option value="DKG 31">DKG 31</option>
                <option value="CS Auditorium">CS Auditorium</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="eventDetails">
              <Form.Label>Event Details:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.eventDetails}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="row">
              <div className="col-md-6">
                <Form.Label>Start Date:</Form.Label>
                <DatePicker
                  selected={formData.startDate}
                  onChange={(date) => handleDateChange(date, 'startDate')}
                  dateFormat="yyyy-MM-dd"
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <Form.Label>Start Time:</Form.Label>
                <Form.Control
                  type="time"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  id="startTime"
                />
              </div>
            </Form.Group>
            <Form.Group className="row">
              <div className="col-md-6">
                <Form.Label>End Date:</Form.Label>
                <DatePicker
                  selected={formData.endDate}
                  onChange={(date) => handleDateChange(date, 'endDate')}
                  dateFormat="yyyy-MM-dd"
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <Form.Label>End Time:</Form.Label>
                <Form.Control
                  type="time"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  id="endTime"
                />
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreate}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>

      <Teams />
    </div>
  );
}

export default Content;
