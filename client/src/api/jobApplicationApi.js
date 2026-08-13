import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/job-applications",
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// CREATE
export const createJobApplication = (data) => {
  return API.post("/", data);
};

// GET HISTORY
export const getJobApplicationHistory = () => {
  return API.get("/");
};

// GET SINGLE APPLICATION
export const getJobApplicationById = (id) => {
  return API.get(`/${id}`);
};

// DELETE
export const deleteJobApplication = (id) => {
  return API.delete(`/${id}`);
};

export default API;
