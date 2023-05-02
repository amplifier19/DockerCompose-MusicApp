import React, { useState, useEffect } from 'react'
import { updateTrack, deleteTrack } from '../../utils/HandleTrackApi'
import "./TrackEditModal.css"


export const TrackEditModal = ({ setTrackEditModal, setTrackEdited, allPlaylists, currentPlaylist, currentTrack }) => {

    useEffect(() => {
        document.cookie = 'mycookie=value; SameSite=None; Secure'
    }, [])

    const [data, setData] = useState({
        name: currentTrack.name,
        artist: currentTrack.artist,
        link: currentTrack.link,
        p_id: currentTrack.p_id
    })

    const handleUpdate = (e) => {
        e.preventDefault()
        if (data.p_id === "")
            data.p_id = null

        updateTrack(currentTrack._id, data.name, data.artist, data.link, data.p_id, setTrackEdited)
        setTrackEditModal(false)
    }

    const handleDelete = (e) => {
        deleteTrack(currentTrack._id, setTrackEdited)
        setTrackEditModal(false)
    }


    return (
        <div className="background">
            <div className="modalContainer">
                <div className="header">
                    <button id='X' onClick={() => setTrackEditModal(false)}>X</button>
                </div>
                <h2 className='modalTitle'>Edit the track</h2>
                <form onSubmit={handleUpdate}>
                    <div className="fieldContainer">
                        <div className="field">
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id='name'
                                name='name'
                                value={data.name}
                                onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="artist">Artist:</label>
                            <input
                                type="text"
                                id='artist'
                                name='artist'
                                value={data.artist}
                                onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="link">Link:</label>
                            <input
                                type="text"
                                id='link'
                                name='link'
                                value={data.link}
                                onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="p_id">Destination:</label>
                            <select
                                name="p_id"
                                value={data.p_id || ""}
                                onChange={(e) => setData({ ...data, p_id: e.target.value })}
                            >
                                {currentPlaylist._id && <option value={currentPlaylist._id} > {currentPlaylist.name} </option>}
                                {allPlaylists.map((playlist) => (currentPlaylist._id !== playlist._id &&
                                    <option key={playlist._id} value={playlist._id}> {playlist.name} </option>
                                ))}
                                <option value="" > Main </option>
                            </select>
                        </div>
                    </div>
                    <div className="modalBtnContainer">
                        <button id='submitBtn' type='submit'>Edit</button>
                        <button id='cancelBtn' type='button' onClick={() => setTrackEditModal(false)}>Cancel</button>
                        <button id='deleteBtn' type='button' onClick={handleDelete} >
                            Delete
                        </button>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default TrackEditModal
