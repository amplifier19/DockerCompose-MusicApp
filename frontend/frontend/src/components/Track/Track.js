import React, { useEffect } from 'react'
import './Track.css'

import MusicNoteIcon from '@mui/icons-material/MusicNote';

const Track = (props) => {
    useEffect(() => {
        document.cookie = 'mycookie=value; SameSite=None; Secure'
    }, [])

    return (
        <div className='track' onClick={props.onClick}>
            <MusicNoteIcon className='icon' />
            <div className="name"> {props.name}</div>
        </div>
    )
}

export default Track