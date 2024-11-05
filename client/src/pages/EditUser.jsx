
import { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getOneUser, updateUser } from '../services/userService'
import UserForm from '../components/UserForm'
import { LoginContext } from '../contexts/LoginContext'
const EditUser = () => {
    const { id } = useParams()
    const isEdit = true
    const [user, setUser] = useState({})
    const [currentError, setCurrentError] = useState('')
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
            setCurrentError(error)
            if(error === 'token invalido') {
                navigate('/users/login')
            }
            console.log(error)
        }
    }

    return (
        <div>
            {currentUser.id !== id && navigate('/users')}
            <h1>Edit User</h1>
            <UserForm user={user} onSubmit={handleSubmit} isEdit={isEdit} handleChange={handleChange}></UserForm>
            {currentError && <p>{currentError}</p>}
        </div>
    )
}

export default EditUser