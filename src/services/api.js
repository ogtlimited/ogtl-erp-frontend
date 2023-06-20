import axios from "axios";
import tokenService from "./token.service";
import config from "../config.json";
// import { useAppContext } from "../Context/AppContext";
let headers = {};
const token = localStorage.getItem("token");

if (token) {
  headers.Authorization = `Bearer ${token}`;
}

const axiosInstance = axios.create({
  baseURL: config.ApiUrl,
});
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new axios.Cancel("Token is not available. Do login, please.");
  } else {
    config.headers.Authorization = "Bearer " + token;
    return config;
  }
});
axiosInstance.interceptors.response.use(
  (response) =>
    new Promise((resolve, reject) => {
      resolve(response);
    }),
  (error) => {
    if (!error.response) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
    if (error.response.status === 401) {
      tokenService.removeToken();
      console.log("Login error:", error)

      window.location = "/auth";
    } else {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  }
);

export default axiosInstance;
