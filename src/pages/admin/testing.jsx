import React, { useState } from 'react';
import { Navbar, Nav, Container, Row, Col, Button } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const Testing = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new user object
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      role: role,
    };

    try {
      // Insert the new user into the "User" collection in Firestore
      const docRef = await addDoc(collection(db, 'User'), newUser);
      console.log('User added with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding user: ', error);
    }
  };

  return (
    <div className='vendorpage'>
      <h2>Testing - Add User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type='text'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type='text'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Role:</label>
          <input
            type='text'
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>
        <button type='submit'>Add User</button>
      </form>
    </div>
  );
};

export default Testing;




// import React, { useState } from 'react';
// import { Row, Col, Card, ButtonGroup, Button} from 'react-bootstrap';
// import 'chart.js/auto';
// import { Line, Pie } from 'react-chartjs-2';
// import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns';
// import './Admin.css';


// const AdminDashboard = () => {

//   const [chartType, setChartType] = useState('daily'); // Default chart type is 'daily'

//   // Sample data for the charts (replace with your actual data)
//   const dailyChartData = {
//     labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
//     datasets: [
//         {
//           label: 'Salesswqdwq',
//           data: [10, 2, 10, 5, 20, 0, 15],
//           backgroundColor: 'rgba(0, 150, 255, 0.1)',
//           borderColor: 'rgba(0, 150, 255, 1)',
//           borderWidth: 1,
//           fill: true,
//         },
//         {
//             label: 'Sales',
//             data: [12, 20, 3, 5, 2, 3, 10],
//             backgroundColor: 'rgb(255, 0, 73, 0.1)',
//             borderColor: 'rgba(255, 0, 109, 1)',
//             borderWidth: 1,
//             fill: true,
//           },
//       ],
//   };

//   const weeklyChartData = {
//     // Weekly chart data
//     labels: ['l', 'Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
//     datasets: [
//       {
//         label: 'Sales',
//         data: [111, 12, 19, 3, 5, 2, 3, 10],
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//         borderWidth: 1,
//         fill: false,
//       },
//     ],
//   };

//   const monthlyChartData = {
//     // Monthly chart data
//     labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
//     datasets: [
//       {
//         label: 'Sales',
//         data: [12, 19, 3, 5, 2, 3, 10],
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//         borderWidth: 1,
//         fill: false,
//       },
//     ],
//   };

//   const annualChartData = {
//     // Annual chart data
//     labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
//     datasets: [
//       {
//         label: 'Sales',
//         data: [12, 19, 3, 5, 2, 3, 10],
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//         borderWidth: 1,
//         fill: false,
//       },
//     ],
//   };

//   const formatDate = (date) => {
//     return format(date, 'MMM d');
//   };

//   const generateWeeklyLabels = () => {
//     const today = new Date();
//     const labels = [];

//     for (let i = 31; i >= 0; i--) {
//       const startDate = startOfWeek(today);
//       startDate.setDate(startDate.getDate() - i * 7);
//       const endDate = endOfWeek(startDate);
//       labels.push(`${formatDate(startDate)} - ${formatDate(endDate)}`);
//     }

//     return labels;
//   };

//   const options = {
//     scales: {
//       x: {
//         display: true,
//       },
//       y: {
//         display: true,
//         beginAtZero: true,
//       },
//     },
//     plugins: {
//       legend: {
//         display: true,
//       },
//     },
//     elements: {
//       point: {
//         radius: 2, // Set the radius to 0 to remove the markers
//       },
//       line: {
//         tension: 0.4, // Set the tension value to control the curve
//       },
//     },
//   };

//   const simpleoptions = {
//     scales: {
//       x: {
//         display: false, // Hide the x-axis labels
//       },
//       y: {
//         display: false, // Hide the y-axis labels
//         beginAtZero: true,
//       },
//     },
//     plugins: {
//       legend: {
//         display: false,
//       },
//       tooltip: {
//         enabled: true,
//         mode: 'index',
//         intersect: false,
//         callbacks: {
//           title: function () {
//             return ''; // Empty string to hide the tooltip title
//           },
//           label: function (context) {
//             if (context.parsed.y !== null) {
//               return context.parsed.y; // Display y-axis value as the tooltip label
//             }
//             return ''; // Empty string or alternative message for null values
//           },
//         },
//       },
//     },
//     elements: {
//       point: {
//         radius: 0, // Set the radius to 0 to remove the markers
//       },
//       line: {
//         tension: 0.5, // Set the tension value to control the curve
//       },
//     },
//   };
  
  
  

  

//   const handleChartTypeChange = (type) => {
//     setChartType(type);
//   };

//   const getChartData = () => {
//     switch (chartType) {
//       case 'weekly':
//         return weeklyChartData;
//       case 'monthly':
//         return monthlyChartData;
//       case 'annual':
//         return annualChartData;
//       default:
//         return dailyChartData;
//     }
//   };


//   // dummy 1,2,3
//   const chartData1 = {
//     labels: ['January', 'February', 'March', 'April', 'May', 'June','January', 'February', 'March', 'April', 'May', 'June'],
//     datasets: [
//       {
//         label: 'Sales',
//         data: [2, 5, 3, 6, 8, 3, 7, 10, 7, 11, 14, 12],
//         fill: true,
//         backgroundColor: 'rgb(255, 0, 73, 0.1)',
//         borderColor: 'rgba(255, 0, 109, 1)',
//         borderWidth: 1,
//       },
//     ],
//   };

  




//   return (
//     <div className='vendorpage'>
//         {/* <h2>Dashboard</h2> */}

//         {/* 1st outer row */}
//         <Row>
//             {/* big graph */}
//             <Col >
//               <Card style={{ height: '310px', width: '650px' }}>
//                 <Card.Body>
//                   <div className="d-flex justify-content-between align-items-center mb-3">
//                     <Card.Title>{`${chartType.charAt(0).toUpperCase() + chartType.slice(1)} Sales`}</Card.Title>
//                     <ButtonGroup>
//                       <Button variant="secondary" size="sm" onClick={() => handleChartTypeChange('daily')} active={chartType === 'daily'}>
//                         Daily
//                       </Button>
//                       <Button variant="secondary" size="sm" onClick={() => handleChartTypeChange('weekly')} active={chartType === 'weekly'}>
//                         Weekly
//                       </Button>
//                       <Button variant="secondary" size="sm" onClick={() => handleChartTypeChange('monthly')} active={chartType === 'monthly'}>
//                         Monthly
//                       </Button>
//                       <Button variant="secondary" size="sm" onClick={() => handleChartTypeChange('annual')} active={chartType === 'annual'}>
//                         Annual
//                       </Button>
//                     </ButtonGroup>
//                   </div>
//                   <Line data={getChartData()} options={options} height={245} width={650}/>
//                 </Card.Body>
//               </Card>

//             </Col>
            

//             {/* small 3 graph in 3 row */}
//             <Col>
//                 {/* 1st row */}
//                 <Row>
//                   <Card style={{ height: '95px', width: '300px', marginTop: '14px' }}>
//                     <Card.Body style={{ display: 'flex', alignItems: 'center', padding: 0, position: 'relative' }}>
//                       <div style={{ position: 'absolute', top: 10 }}>
//                         <Card.Title>hgjghohuohgiyghhh</Card.Title>
//                         <h6>RM23ddgxgxgxhxhvjvhvhjv45</h6>
//                       </div>
//                       <div style={{ flex: '1', display: 'flex', justifyContent: 'flex-end', zIndex: '1' }}>
//                         <div style={{ width: '150px' }}>
//                           <Line data={chartData1} options={{ ...simpleoptions }} />
//                         </div>
//                       </div>
//                     </Card.Body>
//                   </Card>
//                 </Row>


//                 {/* 2nd row */}
//                 <Row>
//                   <Card style={{ height: '95px', width: '300px', marginTop: '12px' }}>
//                     <Card.Body style={{ display: 'flex', alignItems: 'center', padding: 0, position: 'relative' }}>
//                       <div style={{ position: 'absolute', top: 10 }}>
//                         <Card.Title>hgjghohuohgiyghhh</Card.Title>
//                         <h6>RM23ddgxgxgxhxhvjvhvhjv45</h6>
//                       </div>
//                       <div style={{ flex: '1', display: 'flex', justifyContent: 'flex-end', zIndex: '1' }}>
//                         <div style={{ width: '150px' }}>
//                           <Line data={chartData1} options={{ ...simpleoptions }} />
//                         </div>
//                       </div>
//                     </Card.Body>
//                   </Card>
//                 </Row>


//                 {/* 3rd row */}
//                 <Row>
//                   <Card style={{ height: '95px', width: '300px', marginTop: '13px' }}>
//                     <Card.Body style={{ display: 'flex', alignItems: 'center', padding: 0, position: 'relative' }}>
//                       <div style={{ position: 'absolute', top: 10 }}>
//                         <Card.Title>hgjghohuohgiyghhh</Card.Title>
//                         <h6>RM23ddgxgxgxhxhvjvhvhjv45</h6>
//                       </div>
//                       <div style={{ flex: '1', display: 'flex', justifyContent: 'flex-end', zIndex: '1' }}>
//                         <div style={{ width: '150px' }}>
//                           <Line data={chartData1} options={{ ...simpleoptions }} />
//                         </div>
//                       </div>
//                     </Card.Body>
//                   </Card>
//                 </Row>
//             </Col>

//             {/* data in right column */}
//             <Col>
//               <Card style={{ height: '310px', width: '320px'}}>
//                   <Card.Body>
//                     <div style={{ backgroundColor: 'lightblue', padding: '10px' }}>
//                       <h6>Dummy Curve Line Graph 3</h6>
//                       <h6>Dummy Curve Line Graph 3</h6>
//                       <h6>Dummy Curve Line Graph 3</h6>
//                     </div>
//                     <div style={{ flex: 2 }}>
//                       <h6>Dummy Curve Line Graph 3</h6>
//                       <h6>Dummy Curve Line Graph 3</h6>
//                       <h6>Dummy Curve Line Graph 3</h6>
//                     </div>
//                   </Card.Body>
//                 </Card>
//                 {/* 1st row */}
//                 {/* <Row>

//                 </Row> */}

//                 {/* 2nd row */}
//                 {/* <Row>

//                 </Row> */}
//             </Col>
//         </Row>

//         {/* 2nd outer row */}
//         <Row>
//             {/* 1st details */}
//             <Col>
//               <Card style={{ height: '340px'}}>
//                   <Card.Body>
//                     <div style={{ backgroundColor: 'lightblue', padding: '10px' }}>
//                       <h6>Dummy Curve Line Graph 3</h6>
//                       <h6>Dummy Curve Line Graph 3</h6>
//                       <h6>Dummy Curve Line Graph 3</h6>
//                     </div>
//                     <div style={{ flex: 2 }}>
//                       <h6>Dummy Curve Line Graph 3</h6>
//                       <h6>Dummy Curve Line Graph 3</h6>
//                       <h6>Dummy Curve Line Graph 3</h6>
//                     </div>
//                   </Card.Body>
//                 </Card>
//             </Col>

//             {/* 2nd details with graph */}
//             <Col>
//               <Card style={{ height: '340px'}}>
//                   <Card.Body>
//                     <div style={{ backgroundColor: 'lightblue', padding: '10px' }}>
//                       <h6>Dummy Curve Line Graph 3</h6>
//                       <h6>Dummy Curve Line Graph 3</h6>
//                       <h6>Dummy Curve Line Graph 3</h6>
//                     </div>
//                     <div style={{ flex: 2 }}>
//                       <h6>Dummy Curve Line Graph 3</h6>
//                       <h6>Dummy Curve Line Graph 3</h6>
//                       <h6>Dummy Curve Line Graph 3</h6>
//                     </div>
//                   </Card.Body>
//                 </Card>
//             </Col>

//             {/* 3rd grapgh in 2 rows */}
//             <Col style={{ marginTop: '14px'}}>
//                 {/* 1st row circle graph */}
//                 <Row>
//                   <Card style={{ height: '170px'}}>
//                     <Card.Body>
//                       <div style={{ backgroundColor: 'lightblue', padding: '10px' }}>
//                         <h6>Dummy Curve Line Graph 3</h6>
//                       </div>
//                       <div style={{ flex: 2 }}>
//                         <h6>Dummy Curve Line Graph 3</h6>
//                       </div>
//                     </Card.Body>
//                   </Card>
//                 </Row>

//                 {/* 2nd row bar graph */}
//                 <Row>
//                   <Card style={{ height: '170px'}}>
//                     <Card.Body>
//                       <div style={{ backgroundColor: 'lightblue', padding: '10px' }}>
//                         <h6>Dummy Curve Line Graph 3</h6>
//                       </div>
//                       <div style={{ flex: 2 }}>
//                         <h6>Dummy Curve Line Graph 3</h6>
//                       </div>
//                     </Card.Body>
//                   </Card>
//                 </Row>
//             </Col>
//         </Row>
//     </div>
//   );
// };

// export default AdminDashboard;








// const Testing = () => {
    
//   const [themeColor, setThemeColor] = useState('light'); // Initial theme color
  
//   const changeThemeColor = () => {
//       const newColor = themeColor === 'light' ? 'dark' : 'light';
//       setThemeColor(newColor);
    
//       // Update CSS variables
//       const root = document.documentElement;
//       if (newColor === 'light') {
//         root.style.setProperty('--primary-color', '#007bff');
//         root.style.setProperty('--background-color', '#ffffff');
//         root.style.setProperty('--font-color', '#000000');
//         root.style.setProperty('--line-color', 'rgb(75, 192, 192)');
//       } else {
//         root.style.setProperty('--primary-color', '#ffffff');
//         root.style.setProperty('--background-color', '#000000');
//         root.style.setProperty('--font-color', '#ffffff');
//         root.style.setProperty('--line-color', 'rgb(175, 224, 229)');
//       }
//     };

    
// // Sample data for the line chart
// const chartData = {
//   labels: ['January', 'February', 'March', 'April', 'May', 'June'],
//   datasets: [
//     {
//       label: 'Sales',
//       data: [12, 19, 3, 5, 2, 3],
//       fill: false,
//       borderColor: themeColor === 'light' ? 'rgb(75, 192, 192)' : 'rgb(175, 224, 2)',
//       tension: 0.1,
//     },
//   ],
// };

// return (
//   <div className='vendorpage'>
//       <Button variant="primary" onClick={changeThemeColor}>
//       Change Theme
//       </Button>

//     <Navbar bg={themeColor} expand="lg">
//       <Navbar.Brand>Admin Dashboard</Navbar.Brand>
//       <Navbar.Toggle aria-controls="basic-navbar-nav" />
//       <Navbar.Collapse id="basic-navbar-nav">
//         <Nav className="mr-auto">
//           <Nav.Link href="#home">Home</Nav.Link>
//           <Nav.Link href="#users">Users</Nav.Link>
//           <Nav.Link href="#vendors">Vendors</Nav.Link>
//         </Nav>
//         <Nav>
//           <Nav.Link href="#settings">Settings</Nav.Link>
//           <Nav.Link href="#logout">Logout</Nav.Link>
//         </Nav>
//       </Navbar.Collapse>
//     </Navbar>
//     <Container fluid>
//       <Row>
//         <Col md={3}>
//           <h4>Admin Panel</h4>
//           <ul>
//             <li>Manage Admins</li>
//             <li>Verify Vendors</li>
//             <li>Other Options</li>
//           </ul>
//         </Col>
//         <Col md={9}>
//           <h4>Sales Statistics</h4>
//           <Line data={chartData} />
//         </Col>
//       </Row>
//     </Container>
//   </div>
// );
// };




// export default Testing;