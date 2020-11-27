import axios from 'axios';

//api user routes
export const signupUser = (payload) => axios.post(`/users/signup`, payload)
export const loginUser = (payload) => axios.post(`/users/login`, payload)
export const getUser = () => axios.get(`/users/current`)

//api notes routes
export const createNewNote = (payload) => axios.post(`/notes`, payload)
export const getUserNotes = (id) => axios.get(`notes/user/${id}`)
export const getNotesByBeanId = (id) => axios.get(`/notes/bean/${id}`)
export const getNoteById = (id) => axios.get(`/notes/${id}`)
export const updateNote = (payload) => axios.patch(`/notes`, payload)
export const deleteNote = (id) => axios.delete(`notes/${id}`)

//api bean routes
export const createNewBean = (payload) => axios.post(`/beans`, payload)
export const getUsersBeans = (id) => axios.post(`/beans/user/${id}`)
export const getBeanId = (id) => axios.get(`/beans/user/${id}`)
export const updateBean = (payload) => axios.patch(`/beans`, payload)
export const deleteBean = (id) => axios.delete(`/beans/${id}`)


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

module.exports = apis;