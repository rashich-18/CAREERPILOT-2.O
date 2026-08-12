import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import onboardingRoutes from "./routes/onboardingRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import careerMatchRoutes from "./routes/careerMatchRoutes.js";
import roadmapRoutes from "./routes/roadmapRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/onboarding", onboardingRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/career-match", careerMatchRoutes);
app.use("/api/roadmap", roadmapRoutes);



app.get("/", (req, res) => {
  res.send("🚀 CareerPilot Backend Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});