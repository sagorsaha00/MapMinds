import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://mapminds-backend-sandy.vercel.app/api',
});

// api.interceptors.request.use((config) => {
//   if (typeof window !== 'undefined') {
//     const token = localStorage.getItem('MapMinds_token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//   }
//   return config;
// });
