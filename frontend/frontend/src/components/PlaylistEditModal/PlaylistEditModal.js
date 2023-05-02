import React, { useState } from 'react'
import { updatePlaylist, deletePlaylist } from '../../utils/HandlePlaylistApi'
import "./PlaylistEditModal.css"

export const PlaylistEditModal = ({ setPlaylistEditModal, setPlaylistEdited, setCurrentPlaylist, prevPlaylists, currentPlaylist, parentPlaylist }) => {

  const [data, setData] = useState({
    _id: currentPlaylist._id,
    name: currentPlaylist.name,
    link: currentPlaylist.link,
    p_id: currentPlaylist.p_id
  })

  const handleUpdate = (e) => {
    e.preventDefault()
    if (data.p_id === "")
      data.p_id = null
    updatePlaylist(currentPlaylist._id, data.name, data.link, data.p_id, setPlaylistEdited)
    setPlaylistEditModal(false)
  }

  const handleDelete = (e) => {
    deletePlaylist(currentPlaylist._id, setPlaylistEdited)
    setCurrentPlaylist(parentPlaylist)
    setPlaylistEditModal(false)
  }
  return (
    <div className="background">
      <div className="modalContainer">
        <div className="header">
          <button id='X' onClick={() => setPlaylistEditModal(false)}>X</button>
        </div>
        <h2 className="modalTitle">Edit the playlist</h2>
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
                id="p_id"
                name="p_id"
                value={data.p_id || ""}
                onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
              >
                {prevPlaylists.map((playlist) => (currentPlaylist._id !== playlist._id &&
                  <option key={playlist._id} value={playlist._id}> {playlist.name} </option>
                ))}
                <option value="" > Main </option>
              </select>
            </div>
          </div>
          <div className="modalBtnContainer">
            <button id='submitBtn' type='submit'>Edit</button>
            <button id='cancelBtn' type='button' onClick={() => setPlaylistEditModal(false)}>Cancel</button>
            <button id='deleteBtn' type='button' onClick={handleDelete}>
              Delete
            </button>
          </div>
        </form>
      </div>
    </div >
  )
}

export default PlaylistEditModal
