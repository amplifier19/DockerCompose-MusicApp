import React, { useState, useRef, useEffect } from 'react';
import './TrackPlayer.css'
import PauseCircleFilledRoundedIcon from '@mui/icons-material/PauseCircleFilledRounded';
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';

const TrackPlayer = ({ videoId, setTrackEnded }) => {
    const playerRef = useRef(null)
    const [playerReady, setPlayerReady] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [pause, setPause] = useState(true)

    useEffect(() => {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeAPIReady = () => {
            playerRef.current = new window.YT.Player('youtube-player', {
                height: '315',
                width: '560',
                videoId,
                playerVars: {
                    autoplay: 1,
                    controls: 0,
                    disablekb: 1,
                    enablejsapi: 1,
                    modestbranding: 1,
                    playsinline: 1,
                    rel: 0,
                    showinfo: 0,
                },
                events: {
                    onReady: () => {

                        setDuration(playerRef.current.getDuration())

                    },
                    onStateChange: (event) => {
                        if (event.data === window.YT.PlayerState.PLAYING) {
                            setInterval(() => {
                                setCurrentTime(playerRef.current.getCurrentTime())
                            }, 1000)
                        }
                        else {
                            clearInterval()
                            setDuration(playerRef.current.getDuration())
                        }
                        if (event.data === window.YT.PlayerState.ENDED) {
                            setTrackEnded(true)
                        }
                    }
                }
            })
        };
        setPlayerReady(true);
    }, []);

    useEffect(() => {
        if (playerRef.current && videoId && playerReady) {
            playerRef.current.cueVideoById(videoId)
            playerRef.current.playVideo()
        }
    }, [videoId])



    const onSeek = (time) => {
        playerRef.current && playerRef.current.seekTo(time, true)
    }

    const formatTime = (time) => {
        try {
            const minutes = Math.floor(time / 60)
            const seconds = time.toFixed(0) % 60
            const timeStr = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0')
            return timeStr
        }
        catch (err) { console.log(err) }
    }

    return (
        <div>
            <div className='playPauseBtn'>
                {videoId && playerReady && !pause && playerRef.current.pauseVideo() &&
                    <PlayCircleFilledRoundedIcon
                        className="btnIcon"
                        fontSize="large"
                        onClick={() => {
                            setPause(true)
                        }}
                    />
                }
                <div>
                    {videoId && playerReady && pause && playerRef.current.playVideo() &&
                        <PauseCircleFilledRoundedIcon
                            className="btnIcon"
                            fontSize="large"
                            onClick={() => {
                                setPause(false)
                            }}
                        />
                    }
                </div>
            </div>
            <div className='ytPlayer'
                id="youtube-player"
                style={{ position: 'absolute', left: '-9999px' }}
            />
            {videoId && <div className="controller">
                <div className="time">{formatTime(currentTime)}</div>
                <input
                    type='range'
                    min='0'
                    max={duration}
                    step='0.1'
                    value={currentTime}
                    onChange={(e) => onSeek(e.target.value)}
                />
                <div className="time">{formatTime(duration)}</div>
            </div>}
        </div>
    );
};

export default TrackPlayer;