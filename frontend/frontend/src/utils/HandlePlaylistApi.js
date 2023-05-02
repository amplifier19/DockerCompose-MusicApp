import axios from 'axios'

const baseUrl = `http://${process.env.REACT_APP_HOST_IP_ADDRESS}:4000`

const getPlaylists = (p_id, setPlaylists) => {
    axios.get(baseUrl, { params: { p_id: p_id } })
        .then((playlists) => {
            setPlaylists(playlists.data)
        })
        .catch((error) => console.log(error))
}

const getAllPlaylists = (setAllPlaylists) => {
    axios.get(`${baseUrl}/all`, {})
        .then((playlists) => {
            setAllPlaylists(playlists.data)
        })
        .catch((error) => console.log(error))
}

const getParentPlaylist = (p_id, setParentPlaylist) => {
    axios.get(`${baseUrl}/getParent`, { params: { p_id: p_id } })
        .then((parent) => {
            setParentPlaylist(parent.data)
        })
        .catch((error) => console.log(error))
}

const getPreviousPlaylists = (_id, p_id, setPreviousPlaylists) => {
    axios.get(`${baseUrl}/prev`, { params: { _id: _id, p_id: p_id } })
        .then((prev) => {
            setPreviousPlaylists(prev.data)
        })
        .catch((err) => console.log(err))

}

const addPlaylist = (name, link, p_id, setPlaylistAdded) => {
    axios.post(`${baseUrl}/create`, { name: name, link: link, p_id: p_id })
        .catch((err) => {
            console.log(err)
        })
    setPlaylistAdded(true)
}

const updatePlaylist = (_id, name, link, p_id, setPlaylistEdited) => {
    axios.post(`${baseUrl}/update`, { _id: _id, name: name, link: link, p_id: p_id })
        .catch((err) => {
            console.log(err)
        })
    setPlaylistEdited(true)
}

const deletePlaylist = (_id, setPlaylistEdited) => {
    axios.post(`${baseUrl}/delete`, { _id: _id })
        .catch((err) => {
            console.log(err)
        })
    setPlaylistEdited(true)
}

const getTracks = (p_id, setTracks, setTracksSetted) => {
    axios.get(`${baseUrl}/getTracks`, { params: { p_id: p_id } })
        .then((tracks) => {
            setTracks(tracks.data)
            setTracksSetted(true)
        })
        .catch((error) => console.log(error))
}

export { getPlaylists, getAllPlaylists, getParentPlaylist, getPreviousPlaylists, getTracks, addPlaylist, updatePlaylist, deletePlaylist }