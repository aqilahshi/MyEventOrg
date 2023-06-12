import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [RoomCode,setRoomCode] = useState("");
    const navigate = useNavigate();

    const submitCode = (e) => {
      e.preventDefault();
      navigate(`/room/${RoomCode}`);
    };
    return (
            <div>
                <form onSubmit={submitCode} className="d-flex flex-column align-items-center justify-content-center">
                    <div className=" d-flex flex-column justify-content-center align-items-center">
                        <h3 className="mt-3 font-weight-bold">Enter the Room Code</h3>
                        <input type="text"
                        required
                        placeholder="Room Code"
                        value={RoomCode}
                        onChange={(e) => setRoomCode(e.target.value)}/>
                    </div>       
                    <button type="submit" className="btn btn-outline-primary mt-3 ">
                        Enter Room
                    </button>
                </form>
        </div>
    );
};

export default Home;