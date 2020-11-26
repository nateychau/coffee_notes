import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api'
})

//api user routes
export const signupUser = (payload) => api.post(`/users/signup`, payload)
export const loginUser = (payload) => api.post(`/users/login`, payload)
export const getUser = () => api.get(`/users/current`)

//api notes routes
export const createNewNote = (payload) => api.post(`/notes`, payload)
export const getUserNotes = (id) => api.get(`notes/user/${id}`)
export const getNotesByBeanId = (id) => api.get(`/notes/bean/${id}`)
export const getNoteById = (id) => api.get(`/notes/${id}`)
export const updateNote = (payload) => api.patch(`/notes`, payload)
export const deleteNote = (id) => api.delete(`notes/${id}`)

//api bean routes
export const createNewBean = (payload) => api.post(`/beans`, payload)
export const getUsersBeans = (id) => api.post(`/beans/user/${id}`)
export const getBeanId = (id) => api.get(`/beans/user/${id}`)
export const updateBean = (payload) => api.patch(`/beans`, payload)
export const deleteBean = (id) => api.delete(`/beans/${id}`)


const apis = {
    signupUser,
    loginUser,
    getUser,
    createNewNote,
    getUserNotes,
    getNotesByBeanId,
    getNoteById,
    deleteNote,
    updateNote,
    createNewBean,
    getBeanId,
    updateBean,
    deleteBean,
}

export default apis