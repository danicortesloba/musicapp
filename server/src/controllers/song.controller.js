import {Song} from '../models/Song.model.js';

// Función para crear un nuevo libro
const createNewSong = async (req, res) => {
    try {
        const newSong = await Song.create(req.body);
        res.json(newSong);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAllSongs = async (req, res) => {
    try {
        const songs = await Song.find();
        res.json(songs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getSongByTitle = async (req, res) => {
    console.log(req.params)
    try {
        const song = await Song.findOne({ title: req.params.title });
        res.json(song);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getSongByFilter = async (req, res) => {
    try {
        const song = await Song.find(req.body);
        res.json(song);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateSong = async (req, res) => {
    try {
        const updatedSong = await Song.findOneAndUpdate({ _id: req.params.id}, req.body, { new: true });
        
        if (!updatedSong) {
            const error = new Error('Canción no encontrada');
            error.statusCode = 404;
            throw error;
          }
        
        res.json(updatedSong);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteSong = async (req, res) => {
    try {
        await Song.deleteOne({ title: req.params.title });
        res.json({ message: 'Canción eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export  {createNewSong, getAllSongs, getSongByTitle, updateSong, deleteSong };
