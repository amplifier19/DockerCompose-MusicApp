const mongoose = require('mongoose')

const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    link: {
        type: String
    },
    p_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parent Playlist'
    }
})

module.exports = mongoose.model("playslist", playlistSchema);