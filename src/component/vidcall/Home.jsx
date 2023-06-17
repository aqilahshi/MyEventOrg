import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [roomCode, setRoomCode] = useState('');
  const navigate = useNavigate();

  const submitCode = (e) => {
    e.preventDefault();
    navigate(`/room/${roomCode}`);
  };

  return (
    <div className="container">
      <form onSubmit={submitCode} className="my-5 d-flex flex-column align-items-center">
        <div className="text-center">
          <h3 className="mt-3 font-weight-bold">Enter the Room Code</h3>
          <input
            type="text"
            required
            placeholder="Room Code"
            className="form-control w-50 mx-auto mt-3"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Enter Room
        </button>
      </form>
    </div>
  );
};

export default Home;
