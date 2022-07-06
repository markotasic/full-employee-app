import { apiUrl } from '../../config';
import { axiosInstance } from '../../axios';

const API_URL = `${apiUrl}/users/`;

//Create new user
const createUser = async (userData) => {
  const response = await axiosInstance.post('/users/', userData);

  return response.data;
};

// Update user
const updateUser = async (userData, id) => {
  const response = await axiosInstance.patch('/users/' + id, userData);

  return response.data;
};

//Get all users
const getUsers = async () => {
  const response = await axiosInstance.get('/users/');

  return response.data;
};

//Get one user
const getOneUser = async (userId) => {
  const response = await axiosInstance.get(API_URL + userId);

  return response.data;
};

//Delete user
const deleteUser = async (userId) => {
  const response = await axiosInstance.delete(API_URL + userId);

  return response.data;
};

const itemService = {
  createUser,
  updateUser,
  getUsers,
  getOneUser,
  deleteUser,
};

export default itemService;
