import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  FileText,
  Flag,
  Loader2,
  Target,
  Sparkles,
  BriefcaseBusiness,
  Brain,
  Code2,
  MessageSquare,
  RotateCcw,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getRoadmapById,
  updateRoadmapProgress,
} from "../api/roadmapApi";

// ============================================================
// TASK ICON
// ============================================================

const getTaskIcon = (type) => {
  switch (type) {
    case "project":
      return Code2;

    case "practice":
      return Brain;

    case "resume":
      return FileText;

    case "interview":
      return MessageSquare;

    default:
      return Target;
  }
};

// ============================================================
// PRIORITY STYLE
// ============================================================

const getPriorityStyle = (priority) => {
  switch (priority) {
    case "high":
      return "border-rose-400/20 bg-rose-400/10 text-rose-300";

    case "low":
      return "border-slate-400/20 bg-slate-400/10 text-slate-400";

    default:
      return "border-amber-400/20 bg-amber-400/10 text-amber-300";
  }
};

// ============================================================
// MAIN PAGE
// ============================================================

export default function Roadmap() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [updatingTask, setUpdatingTask] = useState(null);
  const [expandedPhases, setExpandedPhases] = useState({});

  // ==========================================================
  // LOAD ROADMAP
  // ==========================================================

  useEffect(() => {
    const loadRoadmap = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getRoadmapById(id);

        console.log("ROADMAP RESPONSE:", response);

        if (response?.success && response?.roadmap) {
          setRoadmap(response.roadmap);

          // Open all phases initially
          const initialExpanded = {};

          response.roadmap.phases?.forEach((phase) => {
            initialExpanded[phase._id] = true;
          });

          setExpandedPhases(initialExpanded);
        } else {
          setError(
            response?.message || "Unable to load your roadmap."
          );
        }
      } catch (err) {
        console.error("ROADMAP LOAD ERROR:", err);

        setError(
          err?.response?.data?.message ||
            "Unable to load your roadmap."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadRoadmap();
    }
  }, [id]);

  // ==========================================================
  // CALCULATE PROGRESS FROM TASKS
  // ==========================================================

  const calculatedProgress = useMemo(() => {
    if (!roadmap?.phases?.length) return 0;

    let totalTasks = 0;
    let completedTasks = 0;

    roadmap.phases.forEach((phase) => {
      phase.tasks?.forEach((task) => {
        totalTasks++;

        if (task.completed) {
          completedTasks++;
        }
      });
    });

    if (totalTasks === 0) return 0;

    return Math.round((completedTasks / totalTasks) * 100);
  }, [roadmap]);

  // ==========================================================
  // TASK COUNTS
  // ==========================================================

  const taskStats = useMemo(() => {
    let total = 0;
    let completed = 0;

    roadmap?.phases?.forEach((phase) => {
      phase.tasks?.forEach((task) => {
        total++;

        if (task.completed) {
          completed++;
        }
      });
    });

    return {
      total,
      completed,
    };
  }, [roadmap]);

  // ==========================================================
  // TOGGLE PHASE
  // ==========================================================

  const togglePhase = (phaseId) => {
    setExpandedPhases((prev) => ({
      ...prev,
      [phaseId]: !prev[phaseId],
    }));
  };

  // ==========================================================
  // UPDATE TASK
  // ==========================================================

  const handleTaskToggle = async (
  phaseId,
  taskId,
  completed
) => {
  if (!roadmap) return;

  const updateKey = `${phaseId}-${taskId}`;

  try {
    setUpdatingTask(updateKey);

    // ========================================================
    // OPTIMISTIC UPDATE
    // ========================================================

    setRoadmap((previous) => {
      if (!previous) return previous;

      return {
        ...previous,

        phases: previous.phases.map(
          (phase) => {
            if (phase._id !== phaseId) {
              return phase;
            }

            return {
              ...phase,

              tasks: phase.tasks.map(
                (task) => {
                  if (task._id !== taskId) {
                    return task;
                  }

                  return {
                    ...task,
                    completed,
                  };
                }
              ),
            };
          }
        ),
      };
    });

    // ========================================================
    // BACKEND UPDATE
    // ========================================================

    const response =
      await updateRoadmapProgress(
        roadmap._id,
        phaseId,
        taskId,
        completed
      );

    console.log(
      "✅ ROADMAP PROGRESS RESPONSE:",
      response
    );

    if (
      response?.success &&
      response?.roadmap
    ) {
      setRoadmap(response.roadmap);

      toast.success(
        completed
          ? "Task completed!"
          : "Task marked incomplete."
      );
    } else {
      throw new Error(
        response?.message ||
          "Failed to update task."
      );
    }

  } catch (err) {

    console.error(
      "❌ UPDATE ROADMAP ERROR:",
      err
    );

    // ========================================================
    // ROLLBACK
    // ========================================================

    try {
      const response =
        await getRoadmapById(id);

      if (
        response?.success &&
        response?.roadmap
      ) {
        setRoadmap(
          response.roadmap
        );
      }
    } catch (reloadError) {
      console.error(
        "ROADMAP RELOAD ERROR:",
        reloadError
      );
    }

    toast.error(
      err?.response?.data?.message ||
        err.message ||
        "Failed to update task progress."
    );

  } finally {
    setUpdatingTask(null);
  }
};

  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050510] text-white">
        <div className="text-center">
          <Loader2 className="mx-auto h-10 w-10 animate-spin text-violet-400" />

          <p className="mt-4 text-sm text-slate-400">
            Loading your roadmap...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================================
  // ERROR
  // ==========================================================

  if (error || !roadmap) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050510] px-6 text-white">
        <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#101423] p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-400/10">
            <Flag className="h-6 w-6 text-rose-300" />
          </div>

          <h2 className="mt-5 text-xl font-bold">
            Couldn't load roadmap
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            {error || "The roadmap could not be found."}
          </p>

          <button
            onClick={() => navigate("/career-match")}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Career Match
          </button>
        </div>
      </div>
    );
  }

  // ==========================================================
  // PAGE
  // ==========================================================

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050510] text-white">
      {/* ==================================================
          BACKGROUND ATMOSPHERE
      ================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[10%] h-[450px] w-[450px] rounded-full bg-violet-500/10 blur-[140px]" />

        <div className="absolute right-[-5%] top-[30%] h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[130px]" />

        <div className="absolute bottom-[-10%] left-[30%] h-[400px] w-[400px] rounded-full bg-purple-500/5 blur-[120px]" />
      </div>

      <main className="relative mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:px-10">

        {/* ==================================================
            HEADER
        ================================================== */}

        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between"
        >
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-400 transition hover:bg-white/[0.05] hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />

            Back
          </button>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Sparkles className="h-4 w-4 text-violet-300" />

            CareerPilot Roadmap
          </div>
        </motion.div>

        {/* ==================================================
            HERO
        ================================================== */}

        <motion.section
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#14182a] via-[#101423] to-[#0c101d] p-7 shadow-2xl sm:p-10"
        >
          <div className="absolute right-[-80px] top-[-100px] h-[300px] w-[300px] rounded-full bg-violet-500/10 blur-[90px]" />

          <div className="relative">

            {/* BADGES */}

            <div className="mb-5 flex flex-wrap items-center gap-3">

              <span className="flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1.5 text-xs font-medium text-violet-200">
                <Target className="h-3.5 w-3.5" />

                Career Roadmap
              </span>

              <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-slate-400">
                <BriefcaseBusiness className="h-3.5 w-3.5" />

                {roadmap.targetRole}
              </span>

            </div>

            {/* TITLE */}

            <h1 className="max-w-4xl text-3xl font-bold tracking-tight sm:text-5xl">
              {roadmap.title}
            </h1>

            {roadmap.overview && (
              <p className="mt-5 max-w-3xl leading-7 text-slate-400">
                {roadmap.overview}
              </p>
            )}

            {/* PROGRESS */}

            <div className="mt-10 border-t border-white/10 pt-8">

              <div className="mb-3 flex items-center justify-between">

                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                    Your progress
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    {taskStats.completed} of{" "}
                    {taskStats.total} tasks completed
                  </p>
                </div>

                <span className="text-3xl font-bold text-white">
                  {calculatedProgress}%
                </span>

              </div>

              <div className="h-3 overflow-hidden rounded-full bg-white/[0.06]">

                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${calculatedProgress}%`,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                  }}
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 via-purple-500 to-cyan-400"
                />

              </div>

            </div>
          </div>
        </motion.section>

        {/* ==================================================
            ROADMAP PHASES
        ================================================== */}

        <section className="mt-12">

          <div className="mb-7">

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Your plan
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Step-by-step roadmap
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Work through each phase and complete the tasks at
              your own pace.
            </p>

          </div>

          {roadmap.phases?.length > 0 ? (
            <div className="space-y-5">

              {roadmap.phases
                .slice()
                .sort((a, b) => (a.order || 0) - (b.order || 0))
                .map((phase, phaseIndex) => {

                  const phaseCompleted =
                    phase.tasks?.length > 0 &&
                    phase.tasks.every(
                      (task) => task.completed
                    );

                  const completedCount =
                    phase.tasks?.filter(
                      (task) => task.completed
                    ).length || 0;

                  const isExpanded =
                    expandedPhases[phase._id];

                  return (
                    <motion.div
                      key={phase._id}
                      initial={{
                        opacity: 0,
                        y: 20,
                      }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        delay: phaseIndex * 0.05,
                      }}
                      className={`overflow-hidden rounded-3xl border ${
                        phaseCompleted
                          ? "border-emerald-400/20"
                          : "border-white/10"
                      } bg-[#101423]`}
                    >

                      {/* PHASE HEADER */}

                      <button
                        onClick={() =>
                          togglePhase(phase._id)
                        }
                        className="flex w-full items-center gap-4 p-5 text-left transition hover:bg-white/[0.025] sm:p-6"
                      >

                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                            phaseCompleted
                              ? "bg-emerald-400/10"
                              : "bg-violet-400/10"
                          }`}
                        >
                          {phaseCompleted ? (
                            <CheckCircle2 className="h-6 w-6 text-emerald-300" />
                          ) : (
                            <span className="text-lg font-bold text-violet-300">
                              {phaseIndex + 1}
                            </span>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">

                          <div className="flex flex-wrap items-center gap-3">

                            <h3 className="font-semibold text-white">
                              {phase.title}
                            </h3>

                            <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-slate-500">
                              {completedCount}/
                              {phase.tasks?.length || 0}{" "}
                              tasks
                            </span>

                          </div>

                          {phase.description && (
                            <p className="mt-1 text-sm leading-6 text-slate-500">
                              {phase.description}
                            </p>
                          )}

                        </div>

                        <ChevronDown
                          className={`h-5 w-5 shrink-0 text-slate-500 transition ${
                            isExpanded
                              ? "rotate-180"
                              : ""
                          }`}
                        />

                      </button>

                      {/* TASKS */}

                      {isExpanded && (
                        <div className="border-t border-white/10">

                          {phase.tasks?.length > 0 ? (
                            <div className="divide-y divide-white/[0.06]">

                              {phase.tasks.map(
                                (task) => {

                                  const TaskIcon =
                                    getTaskIcon(
                                      task.type
                                    );

                                  const updateKey = `${phase._id}-${task._id}`;

                                  const isUpdating =
                                    updatingTask ===
                                    updateKey;

                                  return (
                                    <div
                                      key={task._id}
                                      className={`group flex gap-4 p-5 transition sm:p-6 ${
                                        task.completed
                                          ? "bg-emerald-400/[0.025]"
                                          : "hover:bg-white/[0.02]"
                                      }`}
                                    >

                                      {/* CHECKBOX */}

                                      <button
                                        disabled={
                                          isUpdating
                                        }
                                        onClick={() =>
                                          handleTaskToggle(
                                            phase._id,
                                            task._id,
                                            !task.completed
                                          )
                                        }
                                        className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border transition ${
                                          task.completed
                                            ? "border-emerald-400/40 bg-emerald-400/15 text-emerald-300"
                                            : "border-white/15 bg-white/[0.03] text-transparent hover:border-violet-400/40"
                                        }`}
                                      >
                                        {isUpdating ? (
                                          <Loader2 className="h-4 w-4 animate-spin text-violet-300" />
                                        ) : task.completed ? (
                                          <Check className="h-4 w-4" />
                                        ) : null}
                                      </button>

                                      {/* TASK CONTENT */}

                                      <div className="min-w-0 flex-1">

                                        <div className="flex flex-wrap items-center gap-3">

                                          <TaskIcon
                                            className={`h-4 w-4 ${
                                              task.completed
                                                ? "text-emerald-300"
                                                : "text-violet-300"
                                            }`}
                                          />

                                          <h4
                                            className={`font-semibold ${
                                              task.completed
                                                ? "text-slate-500 line-through"
                                                : "text-white"
                                            }`}
                                          >
                                            {task.title}
                                          </h4>

                                          {task.priority && (
                                            <span
                                              className={`rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide ${getPriorityStyle(
                                                task.priority
                                              )}`}
                                            >
                                              {
                                                task.priority
                                              }
                                            </span>
                                          )}

                                        </div>

                                        {task.description && (
                                          <p
                                            className={`mt-2 max-w-3xl text-sm leading-6 ${
                                              task.completed
                                                ? "text-slate-600"
                                                : "text-slate-400"
                                            }`}
                                          >
                                            {
                                              task.description
                                            }
                                          </p>
                                        )}

                                        {task.estimatedTime && (
                                          <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                                            <Clock3 className="h-3.5 w-3.5" />

                                            {
                                              task.estimatedTime
                                            }
                                          </div>
                                        )}

                                      </div>
                                    </div>
                                  );
                                }
                              )}

                            </div>
                          ) : (
                            <div className="p-6 text-sm text-slate-500">
                              No tasks were generated for this phase.
                            </div>
                          )}

                        </div>
                      )}

                    </motion.div>
                  );
                })}

            </div>
          ) : (
            <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-10 text-center">

              <Sparkles className="mx-auto h-10 w-10 text-violet-300" />

              <h3 className="mt-4 text-lg font-semibold">
                Your roadmap is empty
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                The roadmap was created, but no phases or tasks
                were generated.
              </p>

            </div>
          )}

        </section>

        {/* ==================================================
            FOOTER ACTION
        ================================================== */}

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="mt-12 mb-10 rounded-3xl border border-violet-400/10 bg-violet-400/[0.04] p-6 sm:p-8"
        >

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-violet-400/10">
                <Sparkles className="h-5 w-5 text-violet-300" />
              </div>

              <div>

                <p className="font-semibold text-white">
                  Keep building your career
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Complete the roadmap one task at a time.
                </p>

              </div>

            </div>

            {calculatedProgress === 100 && (
              <div className="flex items-center gap-2 text-sm font-medium text-emerald-300">
                <CheckCircle2 className="h-5 w-5" />

                Roadmap completed!
              </div>
            )}

          </div>

        </motion.section>

      </main>
    </div>
  );
}