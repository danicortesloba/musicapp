import {Routes, Route } from 'react-router-dom'
import './App.css'
import SongLibrary from './components/SongLibrary'
import PlaylistLibrary from './components/PlaylistLibrary'
import PlaylistDetail from './components/PlaylistDetail'
import NavBar from './components/NavBar'
import { useState, useEffect} from 'react'
import axios from "axios";
import SongDetail from './components/SongDetail'
import PublicRoutes from './components/PublicRoutes'
import PrivateRoutes from './components/PrivateRoutes'
import Login from './pages/Login'
import CreateUser from './pages/CreateUser'
import ShowUsers from './pages/ShowUsers'
import EditUser from './pages/EditUser'
import EditPassword from './pages/EditPassword'



function App() {
  const [playlists, setPlaylists] = useState([]);
  const [songs, setSongs] = useState([])
  const [loading, setLoading] = useState(true)
  
  const fetchSongs = async () => {
      try {
          const { data } = await axios.get('/api/songs');
          setSongs(data)
          setLoading(false)
      } catch (error) {
          console.error('¡Hubo un error al obtener las canciones!', error);
          setSongs([])
      }
      };

      const fetchPlaylists = async () => {
        try {
            const { data } = await axios.get('/api/playlists');
            setPlaylists(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('¡Hubo un error al obtener las playlists!', error);
            setPlaylists([]); 
        }
        };
  
  useEffect(() => {
  fetchSongs();
  fetchPlaylists();
  }, []);

  
    
  

  return (
    <>
  
     
      <NavBar />

        {loading ? <h1>Cargando...</h1> :
        <Routes>
          <Route path="/" element={
          <PublicRoutes>
            <Login />
          </PublicRoutes>  
          } />
        <Route path="/users" element={
        <PublicRoutes>
          <ShowUsers />
          </PublicRoutes >
        } />
        <Route path="/users/login" element={
          <PublicRoutes>
          <Login />
          </PublicRoutes >
        } />
        <Route path="/users/create" element={
          <PublicRoutes>
          <CreateUser />
          </PublicRoutes >
        } />
         <Route path="/songs/modify/:id" element={
          <PrivateRoutes>
            <SongDetail songs={songs}  />
          </PrivateRoutes>
          } />,
        <Route path="/users/edit/:id" element={
          <PrivateRoutes>
            <EditUser />
          </PrivateRoutes>    
          } />
        <Route path="/users/editpassword/:id" element={
          <PrivateRoutes>
            <EditPassword />
          </PrivateRoutes>
          } />
           <Route path="/playlist/modify/:id" element={
          <PrivateRoutes>
            <PlaylistDetail songs={songs} playlists={playlists}  />
          </PrivateRoutes>
          } />
           <Route path="/playlist" element={
          <PrivateRoutes>
            <PlaylistLibrary songs={songs}  playlists={playlists} setPlaylists={setPlaylists}/>
          </PrivateRoutes>
          } />
            <Route path="/songs" element={
          <PrivateRoutes>
            <SongLibrary songs={songs} setSongs={setSongs}/>
          </PrivateRoutes>
          } />
        </Routes> 
}
 
      
    </>
  )
}

export default App
