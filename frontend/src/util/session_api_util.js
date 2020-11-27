import axios from 'axios';
import jwt_decode from "jwt-decode";

export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const authenticateUser = (user) => {
  // console.log(user);
  const { token } = user.data;
  localStorage.setItem("jwtToken", token);
  setAuthToken(token);
  window.currentUser = jwt_decode(token);
  window.location.href = '/';
}

export const logoutUser = () => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  window.currentUser = null;
  window.location.href = '/';
}