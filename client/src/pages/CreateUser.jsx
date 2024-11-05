import {createUser} from '../services/userService.js'
import { useState } from 'react'
import UserForm from '../components/UserForm.jsx'
import { useNavigate } from 'react-router-dom'
const CreateUser = () => {
    const navigate = useNavigate()
    const isEdit = false
    const initialUser = {
        name: '',
        lastname: '',
        email: '',
        password: '',
        age: '',
        passwordConfirmation: ''
    }
    const [user, setUser] = useState(initialUser)
    const [currentError, setCurrentError] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await createUser(user)
            setUser(initialUser)
            navigate('/users/login')
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
            <h1>Registro</h1>
            <UserForm user={user} onSubmit={handleSubmit} isEdit={isEdit} handleChange={handleChange}></UserForm>
            {currentError && <p>{currentError}</p>}
        </div>
    )
}

export default CreateUser