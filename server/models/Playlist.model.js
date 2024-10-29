import { model, Schema } from 'mongoose';
import { SongSchema } from './Song.model.js';


const PlaylistSchema = new Schema({
    title: {
        type: String,
        required: [true, "¡El título es obligatorio!"],
        maxlength: [255, "¡El nombre puede tener un maximo de 255 caracteres!"],
        minlength: [6, "¡El nombre debe tener minimo 6 caracteres!"]
    },
    user: {
        type: String,
        required: [true, "¡El usuario es obligatorio!"],
        maxlength: [255, "¡El usuario puede tener un maximo de 255 caracteres!"],
        minlength: [6,"¡El usuario debe tener minimo 6 caracteres!"]
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