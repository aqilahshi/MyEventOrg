import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import VendorPage from './navbarpart/VendorPage';
import CommitteePage from './navbarpart/CommitteePage';
import LecturersPage from './navbarpart/LecturersPage';
import ParticipantsPage from './navbarpart/ParticipantsPage';
import AdminPage from './navbarpart/AdminPage';
import HomePage from './navbarpart/HomePage';

function App() {
  const [userRole, setUserRole] = useState(null);

  const handleLogin = (role) => {
    setUserRole(role);
  };

  const handleLogout = () => {
    setUserRole(null);
  };

  const ProtectedRoute = ({ path, element, allowedRoles }) => {
    if (allowedRoles.includes(userRole)) {
      return element;
    } else {
      return <Navigate to="/" replace />;
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage handleLogin={handleLogin} />
          }
        />
        <Route
          path="/vendor"
          element={
            <ProtectedRoute
              path="/"
              element={<VendorPage handleLogout={handleLogout} />}
              allowedRoles={['vendor']}
            />
          }
        />
        <Route
          path="/committee"
          element={
            <ProtectedRoute
              path="/"
              element={<CommitteePage handleLogout={handleLogout} />}
              allowedRoles={['committee']}
            />
          }
        />
        <Route
          path="/lecturers"
          element={
            <ProtectedRoute
              path="/"
              element={<LecturersPage handleLogout={handleLogout} />}
              allowedRoles={['lecturers']}
            />
          }
        />
        <Route
          path="/participants"
          element={
            <ProtectedRoute
              path="/"
              element={<ParticipantsPage handleLogout={handleLogout} />}
              allowedRoles={['participants']}
            />
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute
              path="/"
              element={<AdminPage handleLogout={handleLogout} />}
              allowedRoles={['admin']}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;


