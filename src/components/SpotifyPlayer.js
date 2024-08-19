import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SpotifyPlayer = () => {
    const [tracks, setTracks] = useState([]);
    const [player, setPlayer] = useState(null);
    const accessToken = localStorage.getItem('spotifyAccessToken');

    useEffect(() => {
        if (window.Spotify && accessToken) {
            const player = new window.Spotify.Player({
                name: 'Web Playback SDK',
                getOAuthToken: cb => { cb(accessToken); },
                volume: 0.5
            });

            player.on('ready', () => {
                setPlayer(player);
            });

            player.on('not_ready', () => {
                console.log('Player is not ready');
            });

            axios.get('http://localhost:8000/api/tasks')
                .then(response => setTracks(response.data))
                .catch(error => console.error('Error fetching Spotify items:', error));
        }
    }, [accessToken]);

    const playTrack = (uri) => {
        if (player) {
            player.connect().then(success => {
                if (success) {
                    player.play({ uris: [uri] })
                        .then(() => console.log('Playing track'))
                        .catch(error => console.error('Error playing track:', error));
                }
            });
        }
    };

    return (
        <div>
            <h2>Spotify Player</h2>
            <ul>
                {tracks.map(track => (
                    <li key={track.id}>
                        {track.name}
                        <button onClick={() => playTrack(track.url)}>Play</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SpotifyPlayer;
