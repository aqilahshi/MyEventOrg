import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSearch, faUsers } from '@fortawesome/free-solid-svg-icons';
import './Basic.css';

const Topbar = () => {
    const username = 'John Doe'; // Replace 'John Doe' with the actual username

    return (
        <div className="app">
        <div className="topbar">
            <div className="left-side">
                <span className="left-side-text">Teams</span>
            </div>
            <div className="center-side">
                <div className="search-container">
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                    <input type="text" placeholder="Search" className="search-input" />
                </div>
            </div>
            <div className="right-side">
                <span className="username">{username}</span>
                <FontAwesomeIcon icon={faUser} className="user-icon" />
            </div>
        </div>

        </div>
    );
};

export default Topbar;
