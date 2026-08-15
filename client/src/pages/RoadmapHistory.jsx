import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PageBackground from "../components/common/PageBackground";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Map,
  RefreshCw,
  Sparkles,
  Target,
  Trash2,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getRoadmapHistory,
  deleteRoadmap,
} from "../api/roadmapApi";

export default function RoadmapHistory() {
  const navigate = useNavigate();

  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  // ============================================================
  // LOAD ROADMAPS
  // ============================================================

  const loadRoadmaps = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getRoadmapHistory();

      if (!response) {
        throw new Error(
          "No response received from roadmap server."
        );
      }

      if (response.success === true) {
        const data = Array.isArray(response.roadmaps)
          ? response.roadmaps
          : [];

        setRoadmaps(data);
        return;
      }

      setRoadmaps([]);

      setError(
        response.message ||
          "Unable to load your roadmaps."
      );
    } catch (err) {
      console.error(
        "❌ ROADMAP HISTORY ERROR:",
        err
      );

      setRoadmaps([]);

      if (err?.response) {
        setError(
          err.response.data?.message ||
            `Server error (${err.response.status})`
        );
      } else if (err?.request) {
        setError(
          "Could not connect to the backend server."
        );
      } else {
        setError(
          err.message ||
            "Unable to load your roadmaps."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRoadmaps();
  }, []);

  // ============================================================
  // DELETE
  // ============================================================

  const handleDelete = async (roadmapId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this roadmap?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(roadmapId);

      await deleteRoadmap(roadmapId);

      setRoadmaps((previous) =>
        previous.filter(
          (roadmap) => roadmap._id !== roadmapId
        )
      );

      toast.success("Roadmap deleted.");
    } catch (err) {
      console.error(
        "DELETE ROADMAP ERROR:",
        err
      );

      toast.error(
        err?.response?.data?.message ||
          "Failed to delete roadmap."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // ============================================================
  // HELPERS
  // ============================================================

  const getProgress = (roadmap) => {
    if (
      typeof roadmap?.progress === "number"
    ) {
      return roadmap.progress;
    }

    let total = 0;
    let completed = 0;

    roadmap?.phases?.forEach((phase) => {
      phase?.tasks?.forEach((task) => {
        total++;

        if (task.completed) {
          completed++;
        }
      });
    });

    return total === 0
      ? 0
      : Math.round(
          (completed / total) * 100
        );
  };

  const getTaskCount = (roadmap) => {
    let total = 0;
    let completed = 0;

    roadmap?.phases?.forEach((phase) => {
      phase?.tasks?.forEach((task) => {
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
  };

  const formatDate = (date) => {
    if (!date) {
      return "Recently created";
    }

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
      return "Recently created";
    }

    return parsed.toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050510] text-white">
        <div className="text-center">
          <RefreshCw className="mx-auto h-9 w-9 animate-spin text-violet-400" />

          <p className="mt-4 text-sm text-slate-400">
            Loading your roadmaps...
          </p>
        </div>
      </div>
    );
  }

  // ============================================================
  // ERROR
  // ============================================================

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050510] px-4 text-white">
        <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#101423] p-7 text-center">
          <Target className="mx-auto h-10 w-10 text-rose-300" />

          <h2 className="mt-5 text-xl font-bold">
            Couldn't load your roadmaps
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            {error}
          </p>

          <button
            onClick={loadRoadmaps}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // ============================================================
  // PAGE
  // ============================================================

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050510] text-white">
      {/* BACKGROUND */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[10%] h-[450px] w-[450px] rounded-full bg-violet-500/10 blur-[140px]" />

        <div className="absolute right-[-5%] top-[30%] h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[130px]" />
      </div>

      <PageBackground />

      {/* =====================================================
          FULL WIDTH CONTENT
      ===================================================== */}

      <main className="relative w-full px-3 py-5 sm:px-4 sm:py-6 lg:px-5 xl:px-6">
        {/* ===================================================
            TOP BAR
        =================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* BACK */}

          <motion.button
            type="button"
            onClick={() => navigate("/dashboard")}
            whileHover={{
              x: -2,
            }}
            whileTap={{
              scale: 0.97,
            }}
            className="mb-5 inline-flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.035] px-4 py-2.5 text-xs font-medium text-gray-400 transition hover:border-violet-500/30 hover:bg-white/[0.06] hover:text-white"
          >
            <ArrowLeft size={16} />

            Back to dashboard
          </motion.button>

          {/* HEADER */}

          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-violet-500/20 bg-violet-500/10">
                  <Map
                    size={16}
                    className="text-violet-300"
                  />
                </div>

                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-violet-300">
                  CareerPilot AI
                </p>
              </div>

              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                My Roadmaps
              </h1>

              <p className="mt-1.5 max-w-2xl text-sm leading-6 text-gray-500">
                Continue working on the personalized
                career roadmaps you've generated from
                your Career Match results.
              </p>
            </div>

            {/* COUNT */}

            <div className="flex shrink-0 items-center gap-3 self-start rounded-xl border border-white/[0.07] bg-white/[0.035] px-3.5 py-2.5 sm:self-auto">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10">
                <Map
                  size={16}
                  className="text-violet-300"
                />
              </div>

              <div>
                <p className="text-base font-semibold leading-none text-white">
                  {roadmaps.length}
                </p>

                <p className="mt-1 text-[9px] uppercase tracking-wider text-gray-600">
                  Roadmaps
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ===================================================
            EMPTY STATE
        =================================================== */}

        {roadmaps.length === 0 ? (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="w-full rounded-3xl border border-white/10 bg-[#101423] p-8 text-center"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-400/10">
              <Sparkles className="h-7 w-7 text-violet-300" />
            </div>

            <h2 className="mt-5 text-xl font-semibold">
              No roadmaps yet
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
              Generate a personalized career roadmap
              from your Career Match results and it
              will appear here.
            </p>

            <button
              onClick={() =>
                navigate("/career-match")
              }
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950"
            >
              Explore Career Match

              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
        ) : (
          /* =================================================
             ROADMAPS
          ================================================= */

          <div className="grid w-full gap-4 lg:grid-cols-2">
            {roadmaps.map(
              (roadmap, index) => {
                const progress =
                  getProgress(roadmap);

                const {
                  total,
                  completed,
                } = getTaskCount(roadmap);

                return (
                  <motion.div
                    key={roadmap._id}
                    initial={{
                      opacity: 0,
                      y: 15,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay:
                        index * 0.06,
                    }}
                    className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#101423] p-5 transition hover:border-violet-400/20"
                  >
                    {/* ROLE */}

                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-400/10">
                          <Target className="h-5 w-5 text-violet-300" />
                        </div>

                        <div>
                          <p className="text-[11px] text-slate-500">
                            Target role
                          </p>

                          <h2 className="text-sm font-semibold text-white">
                            {roadmap.targetRole ||
                              "Career Goal"}
                          </h2>
                        </div>
                      </div>

                      {progress === 100 && (
                        <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                      )}
                    </div>

                    {/* TITLE */}

                    <h3 className="mt-4 text-lg font-bold">
                      {roadmap.title ||
                        `${
                          roadmap.targetRole ||
                          "Career"
                        } Roadmap`}
                    </h3>

                    {/* OVERVIEW */}

                    {roadmap.overview && (
                      <p className="mt-1.5 line-clamp-2 text-sm leading-5 text-slate-500">
                        {roadmap.overview}
                      </p>
                    )}

                    {/* PROGRESS */}

                    <div className="mt-4">
                      <div className="mb-2 flex justify-between">
                        <span className="text-xs text-slate-500">
                          Progress
                        </span>

                        <span className="text-xs font-semibold text-white">
                          {progress}%
                        </span>
                      </div>

                      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                        <motion.div
                          initial={{
                            width: 0,
                          }}
                          animate={{
                            width:
                              `${progress}%`,
                          }}
                          transition={{
                            duration: 0.8,
                          }}
                          className="h-full rounded-full bg-gradient-to-r from-violet-500 via-purple-500 to-cyan-400"
                        />
                      </div>
                    </div>

                    {/* META */}

                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5" />

                        {completed}/{total} tasks
                      </span>

                      <span className="flex items-center gap-1.5">
                        <Map className="h-3.5 w-3.5" />

                        {roadmap.phases?.length ||
                          0}{" "}
                        phases
                      </span>

                      <span className="flex items-center gap-1.5">
                        <CalendarDays className="h-3.5 w-3.5" />

                        {formatDate(
                          roadmap.createdAt
                        )}
                      </span>
                    </div>

                    {/* BUTTONS */}

                    <div className="mt-5 flex gap-2.5">
                      <button
                        onClick={() =>
                          navigate(
                            `/roadmap/${roadmap._id}`
                          )
                        }
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-gray-100"
                      >
                        {progress > 0
                          ? "Continue Roadmap"
                          : "Start Roadmap"}

                        <ArrowRight className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(
                            roadmap._id
                          )
                        }
                        disabled={
                          deletingId ===
                          roadmap._id
                        }
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 text-slate-500 transition hover:border-rose-500/20 hover:bg-rose-500/5 hover:text-rose-300 disabled:opacity-50"
                      >
                        {deletingId ===
                        roadmap._id ? (
                          <RefreshCw className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </motion.div>
                );
              }
            )}
          </div>
        )}
      </main>
    </div>
  );
}