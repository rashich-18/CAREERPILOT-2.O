import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/onboarding",
});

export default API;