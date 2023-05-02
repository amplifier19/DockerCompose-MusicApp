const request = require('request')
const playlistModel = require('../models/playlistModel')

const trackAPIEndpoint = "http://track:5000/getByPlaylist"

module.exports.getCurrentPlaylists = async (req, res) => {
    const p_id = req.query.p_id
    const playlists = await playlistModel.find({ p_id: p_id })
    res.send(playlists)
}

module.exports.getAllPlaylists = async (req, res) => {
    const playlists = await playlistModel.find()
    res.send(playlists)
}

module.exports.getParentPlaylist = async (req, res) => {
    const p_id = req.query.p_id
    const parent = await playlistModel.findOne({ _id: p_id })
    res.send(parent)
}

module.exports.getPreviousPlaylists = async (req, res) => {
    let _id = req.query._id
    let p_id = req.query.p_id
    let prevPlaylists = []

    // find sibling playlists
    let playlists = await playlistModel.find({ p_id: p_id })
    for (const playlist of playlists) {
        if (playlist._id != _id)
            prevPlaylists.push(playlist)
    }

    while (p_id) {
        // find parent playlist
        playlists = await playlistModel.findById({ _id: p_id })
        prevPlaylists.push(playlists)

        p_id = prevPlaylists[prevPlaylists.length - 1].p_id
        if (!p_id)
            p_id = null

        // find siblings of parent playlist 
        playlists = await playlistModel.find({ p_id: p_id })
        for (const playlist of playlists) {
            if (!prevPlaylists.some(obj => JSON.stringify(obj) === JSON.stringify(playlist)))
                prevPlaylists.push(playlist)
        }

    }
    res.send(prevPlaylists)
}

module.exports.getTracks = async (req, res) => {
    const p_id = req.query.p_id
    const options = {
        url: trackAPIEndpoint,
        method: 'GET',
        json: true,
        body: { p_id: p_id }
    }
    request.get(options, (error, response, body) => {
        if (error) {
            console.log('Error fetching the tracks')
            res.status(500).send('Error fetching the tracks')
        }
        else {
            res.send(body)
        }

    })
}

module.exports.createPlaylist = async (req, res) => {
    const { name, link, p_id } = req.body

    const playlistToCreate = {}
    if (name && name.trim() !== '')
        playlistToCreate.name = name
    if (link && link.trim() !== '')
        playlistToCreate.link = link
    if (p_id && p_id.trim() !== '')
        playlistToCreate.p_id = p_id
    else
        playlistToCreate.p_id = null

    if (playlistToCreate) {
        playlistModel.create(playlistToCreate)
            .then((data) => {
                console.log('Added Successsfully...')
                console.log(data)
                res.send(data)
            })
            .catch((err) => console.log(err))
    }
}

module.exports.updatePlaylist = async (req, res) => {
    const { _id, name, link, p_id } = req.body
    const playlistToUpdate = {}
    if (name && name.trim() !== '')
        playlistToUpdate.name = name
    if (link && link.trim() !== '')
        playlistToUpdate.link = link
    playlistToUpdate.p_id = p_id


    if (playlistToUpdate) {
        playlistModel.findByIdAndUpdate(_id, playlistToUpdate)
            .then(() => res.set(201).send('Playlist updated successfully...'))
            .catch((err) => console.log(err))
    }
}

module.exports.deletePlaylist = async (req, res) => {
    const { _id } = req.body
    playlistModel.findByIdAndRemove({ _id: _id })
        .then(() => {
            console.log('Deleted Successsfully...')
        })
        .catch((err) => console.log(err))
}