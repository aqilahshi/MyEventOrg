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

// start kirah import
import Sidebar from './component/vendor/Sidebar';
import Register from "./pages/vendor/Register";
import NewProduct from "./pages/vendor/NewProduct";
import VendorDashboard from "./pages/vendor/VendorDashboard";
import Products from "./pages/vendor/Products";
import Categories from "./pages/vendor/Categories";
import Collections from "./pages/vendor/Collections";
import Attributes from "./pages/vendor/Attributes";
import Orders from "./pages/vendor/Orders";
import Customers from "./pages/vendor/Customers";
import { Navbar, Nav } from 'react-bootstrap';

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
  ];

  // Check if the current route matches the navbarRoutes
  const showNavbar = navbarRoutes.includes(pathname);

  return (
    // Conditionally render the navbar
    showNavbar && (
        <Navbar className="vendornavbar" expand="lg" fixed="top">
          <Navbar.Brand href="/">MyEventOrg</Navbar.Brand>
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

        <Route path="/register" element={<Sidebar><Register /></Sidebar>} />
        <Route path="/newproduct" element={<Sidebar><NewProduct /></Sidebar>} />
        <Route path="/vendordashboard" element={<Sidebar><VendorDashboard /></Sidebar>} />
        <Route path="/products" element={<Sidebar><Products /></Sidebar>} />
        <Route path="/categories" element={<Sidebar><Categories /></Sidebar>} />
        <Route path="/collections" element={<Sidebar><Collections /></Sidebar>} />
        <Route path="/attributes" element={<Sidebar><Attributes /></Sidebar>} />
        <Route path="/customers" element={<Sidebar><Customers /></Sidebar>} />
        <Route path="/orders" element={<Sidebar><Orders /></Sidebar>} />
      </Routes>
    </Router>
  );
};

export default App;
