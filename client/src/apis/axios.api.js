import axios from 'axios';

export const instance = axios.create({ baseURL: 'http://localhost:5000' });

// Still not sure what this really does
instance.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});
