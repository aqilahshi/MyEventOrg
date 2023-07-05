import React, { useState, useEffect } from "react";
import "./navbarcomm.css";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link, useLocation } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import {db} from '../../firebase'

function NavbarComm() {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(false);
  const searchParams = new URLSearchParams(window.location.search);
  const userEmail = searchParams.get('email');
  const eventId = searchParams.get('eventid');
  
  console.log('EventID navbar:', eventId);
  console.log('useremail:',userEmail);
  const [committeeMatricNo, setCommitteeMatricNo] = useState('');

  const toggleNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const closeNavbar = () => {
    setShowNavbar(false);
  };

  const handleLinkClick = () => {
    setShowNavbar(true); // Always keep the Navbar expanded when a link is clicked
    closeNavbar();
  };
  // fetchcommitteematricno
  useEffect(() => {
    const fetchCommitteeData = async () => {
      const committeeQuery = query(collection(db, 'Committee'), where('committeeEmail', '==', userEmail));
      const committeeSnapshot = await getDocs(committeeQuery);
      
      if (!committeeSnapshot.empty) {
        committeeSnapshot.forEach((doc) => {
          const committeeData = doc.data();
          const committeeMatricNo = committeeData.committeeMatricNo;
          setCommitteeMatricNo(committeeMatricNo);
          console.log('Fetched committeeMatricNo:', committeeMatricNo);
        });
      }
    };

    fetchCommitteeData();
  }, [userEmail]);

  return (
    <Navbar bg="light" expand="lg" expanded={showNavbar} onToggle={toggleNavbar}>
      <Container>
        <div className="d-flex align-items-center justify-content-between">
          <Navbar.Brand as={Link} to={`/committee?email=${encodeURIComponent(userEmail)}`} onClick={closeNavbar}>
            <img
              src="/images/logo/logo.png"
              className="logo-img"
              alt="MyEventOrg logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" onClick={toggleNavbar} />
        </div>
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to={`/activity/?eventid=${eventId}&email=${encodeURIComponent(userEmail)}`} className={location.pathname === `/activity/?eventid=${eventId}&email=${encodeURIComponent(userEmail)}` ? "active" : ""} onClick={handleLinkClick}>
              <h5>| Activity</h5>
            </Nav.Link>
            <Nav.Link as={Link} to={`/chatting/?eventid=${eventId}&email=${encodeURIComponent(userEmail)}&committeeMatricNo=${encodeURIComponent(committeeMatricNo)}`} className={location.pathname === `/chatting/?eventid=${eventId}&email=${encodeURIComponent(userEmail)}&committeeMatricNo=${encodeURIComponent(committeeMatricNo)}` ? "active" : ""} onClick={handleLinkClick}>
              <h5>| Chat</h5>
            </Nav.Link> 
            <Nav.Link as={Link} to={`/generatemain/?eventid=${eventId}&email=${encodeURIComponent(userEmail)}`} className={location.pathname === `/generatemain/?eventid=${eventId}&email=${encodeURIComponent(userEmail)}` ? "active" : ""} onClick={handleLinkClick}>
              <h5>| Generate</h5>
            </Nav.Link>
            {/* <Nav.Link as={Link} to="/winner-lists" className={location.pathname === "/winner-lists" ? "active" : ""} onClick={handleLinkClick}>
              <h5>Winner Lists</h5>
            </Nav.Link>
            <Nav.Link as={Link} to="/award-announcement" className={location.pathname === "/award-announcement" ? "active" : ""} onClick={handleLinkClick}>
              <h5>Award Announcement</h5>
            </Nav.Link> */}
            <Nav.Link as={Link} to="/" className={location.pathname === "/" ? "active" : ""} onClick={handleLinkClick}>
              <h5>| Sign Out</h5>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComm;
