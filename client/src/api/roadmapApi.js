import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/roadmap",
  headers: {
    "Content-Type": "application/json",
  },
});

// ============================================================
// ATTACH JWT
// ============================================================

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ============================================================
// GENERATE ROADMAP
// ============================================================

export const generateRoadmap = async (careerMatchId) => {
  const response = await API.post("/generate", {
    careerMatchId,
  });

  return response.data;
};

// ============================================================
// GET ROADMAP HISTORY
// ============================================================

export const getRoadmapHistory = async () => {
  const response = await API.get("/");

  return response.data;
};

// ============================================================
// GET SINGLE ROADMAP
// ============================================================

export const getRoadmapById = async (roadmapId) => {
  const response = await API.get(`/${roadmapId}`);

  return response.data;
};

// ============================================================
// UPDATE TASK
// ============================================================

export const updateRoadmapProgress = async (
  roadmapId,
  phaseId,
  taskId,
  completed
) => {
  const response = await API.patch("/task", {
    roadmapId,
    phaseId,
    taskId,
    completed,
  });

  return response.data;
};

// ============================================================
// DELETE ROADMAP
// ============================================================

export const deleteRoadmap = async (roadmapId) => {
  const response = await API.delete(`/${roadmapId}`);

  return response.data;
};

export default API;