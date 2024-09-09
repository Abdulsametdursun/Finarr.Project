import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:4090/api/",
});

// Axios interceptor to add the token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Adjust this according to where you store your token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
