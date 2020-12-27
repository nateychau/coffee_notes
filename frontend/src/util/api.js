import axios from 'axios';

//api user routes
export const signupUser = (payload) => axios.post(`/api/users/signup`, payload);
export const loginUser = (payload) => axios.post(`/api/users/login`, payload);
export const getUser = () => axios.get(`/api/users/current`);

//api notes routes
export const createNewNote = (payload) => axios.post(`/api/notes`, payload);
export const getUserNotes = (id) => axios.get(`/api/notes/user/${id}`);
export const getNotesByBeanId = (id) => axios.get(`/api/notes/bean/${id}`);
export const getNoteById = (id) => axios.get(`/api/notes/${id}`);
export const getMostRecentNote = (id) => axios.get(`/api/notes/recent/${id}`);
export const updateNote = (payload) => axios.patch(`/api/notes`, payload);
export const deleteNote = (id) => axios.delete(`/api/notes/${id}`);

//api bean routes
export const createNewBean = (payload) => axios.post(`/api/beans`, payload);
export const getUserBeans = (id) => axios.get(`/api/beans/user/${id}`);
export const getBeanById = (id) => axios.get(`/api/beans/${id}`);
export const updateBean = (payload) => axios.patch(`/api/beans`, payload);
export const deleteBean = (id) => axios.delete(`/api/beans/${id}`);
export const getByFilter = (filterType, filter) => axios.get(`/api/beans/${filterType}/${filter}`);

//api spotify routes
export const signinSpotify = () => axios.get(`/api/spotify/auth`);
