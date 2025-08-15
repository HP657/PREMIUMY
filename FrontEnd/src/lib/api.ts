import axios from 'axios';
import {goto} from "$app/navigation";

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
});


export async function checkAuth() {
  const res = await api.get('/auth/protected');
  return res.data;
}

export async function getUserProfile() {
  try {
    const res = await api.get('/user/info');
    console.log(res.data);
    return res.data;
  } catch (error) {
    return null;
  }
}

export async function logout() {
  try {
    await api.post('/auth/logout');
    goto('/');
  } catch (error) {
    alert('Logout failed. Please try again.');
  }
}