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

instance.interceptors.response.use(null, async (error) => {
  const token = localStorage.getItem('refreshToken');
  const user = localStorage.getItem('username');

  if (error.response && error.response.status === 401) {
    try {
      const response = await api.post(`/api/auth/refresh-token`, {
        refreshToken: token,
        username: user,
      });

      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);

      return api.request(error.config);
    } catch (refreshError) {
      console.error('Token refresh error:', refreshError);
    }
  }

  return Promise.reject(error);
});

export default instance;
