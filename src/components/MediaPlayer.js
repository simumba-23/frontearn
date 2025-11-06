import React, { useState, useEffect, useRef } from 'react';
import YouTube from 'react-youtube';
import SpotifyPlayer from 'react-spotify-player';
import { Button, Alert, ProgressBar } from 'react-bootstrap';
import styles from './Media.module.css';
import { MdFullscreen} from "react-icons/md";
import { MdFullscreenExit } from "react-icons/md";
import { FaPlay,FaPause} from "react-icons/fa";
import { FaRegClosedCaptioning } from "react-icons/fa6";

const MediaPlayer = ({ mediaUrl, onClose, onEnd }) => {
    const [player, setPlayer] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [error, setError] = useState(null);
    const [isSurveyEnabled, setIsSurveyEnabled] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
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
            isPlaying ? player.pauseVideo() : player.playVideo();
            setIsPlaying(!isPlaying);
        }
    };

    const handleEnd = () => {
        setIsPlaying(false);
        setIsSurveyEnabled(true);
        if (onEnd) onEnd();
    };

    const handleFullscreen = () => {
        if (!isFullscreen) {
            if (playerRef.current.requestFullscreen) {
                playerRef.current.requestFullscreen();
            } else if (playerRef.current.webkitRequestFullscreen) {
                playerRef.current.webkitRequestFullscreen();
            } else if (playerRef.current.mozRequestFullScreen) {
                playerRef.current.mozRequestFullScreen();
            } else if (playerRef.current.msRequestFullscreen) {
                playerRef.current.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    };

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.addEventListener('mozfullscreenchange', handleFullscreenChange);
        document.addEventListener('msfullscreenchange', handleFullscreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
            document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
            document.removeEventListener('msfullscreenchange', handleFullscreenChange);
        };
    }, []);

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

    const renderYouTubePlayer = (videoId) => (
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
                    controls: 0,
                    modestbranding: 1,
                    disablekb: 1,
                    fs: 0,
                    rel: 0,
                    showinfo: 0,
                },
            }}
        />
    );

    const renderSpotifyPlayer = (uri) => (
        <div className="spotifyPlayer">
            <SpotifyPlayer
                uri={uri}
                size={{
                    width: '100%',
                    height: 80,
                }}
                view="list"
                theme="black"
            />
        </div>
    );

    const renderPlayer = () => {
        try {
            if (mediaUrl.includes('youtube.com') || mediaUrl.includes('youtu.be')) {
                const videoId = mediaUrl.includes('youtube.com') 
                    ? new URL(mediaUrl).searchParams.get('v') 
                    : mediaUrl.split('/').pop();
                return renderYouTubePlayer(videoId);
            } else if (mediaUrl.includes('spotify.com')) {
                const [type, id] = mediaUrl.split('/').slice(-2);
                return renderSpotifyPlayer(`spotify:${type}:${id}`);
            }
            return <p>Media type not supported</p>;
        } catch (error) {
            setError('Failed to load media. Please check the URL.');
            return null;
        }
    };

    if (!mediaUrl) return null;

    return (
        <div className={styles.mediaPlayer} ref={playerRef}>
            {error && <Alert variant="danger">{error}</Alert>}
            <div className={styles.playerBody}>
                {renderPlayer()}
            </div>
            <div className={styles.playerHeader}>
                <Button variant="danger" onClick={onClose} size="sm"><FaRegClosedCaptioning /></Button>
                <Button variant="secondary" onClick={handlePlayPause} size="sm">{isPlaying ? <FaPause /> : <FaPlay />}</Button>
                <Button variant="secondary" onClick={handleFullscreen} size="sm">
                    {isFullscreen ? < MdFullscreenExit /> : <MdFullscreen />}
                </Button>
            </div>
            <ProgressBar className={styles.progress} now={progress} />
        </div>
    );
};

export default MediaPlayer;
