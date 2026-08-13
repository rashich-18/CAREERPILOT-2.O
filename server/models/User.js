import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // ================= BASIC ACCOUNT =================

    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
    },
    
    profilePicture: {
  type: String,
},



    // ================= ONBOARDING =================

    onboardingCompleted: {
      type: Boolean,
      default: false,
    },


    // ================= EDUCATION =================

    education: {
      fullName: {
        type: String,
        trim: true,
      },

      college: {
        type: String,
        trim: true,
      },

      degree: {
        type: String,
        trim: true,
      },

      customDegree: {
        type: String,
        trim: true,
      },

      branch: {
        type: String,
        trim: true,
      },

      customBranch: {
        type: String,
        trim: true,
      },

      graduationYear: {
        type: String,
      },

      cgpa: {
        type: Number,
      },

    },


    // ================= CAREER =================

    career: {
      dreamRole: {
        type: String,
        trim: true,
      },

      customDreamRole: {
        type: String,
        trim: true,
      },

      dreamCompany: {
        type: String,
        trim: true,
      },

      preferredDomain: {
        type: String,
        trim: true,
      },

      customDomain: {
        type: String,
        trim: true,
      },

      workMode: {
        type: String,
        trim: true,
      },
    },


    // ================= SKILLS =================

    skills: {
      type: [String],
      default: [],
    },


    // ================= INTERESTS =================

    interests: {
      type: [String],
      default: [],
    },


    // ================= PROFESSIONAL PROFILES =================

    profiles: {
      github: {
        type: String,
        trim: true,
      },

      linkedin: {
        type: String,
        trim: true,
      },

      portfolio: {
        type: String,
        trim: true,
      },
    },


    // ================= CODING PROFILES =================

    codingProfiles: {
      leetcode: {
        type: String,
        trim: true,
      },

      codeforces: {
        type: String,
        trim: true,
      },

      codechef: {
        type: String,
        trim: true,
      },

      hackerrank: {
        type: String,
        trim: true,
      },
    },


    // ================= RESUME =================

    resume: {
      type: String,
      default: null,
    },
  },

  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);