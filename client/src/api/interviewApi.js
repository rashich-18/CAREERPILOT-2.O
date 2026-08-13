import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/interview",
  headers: {
    "Content-Type": "application/json",
  },
});

// ==========================================
// ATTACH JWT TOKEN TO EVERY REQUEST
// ==========================================
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ==========================================
// CREATE INTERVIEW
// ==========================================

export const createInterview = (data) => {
  return API.post("/", data);
};

// ==========================================
// GET INTERVIEW HISTORY
// ==========================================

export const getInterviewHistory = () => {
  return API.get("/");
};

// ==========================================
// GET SINGLE INTERVIEW
// ==========================================

export const getInterviewById = (id) => {
  return API.get(`/${id}`);
};

// ==========================================
// SUBMIT INTERVIEW ANSWER
// ==========================================

export const submitInterviewAnswer = (id, data) => {
  return API.patch(`/${id}/answer`, data);
};

// ==========================================
// COMPLETE INTERVIEW
// ==========================================

export const completeInterview = (id) => {
  return API.post(`/${id}/complete`);
};

// ==========================================
// DELETE INTERVIEW
// ==========================================

export const deleteInterview = (id) => {
  return API.delete(`/${id}`);
};

export default API;