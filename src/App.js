import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import VendorPage from './component/login/VendorPage';
import LecturersPage from './component/login/LecturersPage';
import AdminPage from './component/login/AdminPage';
import HomePage from './component/login/HomePage';
import LoginPage from './component/login/LogIn';
import './component/login/loginstyle.css';
// import Export1 from './component/import/export';
// import Import1 from './component/import/import';

//start nad import
import Attendance from './component/participant/Attendance';
import ParticipantPage from './component/participant/ParticipantPage';
import CreateQuiz from './component/activity/quiz/CreateQuiz';
import DetailsQuiz from './component/activity/quiz/DetailsQuiz';
import LuckyDrawAlgo from './component/activity/luckydraw/LuckyDrawAlgo';

import BoxPage from './component/sub3/Box';
import LivePollCreator from './component/activity/livepoll/LivePoll';
import LivePollParticipant from './component/activity/livepoll/ParticipantLP';
import ResultLP from './component/activity/livepoll/ResultLP';
import Activity from './component/committeeNavbar/activity';
import GenerateMain from './component/generate/GenerateMain';
import GenerateAttendance from './component/generate/GenerateAttendance';
import ParticipantPick from './component/activity/quiz/ParticipantPick';
import ParticipantPlayQuiz from './component/activity/quiz/ParticipantQuiz';
import ChatPartComm from './component/chatcommitteeparticipant/ChatPartComm'
import GenerateCommittee from './component/generate/GenerateCommittee';

// start kirah import
import VendorSidebar from './component/vendor/VendorSidebar';
import AdminSidebar from './component/admin/AdminSidebar';
import Register from "./pages/vendor/Register";
import NewProduct from "./pages/vendor/NewProduct";
import VendorDashboard from "./pages/vendor/VendorDashboard";
import ListProducts from "./pages/vendor/ListProducts";
import Categories from "./pages/vendor/Categories";
import Collections from "./pages/vendor/Collections";
import Attributes from "./pages/vendor/Attributes";
import Orders from "./pages/vendor/Orders";
import Customers from "./pages/vendor/Customers";
import NewCategory from "./pages/vendor/NewCategory";
import EditAttribute from "./pages/vendor/EditAttribute";
import VendorChat from "./pages/vendor/Chat";
import ChatPage from "./pages/vendor/ChatPage";


import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageAdmin from "./pages/admin/ManageAdmin";
import Testing from "./pages/admin/testing";
import AddNewAdmin from "./pages/admin/AddNewAdmin";
import VerifyVendor from "./pages/admin/VerifyVendor";
import Verify from "./pages/admin/Verify";
import ManageVendor from "./pages/admin/ManageVendor";


import Shop from './pages/ecommerce/Shop';
import Cart from './pages/ecommerce/Cart.jsx';
import Product from "./pages/ecommerce/Product";
import ProductList from "./pages/ecommerce/ProductList";



import { Navbar, Image } from 'react-bootstrap';
import navbarlogoImage from './logo.png'; // Import your logo image file
import ChatCommPart from './component/chatcommitteeparticipant/ChatCommPart';
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
    '/listproducts',
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
    /^\/verify\/\w+\/\w+$/,
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
// end kirah part

const App = () => {
  return (
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
          path="/committee" element={<BoxPage/>}
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
          <Route path="/playlivepoll" element={<LivePollParticipant/>}/>
          <Route path="/resultlivepoll" element={<ResultLP />}/>
          <Route path="/pickquiz" element={<ParticipantPick />}/>
          <Route path="/playquiz/:eventId/:quizId/:participantMatricNo" element={<ParticipantPlayQuiz />}/>
          <Route path="/chatcommpart" element={<ChatCommPart />}/>
          
        {/* Route Committee Both Lecturer n Committee*/} 
            {/* Route Lecturer */}
            {/* Route Student */}
          <Route path="/activity" element={<Activity />} />  
          <Route path="/createquiz" element={<CreateQuiz />} />
          <Route path="/createquizdetails" element={<DetailsQuiz />} />
          <Route path="/createquiz" element={<DetailsQuiz />} />
          <Route path="/createluckydraw" element={<LuckyDrawAlgo />} />
          <Route path="/createlivepoll" element={<LivePollCreator />} />
          <Route path="/generatemain" element={<GenerateMain />} />
          <Route path="/generateattendance" element={<GenerateAttendance />} />
          <Route path="/generatecommittee" element={<GenerateCommittee />} />
          <Route path="/chatting" element={<ChatPartComm />} />
          
          {/* Route Admin */}
          {/* Route Vendor */}


        {/* <Route path="/admindashboard" element={<AdminDashboard />} /> */}
        <Route path="/testing" element={<Testing />} />
        <Route path="/admindashboard" element={<AdminSidebar><AdminDashboard /></AdminSidebar>} />
        <Route path="/manageadmin" element={<AdminSidebar><ManageAdmin /></AdminSidebar>} />
        <Route path="/addnewadmin" element={<AdminSidebar><AddNewAdmin /></AdminSidebar>} />
        <Route path="/verifyvendor" element={<AdminSidebar><VerifyVendor /></AdminSidebar>} />
        <Route path="/managevendor" element={<AdminSidebar><ManageVendor /></AdminSidebar>} />
        <Route path="/verify/:id/:username" element={<AdminSidebar><Verify /></AdminSidebar>} />

        <Route path="/register" element={<VendorSidebar><Register /></VendorSidebar>} />
        <Route path="/newproduct" element={<VendorSidebar><NewProduct /></VendorSidebar>} />
        <Route path="/vendordashboard" element={<VendorSidebar><VendorDashboard /></VendorSidebar>} />
        <Route path="/listproducts" element={<VendorSidebar><ListProducts /></VendorSidebar>} />
        <Route path="/categories" element={<VendorSidebar><Categories /></VendorSidebar>} />
        <Route path="/collections" element={<VendorSidebar><Collections /></VendorSidebar>} />
        <Route path="/attributes" element={<VendorSidebar><Attributes /></VendorSidebar>} />
        <Route path="/customers" element={<VendorSidebar><Customers /></VendorSidebar>} />
        <Route path="/orders" element={<VendorSidebar><Orders /></VendorSidebar>} />
        <Route path="/newcategory" element={<VendorSidebar><NewCategory /></VendorSidebar>} />
        <Route path="/editattribute/:id/:name" element={<VendorSidebar><EditAttribute /></VendorSidebar>} />


        <Route path="/shop" element={<Shop />} />
        <Route path="/search-results" element={<Shop />} />
        <Route path="/shop/:keyword" element={<Shop />} />
        <Route path="/product" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path='/productlist' element={<ProductList />} />
        <Route path="/shop/product" element={<Product />} />
        <Route path="/productlist/product" element={<Product />} />
        <Route path="/product/IpLWBze0ROfx085X46y8/jiji" element={<Product />} />
        <Route path="/product/:productID/:productName" element={<Product />} />
        <Route path="/vechat" element={<VendorChat />} />
        <Route path="/chatpage" element={<ChatPage />} />
      </Routes>
      
    </Router>
  );
};

export default App;
