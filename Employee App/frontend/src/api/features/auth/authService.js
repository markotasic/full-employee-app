import axios from 'axios';

import { axiosInstance } from '../../axios';
import { apiUrl } from '../../config';

const API_URL = `${apiUrl}/auth`;

// Get user from local storage
const getUserFromLocalStorege = async () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user) {
    axiosInstance.defaults.headers.authorization = `Bearer ${user.token}`;
  }

  return user;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  getUserFromLocalStorege,
  logout,
  login,
};

export default authService;
