import mongoose from "mongoose";

const roadmapTaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    type: {
      type: String,
      enum: ["skill", "project", "practice", "resume", "interview"],
      default: "skill",
    },

    priority: {
      type: String,
      enum: ["high", "medium", "low"],
      default: "medium",
    },

    estimatedTime: {
      type: String,
      default: "",
    },

    completed: {
      type: Boolean,
      default: false,
    },
  },
  { _id: true }
);

const roadmapPhaseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    order: {
      type: Number,
      default: 1,
    },

    tasks: {
      type: [roadmapTaskSchema],
      default: [],
    },
  },
  { _id: true }
);

const roadmapSchema = new mongoose.Schema(
  {
    // User who owns this roadmap
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Career Match from which this roadmap was generated
    careerMatch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CareerMatch",
      required: true,
    },

    targetRole: {
      type: String,
      required: true,
      trim: true,
    },

    title: {
      type: String,
      default: "Your Career Roadmap",
    },

    overview: {
      type: String,
      default: "",
    },

    // Overall progress
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    // AI-generated roadmap phases
    phases: {
      type: [roadmapPhaseSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Roadmap = mongoose.model("Roadmap", roadmapSchema);

export default Roadmap;