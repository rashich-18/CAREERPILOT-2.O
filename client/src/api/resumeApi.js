import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/resume",
});

export const uploadResume = (file) => {
  const formData = new FormData();

  formData.append("resume", file);

  const token = localStorage.getItem("token");

  return API.post("/upload", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getResumeHistory = () => {
  const token = localStorage.getItem("token");

  return API.get("/history", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getResumeById = (resumeId) => {
  const token = localStorage.getItem("token");

  return API.get(`/${resumeId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteResumes = (resumeIds) => {
  const token = localStorage.getItem("token");

  return API.delete("/delete", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      resumeIds,
    },
  });
};

export default API;