const trackModel = require('../models/trackModel')

module.exports.getTracks = async (req, res) => {
    const tracks = await trackModel.find()
    res.send(tracks)
}

module.exports.getTracksByPlaylist = async (req, res) => {
    const { p_id } = req.body
    const tracks = await trackModel.find({ p_id })
    res.send(tracks)
}

module.exports.createTrack = async (req, res) => {
    const { name, artist, link, p_id } = req.body

    const trackToCreate = {}
    if (name && name.trim() !== '')
        trackToCreate.name = name
    if (link && link.trim() !== '')
        trackToCreate.link = link
    if (artist && artist.trim() !== '')
        trackToCreate.artist = artist
    if (p_id && p_id.trim() !== '')
        trackToCreate.p_id = p_id
    else
        trackToCreate.p_id = null


    if (trackToCreate) {
        trackModel.create(trackToCreate)
            .then((data) => {
                console.log('Added Successfully...')
                console.log(data)
                res.send(data)
            })
            .catch((error) => console.log(error))
    }
}

module.exports.updateTrack = async (req, res) => {
    const { _id, name, artist, link, p_id } = req.body

    const trackToUpdate = {}
    if (name && name.trim() !== '')
        trackToUpdate.name = name
    if (link && link.trim() !== '')
        trackToUpdate.link = link
    if (artist && artist.trim() !== '')
        trackToUpdate.artist = artist
    trackToUpdate.p_id = p_id

    if (trackToUpdate) {
        trackModel.findByIdAndUpdate(_id, trackToUpdate)
            .then((data) => {
                console.log("Track updated successfully")
                console.log(data)
                console.log(trackToUpdate)
                console.log(p_id)
                res.send('Track updated successfully...')
            })
            .catch((error) => console.log(error))
    }
}

module.exports.deleteTrack = async (req, res) => {
    const { _id } = req.body
    trackModel.findByIdAndDelete({ _id: _id })
        .then(() => {
            console.log('Deleted Successfully')
        })
        .catch((err) => console.log(er))
}

