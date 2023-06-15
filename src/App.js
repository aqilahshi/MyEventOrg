import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import vendorpage from './component/login/VendorPage';
import committeepage from './component/login/CommitteePage';
import lecturerspage from './component/login/LecturersPage';
import participantspage from './component/login/ParticipantsPage';
import adminpage from './component/login/AdminPage';
import HomePage from './component/login/HomePage';
import LoginPage from './component/login/LogIn';
import './component/login/loginstyle.css';
import { matchPath } from 'react-router';




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


import { Navbar, Image } from 'react-bootstrap';
import navbarlogoImage from './logo.png'; // Import your logo image file


// end kirah import

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

const App = () => {
  return (
    <Router>
      {/* Render the top navbar component */}
      <TopNavbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/vendor" element={<vendorpage />} />
        <Route path="/committee" element={<committeepage />} />
        <Route path="/lecturers" element={<lecturerspage />} />
        <Route path="/participants" element={<participantspage />} />
        <Route path="/admin" element={<adminpage />} />


        {/* <Route path="/admindashboard" element={<AdminDashboard />} /> */}
        <Route path="/testing" element={<Testing />} />
        <Route path="/admindashboard" element={<AdminSidebar><AdminDashboard /></AdminSidebar>} />
        <Route path="/manageadmin" element={<AdminSidebar><ManageAdmin /></AdminSidebar>} />

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
