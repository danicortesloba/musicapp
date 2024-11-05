import { getAllUsers } from "../services/userService"
import { Link, useNavigate } from "react-router-dom"
import {deleteUser} from "../services/userService"
import { useEffect, useState, useContext} from "react"
import { LoginContext } from "../contexts/LoginContext"

const ShowUsers = () => {
    const {user} = useContext(LoginContext)
    const [users, setUsers] = useState([])
    const currentUser = user ? user : null
    const [currentError, setCurrentError] = useState('')
    const navigate = useNavigate()
    

useEffect (() => {
    const getUsers = async () => {
        try {
            const response = await getAllUsers()
            setUsers(response)
        } catch (error) {
            if(error === 'token invalido') {
                navigate('/users/login')
            }
            setCurrentError(error)
            console.log(currentError)
        }
       
    }
    getUsers()
}, [])

const eliminateUser = async ( id) => {
    try {
        deleteUser(id)
        const updatedUsers = users.filter(user => user._id !== id)
        setUsers(updatedUsers)
    } catch (error) {
        if(error === 'token invalido') {
            navigate('/users/login')
        }
        console.log(error)
        setCurrentError(error)
    }
}
    
    return (
        <div>
            <h1>Users</h1>
            {users.length > 0 &&
                users.map(user => (
                    <div className="card" key={user.id}>
                    <ul key={user.id}>
                    <li>{user.name}</li>
                    <li>{user.lastname}</li>
                    <li>{user.email}</li>
                    <li>{user.age}</li>
                    <li>{user.tasks.map(task => task.description)}</li>
                    </ul>
                    {currentUser !== null && currentUser.email === user.email &&
                    <div>
                    <button><Link to={`/users/edit/${user._id}`}>Edit</Link></button>
                    <button><Link to={`/users/editpassword/${user._id}`}>Edit Password</Link></button>
                    <button><Link onClick={()=>eliminateUser(user._id)}>Delete</Link></button>
                    </div>
                }
                    </div>
                ))
            }
        </div>
    )
}

export default ShowUsers