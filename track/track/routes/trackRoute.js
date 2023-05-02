const { Router } = require('express')
const { getTracks, getTracksByPlaylist, createTrack, updateTrack, deleteTrack } = require('../controllers/trackController')

const router = Router()

router.get('/', getTracks)
router.get('/getByPlaylist', getTracksByPlaylist)
router.post('/create', createTrack)
router.post('/update', updateTrack)
router.post('/delete', deleteTrack)


module.exports = router;