import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import VendorPage from './component/login/VendorPage';
import CommitteePage from './component/login/CommitteePage';
import LecturersPage from './component/login/LecturersPage';
import ParticipantsPage from './component/login/ParticipantsPage';
import AdminPage from './component/login/AdminPage';
import HomePage from './component/login/HomePage';
import LoginPage from './component/login/LogIn';
import './component/login/loginstyle.css';
import Home from './component/vidcall/Home';
import Room from './component/vidcall/Room';

function App() {
  
  return (
    <Router>
      {/* <Routes>
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
      </Routes> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room/:roomID" element={<Room />} />
      </Routes>
    </Router>
  );
}

export default App;
