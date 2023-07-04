import React from "react";
import "./navbarPart.css";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Offcanvas from 'react-bootstrap/Offcanvas';

function NavbarPart(props) {
  const participantMatricNo = props.participantMatricNo;
  const eventId = props.eventId;
  return (
    <>
    {['lg'].map((expand) => (
      <Navbar key={expand} bg="light" expand={expand} >
        
        <Container>
          <div className="d-flex align-items-center justify-content-between">
            <Navbar.Brand className="logo-container">
              <img
                src="/images/logo/logo.png"
                className="logo-img"
                alt="MyEventOrg logo"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          </div>
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                <Navbar.Brand>
                  <img
                    src="/images/logo/logo.png"
                    className="logo-img"
                    alt="MyEventOrg logo"
                  />
                </Navbar.Brand>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href={`/chatcommpart?eventid=${eventId}&matricno=${participantMatricNo}`} className="border-bottom ">
                  <h5>Chat</h5>
                </Nav.Link>
                <Nav.Link href={`/pickquiz?eventid=${eventId}&matricno=${participantMatricNo}`} className="border-bottom ">
                  <h5>Quiz</h5>
                </Nav.Link>
                <Nav.Link href={`/playlivepoll?eventid=${eventId}&matricno=${participantMatricNo}`} className="border-bottom ">
                  <h5>Live Poll</h5>
                </Nav.Link>
                <Nav.Link href="/awardpage" className="border-bottom ">
                  <h5>Award Page </h5>
                </Nav.Link>
                <Nav.Link href={`/login?role=Participant&eventid=${eventId}`} className="border-bottom ">
                  <h5>Logout</h5>
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    ))}
  </>
  )
}

export default NavbarPart;
