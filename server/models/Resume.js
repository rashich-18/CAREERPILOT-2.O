import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fileName: {
      type: String,
      required: true,
    },

    resumeText: {
      type: String,
      required: true,
    },

    isCurrent: {
      type: Boolean,
      default: true,
    },

    uploadedAt: {
      type: Date,
      default: Date.now,
    },

    analysis: {
      summary: {
        type: String,
        default: "",
      },

      technicalSkills: {
        type: [String],
        default: [],
      },

      softSkills: {
        type: [String],
        default: [],
      },

      education: {
        type: [mongoose.Schema.Types.Mixed],
        default: [],
      },

      experience: {
        type: [mongoose.Schema.Types.Mixed],
        default: [],
      },

      projects: {
        type: [mongoose.Schema.Types.Mixed],
        default: [],
      },

      strengths: {
        type: [String],
        default: [],
      },

      weaknesses: {
        type: [String],
        default: [],
      },

      suggestedRoles: {
        type: [String],
        default: [],
      },

      missingSkills: {
        type: [String],
        default: [],
      },
    },
  },
  {
    timestamps: true,
  }
);

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;