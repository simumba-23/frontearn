import React, { useEffect, useState, useContext } from 'react';
import useWebSocket from 'react-use-websocket';
import { Alert, ListGroup, Spinner } from 'react-bootstrap';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Notification = () => {
    const { authTokens } = useContext(AuthContext); // Assuming you have a context providing the token
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL;

    // Check if user is authenticated
    useEffect(() => {
        if (!authTokens) {
            navigate('/login'); // Redirect to login if not authenticated
        }
    }, [authTokens, navigate]);

    const wsUrl = `${API_URL.replace(/^http/, 'ws')}/ws/notifications/?token=${authTokens?.access}`;

    const [notifications, setNotifications] = useState([]);

    const { sendMessage, lastMessage, readyState } = useWebSocket(authTokens ? wsUrl : null, {
        onOpen: () => console.log('WebSocket connection established.'),
        onClose: () => console.log('WebSocket connection closed.'),
        onError: (error) => console.log('WebSocket error: ', error),
    });

    useEffect(() => {
        if (lastMessage !== null) {
            setNotifications((prevNotifications) => [...prevNotifications, lastMessage.data]);
        }
    }, [lastMessage]);

    const renderConnectionStatus = () => {
        switch (readyState) {
            case WebSocket.CONNECTING:
                return <Spinner animation="border" variant="primary" />;
            case WebSocket.OPEN:
                return <Alert variant="success">Connected</Alert>;
            case WebSocket.CLOSING:
                return <Alert variant="warning">Closing...</Alert>;
            case WebSocket.CLOSED:
                return <Alert variant="danger">Disconnected</Alert>;
            case WebSocket.UNDEFINED:
                return <Alert variant="secondary">Unknown State</Alert>;
            default:
                return <Alert variant="info">Connecting...</Alert>;
        }
    };

    if (!authTokens) {
        return <Spinner animation="border" variant="primary" />; // Show loading spinner while checking authentication
    }

    return (
        <div>
            <h2>Notifications</h2>
            {renderConnectionStatus()}
            <ListGroup>
                {notifications.map((notification, index) => (
                    <ListGroup.Item key={index}>{notification}</ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default Notification;
