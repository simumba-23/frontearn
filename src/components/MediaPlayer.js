import React, { useState, useEffect } from 'react'
import YouTube from 'react-youtube'
import SpotifyPlayer from 'react-spotify-player'
import { Button, Alert } from 'react-bootstrap'
import '../MediaPlayer.css' // Import custom styles

const MediaPlayer = ({ mediaUrl, onClose,onEnd, width = '100%',  }) => {
    const [player, setPlayer] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [error, setError] = useState(null)
    const [isSurveyEnabled, setIsSurveyEnabled] = useState(false)

    if (!mediaUrl) return null

    const handleReady = (event) => {
        setPlayer(event.target)
    }

    const handlePlayPause = () => {
        if (isPlaying) {
            if (mediaUrl.includes('youtube.com') || mediaUrl.includes('youtu.be')) {
                player.pauseVideo()
            } else if (mediaUrl.includes('vimeo.com')) {
                player.pause()
            } else {
                // Handle pause for other media types if needed
            }
        } else {
            if (mediaUrl.includes('youtube.com') || mediaUrl.includes('youtu.be')) {
                player.playVideo()
            } else if (mediaUrl.includes('vimeo.com')) {
                player.play()
            } else {
                // Handle play for other media types if needed
            }
        }
        setIsPlaying(!isPlaying)
    }

    const handleEnd = () => {
        setIsPlaying(false)
        if(onEnd) onEnd();
    }

    const renderPlayer = () => {
        try {
            if (mediaUrl.includes('youtube.com') || mediaUrl.includes('youtu.be')) {
                const videoId = new URL(mediaUrl).searchParams.get('v')
                return (
                    <YouTube
                        videoId={videoId}
                        onReady={handleReady}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        onEnd={handleEnd}
                        opts={{
                            width: '100%',
                            height: '100%',
                            playerVars: {
                                autoplay: 1,
                                controls: 1, 
                                modestbranding: 1, 
                                disablekb: 1, 
                                fs: 1,
                            },
                        }}
                    />
                )
            } else if (mediaUrl.includes('spotify.com')) {
                const [type, id] = mediaUrl.split('/').slice(-2)
                return (
                    <SpotifyPlayer
                        uri={`spotify:${type}:${id}`}
                        size={width > 800 ? 'large' : 'compact'}
                        view="list"
                        theme="black"
                        // height={height}
                    />
                )
            }
            return <p>Media type not supported</p>
        } catch (error) {
            setError('Failed to load media. Please check the URL.')
            return null
        }
    }

    return (
        <div className="media-player">
        
            {error && <Alert variant="danger">{error}</Alert>}
            <div className="player-body" style={{ width }}>
                {renderPlayer()}
            </div>
            <div className="player-header">
                <Button variant="danger" onClick={onClose} size="sm">
                    Close
                </Button>
                <Button variant="secondary" onClick={handlePlayPause} size="sm">
                    {isPlaying ? 'Pause' : 'Play'}
                </Button>
            </div>
            <div className="player-controls">
            
                {isSurveyEnabled && (
                    <Button variant="primary" href="/survey" className="survey-button">
                        Take Survey
                    </Button>
                )}
            </div>
        </div>
    )
}

export default MediaPlayer
