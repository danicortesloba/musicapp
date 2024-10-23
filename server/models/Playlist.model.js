import { model, Schema } from 'mongoose';
import { SongSchema } from './Song.model.js';


const PlaylistSchema = new Schema({
    title: {
        type: String,
        required: [true, "¡El título es obligatorio!"],
        maxlength: 255,
        minlength: 6
    },
    user: {
        type: String,
        required: [true, "¡El usuario es obligatorio!"],
        maxlength: 255,
        minlength: 6
    },
    genre: 
    {type: String,
        required: [true, "¡El genero es obligatorio!"],
    },
    songs:{
        type: [SongSchema],
        required: [true, "¡Las canciones son obligatorias!"],     
    } 
}, { timestamps: true });

const Playlist = model("Playlist", PlaylistSchema);

export default Playlist;