import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faVideo, faCalendar, faPencilAlt} from '@fortawesome/free-solid-svg-icons';
import './Basic.css';

const Sidebar = () => {
    return (
        <div className="sidebar" style={{ backgroundColor: '#040C18' }}>
            <div className="sidebar-icon">
                <FontAwesomeIcon icon={faBell} />
            </div>
            <div className="sidebar-icon">
                <FontAwesomeIcon icon={faVideo} />
            </div>
            <div className="sidebar-icon">
                <FontAwesomeIcon icon={faCalendar} />
            </div>
            <div className="sidebar-icon">
                <FontAwesomeIcon icon={faPencilAlt} />
            </div>
        </div>
    );
};

export default Sidebar;