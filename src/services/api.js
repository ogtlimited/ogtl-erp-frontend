import axios from "axios";
import tokenService from "./token.service";

let headers = {};
const token = localStorage.getItem("token");
if (token) {
  headers.Authorization = `Bearer ${token}`;
}
console.log(token);
const axiosInstance = axios.create({
  baseURL: "https://erp-api.outsourceglobal.com",
});
axiosInstance.interceptors.request.use((config) => {
  // console.log(config)
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
      // console.log(response)
      resolve(response);
    }),
  (error) => {
    if (!error.response) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
    if (error.response.status === 401) {
      // tokenService.removeToken()
      console.log("tokrn");
      window.location = "/auth";
    } else {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  }
);

export default axiosInstance;
