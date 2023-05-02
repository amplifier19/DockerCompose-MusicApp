const mongoose = require('mongoose')

const trackSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    artist: {
        type: String,
    },
    link: {
        type: String,
        require: true
    },
    p_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Playlist',
        require: true
    }
})

module.exports = mongoose.model('track', trackSchema)

