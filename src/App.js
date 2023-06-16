import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CommitteePage from './component/login/CommitteePage';
import LecturersPage from './component/login/LecturersPage';
import AdminPage from './component/login/AdminPage';
import HomePage from './component/login/HomePage';
import LoginPage from './component/login/LoginPage';
import './component/login/loginstyle.css';

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
    <div className="app">
      <Topbar />
      <div className="content-sidebar-wrapper">
        <Sidebar />
        <Content />
        {/* <Scheduler/> */}
      </div>
    </div>
    // <div>
    //   <Scheduler/>
    // </div>
    // <div>
    //   <Chat/>
    //  </div>
    // <div>
    //  <Todo/>
    // </div>

  );
}

export default App;
