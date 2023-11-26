import axios from 'axios';
import api from '@/utils/api';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(null, (error) => {
  const token = localStorage.getItem('refreshToken');
  const user = localStorage.getItem('username');
  if (error.response && error.response.status === 401) {
    console.log(token, user);

    api
      .post('/api/auth/refresh-token', {
        refreshToken: token,
        username: user,
      })
      .then((response) => {
        console.log('ressss', response);
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        return axios.request(error.config);
      })
      .catch((error) => {
        console.log('errrr', error);
        // alert('Your session has expired. Please log in again.');
        // window.location.href = '/login';
      });
  }
  return Promise.reject(error);
});

export default instance;
