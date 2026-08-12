import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/career-match",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


// ==========================================
// CREATE CAREER MATCH
// ==========================================

export const createCareerMatch = async ({
  resumeId,
  targetRole,
  jobDescription,
}) => {
  const response = await API.post("/", {
    resumeId,
    targetRole,
    jobDescription,
  });

  return response.data;
};


// ==========================================
// GET CAREER MATCH HISTORY
// ==========================================

export const getCareerMatchHistory = async () => {
  const response = await API.get("/");

  return response.data;
};


// ==========================================
// GET SINGLE CAREER MATCH
// ==========================================

export const getCareerMatchById = async (id) => {
  const response = await API.get(`/${id}`);

  return response.data;
};