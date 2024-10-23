import { Router } from 'express';
import { createNewPlaylist, getAllPlaylists, getPlaylistByTitle, updatePlaylist, deletePlaylist, addSongToPlaylist } from '../controllers/playlist.controller.js';

const playlistRouter = Router();

playlistRouter.route('/playlists')
    .get(getAllPlaylists)
    .post(createNewPlaylist)

playlistRouter.route('/playlists/:title')
    .get(getPlaylistByTitle)
    .delete(deletePlaylist)
    

    playlistRouter.route('/playlists/update/:id')
    .patch(updatePlaylist)

    
playlistRouter.route('/playlists/modify/:id')
    .patch(addSongToPlaylist)
  

    export default playlistRouter