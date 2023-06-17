import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import CommitteePage from './component/login/CommitteePage';
import LecturersPage from './component/login/LecturersPage';
import AdminPage from './component/login/AdminPage';
import HomePage from './component/login/HomePage';
import LoginPage from './component/login/LoginPage';
import './component/login/loginstyle.css';
import Attendance from './component/participant/Attendance';
import ParticipantPage from './component/participant/ParticipantPage';





// start kirah import
import VendorSidebar from './component/vendor/VendorSidebar';
import AdminSidebar from './component/admin/AdminSidebar';
import Register from "./pages/vendor/Register";
import NewProduct from "./pages/vendor/NewProduct";
import VendorDashboard from "./pages/vendor/VendorDashboard";
import Products from "./pages/vendor/Products";
import Categories from "./pages/vendor/Categories";
import Collections from "./pages/vendor/Collections";
import Attributes from "./pages/vendor/Attributes";
import Orders from "./pages/vendor/Orders";
import Customers from "./pages/vendor/Customers";
import NewCategory from "./pages/vendor/NewCategory";
import EditAttribute from "./pages/vendor/EditAttribute";


import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageAdmin from "./pages/admin/ManageAdmin";
import Testing from "./pages/admin/testing";
import AddNewAdmin from "./pages/admin/AddNewAdmin";
import VerifyVendor from "./pages/admin/VerifyVendor";
import ManageVendor from "./pages/admin/ManageVendor";


import { Navbar, Image } from 'react-bootstrap';
import navbarlogoImage from './logo.png'; // Import your logo image file
// end kirah import

// start kirah part
// Separate component for the top navbar
const TopNavbar = () => {
  // Get the current location/route
  const location = useLocation();
  const { pathname } = location;
  

  // Define the routes where the navbar should be displayed
  const navbarRoutes = [
    '/register',
    '/newproduct',
    '/vendordashboard',
    '/products',
    '/categories',
    '/collections',
    '/attributes',
    '/customers',
    '/orders',
    '/newcategory',
    /^\/editattribute\/\d+\/\w+$/,
    '/admindashboard',
    '/manageadmin',
    '/addnewadmin',
    '/verifyvendor',
    '/managevendor',
  ];

  // Check if the current route matches the navbarRoutes
  // const showNavbar = navbarRoutes.includes(pathname);
  const showNavbar = navbarRoutes.some(route => {
    if (typeof route === 'string') {
      return route === pathname;
    } else if (route instanceof RegExp) {
      return route.test(pathname);
    }
    return false;
  });




  return (
    // Conditionally render the navbar
    showNavbar && (
        <Navbar className="vendornavbar p-1" expand="lg" fixed="top">
          {/* <Navbar.Brand href="/">MyEvent Org</Navbar.Brand> */}
          <Navbar.Brand href="/">
            <Image src={navbarlogoImage} alt="MyEvent Org Logo" className="p-0 m-0" style={{ height: '40px' }} />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar-nav" />
          {/* <Navbar.Collapse id="navbar-nav"> */}
            {/* <Nav className="ml-auto">
              <Nav.Link href="/register">Register</Nav.Link>
              <Nav.Link href="/newproduct">New Product</Nav.Link>
              <Nav.Link href="/vendordashboard">Vendor Dashboard</Nav.Link>
              <Nav.Link href="/products">Products</Nav.Link>
              <Nav.Link href="/categories">Categories</Nav.Link>
              <Nav.Link href="/collections">Collections</Nav.Link>
              <Nav.Link href="/attributes">Attributes</Nav.Link>
              <Nav.Link href="/customers">Customers</Nav.Link>
              <Nav.Link href="/orders">Orders</Nav.Link>
            </Nav> */}
          {/* </Navbar.Collapse> */}
        </Navbar>
      )
  );
};
// start kirah part

const App = () => {
  return (

//shi import
import Home from './component/vidcall/Home';
import Room from './component/vidcall/Room';
import Sidebar from './component/basic/Sidebar';
import Topbar from './component/basic/Topbar';
import Content from './component/teams/Content';
import Scheduler from './component/calander/Scheduler';
import Chat from './component/chat/Chat';
import Todo from './component/todo/Todo';



function App() {
  
  return (
  //   <Router>
  //     <Routes>
  //       <Route
  //         path="/" element={<HomePage/>}
  //       />
  //       <Route
  //         path="/login" element={<LoginPage/>}
  //       />
  //       <Route
  //         path="/committee" element={<CommitteePage/>}
  //       />
  //       <Route
  //         path="/lecturers" element={<LecturersPage/>}
  //       />
  //       <Route
  //         path="/admin" element={<AdminPage/>}
  //       />
  //     </Routes>
  //   <Routes>
  //     <Route path="/" element={<Home />} />
  //     <Route path="/room/:roomID" element={<Room />} />
  //   </Routes>
  // </Router>
    // <div className="app">
    //   <Topbar />
    //   <div className="content-sidebar-wrapper">
    //     <Sidebar />
    //     <Content />
    //     <Scheduler/> 
    //   </div>
    // </div>
    // <div>
    //   <Scheduler/>
    // </div>
    // <div>
    //   <Chat/>
    //  </div>
    // <div>
    //  <Todo/>
    // </div>
    <Router>
      {/* Render the top navbar component */}
      <TopNavbar />

      <Routes>

        <Route
          path="/" element={<HomePage/>}
        />
        <Route
          path="/login" element={<LoginPage/>}
        />
        <Route
          path="/vendor" element={<VendorPage/>}
        />
        <Route
          path="/committee" element={<CommitteePage/>}
        />
        <Route
          path="/lecturers" element={<LecturersPage/>}
        />
        <Route
          path="/participants" element={<Attendance/>}
        />
        <Route
          path="/admin" element={<AdminPage/>}
        />
            
        {/* Route Participants */}
          <Route path="/participantpage" element={<ParticipantPage/>}/>
            
        {/* Route Committee Both Lecturer n Committee*/} 
            {/* Route Lecturer */}
            {/* Route Student */}
          {/* Route Admin */}
          {/* Route Vendor */}


        {/* <Route path="/admindashboard" element={<AdminDashboard />} /> */}
        <Route path="/testing" element={<Testing />} />
        <Route path="/admindashboard" element={<AdminSidebar><AdminDashboard /></AdminSidebar>} />
        <Route path="/manageadmin" element={<AdminSidebar><ManageAdmin /></AdminSidebar>} />
        <Route path="/addnewadmin" element={<AdminSidebar><AddNewAdmin /></AdminSidebar>} />
        <Route path="/verifyvendor" element={<AdminSidebar><VerifyVendor /></AdminSidebar>} />
        <Route path="/managevendor" element={<AdminSidebar><ManageVendor /></AdminSidebar>} />
       

        <Route path="/register" element={<VendorSidebar><Register /></VendorSidebar>} />
        <Route path="/newproduct" element={<VendorSidebar><NewProduct /></VendorSidebar>} />
        <Route path="/vendordashboard" element={<VendorSidebar><VendorDashboard /></VendorSidebar>} />
        <Route path="/products" element={<VendorSidebar><Products /></VendorSidebar>} />
        <Route path="/categories" element={<VendorSidebar><Categories /></VendorSidebar>} />
        <Route path="/collections" element={<VendorSidebar><Collections /></VendorSidebar>} />
        <Route path="/attributes" element={<VendorSidebar><Attributes /></VendorSidebar>} />
        <Route path="/customers" element={<VendorSidebar><Customers /></VendorSidebar>} />
        <Route path="/orders" element={<VendorSidebar><Orders /></VendorSidebar>} />
        <Route path="/newcategory" element={<VendorSidebar><NewCategory /></VendorSidebar>} />
        <Route path="/editattribute/:id/:name" element={<VendorSidebar><EditAttribute /></VendorSidebar>} />

      </Routes>
      
    </Router>
  );
};

export default App;
