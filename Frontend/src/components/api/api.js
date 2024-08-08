import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Update to your backend URL
});

export const getUsers = () => api.get('/users');
export const getUserById = (id) => api.get(`/users/${id}`);
export const createUser = (data) => api.post('/users', data);
export const updateUser = (id, data) => api.put(`/users/${id}`, data);

export const getP5History = (id) => api.get(`/p5/${id}`);
export const createP5Transaction = (data) => api.post('/p5', data);
export const deleteP5Transaction = (id) => api.delete(`/p5/${id}`);

export const getRewardHistory = (id) => api.get(`/rewards/${id}`);
export const createRewardTransaction = (data) => api.post(`/rewards`, data);
