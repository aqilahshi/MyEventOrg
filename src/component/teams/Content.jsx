import React, { useState } from 'react';
import { Modal, Button, Form, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faVideo, faCalendar, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import './Teams.css';


function Content() {
    const [showModal, setShowModal] = useState(false);
  
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

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
                    <Form.Control type="text" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="organization">
                    <Form.Label>Organization:</Form.Label>
                    <Dropdown>
                        <Dropdown.Toggle variant="primary" id="organizationDropdown">
                        Select Organization
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                        <Dropdown.Item>CS Society</Dropdown.Item>
                        <Dropdown.Item>Organization 2</Dropdown.Item>
                        <Dropdown.Item>Organization 3</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Form.Group>
                <Form.Group className="mb-3" controlId="venue">
                    <Form.Label>Venue:</Form.Label>
                    <Dropdown>
                        <Dropdown.Toggle variant="primary" id="organizationDropdown">
                        Select Venue
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                        <Dropdown.Item>DKG 31</Dropdown.Item>
                        <Dropdown.Item>ELL</Dropdown.Item>
                        <Dropdown.Item>CS Lounge</Dropdown.Item>
                        <Dropdown.Item>FYP Lab</Dropdown.Item>
                        <Dropdown.Item>Dewan Tengku Syed Putra</Dropdown.Item>
                        <Dropdown.Item>Dewan Utama Pelajar</Dropdown.Item>
                        <Dropdown.Item>Dewan Utama Desasiswa</Dropdown.Item>
                        <Dropdown.Item>Dewan Budaya</Dropdown.Item>
                        <Dropdown.Item>Stadium Azman Hashim</Dropdown.Item>
                        <Dropdown.Item>Padang Kawad</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Form.Group>
                <Form.Group className="mb-3" controlId="eventDetails">
                    <Form.Label>Event Details:</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>
                <Form.Group className="row">
                <div className="col-md-6">
                    <Form.Label>Start Date:</Form.Label>
                    <Form.Control type="date" />
                </div>
                <div className="col-md-6">
                    <Form.Label>Start Time:</Form.Label>
                    <Form.Control type="time" />
                </div>
                </Form.Group>
                <Form.Group className="row">
                <div className="col-md-6">
                    <Form.Label>End Date:</Form.Label>
                    <Form.Control type="date" />
                </div>
                <div className="col-md-6">
                    <Form.Label>End Time:</Form.Label>
                    <Form.Control type="time" />
                </div>
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>

            <div className="content-row">
                <div className="square">
                <FontAwesomeIcon icon={faBell} />
                <p>Description 1</p>
                </div>
                <div className="square">
                <FontAwesomeIcon icon={faVideo} />
                <p>Description 2</p>
                </div>
            </div>
            <div className="content-row">
                <div className="square">
                <FontAwesomeIcon icon={faCalendar} />
                <p>Description 3</p>
                </div>
                <div className="square">
                <FontAwesomeIcon icon={faPencilAlt} />
                <p>Description 4</p>
                </div>
            </div>
            <div className="content-row">
                <div className="square">
                <FontAwesomeIcon icon={faBell} />
                <p>Description 5</p>
                </div>
                <div className="square">
                <FontAwesomeIcon icon={faVideo} />
                <p>Description 6</p>
                </div>
            </div>
        </div>
  );
};

export default Content;