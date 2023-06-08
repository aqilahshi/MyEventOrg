import React from 'react';
import { Container, Row, Col, Button, Nav } from 'react-bootstrap';
import {Link} from 'react-router-dom';


// const HomePage = ({ handleLogin }) => {
//   const handleRoleSelection = (role) => {
//     handleLogin(role);
//   };
  
//   return (
//     <div
//       style={{
//         backgroundImage: `url("./images/USM.jpg")`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         minHeight: '90vh',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//       }}
//     >
//       <div
//         style={{
//           backgroundColor: 'rgba(255, 255, 255, 0.8)',
//           padding: '20px',
//           borderRadius: '10px',
//           textAlign: 'center',
//         }}
//       >
//         <h1 style={{ color: 'black', marginBottom: '50px' }}>Welcome to MyEventOrg Application!</h1>
//         <h1 style={{ color: 'black', marginBottom: '30px' }}>Log In as</h1>
//         <Container>
//           <Nav.Link href='/login'>
//           <Row className="justify-content-center">
//             <Col xs={12} sm={6} md={4} lg={3} className="mb-3 mt-5">
//               <Button variant="primary" block onClick={() => handleRoleSelection('participant')}>
//                 Participant
//               </Button>
//             </Col>
//           </Row>
//           </Nav.Link>
//           <Row className="justify-content-center">
//             <Col xs={12} sm={6} md={4} lg={3} className="mb-3">
//               <Button variant="primary" block onClick={() => handleRoleSelection('committee')}>
//                 Committee
//               </Button>
//             </Col>
//           </Row>
//           <Row className="justify-content-center">
//             <Col xs={12} sm={6} md={4} lg={3} className="mb-3">
//               <Button variant="primary" block onClick={() => handleRoleSelection('vendors')}>
//                 Vendors
//               </Button>
//             </Col>
//           </Row>
//           <Row className="justify-content-center">
//             <Col xs={12} sm={6} md={4} lg={3} className="mb-3">
//               <Button variant="primary" block onClick={() => handleRoleSelection('lecturers')}>
//                 Lecturers
//               </Button>
//             </Col>
//           </Row>
//           <Row className="justify-content-center">
//             <Col xs={12} sm={6} md={4} lg={3} className="mb-3">
//               <Button variant="primary" block onClick={() => handleRoleSelection('admin')}>
//                 Admin
//               </Button>
//             </Col>
//           </Row>
//         </Container>
//       </div>
//     </div>
//   );
// };

const HomePage = () => {
  return (
    <div
      style={{
        backgroundImage: `url("./images/USM.jpg")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          padding: '20px',
          borderRadius: '10px',
          textAlign: 'center',
        }}>
          
        <h1 style={{ color: 'black', marginBottom: '50px' }}>Welcome to MyEventOrg Application!</h1>
        <h1 style={{ color: 'black', marginBottom: '30px' }}>Log In as</h1>
        
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} sm={6} md={4} lg={3} className="mb-3 mt-5">
              <Link to='/login?role=participants'><Button variant="primary" >
                Participant
              </Button></Link>
            </Col>
          </Row>
          
           <Row className="justify-content-center">
            <Col xs={12} sm={6} md={4} lg={3} className="mb-3">
            <Link to='/login?role=committee'><Button variant="primary" >
                Committee
              </Button></Link>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col xs={12} sm={6} md={4} lg={3} className="mb-3">
            <Link to='/login?role=vendor'><Button variant="primary" >
                Vendors
              </Button></Link>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col xs={12} sm={6} md={4} lg={3} className="mb-3">
            <Link to='/login?role=lecturer'><Button variant="primary" >
                Lecturers
              </Button></Link>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col xs={12} sm={6} md={4} lg={3} className="mb-3">
            <Link to='/login?role=admin'><Button variant="primary" >
                Admin
              </Button></Link>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default HomePage;
