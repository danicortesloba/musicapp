import {login} from '../services/loginService.js'
import { useState, useContext } from 'react'
import {LoginContext} from '../contexts/LoginContext'
import { useNavigate, Link } from 'react-router-dom'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate   = useNavigate()

    const  context  = useContext(LoginContext)

    const handleChange = (e) => {
        const { name, value } = e.target
        if (name === 'email') {
            setEmail(value)
        } else if (name === 'password') {
            setPassword(value)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const data = await login(email, password)
            context.setUser(data.tokenData)
            localStorage.setItem('user', JSON.stringify(data.tokenData))
            console.log(localStorage.getItem('user'))
            setEmail('')
            setPassword('')
            navigate('/songs')
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Correo:</label>
                <input type="email" id="email" name="email" onChange={handleChange} />
                <label htmlFor="password">Contraseña:</label>
                <input type="password" id="password" name="password" onChange={handleChange} />
                <button type="submit">Login</button>
            </form>
            <Link to='/users/create'>Registrarse</Link>
        </div>
    )
}

export default Login