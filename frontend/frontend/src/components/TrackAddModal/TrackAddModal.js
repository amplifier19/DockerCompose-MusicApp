import React, { useState } from 'react'
import { addTrack } from '../../utils/HandleTrackApi'
import "./TrackAddModal.css"

export const AddTrackModal = ({ setTrackAddModal, setTrackAdded, allPlaylists, currentPlaylist }) => {

    const [data, setData] = useState({
        name: '',
        artist: '',
        link: '',
        p_id: currentPlaylist._id
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        addTrack(data.name, data.artist, data.link, data.p_id, setTrackAdded)
        setTrackAddModal(false)
    }

    return (
        <div className="background">
            <div className="modalContainer">
                <div className="header">
                    <button id='X' onClick={() => setTrackAddModal(false)}>X</button>
                </div>
                <h2 className='modalTitle'>Add a track</h2>
                <form onSubmit={handleSubmit}>
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
                            <label htmlFor="name">Artist:</label>
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
                                onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
                            >
                                {currentPlaylist._id && <option value={currentPlaylist._id}> {currentPlaylist.name} </option>}
                                {allPlaylists.map((playlist) => (
                                    currentPlaylist._id !== playlist._id &&
                                    <option key={playlist._id} value={playlist._id}> {playlist.name} </option>
                                ))}
                                <option value={""}> Main </option>
                            </select>
                        </div>
                    </div>
                    <div className="modalBtnContainer">
                        <button id='submitBtn' type='submit'>Add</button>
                        <button id='cancelBtn' type='button' onClick={() => setTrackAddModal(false)}>Cancel</button>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default AddTrackModal