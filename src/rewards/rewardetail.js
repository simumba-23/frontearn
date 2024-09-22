// ClaimReward.js

import React, { useState } from 'react';
import axios from 'axios';

const ClaimReward = ({ rewardId }) => {
    const [message, setMessage] = useState('');

    const handleClaim = () => {
        axios.post('/api/claim-reward/', { reward: rewardId })
            .then(response => {
                setMessage('Reward claimed successfully!');
            })
            .catch(error => {
                setMessage('Failed to claim reward: ' + error.response.data);
            });
    }

    return (
        <div>
            <button onClick={handleClaim}>Claim Reward</button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default ClaimReward;
