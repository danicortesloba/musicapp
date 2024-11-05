import axios from "axios";
import {  useState } from "react";
import propTypes from 'prop-types';
import {Link} from "react-router-dom";
import Options from "./Options";
import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";

const PlaylistLibrary = ({playlists, setPlaylists, songs}) => {
    const { user } = useContext(LoginContext)
    const [error, setError] = useState([]);
    

    const [playlist, setPlaylist] = useState({
    title: '',
    genre: '',
    user:  '',
    songs: [],
    creator: user.id
    })


    const deletePlaylist = async (title) => {
        try {
            await axios.delete(`/api/playlists/${title}`);
            const updatedPlaylists = playlists.filter((playlist) => playlist.title !== title);
            setPlaylists(updatedPlaylists);
        } catch (error) {
            console.log(error)
            setError(error.response.data.message || "Algo salio mal");
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlaylist((prevPlaylist) => ({
            ...prevPlaylist,
            [name]: value,
        }));
        setPlaylist((prevPlaylist) => ({
            ...prevPlaylist,
            creator: user.id
        }))
    };

    const submitPlaylist = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/playlists', playlist);
            setPlaylists([...playlists, playlist]);
        } catch (error) {
            console.log(error)
            setError(error.response.data.message || "Algo salio mal");
        }
    };

    return (
        <div className="container">
            <div className="library">
                <h1 className="title">Playlist Library</h1>
                <div className="cards">
                    {playlists.map((playlist, index) => (
                        <div className="card" key={index}>
                            <h2>{playlist.title}</h2>
                            <h3>{playlist.user}</h3>
                            <h4>{playlist.genre}</h4>
                            <ul>
                            {playlist.songs.map((song, index) => (
                                <li key={index}>{song.title}</li>
                            ))}

                            </ul>
                            {user.id === playlist.creator &&
                            <div>
                            <button onClick={() => deletePlaylist(playlist.title)}>Borrar</button>
                            <button><Link to={`/playlist/modify/${playlist._id}`}>Agregar canción</Link></button>
                            </div>
                            }
                        </div>
                    ))}
                </div>
            </div>
            <form className="form" onSubmit={submitPlaylist}>

                <label htmlFor="title">Title:</label>
                <input
                    className="field"
                    type="text"
                    id="title"
                    name="title"
                    value={playlist.title}
                    onChange={handleChange}
                />

                <label htmlFor="genre">Genre:</label>
                <input
                className="field"
                    type="text"
                    id="genre"
                    name="genre"
                    value={playlist.genre}
                    onChange={handleChange}
                />

                <label htmlFor="user">User:</label>
                <input
                className="field"
                    type="text"
                    id="user"
                    name="user"
                    value={playlist.user}
                    onChange={handleChange}
                />

                <label htmlFor="songs">Songs:</label>
                
                <Options  setPlaylist={setPlaylist} songs={songs} playlist={playlist}></Options>

                <button className="button" type="submit">Submit</button>

            </form>

            {error && <p>{error}</p>}

        </div>
    )
}   

PlaylistLibrary.propTypes = {
    playlists: propTypes.array,
    setPlaylists: propTypes.func,
    songs: propTypes.array,
    setSongs: propTypes.func
}

export default PlaylistLibrary