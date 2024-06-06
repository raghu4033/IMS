import axios from "axios";

console.log({
  baseURL: import.meta.env.VITE_APP_BACKEND_URL,
});


console.log(import.meta.env)

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND_URL,
});

const ApiURLs = {
  Login: "login",
};

export default {
  get: axiosInstance.get,
  post: axiosInstance.post,
  put: axiosInstance.put,
  delete: axiosInstance.delete,
  ApiURLs,
};
