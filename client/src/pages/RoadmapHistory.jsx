import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Map,
  RefreshCw,
  Sparkles,
  Target,
  Trash2,
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
  // LOAD
  // ============================================================

  const loadRoadmaps = async () => {
    try {
      setLoading(true);
      setError("");

      console.log("🗺️ Loading roadmap history...");

      const response = await getRoadmapHistory();

      console.log("✅ ROADMAP HISTORY RESPONSE:", response);

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

  // ============================================================
  // INITIAL LOAD
  // ============================================================

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
          <RefreshCw className="mx-auto h-10 w-10 animate-spin text-violet-400" />

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
      <div className="flex min-h-screen items-center justify-center bg-[#050510] px-6 text-white">
        <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#101423] p-8 text-center">

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

      {/* Background */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[10%] h-[450px] w-[450px] rounded-full bg-violet-500/10 blur-[140px]" />

        <div className="absolute right-[-5%] top-[30%] h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[130px]" />
      </div>

      <main className="relative mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:px-10">

        {/* HEADER */}

        <motion.div
          initial={{
            opacity: 0,
            y: -15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mb-10"
        >
          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-400/10">
              <Map className="h-6 w-6 text-violet-300" />
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Career journey
              </p>

              <h1 className="mt-1 text-3xl font-bold sm:text-4xl">
                My Roadmaps
              </h1>
            </div>

          </div>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400">
            Continue working on the career roadmaps you've
            generated from your Career Match results.
          </p>
        </motion.div>

        {/* EMPTY */}

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
            className="rounded-3xl border border-white/10 bg-[#101423] p-10 text-center"
          >

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-400/10">
              <Sparkles className="h-7 w-7 text-violet-300" />
            </div>

            <h2 className="mt-5 text-xl font-semibold">
              No roadmaps yet
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
              Generate a personalized career roadmap from
              your Career Match results and it will appear here.
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

          <div className="grid gap-6 lg:grid-cols-2">

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
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay:
                        index * 0.07,
                    }}
                    className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#101423] p-6 transition hover:border-violet-400/20 sm:p-7"
                  >

                    <div className="relative">

                      {/* ROLE */}

                      <div className="flex items-start justify-between">

                        <div className="flex items-center gap-3">

                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-400/10">
                            <Target className="h-5 w-5 text-violet-300" />
                          </div>

                          <div>
                            <p className="text-xs text-slate-500">
                              Target role
                            </p>

                            <h2 className="font-semibold">
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

                      <h3 className="mt-6 text-xl font-bold">
                        {roadmap.title ||
                          `${roadmap.targetRole || "Career"} Roadmap`}
                      </h3>

                      {/* OVERVIEW */}

                      {roadmap.overview && (
                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                          {roadmap.overview}
                        </p>
                      )}

                      {/* PROGRESS */}

                      <div className="mt-6">

                        <div className="mb-2 flex justify-between">

                          <span className="text-xs text-slate-500">
                            Progress
                          </span>

                          <span className="text-sm font-semibold">
                            {progress}%
                          </span>

                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">

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

                      <div className="mt-5 flex flex-wrap gap-4 text-xs text-slate-500">

                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          {completed}/{total} tasks
                        </span>

                        <span className="flex items-center gap-1.5">
                          <Map className="h-3.5 w-3.5" />
                          {roadmap.phases?.length || 0} phases
                        </span>

                        <span className="flex items-center gap-1.5">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {formatDate(
                            roadmap.createdAt
                          )}
                        </span>

                      </div>

                      {/* BUTTONS */}

                      <div className="mt-7 flex gap-3">

                        <button
                          onClick={() =>
                            navigate(
                              `/roadmap/${roadmap._id}`
                            )
                          }
                          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-950"
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
                          className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 text-slate-500 hover:text-rose-300 disabled:opacity-50"
                        >
                          {deletingId ===
                          roadmap._id ? (
                            <RefreshCw className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </button>

                      </div>

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