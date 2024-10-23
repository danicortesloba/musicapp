import { model, Schema } from 'mongoose';

const SongSchema = new Schema({
    title: {
        type: String,
        required: [true, "¡El título es obligatorio!"],
        maxlength: 255,
        minlength: 6
    },
    artist: {
        type: String,
        required: [true, "¡El artista es obligatorio!"],
        maxlength: 255,
        minlength: 10
    },
    genre: 
    {type: String,
        required: [true, "¡El genero es obligatorio!"],
    },
    year:{
        type: Number,
        required: [true, "¡El año es obligatorio!"],
        min: 1900,
        max: 2024
    } 
}, { timestamps: true });

const Song = model("Song", SongSchema);

export {Song, SongSchema}