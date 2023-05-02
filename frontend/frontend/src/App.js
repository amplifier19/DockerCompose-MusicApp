import { useEffect, useState } from "react";
import './App.css';
import Track from "./components/Track/Track";
import Playlist from "./components/Playlist/Playlist";
import Navbar from "./components/Navbar/Navbar";
import PlaylistAddModal from "./components/PlaylistAddModal/PlaylistAddModal";
import PlaylistEditModal from "./components/PlaylistEditModal/PlaylistEditModal";
import TrackAddModal from "./components/TrackAddModal/TrackAddModal";
import TrackEditModal from "./components/TrackEditModal/TrackEditModal";
import TrackPlayer from "./components/TrackPlayer/TrackPlayer";
import Counter from "./components/Counter/Counter";
import { getPlaylists, getAllPlaylists, getParentPlaylist, getPreviousPlaylists, getTracks } from "./utils/HandlePlaylistApi";


import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import QueueMusicOutlinedIcon from '@mui/icons-material/QueueMusicOutlined';
import PlaylistAddRoundedIcon from '@mui/icons-material/PlaylistAddRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';

function App() {
  const [playlists, setPlaylists] = useState([])
  const [currentPlaylist, setCurrentPlaylist] = useState({})
  const [parentPlaylist, setParentPlaylist] = useState({})
  const [prevPlaylists, setPreviousPlaylists] = useState([])
  const [allPlaylists, setAllPlaylists] = useState([])
  const [playlistAddModal, setPlaylistAddModal] = useState(false)
  const [playlistEditModal, setPlaylistEditModal] = useState(false)
  const [playlistAdded, setPlaylistAdded] = useState(false)
  const [playlistEdited, setPlaylistEdited] = useState(false)

  const [tracks, setTracks] = useState([])
  const [tracksSetted, setTracksSetted] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(null)
  const [nextTrack, setNextTrack] = useState(null)
  const [prevTrack, setprevTrack] = useState(null)
  const [trackAddModal, setTrackAddModal] = useState(false)
  const [trackEditModal, setTrackEditModal] = useState(false)
  const [trackEdited, setTrackEdited] = useState(false)
  const [trackAdded, setTrackAdded] = useState(false)
  const [trackEnded, setTrackEnded] = useState(false)

  const handleTrack = (track) => {
    setCurrentTrack(track)
    let nextIndex
    let prevIndex
    if (tracks.indexOf(track) === (tracks.length - 1))
      nextIndex = 0
    else
      nextIndex = tracks.indexOf(track) + 1
    if (tracks.indexOf(track) === 0)
      prevIndex = tracks.length - 1
    else
      prevIndex = tracks.indexOf(track) - 1
    setprevTrack(tracks[prevIndex])
    setNextTrack(tracks[nextIndex])
  }

  useEffect(() => {
    if (tracksSetted) {
      const track = tracks.find(obj => obj._id === currentTrack?._id)
      if (track) {
        setCurrentTrack(track)
      }
      else {
        setCurrentTrack(nextTrack)
      }
      handleTrack(track)
      setTracksSetted(false)
    }
  }, [tracksSetted])

  useEffect(() => {
    getPlaylists(currentPlaylist._id, setPlaylists)
    getAllPlaylists(setAllPlaylists)
    getPreviousPlaylists(currentPlaylist._id, currentPlaylist.p_id, setPreviousPlaylists)

    getTracks(currentPlaylist._id, setTracks, setTracksSetted)

    if (playlistAdded) setPlaylistAdded(false)
    if (playlistEdited) setPlaylistEdited(false)
    if (trackAdded) setTrackAdded(false)
    if (trackEdited) setTrackEdited(false)


  }, [currentPlaylist, playlistAdded, playlistEdited, trackAdded, trackEdited])

  useEffect(() => {
    if (trackEnded) {
      handleTrack(nextTrack)
      setTrackEnded(false)
    }
  }, [trackEnded])

  return (
    <div className="App">

      {playlistAddModal && <PlaylistAddModal
        setPlaylistAddModal={setPlaylistAddModal}
        setPlaylistAdded={setPlaylistAdded}
        allPlaylists={allPlaylists}
        currentPlaylist={currentPlaylist} />
      }

      {playlistEditModal && <PlaylistEditModal
        setPlaylistEditModal={setPlaylistEditModal}
        setPlaylistEdited={setPlaylistEdited}
        setCurrentPlaylist={setCurrentPlaylist}
        prevPlaylists={prevPlaylists}
        currentPlaylist={currentPlaylist}
        parentPlaylist={parentPlaylist} />
      }

      {trackAddModal && <TrackAddModal
        setTrackAddModal={setTrackAddModal}
        setTrackAdded={setTrackAdded}
        allPlaylists={allPlaylists}
        currentPlaylist={currentPlaylist} />
      }

      {trackEditModal && <TrackEditModal
        setTrackEditModal={setTrackEditModal}
        setTrackEdited={setTrackEdited}
        allPlaylists={allPlaylists}
        currentPlaylist={currentPlaylist}
        currentTrack={currentTrack} />
      }

      <Navbar />

      <div className="middle">
        <div className="menuContainer">
          <div className="menuItem" onClick={() => setTrackAddModal(true)}>
            <div className="menuItemDesc">Add track</div>
            <QueueMusicOutlinedIcon className="menuIcon" />
          </div>
          <div className="menuItem" onClick={() => setPlaylistAddModal(true)}>
            <div className="menuItemDesc">Add playlist</div>
            <PlaylistAddRoundedIcon className="menuIcon" />
          </div>
        </div>

        <div className="leftRightContainer">
          <div className="left">
            <div className="playlistContainer">
              <div className="playlistHeader">
                <ArrowBackIosNewRoundedIcon className="icon" onClick={() => {
                  if (currentPlaylist._id) {
                    setCurrentPlaylist(parentPlaylist)
                    getParentPlaylist(currentPlaylist.p_id, setParentPlaylist)
                  }
                }} />
                <h2>
                  {currentPlaylist.name ? currentPlaylist.name : "Main"}
                  <MoreHorizIcon className="icon" onClick={() => { currentPlaylist._id && setPlaylistEditModal(true) }} />
                </h2>
              </div>
              <div className="tracksPlaylistsContainer">
                {tracks.map((track) => (
                  <Track
                    key={track._id}
                    name={track.name}
                    onClick={() => handleTrack(track)}
                  />))
                }
                {playlists.map((playlist) => (
                  <Playlist
                    key={playlist._id}
                    name={playlist.name}
                    onClick={() => {
                      if (currentPlaylist.p_id !== playlist.p_id)
                        setParentPlaylist(currentPlaylist)
                      if (currentPlaylist !== playlist)
                        setCurrentPlaylist(playlist)
                    }}
                  />))
                }
              </div>
            </div>
          </div>
          <div className="rightContainer">
            <div
              className={`right ${currentTrack ? "show" : ""}`}
            >
              <div className="trackHeader">
                {currentTrack && <SkipPreviousRoundedIcon className="arrowIcon" fontSize="large" onClick={() => handleTrack(prevTrack)} />}
                <div className="trackInfo">
                  <div className="trackName">{currentTrack && currentTrack.name}</div>
                  <div className="artist">{currentTrack && currentTrack.artist}</div>
                  {currentTrack && <MoreHorizIcon className="arrowIcon" onClick={() => setTrackEditModal(true)} />}
                </div>
                {currentTrack && <SkipNextRoundedIcon className="arrowIcon" fontSize="large" onClick={() => handleTrack(nextTrack)} />}
              </div>
              <div className="player">
                <TrackPlayer
                  videoId={currentTrack?.link}
                  setTrackEnded={setTrackEnded}
                />
              </div>
            </div>
            <Counter playlistSum={playlists.length} trackSum={tracks.length} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;