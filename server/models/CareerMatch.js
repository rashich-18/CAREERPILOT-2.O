import mongoose from "mongoose";

const careerMatchSchema = new mongoose.Schema(
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

    targetRole: {
      type: String,
      required: true,
      trim: true,
    },

    jobDescription: {
      type: String,
      default: "",
    },

    matchScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    skillMatch: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    experienceMatch: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    projectMatch: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    strongMatches: {
      type: [String],
      default: [],
    },

    partialMatches: {
      type: [String],
      default: [],
    },

    criticalGaps: {
      type: [String],
      default: [],
    },

    hiddenGaps: {
      type: [String],
      default: [],
    },

    evidenceGaps: {
      type: [String],
      default: [],
    },

    experienceGaps: {
      type: [String],
      default: [],
    },

    skillPriorities: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },

    applyRecommendation: {
      type: String,
      default: "",
    },

    resumeSuggestions: {
      type: [String],
      default: [],
    },

    careerInsight: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const CareerMatch = mongoose.model("CareerMatch", careerMatchSchema);

export default CareerMatch;