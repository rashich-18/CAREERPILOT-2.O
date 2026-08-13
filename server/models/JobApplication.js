import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },

    role: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    jobDescription: {
      type: String,
      default: "",
    },

    coverLetter: {
      type: String,
      default: "",
    },

    applicationMessage: {
      type: String,
      default: "",
    },

    candidateFit: {
      type: String,
      default: "",
    },

    relevantSkills: {
      type: [String],
      default: [],
    },

    relevantExperience: {
      type: [String],
      default: [],
    },

    missingRequirements: {
      type: [String],
      default: [],
    },

    applicationReadiness: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    recommendation: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const JobApplication = mongoose.model(
  "JobApplication",
  jobApplicationSchema
);

export default JobApplication;