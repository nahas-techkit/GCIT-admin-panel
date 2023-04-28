import axios from 'axios';

const instance = axios.create({
  // baseURL: 'http://localhost:4001/api/',
  baseURL: 'https://cumbre.appstronauts.in/api/',
});

instance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const statusCode = error.response.status;
    const errorMessage = error.response.data.error;

    // If the access token has expired and the server returns a 401 error with the specific error message
    if (statusCode === 401 && errorMessage === 'Access token expired' && !originalRequest._retry) {
      // Handle the access token expiration here
      originalRequest._retry = true;

      try {
        const { data } = await instance.post('/api/v1/auth/regenerate-token', {
          refreshToken: localStorage.getItem('refreshToken'),
        });

        if (data.success) {
          localStorage.setItem('accessToken', data.accessToken);

          // Resend the original request with the new access token
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return instance(originalRequest);
        }
      } catch (error) {
        console.error('Error regenerating access token:', error);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
