import axios from 'axios'

const baseUrl = '/api/'

const errorManagement = (error) => {
    if(error.request?.status === 404 || error.request?.status === 401) {
        return "No encontrado"
    }
    return error.response?.data?.message || "Algo salió mal"
}

export const getAllUsers = async () => {
    try {
        const response = await axios.get(`${baseUrl}users`)
        return response.data
        
    } catch (error) {
        throw errorManagement(error)
    }
}

export const getOneUser = async (id) => {
    try {
        const response = await axios.get(`${baseUrl}users/${id}`)
        return response.data
    } catch (error) {
        throw errorManagement(error)
    }
}

export const getUserByEmail = async (email) => {
    try {
        const response = await axios.get(`${baseUrl}users/find/${email}`)
        return response.data
    } catch (error) {
       throw errorManagement(error)
    }
}
export const createUser = async (user) => {
    try {
        const response = await axios.post(`${baseUrl}users`, user)
        return response.data
    } catch (error) {
        throw errorManagement(error)
    }
}

export const updateUser = async (id, user) => {
    try {
        const response = await axios.put(`${baseUrl}users/${id}`, user, { withCredentials: true })
        return response.data
    } catch (error) {
       throw errorManagement(error)
    }
}

export const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`${baseUrl}users/${id}`)
        return response.data
    } catch (error) {
        throw errorManagement(error)
    }
}

