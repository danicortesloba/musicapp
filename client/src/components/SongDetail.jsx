import propTypes from 'prop-types'
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const SongDetail = ({ songs }) => {
    const { id } = useParams();
    const currentSong = songs.filter((s) => s._id === id)
    const objIndex = songs.findIndex(obj => obj._id == id);

    const [song, setSong] = useState(currentSong[0]);
   
        const handleChange = (e) => {
        const { name, value } = e.target
        setSong((prevSong) => ({...prevSong,[name]: value}));
        
    }

    const updateSong = async (e) => {
        e.preventDefault();
        try {
            console.log(song)
            const { data } = await axios.patch(`/api/songs/${song._id}`, song);
            setSong(data);
            songs[objIndex]= data
        } catch (error) {
            console.error('¡Hubo un error al actualizar la cancion!', error);
        }
    }
    return (
        <form onSubmit={updateSong} className="card">
            <h1>{song.title}</h1>
            <input
                    className="field"
                    type="text"
                    id="title"
                    name="title"
                    value={song.title}
                    onChange={handleChange}
                    placeholder="Nuevo título"
                />
            <h2>{song.artist}</h2>
            <input
                    className="field"
                    type="text"
                    id="artist"
                    name="artist"
                    value={song.artist}
                    onChange={handleChange}
                    placeholder="Nuevo artista"
                />
            <h3>{song.genre}</h3>
            <input
                    className="field"
                    type="text"
                    id="genre"
                    name="genre"
                    value={song.genre}
                    onChange={handleChange}
                    placeholder="Nuevo género"
                />
            <h4>{song.year}</h4>
            <input
                    className="field"
                    type="text"
                    id="year"
                    name="year"
                    value={parseInt(song.year)}
                    onChange={handleChange}
                    placeholder="Nuevo año"
                />
                <button className="btn" type="submit">Actualizar canción</button>
        </form>
    )
}

SongDetail.propTypes = {
    songs: propTypes.array
}

export default SongDetail