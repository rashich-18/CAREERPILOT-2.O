
import User from "../models/User.js";
import Resume from "../models/Resume.js";
import CareerMatch from "../models/CareerMatch.js";
import Roadmap from "../models/Roadmap.js";
import Interview from "../models/Interview.js";
import JobApplication from "../models/JobApplication.js";

// ==========================================
// GET DASHBOARD
// ==========================================

export const getDashboard = async (req, res) => {
  try {
    // ==========================================
    // AUTHENTICATION
    // ==========================================

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const userId = req.user.id;

    // ==========================================
    // FETCH DASHBOARD DATA
    // ==========================================

    const [
      user,
      resume,
      careerMatch,
      roadmap,
      interviews,
      jobApplication,
    ] = await Promise.all([
      User.findById(userId)
        .select("name email career education skills")
        .lean(),

      Resume.findOne({
        user: userId,
        isCurrent: true,
      })
        .sort({ uploadedAt: -1 })
        .lean(),

      CareerMatch.findOne({
        user: userId,
      })
        .sort({ createdAt: -1 })
        .lean(),

      Roadmap.findOne({
        user: userId,
      })
        .sort({ createdAt: -1 })
        .lean(),

      Interview.find({
        user: userId,
      })
        .sort({ createdAt: -1 })
        .limit(10)
        .lean(),

      JobApplication.findOne({
        user: userId,
      })
        .sort({ createdAt: -1 })
        .lean(),
    ]);

    // ==========================================
    // USER CHECK
    // ==========================================

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // ==========================================
    // ROADMAP TASK PROGRESS
    // ==========================================

    let totalTasks = 0;
    let completedTasks = 0;
    let nextTask = null;

    if (roadmap?.phases?.length) {
      for (const phase of roadmap.phases) {
        for (const task of phase.tasks || []) {
          totalTasks++;

          if (task.completed) {
            completedTasks++;
          } else if (!nextTask) {
            nextTask = {
              id: task._id,
              title: task.title,
              description: task.description,
              type: task.type,
              priority: task.priority,
              estimatedTime: task.estimatedTime,
              phaseId: phase._id,
              phaseTitle: phase.title,
            };
          }
        }
      }
    }

    const roadmapProgress =
      totalTasks === 0
        ? 0
        : Math.round(
            (completedTasks / totalTasks) * 100
          );

    // ==========================================
    // INTERVIEW DATA
    // ==========================================

    const completedInterviews = interviews.filter(
      (interview) =>
        interview.status === "completed"
    );

    const latestInterview =
      completedInterviews.length > 0
        ? completedInterviews[0]
        : null;

    // ==========================================
    // CAREER READINESS
    // ==========================================

    const resumeScore =
      resume?.analysis?.resumeScore ??
      null;

    const careerMatchScore =
      careerMatch?.matchScore ?? 0;

    const interviewScore =
      latestInterview?.overallScore ?? 0;

    let readinessParts = [];
    let readinessTotal = 0;

    if (resumeScore !== null) {
      readinessParts.push(resumeScore);
    }

    if (careerMatch) {
      readinessParts.push(careerMatchScore);
    }

    if (roadmap) {
      readinessParts.push(roadmapProgress);
    }

    if (latestInterview) {
      readinessParts.push(interviewScore);
    }

    if (readinessParts.length > 0) {
      readinessTotal = Math.round(
        readinessParts.reduce(
          (sum, value) => sum + value,
          0
        ) / readinessParts.length
      );
    }

    // ==========================================
    // RECENT ACTIVITY
    // ==========================================

    const activity = [];

    if (careerMatch) {
      activity.push({
        type: "career-match",
        title: "Career Match generated",
        date: careerMatch.createdAt,
      });
    }

    if (roadmap) {
      activity.push({
        type: "roadmap",
        title: "Career Roadmap generated",
        date: roadmap.createdAt,
      });
    }

    completedInterviews.forEach((interview) => {
      activity.push({
        type: "interview",
        title: "AI Interview completed",
        date:
          interview.completedAt ||
          interview.createdAt,
      });
    });

    if (jobApplication) {
      activity.push({
        type: "application",
        title: "Application generated",
        date: jobApplication.createdAt,
      });
    }

    activity.sort(
      (a, b) =>
        new Date(b.date) -
        new Date(a.date)
    );

    const recentActivity =
      activity.slice(0, 5);

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(200).json({
      success: true,

      dashboard: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },

        careerReadiness: readinessTotal,

        snapshot: {
          resume: resume
            ? {
                id: resume._id,
                fileName: resume.fileName,
                score: resumeScore,
                analyzed: true,
                uploadedAt:
                  resume.uploadedAt,
              }
            : null,

          careerMatch: careerMatch
            ? {
                id: careerMatch._id,
                targetRole:
                  careerMatch.targetRole,
                matchScore:
                  careerMatch.matchScore,
                recommendation:
                  careerMatch.applyRecommendation,
              }
            : null,

          roadmap: roadmap
            ? {
                id: roadmap._id,
                title: roadmap.title,
                targetRole:
                  roadmap.targetRole,
                progress:
                  roadmapProgress,
                completedTasks,
                totalTasks,
              }
            : null,

          interview: {
            completed:
              completedInterviews.length,
            latestScore:
              latestInterview?.overallScore ??
              null,
            latestInterviewId:
              latestInterview?._id ?? null,
          },
        },

        continueJourney: roadmap
          ? {
              roadmapId: roadmap._id,
              targetRole:
                roadmap.targetRole,
              progress:
                roadmapProgress,
              completedTasks,
              totalTasks,
              nextTask,
            }
          : null,

        latestCareerMatch: careerMatch
          ? {
              id: careerMatch._id,
              targetRole:
                careerMatch.targetRole,
              matchScore:
                careerMatch.matchScore,
              strongMatches:
                careerMatch.strongMatches || [],
              focusNext:
                careerMatch.skillsToDevelop?.length
                  ? careerMatch.skillsToDevelop
                  : careerMatch.criticalGaps || [],
              recommendation:
                careerMatch.applyRecommendation,
            }
          : null,

        roadmap: roadmap
          ? {
              id: roadmap._id,
              title: roadmap.title,
              targetRole:
                roadmap.targetRole,
              progress:
                roadmapProgress,
              completedTasks,
              totalTasks,
              nextTask,
              // Send actual roadmap structure
              phases: roadmap.phases || [],

            }
          : null,

        latestApplication:
          jobApplication
            ? {
                id: jobApplication._id,
                role: jobApplication.role,
                company:
                  jobApplication.company,
                readiness:
                  jobApplication.applicationReadiness,
                recommendation:
                  jobApplication.recommendation,
                createdAt:
                  jobApplication.createdAt,
              }
            : null,

        recentActivity,
      },
    });
  } catch (error) {
    console.error(
      "GET DASHBOARD ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to load dashboard.",
      error: error.message,
    });
  }
};
