import axios from 'axios'

const baseUrl = `http://${process.env.REACT_APP_HOST_IP_ADDRESS}:5000`

const addTrack = (name, artist, link, p_id, setTrackAdded) => {
    axios.post(`${baseUrl}/create`, { name: name, artist: artist, link: link, p_id: p_id })
        .catch((err) => {
            console.log(err)
        })
    setTrackAdded(true)
}

const updateTrack = (_id, name, artist, link, p_id, setTrackEdited) => {
    axios.post(`${baseUrl}/update`, { _id: _id, name: name, artist: artist, link: link, p_id: p_id })
        .catch((err) => {
            console.log(err)
        })
    setTrackEdited(true)
}

const deleteTrack = (_id, setTrackEdited) => {
    axios.post(`${baseUrl}/delete`, { _id: _id })
        .catch((err) => console.log(err))
    setTrackEdited(true)
}

export { addTrack, updateTrack, deleteTrack }