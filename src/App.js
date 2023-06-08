import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VendorPage from './component/login/VendorPage';
import CommitteePage from './component/login/CommitteePage';
import LecturersPage from './component/login/LecturersPage';
import ParticipantsPage from './component/login/ParticipantsPage';
import AdminPage from './component/login/AdminPage';
import HomePage from './component/login/HomePage';
import LoginPage from './component/login/LogIn';
import './component/login/loginstyle.css';

function App() {
  // const [userRole, setUserRole] = useState(null);

  // const handleLogin = (role) => {
  //   setUserRole(role);
  // };

  // const handleLogout = () => {
  //   setUserRole(null);
  // };

  // const ProtectedRoute = ({ path, element, allowedRoles }) => {
  //   if (allowedRoles.includes(userRole)) {
  //     return element;
  //   } else {
  //     return <Navigate to="/" replace />;
  //   }
  // };

  // const handleRoleSelection = (role) => {
  //   // Handle the role selection logic
  //   console.log('Selected role:', role);
  // };

  // return (
  //   <Router>
  //     <Routes>
  //       <Route
  //         path="/"
  //         element={<HomePage handleLogin={handleRoleSelection} />}
  //       />
  //       <Route
  //         path="/login"
  //         element={<LoginPage handleRoleSelection={handleRoleSelection} />}
  //       />
  //       <Route
  //         path="/vendor"
  //         element={
  //           <ProtectedRoute
  //             path="/"
  //             element={<VendorPage handleLogout={handleLogout} />}
  //             allowedRoles={['vendor']}
  //           />
  //         }
  //       />
  //       <Route
  //         path="/committee"
  //         element={
  //           <ProtectedRoute
  //             path="/"
  //             element={<CommitteePage handleLogout={handleLogout} />}
  //             allowedRoles={['committee']}
  //           />
  //         }
  //       />
  //       <Route
  //         path="/lecturers"
  //         element={
  //           <ProtectedRoute
  //             path="/"
  //             element={<LecturersPage handleLogout={handleLogout} />}
  //             allowedRoles={['lecturers']}
  //           />
  //         }
  //       />
  //       <Route
  //         path="/participants"
  //         element={
  //           <ProtectedRoute
  //             path="/"
  //             element={<ParticipantsPage handleLogout={handleLogout} />}
  //             allowedRoles={['participants']}
  //           />
  //         }
  //       />
  //       <Route
  //         path="/admin"
  //         element={
  //           <ProtectedRoute
  //             path="/"
  //             element={<AdminPage handleLogout={handleLogout} />}
  //             allowedRoles={['admin']}
  //           />
  //         }
  //       />
  //     </Routes>
  //   </Router>


 


  return (
    <Router>
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
          path="/participants" element={<ParticipantsPage/>}
        />
        <Route
          path="/admin" element={<AdminPage/>}
        />
      </Routes>
    </Router>
  );
}

export default App;
