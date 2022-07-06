import axios from 'axios';
import { apiUrl } from './config';

export const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    authorization: '',
  },
});
