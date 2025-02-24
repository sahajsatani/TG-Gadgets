import axios from "axios";

export const publicApi = axios.create({
  baseURL: "http://localhost:8067/tg",
});

export const privateApi = axios.create({
  baseURL: "http://localhost:8067/tg/auth/",
});

privateApi.interceptors.request.use(
  (config) => {
    const userEmail = localStorage.getItem("userEmail");
    const userPassword = localStorage.getItem("userPassword");
    if (userEmail && userPassword) {
      config.headers.userEmail = userEmail;
      config.headers.userPassword = userPassword;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
