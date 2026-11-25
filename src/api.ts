import axios from 'axios';
export const api = axios.create({
  baseURL: 'https://campuscultura-api.aaron-navarro.workers.dev/api'
});


api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

api.interceptors.response.use(
    (res) => res,
    (error) => {
      if (error.response?.status === 401 && !error.config.url.includes("/auth/")){
        localStorage.removeItem('token');
        window.location.href = '/login';

      }
      return Promise.reject(error);
});

export function errorInfo(error: any){
    return {
        code: error.response?.data?.code,
        message: error.response?.data?.message ?? error.response?.data?.detail ?? "Error de conexion",
    };
}