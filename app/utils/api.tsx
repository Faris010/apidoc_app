import axios from 'axios';

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

axios.interceptors.response.use(null, (error) => {
  if (error.response && error.response.status === 401) {
    axios
      .post('/api/auth/refresh-token', {
        refreshToken: localStorage.getItem('refreshToken'),
      })
      .then((response) => {
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        return axios.request(error.config);
      })
      .catch((error) => {
        alert('Your session has expired. Please log in again.');
        window.location.href = '/login';
      });
  }

  return Promise.reject(error);
});

export default instance;
