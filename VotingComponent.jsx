import React, { useState } from 'react';
import axios from 'axios';

const VotingComponent = () => {
    const [vote, setVote] = useState('');
    const [message, setMessage] = useState('');

    const checkCamera = async () => {
        try {
            const response = await axios.get('http://localhost:5000/check_camera');
            if (response.data.message === 'External object detected. Voting frozen.') {
                setMessage('Voting is currently frozen due to the presence of an external object.');
            } else {
                setMessage('You can proceed to vote.');
            }
        } catch (error) {
            console.error(error);
            setMessage('Error checking camera.');
        }
    }

    const handleVote = async () => {
        try {
            const response = await axios.post('http://localhost:5000/vote', { vote });
            setMessage(response.data.message);
        } catch (error) {
            console.error(error);
            setMessage(error.response?.data?.message || 'Error during voting.');
        }
    }

    return (
        <div>
            <h1>Voting System</h1>
            <button onClick={checkCamera}>Check Camera</button>
            <input 
                type="text" 
                value={vote} 
                onChange={(e) => setVote(e.target.value)} 
                placeholder="Enter your vote" 
            />
            <button onClick={handleVote}>Submit Vote</button>
            <p>{message}</p>
        </div>
    );
};

export default VotingComponent;