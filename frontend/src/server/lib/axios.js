import axios from 'axios';

// Authenticated Axios instance
export const axiosAuth = axios.create({
  baseURL: process.env.API_URL || 'http://backend:3000',
  maxBodyLength: Infinity,
});

// Add Authorization header to axiosAuth requests
axiosAuth.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${process.env.SECRET}`;
  config.headers['Content-Type'] = 'application/json';
  return config;
});

// Non-authenticated Axios instance
export const axiosPublic = axios.create({
  baseURL: process.env.API_URL || 'http://backend:3000',
  maxBodyLength: Infinity,
});

