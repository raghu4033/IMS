import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND_URL,
});

const ApiURLs = {
  Login: "login",
  getCourses: 'courses'
};

export default {
  get: axiosInstance.get,
  post: axiosInstance.post,
  put: axiosInstance.put,
  delete: axiosInstance.delete,
  ApiURLs,
};
