import axios from "axios";
import { UserSessionStorage } from "../auth/UserSessionStorage"; 

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
  const token = UserSessionStorage.getToken(); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
