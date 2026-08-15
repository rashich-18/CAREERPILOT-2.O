import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleAlert,
  FileText,
  Lightbulb,
  Target,
  TrendingUp,
  BriefcaseBusiness,
  Brain,
  Sparkles,
  XCircle,
  Loader2,
  Building,
  ShieldCheck,
  Activity,
  Award,
  Zap,
  BarChart3,
  RotateCcw,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { getCareerMatchById } from "../api/careerMatchApi";
import { generateRoadmap } from "../api/roadmapApi";

// ============================================================
// HELPERS
// ============================================================

const clamp = (value) => {
  const number = Number(value);

  if (Number.isNaN(number)) return 0;

  return Math.min(100, Math.max(0, number));
};

const formatDate = (date) => {
  if (!date) return "";

  try {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
};

const getRecommendationStyle = (recommendation = "") => {
  const value = recommendation.toLowerCase();

  if (value.includes("apply after")) {
    return {
      label: recommendation,
      icon: TrendingUp,
      color: "text-amber-300",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
    };
  }

  if (value.includes("apply")) {
    return {
      label: recommendation,
      icon: CheckCircle2,
      color: "text-emerald-300",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
    };
  }

  return {
    label: recommendation || "Low fit",
    icon: XCircle,
    color: "text-rose-300",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
  };
};

const getPerformance = (score) => {
  if (score >= 85) {
    return {
      label: "Excellent Fit",
      color: "text-emerald-300",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      icon: ShieldCheck,
      description:
        "Your resume shows a strong alignment with the target role. You already demonstrate many of the capabilities employers are likely to look for.",
    };
  }

  if (score >= 70) {
    return {
      label: "Strong Fit",
      color: "text-violet-300",
      bg: "bg-violet-500/10",
      border: "border-violet-500/20",
      icon: TrendingUp,
      description:
        "You have a solid foundation for this role. A few focused improvements could significantly strengthen your chances.",
    };
  }

  if (score >= 50) {
    return {
      label: "Developing Fit",
      color: "text-amber-300",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
      icon: Target,
      description:
        "Your profile has some relevant foundations, but several important areas need development before you become a stronger match.",
    };
  }

  return {
    label: "Needs Development",
    color: "text-rose-300",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    icon: CircleAlert,
    description:
      "There are meaningful gaps between your current resume and the target role. Use this assessment as a roadmap for what to improve next.",
  };
};

// ============================================================
// SCORE BAR
// ============================================================

function ScoreBar({ label, value }) {
  const score = clamp(value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 transition hover:border-violet-400/15 hover:bg-white/[0.035]"
    >
      {/* LABEL + SCORE */}
      <div className="flex min-h-[22px] items-center justify-between gap-4">
        <span className="text-sm font-medium text-slate-400">
          {label}
        </span>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="shrink-0 text-sm font-semibold tabular-nums text-white"
        >
          {score}%
        </motion.span>
      </div>

      {/* PROGRESS */}
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{
            duration: 1.1,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative h-full overflow-hidden rounded-full bg-gradient-to-r from-violet-500 via-purple-500 to-cyan-400"
        >
          {/* moving shine */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{
              duration: 1.4,
              delay: 0.5,
              ease: "easeInOut",
            }}
            className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

// ============================================================
// ASSESSMENT CARD
// ============================================================

function AssessmentCard({
  item,
  index,
  total,
  type,
  onNext,
  onPrevious,
}) {
  const isStrong = type === "strong";
  const isPartial = type === "partial";

  const title =
    typeof item === "string"
      ? item
      : item?.skill ||
        item?.title ||
        item?.name ||
        item?.requirement ||
        "Career requirement";

  const description =
    typeof item === "string"
      ? ""
      : item?.reason ||
        item?.impact ||
        item?.description ||
        item?.evidence ||
        "";

  const icon = isStrong ? (
    <CheckCircle2 className="h-6 w-6 text-emerald-300" />
  ) : isPartial ? (
    <CircleAlert className="h-6 w-6 text-amber-300" />
  ) : (
    <XCircle className="h-6 w-6 text-rose-300" />
  );

  const heading = isStrong
    ? "Strong match"
    : isPartial
      ? "Partial match"
      : "Important gap";

  const iconContainer = isStrong
    ? "border-emerald-500/15 bg-emerald-500/10"
    : isPartial
      ? "border-amber-500/15 bg-amber-500/10"
      : "border-rose-500/15 bg-rose-500/10";

  return (
    <motion.div
      initial={{ opacity: 0, x: 35 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -35 }}
      transition={{ duration: 0.3 }}
      className="relative overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-white/[0.025] p-6 backdrop-blur-xl sm:p-7"
    >
      <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-violet-500/[0.06] blur-3xl" />

      <div className="relative">
        <div className="mb-7 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border ${iconContainer}`}
            >
              {icon}
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-600">
                Assessment
              </p>

              <h3 className="mt-1 text-lg font-semibold text-white">
                {heading}
              </h3>
            </div>
          </div>

          <span className="rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1 text-xs text-gray-500">
            {index + 1} / {total}
          </span>
        </div>

        <h2 className="text-2xl font-semibold tracking-tight text-white">
          {title}
        </h2>

        {description && (
          <p className="mt-4 text-sm leading-7 text-gray-400">
            {description}
          </p>
        )}

        <div className="mt-8 flex items-center justify-between border-t border-white/[0.06] pt-5">
          <button
            onClick={onPrevious}
            disabled={index === 0}
            className="group flex items-center gap-2 rounded-xl px-4 py-2 text-sm text-gray-500 transition hover:bg-white/[0.04] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ArrowLeft
              className="h-4 w-4 transition group-hover:-translate-x-1"
            />

            Previous
          </button>

          <button
            onClick={onNext}
            disabled={index === total - 1}
            className="group flex items-center gap-2 rounded-xl px-4 py-2 text-sm text-gray-500 transition hover:bg-white/[0.04] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
          >
            Next

            <ArrowRight
              className="h-4 w-4 transition group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================
// META PILL
// ============================================================

function MetaPill({ icon, text }) {
  if (!text) return null;

  return (
    <div className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-xs text-gray-500">
      <span className="text-gray-600">
        {icon}
      </span>

      <span className="max-w-[220px] truncate">
        {text}
      </span>
    </div>
  );
}

// ============================================================
// STAT BOX
// ============================================================

function StatBox({ icon, value, label }) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 backdrop-blur-xl">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.04] text-violet-300">
        {icon}
      </div>

      <p className="mt-4 text-2xl font-semibold text-white">
        {value}
      </p>

      <p className="mt-1 text-[10px] uppercase tracking-wider text-gray-600">
        {label}
      </p>
    </div>
  );
}

// ============================================================
// INSIGHT PANEL
// ============================================================

function InsightPanel({
  type,
  title,
  subtitle,
  icon,
  items,
}) {
  const isStrength = type === "strength";

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="relative overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-white/[0.025] p-6 backdrop-blur-xl sm:p-7"
    >
      <div
        className={`pointer-events-none absolute right-[-50px] top-[-50px] h-40 w-40 rounded-full blur-3xl ${
          isStrength
            ? "bg-emerald-500/[0.05]"
            : "bg-orange-500/[0.05]"
        }`}
      />

      <div className="relative">
        <div className="mb-6 flex items-start gap-4">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${
              isStrength
                ? "border-emerald-500/15 bg-emerald-500/10 text-emerald-300"
                : "border-orange-500/15 bg-orange-500/10 text-orange-300"
            }`}
          >
            {icon}
          </div>

          <div>
            <p
              className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${
                isStrength
                  ? "text-emerald-300"
                  : "text-orange-300"
              }`}
            >
              {isStrength
                ? "Positive Signals"
                : "Growth Signals"}
            </p>

            <h2 className="mt-1 font-semibold text-white">
              {title}
            </h2>

            <p className="mt-1 text-xs text-gray-600">
              {subtitle}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {(items || []).length > 0 ? (
            items.map((item, index) => {
              const text =
                typeof item === "string"
                  ? item
                  : item?.skill ||
                    item?.name ||
                    item?.title ||
                    item?.reason ||
                    item?.description ||
                    item?.requirement ||
                    JSON.stringify(item);

              return (
                <div
                  key={index}
                  className="group flex gap-3 rounded-xl border border-white/[0.05] bg-black/10 p-4 transition hover:border-white/[0.09]"
                >
                  <div
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[9px] font-bold ${
                      isStrength
                        ? "bg-emerald-500/10 text-emerald-300"
                        : "bg-orange-500/10 text-orange-300"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <p className="text-sm leading-6 text-gray-400">
                    {text}
                  </p>
                </div>
              );
            })
          ) : (
            <p className="text-sm text-gray-600">
              No insights available.
            </p>
          )}
        </div>
      </div>
    </motion.section>
  );
}

// ============================================================
// DETAIL GROUP
// ============================================================

function DetailGroup({ title, items }) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 backdrop-blur-xl">
      <h3 className="font-semibold text-white">
        {title}
      </h3>

      {items?.length > 0 ? (
        <div className="mt-4 space-y-3">
          {items.map((item, index) => {
            const text =
              typeof item === "string"
                ? item
                : item?.skill ||
                  item?.reason ||
                  item?.description ||
                  item?.requirement ||
                  JSON.stringify(item);

            return (
              <div
                key={index}
                className="flex gap-2 text-sm leading-6 text-gray-400"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />

                <span>{text}</span>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="mt-4 text-sm text-gray-600">
          No additional gaps identified.
        </p>
      )}
    </div>
  );
}

// ============================================================
// MAIN PAGE
// ============================================================

export default function CareerMatchResult() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [careerMatch, setCareerMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [assessmentType, setAssessmentType] =
    useState("strong");

  const [assessmentIndex, setAssessmentIndex] =
    useState(0);

  const [showMore, setShowMore] = useState(false);
  const [generatingRoadmap, setGeneratingRoadmap] =
    useState(false);

  // ==========================================================
  // FETCH RESULT
  // ==========================================================

  useEffect(() => {
    const loadCareerMatch = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getCareerMatchById(id);

        console.log(
          "CAREER MATCH RESULT:",
          response
        );

        /*
          Handles both:

          1. return response.data
          2. return full axios response
        */

        const result =
          response?.careerMatch ||
          response?.data?.careerMatch ||
          response?.data ||
          response;

        if (!result) {
          throw new Error(
            "Career Match result was not returned."
          );
        }

        setCareerMatch(result);
      } catch (err) {
        console.error(
          "CAREER MATCH RESULT ERROR:",
          err
        );

        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Unable to load this Career Match result.";

        setError(message);

        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadCareerMatch();
    }
  }, [id]);

  // ==========================================================
  // ASSESSMENT DATA
  // ==========================================================

  const assessmentItems = useMemo(() => {
    if (!careerMatch) return [];

    if (assessmentType === "strong") {
      return careerMatch.strongMatches || [];
    }

    if (assessmentType === "partial") {
      return careerMatch.partialMatches || [];
    }

    return careerMatch.criticalGaps || [];
  }, [careerMatch, assessmentType]);

  const changeAssessment = (type) => {
    setAssessmentType(type);
    setAssessmentIndex(0);
  };

  const nextAssessment = () => {
    if (
      assessmentIndex <
      assessmentItems.length - 1
    ) {
      setAssessmentIndex(
        (previous) => previous + 1
      );
    }
  };

  const previousAssessment = () => {
    if (assessmentIndex > 0) {
      setAssessmentIndex(
        (previous) => previous - 1
      );
    }
  };

  // ==========================================================
  // ROADMAP
  // ==========================================================

  const handleGenerateRoadmap = async () => {
    try {
      setGeneratingRoadmap(true);

      const response = await generateRoadmap({
        careerMatchId: careerMatch._id,
      });

      console.log(
        "ROADMAP GENERATED:",
        response
      );

      const roadmapId =
        response?.roadmap?._id ||
        response?.data?.roadmap?._id ||
        response?.data?._id;

      if (roadmapId) {
        toast.success("Roadmap created successfully!");

        navigate(`/roadmap/${roadmapId}`);
      } else {
        toast.error(
          "Roadmap was generated, but its ID was not returned."
        );
      }
    } catch (error) {
      console.error(
        "ROADMAP GENERATION ERROR:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to generate your roadmap. Please try again."
      );
    } finally {
      setGeneratingRoadmap(false);
    }
  };

  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#05060D] px-5">
        <div className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-5 py-4 text-sm text-gray-400 backdrop-blur-xl">
          <Loader2
            size={18}
            className="animate-spin text-violet-400"
          />

          Preparing your Career Match assessment...
        </div>
      </main>
    );
  }

  // ==========================================================
  // ERROR
  // ==========================================================

  if (error || !careerMatch) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#05060D] px-5 text-white">
        <div className="w-full max-w-md rounded-[1.75rem] border border-white/[0.08] bg-white/[0.025] p-8 text-center backdrop-blur-xl">
          <CircleAlert className="mx-auto h-10 w-10 text-rose-300" />

          <h2 className="mt-5 text-xl font-semibold">
            Couldn't load Career Match
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            {error ||
              "The Career Match result could not be found."}
          </p>

          <button
            onClick={() =>
              navigate("/career-match")
            }
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500"
          >
            <ArrowLeft size={16} />

            Back to Career Match
          </button>
        </div>
      </main>
    );
  }

  // ==========================================================
  // DATA
  // ==========================================================

  const matchScore = clamp(
    careerMatch.matchScore
  );

  const skillMatch = clamp(
    careerMatch.skillMatch
  );

  const experienceMatch = clamp(
    careerMatch.experienceMatch
  );

  const projectMatch = clamp(
    careerMatch.projectMatch
  );

  const performance =
    getPerformance(matchScore);

  const PerformanceIcon =
    performance.icon;

  const recommendation =
    getRecommendationStyle(
      careerMatch.applyRecommendation
    );

  const RecommendationIcon =
    recommendation.icon;

  const hiddenGaps =
    careerMatch.hiddenGaps || [];

  const evidenceGaps =
    careerMatch.evidenceGaps || [];

  const experienceGaps =
    careerMatch.experienceGaps || [];

  const strengths =
    careerMatch.strongMatches || [];

  const weaknesses =
    careerMatch.criticalGaps || [];

  const priorities =
    careerMatch.skillPriorities || [];

  const resumeSuggestions =
    careerMatch.resumeSuggestions || [];

  // ==========================================================
  // PAGE
  // ==========================================================

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[#05060D] px-3 py-5 text-white sm:px-5 sm:py-6 lg:px-8 lg:py-8">
      {/* =====================================================
          AMBIENT BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-violet-600/[0.08] blur-[120px]" />

        <div className="absolute right-[-150px] top-[25%] h-[450px] w-[450px] rounded-full bg-cyan-500/[0.045] blur-[120px]" />

        <div className="absolute bottom-[-200px] left-[35%] h-[500px] w-[500px] rounded-full bg-violet-500/[0.04] blur-[130px]" />
      </div>

      <div className="relative mx-auto w-full max-w-[1600px]">

        {/* ===================================================
            HEADER
        =================================================== */}

        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            onClick={() =>
              navigate("/career-match")
            }
            className="group flex w-fit items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-2.5 text-sm text-gray-400 backdrop-blur-xl transition hover:border-violet-500/30 hover:bg-white/[0.05] hover:text-white"
          >
            <ArrowLeft
              size={16}
              className="transition group-hover:-translate-x-1"
            />

            Back to Career Match
          </button>

          <div className="flex items-center gap-3">
            <div className="hidden h-10 w-10 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10 text-violet-300 sm:flex">
              <Sparkles size={18} />
            </div>

            <div className="text-left sm:text-right">
              <p className="text-sm font-semibold text-white">
                Career Match Assessment
              </p>

              <p className="mt-1 text-xs text-gray-600">
                {formatDate(
                  careerMatch.createdAt
                )}
              </p>
            </div>
          </div>
        </header>

        {/* ===================================================
            HERO
        =================================================== */}

        <motion.section
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="relative mb-6 overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.025] backdrop-blur-2xl"
        >
          {/* grid */}

          <div
            className="pointer-events-none absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
              backgroundSize: "45px 45px",
            }}
          />

          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-violet-600/[0.08] blur-3xl" />

          <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:p-10 xl:gap-12">

            {/* LEFT */}

            <div className="flex flex-col justify-center">
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <span className="flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-300">
                  <Sparkles size={12} />

                  AI Career Assessment
                </span>
              </div>

              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Your fit for{" "}
                <span className="text-violet-400">
                  {careerMatch.targetRole}
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
                CareerPilot analyzed your resume against
                the requirements of this role to identify
                your strongest matches, skill gaps, and
                next opportunities for improvement.
              </p>

              {/* META */}

              <div className="mt-7 flex flex-wrap gap-2">
                <MetaPill
                  icon={
                    <BriefcaseBusiness size={12} />
                  }
                  text={
                    careerMatch.targetRole
                  }
                />

                <MetaPill
                  icon={
                    <Building size={12} />
                  }
                  text={
                    careerMatch.targetCompany ||
                    "Company not specified"
                  }
                />

                {careerMatch.createdAt && (
                  <MetaPill
                    icon={
                      <Activity size={12} />
                    }
                    text={formatDate(
                      careerMatch.createdAt
                    )}
                  />
                )}
              </div>
            </div>

            {/* =================================================
                MATCH SCORE

                DO NOT CHANGE
            ================================================= */}

            {/* MATCH SCORE */}
            <div className="flex justify-center">
              <div className="relative flex h-52 w-52 items-center justify-center rounded-full border border-white/10 bg-[#0b0f1b] shadow-[0_0_80px_rgba(139,92,246,0.15)]">
                <div className="absolute inset-3 rounded-full border border-violet-400/10" />

                <div className="text-center">
                  <div className="text-6xl font-bold tracking-tight">
                    {matchScore}
                    <span className="text-2xl text-slate-500">%</span>
                  </div>

                  <p className="mt-1 text-sm text-slate-400">
                    overall match
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* SCORES */}
          <div className="relative grid gap-4 border-t border-white/10 px-6 pb-6 pt-6 sm:grid-cols-3 sm:px-8 lg:px-10">
            <ScoreBar label="Skill match" value={skillMatch} />
            <ScoreBar label="Experience match" value={experienceMatch} />
            <ScoreBar label="Project match" value={projectMatch} />
          </div>
        </motion.section>

        {/* ===================================================
            AI VERDICT
        =================================================== */}

        <motion.section
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.08,
          }}
          className={`relative mb-7 overflow-hidden rounded-[1.75rem] border ${performance.border} ${performance.bg} p-6 sm:p-7`}
        >
          <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-violet-500/[0.05] blur-3xl" />

          <div className="relative flex flex-col gap-5 sm:flex-row">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/[0.08] bg-black/20">
              <PerformanceIcon
                size={20}
                className={performance.color}
              />
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">
                  CareerPilot AI Verdict
                </span>

                <span
                  className={`rounded-full border ${performance.border} ${performance.bg} px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${performance.color}`}
                >
                  {performance.label}
                </span>
              </div>

              <p className="mt-3 max-w-4xl text-sm leading-7 text-gray-300">
                {performance.description}
              </p>
            </div>
          </div>
        </motion.section>

        {/* ===================================================
            PERFORMANCE MATRIX
        =================================================== */}

        <section className="mb-7">
          <div className="mb-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-300">
              Performance Matrix
            </p>

            <h2 className="mt-1 text-xl font-semibold text-white">
              Your match breakdown
            </h2>

            <p className="mt-1 text-xs leading-5 text-gray-600">
              See how your profile performs across the
              most important dimensions.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <MetricCard
              icon={<Brain size={18} />}
              title="Skill Match"
              score={skillMatch}
              description="Relevant technical capabilities"
              delay={0}
            />

            <MetricCard
              icon={<BriefcaseBusiness size={18} />}
              title="Experience"
              score={experienceMatch}
              description="Relevant experience evidence"
              delay={0.05}
            />

            <MetricCard
              icon={<BarChart3 size={18} />}
              title="Projects"
              score={projectMatch}
              description="Project relevance and proof"
              delay={0.1}
            />
          </div>
        </section>

        {/* ===================================================
            CAREER INSIGHT + QUICK STATS
        =================================================== */}

        <div className="mb-7 grid gap-5 lg:grid-cols-[1.5fr_0.5fr]">

          {/* CAREER INSIGHT */}

          <motion.section
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.12,
            }}
            className="rounded-[1.75rem] border border-white/[0.08] bg-white/[0.025] p-6 backdrop-blur-xl sm:p-8"
          >
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-500/15 bg-cyan-500/10 text-cyan-300">
                <Brain size={19} />
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
                  AI Analysis
                </p>

                <h2 className="mt-1 font-semibold text-white">
                  Career Insight
                </h2>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-black/20 p-5 sm:p-6">
              <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-violet-500 via-cyan-400 to-transparent" />

              <p className="text-sm leading-8 text-gray-400">
                {careerMatch.careerInsight &&
                careerMatch.careerInsight !==
                  "Your resume contains relevant information for this assessment."
                  ? careerMatch.careerInsight
                  : "CareerPilot identified relevant information in your resume and compared it against the target role requirements."}
              </p>
            </div>
          </motion.section>

          {/* QUICK STATS */}

          <motion.section
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.15,
            }}
            className="grid grid-cols-2 gap-3"
          >
            <StatBox
              icon={<CheckCircle2 size={16} />}
              value={strengths.length}
              label="Strong Matches"
            />

            <StatBox
              icon={<Target size={16} />}
              value={weaknesses.length}
              label="Skill Gaps"
            />

            <StatBox
              icon={<Lightbulb size={16} />}
              value={priorities.length}
              label="Priorities"
            />

            <StatBox
              icon={<Award size={16} />}
              value={matchScore}
              label="Match Score"
            />
          </motion.section>
        </div>

        {/* ===================================================
            STRENGTHS + GROWTH SIGNALS
        =================================================== */}

        <div className="mb-7 grid gap-5 lg:grid-cols-2">
          <InsightPanel
            type="strength"
            title="Strong Matches"
            subtitle="Requirements your resume already supports"
            icon={<ShieldCheck size={19} />}
            items={careerMatch.strongMatches}
          />

          <InsightPanel
            type="weakness"
            title="Growth Signals"
            subtitle="Areas that need stronger evidence or development"
            icon={<Target size={19} />}
            items={careerMatch.criticalGaps}
          />
        </div>

        {/* ===================================================
            ASSESSMENT
        =================================================== */}

        <motion.section
          initial={{
            opacity: 0,
            y: 15,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="mb-8"
        >
          <div className="mb-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-300">
              Detailed Assessment
            </p>

            <h2 className="mt-1 text-xl font-semibold text-white">
              What your resume tells us
            </h2>

            <p className="mt-1 text-xs leading-5 text-gray-600">
              Explore the evidence behind your match score.
            </p>
          </div>

          {/* TABS */}

          <div className="mb-5 grid grid-cols-2 gap-1 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-1 sm:flex">
            <button
              onClick={() =>
                changeAssessment("strong")
              }
              className={`flex-1 whitespace-nowrap rounded-xl px-4 py-3 text-sm font-medium transition ${
                assessmentType === "strong"
                  ? "bg-emerald-500/10 text-emerald-300"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              ✓ Strong matches

              <span className="ml-2 opacity-60">
                {careerMatch.strongMatches
                  ?.length || 0}
              </span>
            </button>

            <button
              onClick={() =>
                changeAssessment("partial")
              }
              className={`flex-1 whitespace-nowrap rounded-xl px-4 py-3 text-sm font-medium transition ${
                assessmentType === "partial"
                  ? "bg-amber-500/10 text-amber-300"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              ◐ Partial

              <span className="ml-2 opacity-60">
                {careerMatch.partialMatches
                  ?.length || 0}
              </span>
            </button>
          </div>

          {/* FLASH CARD */}

          {assessmentItems.length > 0 ? (
            <AnimatePresence mode="wait">
              <AssessmentCard
                key={`${assessmentType}-${assessmentIndex}`}
                item={
                  assessmentItems[
                    assessmentIndex
                  ]
                }
                index={assessmentIndex}
                total={assessmentItems.length}
                type={assessmentType}
                onNext={nextAssessment}
                onPrevious={
                  previousAssessment
                }
              />
            </AnimatePresence>
          ) : (
            <div className="rounded-[1.75rem] border border-white/[0.07] bg-white/[0.025] p-10 text-center">
              <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-300" />

              <h3 className="mt-4 text-lg font-semibold">
                Nothing to show here
              </h3>

              <p className="mt-2 text-sm text-gray-600">
                CareerPilot didn't identify anything
                in this category.
              </p>
            </div>
          )}
        </motion.section>

        {/* ===================================================
            SKILL GAP
        =================================================== */}

        {careerMatch.criticalGaps?.length > 0 && (
          <motion.section
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
            className="mb-8"
          >
            <div className="mb-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-rose-300">
                Skill Gap
              </p>

              <h2 className="mt-1 text-xl font-semibold text-white">
                Skills you need to develop
              </h2>

              <p className="mt-1 text-xs leading-5 text-gray-600">
                These are the most important areas
                currently missing or insufficiently
                demonstrated.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-[1.75rem] border border-rose-500/10 bg-white/[0.025] p-6 backdrop-blur-xl">
              <div className="pointer-events-none absolute right-[-80px] top-[-80px] h-48 w-48 rounded-full bg-rose-500/[0.05] blur-3xl" />

              <div className="relative flex flex-wrap gap-3">
                {careerMatch.criticalGaps.map(
                  (item, index) => {
                    const skill =
                      typeof item === "string"
                        ? item
                        : item?.skill ||
                          item?.name ||
                          item?.title ||
                          item?.requirement ||
                          "";

                    if (!skill) return null;

                    return (
                      <motion.span
                        key={index}
                        initial={{
                          opacity: 0,
                          scale: 0.95,
                        }}
                        whileInView={{
                          opacity: 1,
                          scale: 1,
                        }}
                        viewport={{
                          once: true,
                        }}
                        transition={{
                          delay:
                            index * 0.03,
                        }}
                        className="rounded-xl border border-rose-500/20 bg-rose-500/[0.08] px-4 py-2.5 text-sm font-medium text-rose-200"
                      >
                        {skill}
                      </motion.span>
                    );
                  }
                )}
              </div>
            </div>
          </motion.section>
        )}

        {/* ===================================================
            PRIORITIES
        =================================================== */}

        {careerMatch.skillPriorities?.length > 0 && (
          <motion.section
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
            className="mb-8"
          >
            <div className="mb-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-300">
                AI Action Plan
              </p>

              <h2 className="mt-1 text-xl font-semibold text-white">
                What to improve first
              </h2>

              <p className="mt-1 text-xs leading-5 text-gray-600">
                Focus on the highest-impact improvements
                instead of trying to fix everything at once.
              </p>
            </div>

            <div className="grid gap-3">
              {careerMatch.skillPriorities.map(
                (item, index) => {
                  const skill =
                    typeof item === "string"
                      ? item
                      : item?.skill ||
                        item?.name ||
                        "Skill";

                  const reason =
                    typeof item === "string"
                      ? ""
                      : item?.reason ||
                        item?.impact ||
                        item?.description ||
                        "";

                  const priority =
                    typeof item === "string"
                      ? ""
                      : item?.priority || "";

                  return (
                    <motion.div
                      key={index}
                      initial={{
                        opacity: 0,
                        x: -15,
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        delay:
                          index * 0.05,
                      }}
                      className="group flex gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 backdrop-blur-xl transition hover:border-violet-500/20 hover:bg-white/[0.04]"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-500/15 bg-violet-500/10 text-sm font-bold text-violet-300">
                        {String(
                          index + 1
                        ).padStart(2, "0")}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="font-semibold text-white">
                            {skill}
                          </h3>

                          {priority && (
                            <span className="rounded-full border border-white/[0.07] bg-white/[0.025] px-2.5 py-1 text-[10px] uppercase tracking-wider text-gray-500">
                              {priority}
                            </span>
                          )}
                        </div>

                        {reason && (
                          <p className="mt-2 text-sm leading-6 text-gray-400">
                            {reason}
                          </p>
                        )}
                      </div>

                      <ChevronDown
                        size={16}
                        className="mt-2 hidden rotate-[-90deg] text-gray-700 transition group-hover:text-violet-300 sm:block"
                      />
                    </motion.div>
                  );
                }
              )}
            </div>
          </motion.section>
        )}

        {/* ===================================================
            ROADMAP CTA
        =================================================== */}

        <motion.section
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
          className="relative mb-8 overflow-hidden rounded-[2rem] border border-violet-500/15 bg-white/[0.025] p-7 backdrop-blur-xl sm:p-9"
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-500/[0.08] blur-3xl" />

          <div className="relative flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2 text-violet-300">
                <Sparkles size={15} />

                <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">
                  Your next step
                </span>
              </div>

              <h2 className="text-2xl font-semibold text-white">
                Turn this analysis into a plan.
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
                CareerPilot can turn your skill gaps and
                priorities into a personalized learning
                roadmap.
              </p>
            </div>

            <button
  onClick={handleGenerateRoadmap}
  disabled={generatingRoadmap}
  className="group relative mt-6 inline-flex items-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 via-purple-500 to-cyan-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-violet-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-500/30 disabled:cursor-not-allowed disabled:opacity-60"
>
  {/* animated shine */}
  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

  {/* subtle glow */}
  <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-500/20 to-cyan-400/20 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />

  <span className="relative flex items-center gap-3">
    {generatingRoadmap ? (
      <>
        <Loader2 size={19} className="animate-spin" />
        Building your roadmap...
      </>
    ) : (
      <>
        <Sparkles
          size={19}
          className="transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
        />

        Build My Roadmap

        <ArrowRight
          size={18}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </>
    )}
  </span>
</button>

          </div>
        </motion.section>

        {/* ===================================================
            RESUME SUGGESTIONS
        =================================================== */}

        {resumeSuggestions.length > 0 && (
          <motion.section
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
            className="mb-8 rounded-[1.75rem] border border-cyan-500/10 bg-white/[0.025] p-6 backdrop-blur-xl sm:p-8"
          >
            <div className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-500/15 bg-cyan-500/10 text-cyan-300">
                <FileText size={19} />
              </div>

              <div className="w-full">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
                  Resume Optimization
                </p>

                <h2 className="mt-1 text-xl font-semibold text-white">
                  Make your resume stronger
                </h2>

                <p className="mt-2 text-sm text-gray-600">
                  Improvements based on what your resume
                  currently demonstrates.
                </p>

                <div className="mt-6 space-y-3">
                  {resumeSuggestions.map(
                    (suggestion, index) => (
                      <div
                        key={index}
                        className="flex gap-3 rounded-xl border border-white/[0.05] bg-black/10 p-4"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />

                        <p className="text-sm leading-6 text-gray-400">
                          {typeof suggestion ===
                          "string"
                            ? suggestion
                            : suggestion?.suggestion ||
                              suggestion?.reason ||
                              suggestion?.description ||
                              JSON.stringify(
                                suggestion
                              )}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* ===================================================
            MORE DETAILS
        =================================================== */}

        <section className="mb-8">
          <button
            onClick={() =>
              setShowMore(!showMore)
            }
            className="flex w-full items-center justify-between rounded-2xl border border-white/[0.07] bg-white/[0.025] px-5 py-4 text-left backdrop-blur-xl transition hover:bg-white/[0.04]"
          >
            <div className="flex items-center gap-3">
              <Lightbulb
                className="h-5 w-5 text-violet-300"
              />

              <div>
                <p className="font-medium text-white">
                  More assessment details
                </p>

                <p className="text-xs text-gray-600">
                  Hidden, evidence and experience gaps
                </p>
              </div>
            </div>

            <ChevronDown
              className={`h-5 w-5 text-gray-600 transition ${
                showMore
                  ? "rotate-180"
                  : ""
              }`}
            />
          </button>

          <AnimatePresence>
            {showMore && (
              <motion.div
                initial={{
                  height: 0,
                  opacity: 0,
                }}
                animate={{
                  height: "auto",
                  opacity: 1,
                }}
                exit={{
                  height: 0,
                  opacity: 0,
                }}
                className="overflow-hidden"
              >
                <div className="grid gap-4 pt-4 md:grid-cols-3">
                  <DetailGroup
                    title="Hidden gaps"
                    items={hiddenGaps}
                  />

                  <DetailGroup
                    title="Evidence gaps"
                    items={evidenceGaps}
                  />

                  <DetailGroup
                    title="Experience gaps"
                    items={experienceGaps}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* ===================================================
            FINAL RECOMMENDATION
        =================================================== */}

        <motion.section
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
          className="relative mb-10 overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.025] p-7 backdrop-blur-xl sm:p-9"
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-500/[0.06] blur-3xl" />

          <div className="relative flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${recommendation.border} ${recommendation.bg} ${recommendation.color}`}
                >
                  <RecommendationIcon
                    className="h-5 w-5"
                  />
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-600">
                    CareerPilot Recommendation
                  </p>

                  <h2
                    className={`mt-1 text-xl font-semibold ${recommendation.color}`}
                  >
                    {recommendation.label}
                  </h2>
                </div>
              </div>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-400">
                This recommendation is based on the
                evidence available in your uploaded resume
                and the requirements of the target role.
              </p>
            </div>

            <button
              onClick={() =>
                navigate("/career-match")
              }
              className="group flex shrink-0 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-gray-300 transition hover:bg-white/[0.08] hover:text-white"
            >
              <RotateCcw size={16} />

              New Assessment

              <ArrowRight
                size={16}
                className="transition group-hover:translate-x-1"
              />
            </button>
          </div>
        </motion.section>
      </div>
    </main>
  );
}

// ============================================================
// METRIC CARD
// ============================================================

function MetricCard({
  icon,
  title,
  score,
  description,
  delay,
}) {
  const safeScore = clamp(score);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay,
      }}
      whileHover={{
        y: -3,
      }}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 backdrop-blur-xl transition hover:border-violet-500/20"
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-violet-500/[0.06] blur-2xl transition group-hover:bg-violet-500/[0.10]" />

      <div className="relative">
        <div className="flex items-center justify-between">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-500/15 bg-violet-500/10 text-violet-300">
            {icon}
          </div>

          <Activity
            size={14}
            className="text-gray-700"
          />
        </div>

        <p className="mt-5 text-sm font-medium text-gray-400">
          {title}
        </p>

        <div className="mt-2 flex items-baseline gap-1">
          <span className="text-3xl font-semibold text-white">
            {safeScore}
          </span>

          <span className="text-xs text-gray-600">
            /100
          </span>
        </div>

        <p className="mt-1 text-[10px] text-gray-600">
          {description}
        </p>

        <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/[0.05]">
          <motion.div
            initial={{
              width: 0,
            }}
            animate={{
              width: `${safeScore}%`,
            }}
            transition={{
              delay: delay + 0.2,
              duration: 0.9,
              ease: "easeOut",
            }}
            className="h-full rounded-full bg-gradient-to-r from-violet-600 to-cyan-400"
          />
        </div>
      </div>
    </motion.div>
  );
}