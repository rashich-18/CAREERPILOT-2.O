
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT
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

// ==========================================
// GET DASHBOARD DATA
// ==========================================

export const getDashboardData = async () => {
  const [
    resumeResponse,
    careerMatchResponse,
    roadmapResponse,
    interviewResponse,
    applicationResponse,
  ] = await Promise.all([
    API.get("/resume/history"),
    API.get("/career-match"),
    API.get("/roadmap"),
    API.get("/interview"),
    API.get("/job-applications"),
  ]);

  return {
    resumes: resumeResponse.data?.resumes || [],
    careerMatches:
      careerMatchResponse.data?.careerMatches || [],
    roadmaps:
      roadmapResponse.data?.roadmaps || [],
    interviews:
      interviewResponse.data?.interviews || [],
    applications:
      applicationResponse.data?.applications || [],
  };
};

export default API;
