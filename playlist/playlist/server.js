const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes/playlistRoute')

const app = express()
PORT = 4000

URL = "mongodb://admin:password@mongodb-playlist:27017"

mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(err))


app.use(express.json())
app.use(cors())
app.use(routes)

app.listen(PORT, () => console.log(`Listening on ${PORT}...`))