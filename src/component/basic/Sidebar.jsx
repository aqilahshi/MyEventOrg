import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faVideo, faCalendar, faPencilAlt, faComment } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './Basic.css';

const Sidebar = () => {
    return (
        <div className="sidebar" style={{ backgroundColor: '#040C18' }}>
            <Link to="/content" className="sidebar-icon">
                <FontAwesomeIcon icon={faBell} />
            </Link>
            <Link to="/vidcall" className="sidebar-icon">
                <FontAwesomeIcon icon={faVideo} />
            </Link>
            <Link to="/calendar" className="sidebar-icon">
                <FontAwesomeIcon icon={faCalendar} />
            </Link>
            <Link to="/todo" className="sidebar-icon">
                <FontAwesomeIcon icon={faPencilAlt} />
            </Link>
            <Link to="/chat" className="sidebar-icon">
                <FontAwesomeIcon icon={faComment} />
            </Link>
        </div>
    );
};

export default Sidebar;
