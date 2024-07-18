import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND_URL,
});

axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("ims:auth:token");
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.clear();
      window.location = "/login";
    }
    return error;
  }
);

const ApiURLs = {
  Login: "login",
  getCourses: "courses",
  saveStudentInquiries: "student-inquiry",
  getStudentInquiries: "student-inquiries",
  getUsers: "users",
  saveStudentAdmission: "user/student",
  saveFacultyAdmission: "user/faculty",
  saveEvent: "event",
  getEvents: "events",
  saveAnnouncement: "announcement",
  getAnnouncements: "announcements",
  getStudentFees: "fees",
  saveStudentFees: "fee-installment",
  saveClassSchedule: "class-schedule",
  getClassSchedules: "classes",
  getAttendances: "attendances",
};

export default {
  get: axiosInstance.get,
  post: axiosInstance.post,
  put: axiosInstance.put,
  delete: axiosInstance.delete,
  ApiURLs,
};
