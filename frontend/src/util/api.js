import axios from 'axios';

//api user routes
export const signupUser = (payload) => axios.post(`/api/users/signup`, payload)
export const loginUser = (payload) => axios.post(`/api/users/login`, payload)
export const getUser = () => axios.get(`/api/users/current`)

//api notes routes
export const createNewNote = (payload) => axios.post(`/api/notes`, payload)
export const getUserNotes = (id) => axios.get(`/api/notes/user/${id}`)
export const getNotesByBeanId = (id) => axios.get(`/api/notes/bean/${id}`)
export const getNoteById = (id) => axios.get(`/api/notes/${id}`)
export const updateNote = (payload) => axios.patch(`/api/notes`, payload)
export const deleteNote = (id) => axios.delete(`/apinotes/${id}`)

//api bean routes
export const createNewBean = (payload) => axios.post(`/api/beans`, payload)
export const getUsersBeans = (id) => axios.post(`/api/beans/user/${id}`)
export const getBeanId = (id) => axios.get(`/api/beans/user/${id}`)
export const updateBean = (payload) => axios.patch(`/api/beans`, payload)
export const deleteBean = (id) => axios.delete(`/api/beans/${id}`)

//don't need to module.exports since we export everything individually
// const apis = {
//     signupUser,
//     loginUser,
//     getUser,
//     createNewNote,
//     getUserNotes,
//     getNotesByBeanId,
//     getNoteById,
//     deleteNote,
//     updateNote,
//     createNewBean,
//     getBeanId,
//     updateBean,
//     deleteBean,
// }

// module.exports = apis;