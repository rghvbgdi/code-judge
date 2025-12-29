import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

const CompilerAPI = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL2,
  withCredentials: true,
});

export { API, CompilerAPI };
