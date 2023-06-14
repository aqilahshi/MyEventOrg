import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './Basic.css';

const Topbar = () => {
    return (
        <div className="topbar" style={{ backgroundColor: '#ffffff' }}>
            <div className="left-side">
                Teams
            </div>
            <div className="right-side">
                <FontAwesomeIcon icon={faUser} />
            </div>
        </div>
    );
};

export default Topbar;