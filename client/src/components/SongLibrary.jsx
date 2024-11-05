import axios from "axios";
import { useState} from "react";
import propTypes from 'prop-types';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";



const SongLibrary = ({songs, setSongs} ) => {
    const {user} = useContext(LoginContext)
    console.log("user", user)
    const initialSong = {title: '', artist: '', genre: '', year: ''};
    const [song, setSong] = useState(initialSong);
    const [serverErrors, setServerErrors] = useState({});
    const [clientError, setClientError] = useState("");
    const [fieldsComplete, setFieldsComplete] = useState(false)
 
    const validateForm = () => {
        let formErrors = "";
        if (!song.title) {
            formErrors += ' El campo titulo es obligatorio';
        }
        if (!song.artist) {
            formErrors += ' El campo artista es obligatorio';
        }
        if (!song.genre) {
            formErrors += ' El campo genero es obligatorio';
        }
        if (!song.year) {
            formErrors += 'El campo año es obligatorio';
        }
        setClientError(formErrors);
    }

const deleteSong = async (title) => {
    try {
        await axios.delete(`/api/songs/${title}`);
        const updatedSongs = songs.filter((song) => song.title !== title);
        setSongs(updatedSongs);
    } catch (error) {
        console.log(error)
        console.error('¡Hubo un error al borrar la cancion!', error);
}
}

const manageChange = (e) => {
    if (song.title !== "" && song.artist !== "" && song.genre !== "" && song.year !== "") {
        setFieldsComplete(true)
    } else {
        setFieldsComplete(false)
    }
    const {name, value} = e.target
    setSong({ ...song, [name]: value })
}

const submitSong = async (e) => {
    e.preventDefault();
    validateForm();
    if (clientError !== "" || !fieldsComplete) {
        return;
    } else {
    try {
        const { data } = await axios.post('/api/songs', song);
        setSongs([...songs, data]);
        setSong(initialSong);
        setClientError("")
        setServerErrors({});
    } catch (error) {
        setServerErrors(error)
        console.log(serverErrors.response.data.message)
    }
}
}

    return (
        <div className="container">
            <div className="library">
                <h1 className="title">Biblioteca de canciones</h1>
                <div className="cards">
                    {songs.map((song, index) => (
                        <div className="card" key={index}>
                            <h2>{song.title}</h2>
                            <h3>{song.artist}</h3>
                            <h4>{song.genre}</h4>
                            <p>{song.year}</p>
                            <button onClick={() => deleteSong(song.title)}>Borrar</button>
                            <button><Link to={`/songs/modify/${song._id}`}>Editar</Link></button>
                        </div>
                    ))}
                </div>
            </div>
            <form className="form" onSubmit={(e)=>submitSong(e)}>
                <h1>Añadir nueva canción</h1>
                <label htmlFor="title">Título:</label>
                <input className="field" type="text" name="title" id="title" onChange={manageChange} value={song.title} />
                <label htmlFor="artist">Artista:</label>
                <input className="field" type="text" name="artist" id="artist" onChange={manageChange} value={song.artist} />
                <label htmlFor="genere">Género:</label>
                <input className="field" type="text" name="genre" id="genre" onChange={manageChange} value={song.genre} />
                <label htmlFor="year">Año:</label>
                <input className="field" type="number" name="year" id="year" onChange={manageChange} value={song.year} />
                <button className="button"  type="submit"  disabled={!fieldsComplete || clientError ==! ""}>Agregar cancion</button>
                {clientError !== "" ? <p>{clientError}</p> : null }
                {clientError === "" && serverErrors ? <p>{serverErrors?.response?.data?.message}</p> : null }

            </form>
            
        </div>
    )
}

SongLibrary.propTypes = {
    songs: propTypes.array,
    setSongs: propTypes.func
}


export default SongLibrary