import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },

    answer: {
      type: String,
      default: "",
    },

    transcript: {
      type: String,
      default: "",
    },

    questionType: {
      type: String,
      enum: [
        "technical",
        "hr",
        "behavioral",
        "follow-up",
      ],
      default: "technical",
    },

    score: {
      type: Number,
      default: null,
    },

    feedback: {
      type: String,
      default: "",
    },

    fillerWords: {
      type: Number,
      default: 0,
    },

    speakingPace: {
      type: Number,
      default: null,
    },
  },
  { _id: true }
);

const interviewSchema = new mongoose.Schema(
  {
    // ==========================================
    // USER
    // ==========================================

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ==========================================
    // INTERVIEW SETUP
    // ==========================================

    role: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      default: "",
      trim: true,
    },

    companyCategory: {
      type: String,
      default: "",
      trim: true,
    },

    interviewType: {
      type: String,
      enum: [
        "technical",
        "hr",
        "behavioral",
        "mixed",
      ],
      required: true,
    },

    difficulty: {
      type: String,
      enum: [
        "easy",
        "medium",
        "hard",
      ],
      default: "medium",
    },

    // ==========================================
    // INTERVIEW QUESTIONS
    // ==========================================

    questions: {
      type: [answerSchema],
      default: [],
    },

    // ==========================================
    // FINAL SCORE
    // ==========================================

    overallScore: {
      type: Number,
      default: null,
    },

    technicalScore: {
      type: Number,
      default: null,
    },

    communicationScore: {
      type: Number,
      default: null,
    },

    behavioralScore: {
      type: Number,
      default: null,
    },

    speechScore: {
      type: Number,
      default: null,
    },

    // ==========================================
    // FINAL REPORT
    // ==========================================

    strengths: {
      type: [String],
      default: [],
    },

    weaknesses: {
      type: [String],
      default: [],
    },

    recommendations: {
      type: [String],
      default: [],
    },

    summary: {
      type: String,
      default: "",
    },

    // ==========================================
    // INTERVIEW STATUS
    // ==========================================

    status: {
      type: String,
      enum: [
        "setup",
        "in-progress",
        "completed",
        "abandoned",
      ],
      default: "setup",
    },

    startedAt: {
      type: Date,
      default: null,
    },

    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Interview = mongoose.model(
  "Interview",
  interviewSchema
);

export default Interview;