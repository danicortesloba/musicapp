import { useParams } from "react-router-dom"
import propTypes from 'prop-types';
import Options from "./Options";
import { useState } from "react";
import axios from "axios";


const PlaylistDetail = ({playlists, songs}) => {

   
    const {id} = useParams();
    const currentPlaylist = playlists.filter((p) => p._id === id)
    const objIndex = playlists.findIndex(obj => obj._id == id);

   const [playlist, setPlaylist] = useState(currentPlaylist[0])
   const [selected, setSelected] = useState([]);

    

const addSongs = async (e) => {
    e.preventDefault();
    try {
        const { data } = await axios.patch(`/api/playlists/modify/${playlist._id}`, selected);
        console.log(data)
    } catch (error) {
        console.error('¡Hubo un error al crear la playlist!', error);
    }
}

const deleteSong = (song) => async (e) => {
    e.preventDefault();
    try {
        const updatedSongs = playlist.songs.filter((s) => s.title !== song.title);
        setPlaylist({ ...playlist, songs: updatedSongs });
        await axios.patch(`/api/playlists/update/${playlist._id}`, playlist);
        playlists[objIndex]= playlist
    } catch (error) {
        console.error('¡Hubo un error al borrar la cancion!', error);
    }
}

const handleChange = (e) => {
    const { name, value } = e.target;
    setPlaylist((prevPlaylist) => ({
        ...prevPlaylist,
        [name]: value,
    }));
}

const updatePlaylist = async (e) => {
    e.preventDefault();
    try {
        const { data } = await axios.patch(`/api/playlists/update/${playlist._id}`, playlist);
        playlists[objIndex]= data
        console.log("data", data)
    } catch (error) {
        console.error('¡Hubo un error al actualizar la playlist!', error);
    }
}

    return (
        <>
        <form onSubmit={updatePlaylist} className="card">
            <h1>{playlist.title}</h1>
            <input
                    className="field"
                    type="text"
                    id="title"
                    name="title"
                    value={playlist.title}
                    onChange={handleChange}
                    placeholder="Nuevo título"
                />
        
             <h2>{playlist.user}</h2>
            <input
                    className="field"
                    type="text"
                    id="user"
                    name="user"
                    value={playlist.user}
                    onChange={handleChange}
                    placeholder="Nuevo usuario"
                />
            <h3>{playlist.genre}</h3>
            <input
                    className="field"
                    type="text"
                    id="genre"
                    name="genre"
                    value={playlist.genre}
                    onChange={handleChange}
                    placeholder="Nuevo género"
                />
            <button type="submit">Actualizar</button>
            </form>
            {playlist.songs.map((song, index) => (
            <div key={index}>
                <h4>{song.title}</h4>
                <button onClick={deleteSong(song)}>borrar</button>
            </div>
        ))
     }
        <form onSubmit={addSongs} className="card">
        <Options setPlaylist={setPlaylist} songs={songs} playlist={playlist} setSelected={setSelected} selected={selected}/>
        <button type="submit">Agregar</button>
        </form>
        </>
    )       
}   

PlaylistDetail.propTypes = {
    playlists: propTypes.array,
    songs: propTypes.array,
   
}

export default PlaylistDetail