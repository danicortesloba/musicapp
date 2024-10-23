import Playlist from '../models/Playlist.model.js';

const getAllPlaylists = async (req, res) => {
    try {
        const playlists = await Playlist.find();
        res.json(playlists);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createNewPlaylist = async (req, res) => {
    try {
        const newPlaylist = await Playlist.create(req.body);
        res.json(newPlaylist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getPlaylistByTitle = async (req, res) => {
    try {
        const playlist = await Playlist.findOne({ title: req.params.title });
        res.json(playlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deletePlaylist = async (req, res) => {
    try {
        await Playlist.deleteOne({ title: req.params.title });
        res.json({ message: 'Playlist eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updatePlaylist = async (req, res) => {
    try {
        const updatedPlaylist = await Playlist.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        res.json(updatedPlaylist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const addSongToPlaylist = async (req, res) => {
    console.log(req.params.id)
    try {
        const playlist = await Playlist.findOneAndUpdate({ _id: req.params.id }, { $push: { songs: req.body } }, { new: true });
        console.log(playlist)
        return res.json(playlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export  {createNewPlaylist, getAllPlaylists, getPlaylistByTitle, deletePlaylist, updatePlaylist, addSongToPlaylist };