import { model, Schema } from 'mongoose';

const SongSchema = new Schema({
    title: {
        type: String,
        required: [true, "¡El título es obligatorio!"],
        maxlength: [255, "¡El título puede tener un maximo de 255 caracteres!"],
        minlength: [6, "¡El título debe tener minimo 6 caracteres!"] //6
    },
    artist: {
        type: String,
        required: [true, "¡El artista es obligatorio!"],
        maxlength: [255, "¡El artista puede tener un maximo de 255 caracteres!"],
        minlength: [10, "¡El artista debe tener minimo 10 caracteres!"]
    },
    genre: 
    {type: String,
        required: [true, "¡El genero es obligatorio!"],
    },
    year:{
        type: Number,
        required: [true, "¡El año es obligatorio!"],
        min: [1900, "¡El año debe ser igual o mayor a 1900!"],
        max: [2024, "¡El año debe ser igual o menor a 2024!"]
    } 
}, { timestamps: true });

const Song = model("Song", SongSchema);

export {Song, SongSchema}