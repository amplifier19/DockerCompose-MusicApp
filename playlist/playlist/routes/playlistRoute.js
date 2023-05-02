const { Router } = require('express')
const { getCurrentPlaylists, getAllPlaylists, getParentPlaylist, getPreviousPlaylists,
    getTracks, createPlaylist, updatePlaylist, deletePlaylist } = require('../controllers/playlistController')

const router = Router()

router.get('/', getCurrentPlaylists)
router.get('/all', getAllPlaylists)
router.get('/prev', getPreviousPlaylists)
router.get('/getParent', getParentPlaylist)
router.get('/getTracks', getTracks)
router.post('/create', createPlaylist)
router.post('/update', updatePlaylist)
router.post('/delete', deletePlaylist)

module.exports = router
