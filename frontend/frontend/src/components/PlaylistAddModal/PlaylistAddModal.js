import React, { useState } from 'react'
import { addPlaylist } from '../../utils/HandlePlaylistApi'
import './PlaylistAddModal.css'

export const PlaylistAddModal = ({ setPlaylistAddModal, setPlaylistAdded, allPlaylists, currentPlaylist }) => {

    const [data, setData] = useState({
        name: '',
        link: '',
        p_id: currentPlaylist._id
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        addPlaylist(data.name, data.link, data.p_id, setPlaylistAdded)
        setPlaylistAddModal(false)
    }

    return (
        <div className="background">
            <div className="modalContainer">
                <div className="header">
                    <button id='X' onClick={() => setPlaylistAddModal(false)}>X</button>
                </div>
                <h2 className='modalTitle'>Add a playlist</h2>
                <form onSubmit={handleSubmit}>
                    <div className="fieldContainer">
                        <div className="field">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id='name'
                                name='name'
                                value={data.name}
                                onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
                            />
                        </div>
                        <div className="field">

                            <label htmlFor="link">Link</label>
                            <input
                                type="text"
                                id='link'
                                name='link'
                                value={data.link}
                                onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="p_id">Destination</label>
                            <select
                                name="p_id"
                                value={data.p_id}
                                onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
                            >
                                <option value={currentPlaylist._id}> {currentPlaylist.name ? currentPlaylist.name : "Main"} </option>
                                {allPlaylists.map((playlist) => (
                                    currentPlaylist !== playlist &&
                                    <option key={playlist._id} value={playlist._id}> {playlist.name} </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="modalBtnContainer">
                        <button id='submitBtn' type='submit'>Add</button>
                        <button id='cancelBtn' type='button' onClick={() => setPlaylistAddModal(false)}>Cancel</button>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default PlaylistAddModal
