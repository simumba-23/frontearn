import React, { useState, useEffect, useRef } from 'react';
import YouTube from 'react-youtube';
import SpotifyPlayer from 'react-spotify-player';
import { Button, Alert, ProgressBar } from 'react-bootstrap';
import '../MediaPlayer.css'; // Import custom styles

const MediaPlayer = ({ mediaUrl, onClose, onEnd }) => {
    const [player, setPlayer] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [error, setError] = useState(null);
    const [isSurveyEnabled, setIsSurveyEnabled] = useState(false);
    const [progress, setProgress] = useState(0);
    const playerRef = useRef(null);

    const handleReady = (event) => {
        setPlayer(event.target);
    };

    const handleStateChange = (event) => {
        if (event.data === 1) {
            setIsPlaying(true);
        } else if (event.data === 2) {
            setIsPlaying(false);
        }
    };

    const handlePlayPause = () => {
        if (player) {
            if (isPlaying) {
                player.pauseVideo();
            } else {
                player.playVideo();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleEnd = () => {
        setIsPlaying(false);
        setIsSurveyEnabled(true);
        if (onEnd) onEnd();
    };

    const handleFullscreen = () => {
        if (playerRef.current.requestFullscreen) {
            playerRef.current.requestFullscreen();
        } else if (playerRef.current.webkitRequestFullscreen) {
            playerRef.current.webkitRequestFullscreen();
        } else if (playerRef.current.mozRequestFullScreen) {
            playerRef.current.mozRequestFullScreen();
        } else if (playerRef.current.msRequestFullscreen) {
            playerRef.current.msRequestFullscreen();
        }
    };

    useEffect(() => {
        if (!player) return;

        const interval = setInterval(() => {
            if (player && player.getCurrentTime) {
                const currentTime = player.getCurrentTime();
                const duration = player.getDuration();
                setProgress((currentTime / duration) * 100);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [player]);

    const renderPlayer = () => {
        try {
            if (mediaUrl.includes('youtube.com') || mediaUrl.includes('youtu.be')) {
                const videoId = mediaUrl.includes('youtube.com') ? new URL(mediaUrl).searchParams.get('v') : mediaUrl.split('/').pop();
                return (
                    <YouTube
                        videoId={videoId}
                        onReady={handleReady}
                        onStateChange={handleStateChange}
                        onEnd={handleEnd}
                        opts={{
                            width: '100%',
                            height: '100%',
                            playerVars: {
                                autoplay: 1,
                                controls: 0, // Disable default controls
                                modestbranding: 1,
                                disablekb: 1,
                                fs: 0,
                                rel: 0,
                                showinfo: 0,
                            },
                        }}
                    />
                );
            } else if (mediaUrl.includes('spotify.com')) {
                const [type, id] = mediaUrl.split('/').slice(-2);
                return (
                    <SpotifyPlayer
                        uri={`spotify:${type}:${id}`}
                        size="large" // Always large to fit full screen
                        view="list"
                        theme="black"
                    />
                );
            }
            return <p>Media type not supported</p>;
        } catch (error) {
            setError('Failed to load media. Please check the URL.');
            return null;
        }
    };

    if (!mediaUrl) return null;

    return (
        <div className="media-player" ref={playerRef}>
            {error && <Alert variant="danger">{error}</Alert>}
            <div className="player-body">
                {renderPlayer()}
            </div>
            <div className="player-header">
                <Button variant="danger" onClick={onClose} size="sm">
                    Close
                </Button>
                <Button variant="secondary" onClick={handlePlayPause} size="sm">
                    {isPlaying ? 'Pause' : 'Play'}
                </Button>
                <Button variant="secondary" onClick={handleFullscreen} size="sm">
                    Fullscreen
                </Button>
            </div>
            <ProgressBar now={progress} />
        </div>
    );
};

export default MediaPlayer;
