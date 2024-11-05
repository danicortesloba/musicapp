import { NavLink} from "react-router-dom";
import  { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/loginService";
const NavBar = () => {

    const context = useContext(LoginContext)
    const navigate = useNavigate()
 const signOut = async () => {
     try {
         const response = await logout()
         localStorage.removeItem('user')
         context.setUser(null)
         console.log(response)
         navigate('/users/login')

     } catch (error) {
         console.log(error)
     }
     }
    
   
    return (
        <div className="navbar">
            <NavLink to="/"><h1>Biblioteca de Canciones</h1></NavLink>
            <NavLink to="/playlist"><h1>Biblioteca de Playlist</h1></NavLink>
            <NavLink to="/users/login">Login</NavLink>
            <button onClick={()=> signOut()}>Logout</button>
        </div>
    )
}

export default NavBar