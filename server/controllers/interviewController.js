import Interview from "../models/Interview.js";
import User from "../models/User.js";
import Resume from "../models/Resume.js";
import CareerMatch from "../models/CareerMatch.js";

import {
  generateInterviewQuestions,
  evaluateInterviewAnswer,
  generateInterviewReport,
} from "../services/aiService.js";


// ==========================================================
// CREATE INTERVIEW
// ==========================================================

export const createInterview = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      role,
      company,
      companyCategory,
      interviewType,
      difficulty,
    } = req.body;

    // ==========================================
    // VALIDATION
    // ==========================================

    if (!role) {
      return res.status(400).json({
        success: false,
        message: "Role is required.",
      });
    }

    if (!interviewType) {
      return res.status(400).json({
        success: false,
        message: "Interview type is required.",
      });
    }

    if (!difficulty) {
      return res.status(400).json({
        success: false,
        message: "Difficulty is required.",
      });
    }

    // ==========================================
    // FETCH USER
    // ==========================================

    const user = await User.findById(userId).lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // ==========================================
    // FETCH CURRENT RESUME
    // ==========================================

    const resume = await Resume.findOne({
      user: userId,
      isCurrent: true,
    })
      .sort({ uploadedAt: -1 })
      .lean();

    if (!resume) {
      return res.status(400).json({
        success: false,
        message:
          "Please upload and analyze your resume before starting an AI interview.",
      });
    }

    // ==========================================
    // FETCH CAREER MATCH
    // ==========================================

    const careerMatch = await CareerMatch.findOne({
      user: userId,
      targetRole: role,
    })
      .sort({ createdAt: -1 })
      .lean();

    // Career Match is useful but should NOT block
    // the interview if the user hasn't generated one.

    // ==========================================
    // GENERATE QUESTIONS
    // ==========================================

    const aiResult = await generateInterviewQuestions({
      userProfile: user,
      resume,
      careerMatch,
      role,
      company,
      companyCategory,
      interviewType,
      difficulty,
    });

    if (
      !aiResult ||
      !Array.isArray(aiResult.questions) ||
      aiResult.questions.length === 0
    ) {
      return res.status(500).json({
        success: false,
        message:
          "AI could not generate interview questions.",
      });
    }

    // ==========================================
    // SAVE QUESTIONS
    // ==========================================

    const questions = aiResult.questions.map(
      (item) => ({
        question: item.question,
        answer: "",
        transcript: "",
        questionType:
          item.questionType || "technical",
        score: null,
        feedback: "",
        fillerWords: 0,
        speakingPace: null,
      })
    );

    // ==========================================
    // CREATE INTERVIEW
    // ==========================================

    const interview = await Interview.create({
      user: userId,

      role,
      company: company || "",
      companyCategory:
        companyCategory || "",

      interviewType,
      difficulty,

      questions,

      status: "in-progress",
      startedAt: new Date(),
    });

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(201).json({
      success: true,
      message: "AI interview created successfully.",

      interview: {
        id: interview._id,
        role: interview.role,
        company: interview.company,
        companyCategory:
          interview.companyCategory,
        interviewType:
          interview.interviewType,
        difficulty: interview.difficulty,
        questions: interview.questions,
        status: interview.status,
        startedAt: interview.startedAt,
      },
    });
  } catch (error) {
    console.error(
      "CREATE INTERVIEW ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to create AI interview.",
    });
  }
};


// ==========================================================
// GET INTERVIEW HISTORY
// ==========================================================

export const getInterviewHistory = async (
  req,
  res
) => {
  try {
    const interviews =
      await Interview.find({
        user: req.user.id,
      })
        .sort({ createdAt: -1 })
        .select(
          "role company companyCategory interviewType difficulty overallScore status startedAt completedAt createdAt"
        )
        .lean();

    return res.status(200).json({
      success: true,
      interviews,
    });
  } catch (error) {
    console.error(
      "GET INTERVIEW HISTORY ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch interview history.",
    });
  }
};


// ==========================================================
// GET SINGLE INTERVIEW
// ==========================================================

export const getInterviewById = async (
  req,
  res
) => {
  try {
    const interview =
      await Interview.findOne({
        _id: req.params.id,
        user: req.user.id,
      }).lean();

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found.",
      });
    }

    return res.status(200).json({
      success: true,
      interview,
    });
  } catch (error) {
    console.error(
      "GET INTERVIEW ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch interview.",
    });
  }
};




// ==========================================================
// COMPLETE INTERVIEW
// ==========================================================

export const completeInterview = async (req, res) => {
  try {
    const userId = req.user.id;
    const interviewId = req.params.id;

    // ==========================================
    // FIND INTERVIEW
    // ==========================================

    const interview = await Interview.findOne({
      _id: interviewId,
      user: userId,
    });

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found.",
      });
    }

    // ==========================================
    // CHECK STATUS
    // ==========================================

    if (interview.status === "completed") {
      return res.status(400).json({
        success: false,
        message: "Interview is already completed.",
      });
    }

    // ==========================================
    // GENERATE FINAL REPORT
    // ==========================================

    const report = await generateInterviewReport({
      role: interview.role,
      company: interview.company,
      companyCategory: interview.companyCategory,
      interviewType: interview.interviewType,
      difficulty: interview.difficulty,
      questions: interview.questions.map(
        (question) => ({
          question: question.question,
          answer: question.answer,
          transcript: question.transcript,
          questionType: question.questionType,
          score: question.score,
          feedback: question.feedback,
          fillerWords: question.fillerWords,
          speakingPace: question.speakingPace,
        })
      ),
    });

    // ==========================================
    // SAVE FINAL REPORT
    // ==========================================

    interview.overallScore =
      report.overallScore;

    interview.technicalScore =
      report.technicalScore;

    interview.communicationScore =
      report.communicationScore;

    interview.behavioralScore =
      report.behavioralScore;

    interview.speechScore =
      report.speechScore;

    interview.strengths =
      report.strengths || [];

    interview.weaknesses =
      report.weaknesses || [];

    interview.recommendations =
      report.recommendations || [];

    interview.summary =
      report.summary || "";

    interview.status = "completed";

    interview.completedAt = new Date();

    await interview.save();

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(200).json({
      success: true,
      message:
        "Interview completed successfully.",
      interview,
    });

  } catch (error) {
    console.error(
      "COMPLETE INTERVIEW ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to complete interview.",
    });
  }
};


// ==========================================================
// SUBMIT + EVALUATE INTERVIEW ANSWER
// ==========================================================

export const submitInterviewAnswer = async (req, res) => {
  try {
    const userId = req.user.id;
    const interviewId = req.params.id;

    const {
      questionId,
      answer,
      transcript,
      duration,
    } = req.body;

    // ==========================================
    // VALIDATION
    // ==========================================

    if (!questionId) {
      return res.status(400).json({
        success: false,
        message: "Question ID is required.",
      });
    }

    // ==========================================
    // FIND INTERVIEW
    // ==========================================

    const interview = await Interview.findOne({
      _id: interviewId,
      user: userId,
    });

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found.",
      });
    }

    // ==========================================
    // FIND QUESTION
    // ==========================================

    const question = interview.questions.id(
      questionId
    );

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found.",
      });
    }

    // ==========================================
    // SAVE ANSWER
    // ==========================================

    question.answer = answer || "";
    question.transcript = transcript || "";

    // ==========================================
    // FILLER WORD ANALYSIS
    // ==========================================

    const fillerWordList = [
      "um",
      "uh",
      "like",
      "you know",
      "actually",
      "basically",
      "literally",
      "so",
      "i mean",
    ];

    const text = (
      transcript ||
      answer ||
      ""
    ).toLowerCase();

    let fillerCount = 0;

    fillerWordList.forEach((word) => {
      const regex = new RegExp(
        `\\b${word.replace(" ", "\\s+")}\\b`,
        "gi"
      );

      const matches = text.match(regex);

      if (matches) {
        fillerCount += matches.length;
      }
    });

    question.fillerWords = fillerCount;

    // ==========================================
    // SPEAKING PACE
    // ==========================================

    const speakingDuration = Number(duration);

    if (
      speakingDuration &&
      speakingDuration > 0 &&
      text.trim()
    ) {
      const words = text
        .trim()
        .split(/\s+/)
        .filter(Boolean).length;

      // Words per minute
      question.speakingPace = Math.round(
        (words / speakingDuration) * 60
      );
    }

    // ==========================================
    // IMPORTANT
    // ==========================================
    // We DO NOT call Gemini here.
    //
    // The final AI evaluation will happen once
    // inside completeInterview().
    // ==========================================

    question.score = null;
    question.feedback = "";

    // ==========================================
    // SAVE
    // ==========================================

    await interview.save();

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(200).json({
      success: true,
      message: "Interview answer saved successfully.",

      question: {
        id: question._id,
        answer: question.answer,
        transcript: question.transcript,
        score: question.score,
        feedback: question.feedback,
        fillerWords: question.fillerWords,
        speakingPace: question.speakingPace,
      },
    });

  } catch (error) {
    console.error(
      "SUBMIT INTERVIEW ANSWER ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to save interview answer.",
    });
  }
};



// ==========================================================
// DELETE INTERVIEW
// ==========================================================

export const deleteInterview = async (req, res) => {
  try {
    const userId = req.user.id;
    const interviewId = req.params.id;

    const interview = await Interview.findOneAndDelete({
      _id: interviewId,
      user: userId,
    });

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Interview deleted successfully.",
    });

  } catch (error) {
    console.error(
      "DELETE INTERVIEW ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to delete interview.",
    });
  }
};