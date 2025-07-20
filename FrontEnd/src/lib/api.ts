import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
});

export default api;

export async function checkAuth() {
  const res = await api.get('/auth/protected');
  return res.data;
}

export async function getUserProfile() {
  try {
    const res = await api.get('/user/info');
    return res.data;
  } catch (error) {
    return null;
  }
}