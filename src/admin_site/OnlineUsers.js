// onlineUsers.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useApi from '../useApi';

const OnlineUsers = () => {
    const [onlineUsers, setOnlineUsers] = useState(0);
    const { getOnlineUsers } =  useApi();

    const fetchOnlineUsers = async () => {
        try {
            const response = await getOnlineUsers();
            setOnlineUsers(response.data.online_users);
        } catch (error) {
            console.error('Error fetching online users:', error);
        }
    };

    useEffect(() => {
        fetchOnlineUsers();
        const interval = setInterval(fetchOnlineUsers, 60000); // Update every minute
        return () => clearInterval(interval);
    }, []);

    return <div>{onlineUsers}</div>;
};

export default OnlineUsers;
