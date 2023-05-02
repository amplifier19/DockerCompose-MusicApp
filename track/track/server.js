const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes/trackRoute')
const cors = require('cors')
const app = express()
const PORT = 5000

URL = "mongodb://admin:password@mongodb-track:27017"

mongoose
    .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch((error) => console.log(error))


app.use(express.json())
app.use(cors())
app.use(routes)

app.listen(PORT, () => console.log(`Listening on ${PORT}`))
