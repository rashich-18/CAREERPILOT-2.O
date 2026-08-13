import User from "../models/User.js";

export const completeOnboarding = async (req, res) => {
  try {

    // ==========================================
    // USER
    // ==========================================

    const userId = req.user.id;

    // ==========================================
    // GET DATA
    // ==========================================

    const {
      fullName,

      college,
      degree,
      customDegree,
      branch,
      customBranch,
      graduationYear,
      cgpa,

      dreamRole,
      customDreamRole,
      dreamCompany,
      preferredDomain,
      customDomain,
      workMode,

      github,
      linkedin,
      portfolio,

      leetcode,
      codeforces,
      codechef,
      hackerrank,
    } = req.body;

    // ==========================================
    // PARSE ARRAYS
    // ==========================================

    let skills = [];
    let interests = [];

    try {

      skills = req.body.skills
        ? JSON.parse(req.body.skills)
        : [];

      interests = req.body.interests
        ? JSON.parse(req.body.interests)
        : [];

    } catch (error) {

      return res.status(400).json({
        success: false,
        message: "Invalid skills or interests data.",
      });

    }

    // ==========================================
    // BASIC VALIDATION
    // ==========================================

    if (
      !fullName ||
      !college ||
      !degree ||
      !branch
    ) {

      return res.status(400).json({
        success: false,
        message:
          "Please complete your basic education details.",
      });

    }

    // ==========================================
    // SKILLS VALIDATION
    // ==========================================

    if (
      !Array.isArray(skills) ||
      skills.length < 3
    ) {

      return res.status(400).json({
        success: false,
        message:
          "Please select at least 3 skills.",
      });

    }

    // ==========================================
    // FIND USER
    // ==========================================

    const user = await User.findById(userId);

    // ==========================================
// PROFILE PICTURE
// ==========================================

if (
  req.files &&
  req.files.profilePicture &&
  req.files.profilePicture[0]
) {
  const imageFile = req.files.profilePicture[0];

  const base64Image = `data:${imageFile.mimetype};base64,${imageFile.buffer.toString(
    "base64"
  )}`;

  user.profilePicture = base64Image;
}

    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found.",
      });

    }

    // ==========================================
    // BASIC USER INFO
    // ==========================================

    user.name = fullName.trim();

    // ==========================================
    // EDUCATION
    // ==========================================

    user.education = {

      fullName: fullName.trim(),

      college: college.trim(),

      degree: degree.trim(),

      customDegree:
        customDegree?.trim() || "",

      branch: branch.trim(),

      customBranch:
        customBranch?.trim() || "",

      graduationYear:
        graduationYear || "",

      cgpa:
        cgpa
          ? Number(cgpa)
          : undefined,
    };

    // ==========================================
    // CAREER
    // ==========================================

    user.career = {

      dreamRole:
        dreamRole?.trim() || "",

      customDreamRole:
        customDreamRole?.trim() || "",

      dreamCompany:
        dreamCompany?.trim() || "",

      preferredDomain:
        preferredDomain?.trim() || "",

      customDomain:
        customDomain?.trim() || "",

      workMode:
        workMode?.trim() || "",
    };

    // ==========================================
    // SKILLS
    // ==========================================

    user.skills = skills;

    // ==========================================
    // INTERESTS
    // ==========================================

    user.interests = interests;

    // ==========================================
    // PROFESSIONAL PROFILES
    // ==========================================

    user.profiles = {

      github:
        github?.trim() || "",

      linkedin:
        linkedin?.trim() || "",

      portfolio:
        portfolio?.trim() || "",
    };

    // ==========================================
    // CODING PROFILES
    // ==========================================

    user.codingProfiles = {

      leetcode:
        leetcode?.trim() || "",

      codeforces:
        codeforces?.trim() || "",

      codechef:
        codechef?.trim() || "",

      hackerrank:
        hackerrank?.trim() || "",
    };

    // ==========================================
    // ONBOARDING STATUS
    // ==========================================

    user.onboardingCompleted = true;

    // ==========================================
    // SAVE
    // ==========================================

    await user.save();

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(200).json({

      success: true,

      message:
        "Onboarding completed successfully!",

      user: {

        id: user._id,

        name: user.name,

        email: user.email,

        education: user.education,

        career: user.career,

        skills: user.skills,

        interests: user.interests,

        profiles: user.profiles,

        codingProfiles:
          user.codingProfiles,

        onboardingCompleted:
          user.onboardingCompleted,
      },
    });

  } catch (error) {

    console.error(
      "Onboarding Error:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        "Failed to save onboarding data.",
    });
  }
};



// ==========================================
// GET USER PROFILE
// ==========================================

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,

        profilePicture: user.profilePicture,

        education: user.education,
        career: user.career,

        skills: user.skills,
        interests: user.interests,

        profiles: user.profiles,
        codingProfiles: user.codingProfiles,

        onboardingCompleted:
          user.onboardingCompleted,

        createdAt: user.createdAt,
      },
    });

  } catch (error) {
    console.error("Get Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch profile.",
    });
  }
};


// ==========================================
// UPDATE USER PROFILE
// ==========================================

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      fullName,
      college,
      degree,
      customDegree,
      branch,
      customBranch,
      graduationYear,
      cgpa,

      dreamRole,
      customDreamRole,
      dreamCompany,
      preferredDomain,
      customDomain,
      workMode,

      skills,
      interests,

      github,
      linkedin,
      portfolio,

      leetcode,
      codeforces,
      codechef,
      hackerrank,

      removeProfilePicture,
    } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

  // ==========================================
// PROFILE PICTURE
// ==========================================

if (req.file) {
  user.profilePicture = `data:${req.file.mimetype};base64,${req.file.buffer.toString(
    "base64"
  )}`;
}

if (removeProfilePicture === true || removeProfilePicture === "true") {
  user.profilePicture = "";
}


    // ================= BASIC INFO =================

    if (fullName?.trim()) {
      user.name = fullName.trim();
    }

    // ================= EDUCATION =================

    user.education = {
      fullName: fullName?.trim() || user.name,
      college: college?.trim() || "",
      degree: degree?.trim() || "",
      customDegree: customDegree?.trim() || "",
      branch: branch?.trim() || "",
      customBranch: customBranch?.trim() || "",
      graduationYear,
      cgpa: cgpa ? Number(cgpa) : undefined,

      // KEEP EXISTING PICTURE

      profilePicture:
  req.file
    ? `data:${req.file.mimetype};base64,${req.file.buffer.toString(
        "base64"
      )}`
    : user.education?.profilePicture || "",};

    // ================= CAREER =================

    user.career = {
      dreamRole: dreamRole?.trim() || "",
      customDreamRole: customDreamRole?.trim() || "",
      dreamCompany: dreamCompany?.trim() || "",
      preferredDomain: preferredDomain?.trim() || "",
      customDomain: customDomain?.trim() || "",
      workMode: workMode?.trim() || "",
    };

    // ================= SKILLS =================

    if (Array.isArray(skills)) {
      user.skills = skills;
    }

    // ================= INTERESTS =================

    if (Array.isArray(interests)) {
      user.interests = interests;
    }

    // ================= PROFESSIONAL PROFILES =================

    user.profiles = {
      github: github?.trim() || "",
      linkedin: linkedin?.trim() || "",
      portfolio: portfolio?.trim() || "",
    };

    // ================= CODING PROFILES =================

    user.codingProfiles = {
      leetcode: leetcode?.trim() || "",
      codeforces: codeforces?.trim() || "",
      codechef: codechef?.trim() || "",
      hackerrank: hackerrank?.trim() || "",
    };

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
    });

  } catch (error) {
    console.error("Update Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update profile.",
    });
  }
};