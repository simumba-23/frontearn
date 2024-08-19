import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AuthCallback = () => {
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const code = query.get('code');

        if (code) {
            axios.post('http://localhost:8000/api/spotify-token', { code })
            .then(response => {
                setAccessToken(response.data.access_token);
                localStorage.setItem('spotifyAccessToken', response.data.access_token);
            })
            .catch(error => console.error('Error fetching access token:', error));
        }
    }, []);

    if (!accessToken) {
        return <div>Loading...</div>;
    }

    return <div>Access Token: {accessToken}</div>;
};

export default AuthCallback;
