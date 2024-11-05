import { useParams, useNavigate } from 'react-router-dom'
import { getOneUser, updateUser } from '../services/userService'
import { useEffect, useState, useContext } from 'react' 
import { LoginContext } from '../contexts/LoginContext'
const EditPassword = () => {
    const { id } = useParams()
    const [user, setUser] = useState({})
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const {user: currentUser} = useContext(LoginContext)

    useEffect (() => {
        const getUser = async () => {
            const response = await getOneUser(id)
            setUser(response)
            console.log(response)
        }
        getUser()
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            updateUser( id, user)
            navigate('/users')
        } catch (error) {
            setError(error)
            if(error === 'token invalido') {
                navigate('/users/login')
            }
            console.log(error)
        }
    }

    return (
        <div>
            {currentUser.id !== id && navigate('/users')}
            <h1>Edit Password</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" onChange={handleChange} value={user.password}/>
                <div>
            <label htmlFor="passwordConfirmation">Password Confirmation:</label>
            <input type="passwordConfirmation" id="passwordConfirmation" name="passwordConfirmation" value={user.passwordConfirmation} onChange={handleChange} />
        </div>
                <button type="submit">Update</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    )
}

export default EditPassword