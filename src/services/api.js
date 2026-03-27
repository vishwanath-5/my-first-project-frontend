import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
export const getTasks = () => API.get("tasks/");
export const addTask = (task) => API.post("tasks/", task);
export const deleteTask = (id) => API.delete(`tasks/${id}/`);
export const updateTask = (id, task) => API.put(`tasks/${id}/`, task);
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});
