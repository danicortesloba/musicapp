import axios from 'axios'


const baseUrl = '/api/'


export const login = async (email, password) => { 
    try {
        const response = await axios.post(`${baseUrl}login`, { email, password })
        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const logout = async () => {
    try {
        const response = await axios.get(`${baseUrl}logout`)
        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}