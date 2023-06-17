import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faVideo, faCalendar, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import './Teams.css';
import { Link } from 'react-router-dom';

const Teams = () => {
  return (
    <div>
      <div className="content-row">
        {/* <Link to="/pixel-day" className="square">
          <FontAwesomeIcon icon={faBell} />
          <p>Pixel Day</p>
        </Link> */}
        <div className="square">
                <FontAwesomeIcon icon={faVideo} />
                <p>Description 2</p>
                </div>
                <div className="square">
                <FontAwesomeIcon icon={faVideo} />
                <p>Description 2</p>
                </div>
                <div className="square">
                <FontAwesomeIcon icon={faVideo} />
                <p>Description 2</p>
                </div>
            </div>
            <div className="content-row">
                <div className="square">
                <FontAwesomeIcon icon={faCalendar} />
                <p>Description 3</p>
                </div>
                <div className="square">
                <FontAwesomeIcon icon={faPencilAlt} />
                <p>Description 4</p>
                </div>
                <div className="square">
                <FontAwesomeIcon icon={faVideo} />
                <p>Description 2</p>
                </div>
                <div className="square">
                <FontAwesomeIcon icon={faVideo} />
                <p>Description 2</p>
                </div>
            </div>
            <div className="content-row">
                <div className="square">
                <FontAwesomeIcon icon={faBell} />
                <p>Description 5</p>
                </div>
                <div className="square">
                <FontAwesomeIcon icon={faVideo} />
                <p>Description 6</p>
                </div>
            </div>
        </div>
    );
};

export default Teams;
