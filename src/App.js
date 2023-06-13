import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VendorPage from './component/login/VendorPage';
import CommitteePage from './component/login/CommitteePage';
import LecturersPage from './component/login/LecturersPage';
import AdminPage from './component/login/AdminPage';
import HomePage from './component/login/HomePage';
import LoginPage from './component/login/LogIn';
import './component/login/loginstyle.css';
import Attendance from './component/participant/Attendance';
import ParticipantPage from './component/participant/ParticipantPage';

function App() {
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

      </Routes>
      
    </Router>
  );
}

export default App;
