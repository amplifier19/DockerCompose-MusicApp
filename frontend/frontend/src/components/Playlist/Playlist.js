import React from 'react'
import './Playlist.css'

import FolderRoundedIcon from '@mui/icons-material/FolderRounded';

const Playlist = (props) => {
    return (
        <div className='playlist' onClick={props.onClick}>
            <FolderRoundedIcon className='icon' />
            <div className="name">{props.name}</div>
        </div>
    )
}

export default Playlist