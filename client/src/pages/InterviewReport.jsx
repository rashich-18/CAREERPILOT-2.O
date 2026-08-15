import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Award,
  Brain,
  MessageCircle,
  Mic,
  TrendingUp,
  Lightbulb,
  Loader2,
  Target,
  Sparkles,
  CalendarDays,
  BriefcaseBusiness,
  RotateCcw,
  LayoutDashboard,
  ChevronRight,
  Zap,
  ShieldCheck,
  Activity,
  CircleDot,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { getInterviewById } from "../api/interviewApi";

export default function InterviewReport() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReport();
  }, [id]);

  const fetchReport = async () => {
    try {
      setLoading(true);

      const response = await getInterviewById(id);

      if (response.data.success) {
        setInterview(response.data.interview);
      }
    } catch (error) {
      console.error("FETCH INTERVIEW REPORT ERROR:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load interview report."
      );

      navigate("/interview");
    } finally {
      setLoading(false);
    }
  };

  const overallScore = Number(interview?.overallScore || 0);

  const performance = useMemo(() => {
    if (overallScore >= 85) {
      return {
        label: "Excellent",
        color: "text-emerald-300",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20",
        description:
          "You demonstrated strong interview readiness and handled the assessment with confidence.",
      };
    }

    if (overallScore >= 70) {
      return {
        label: "Strong",
        color: "text-violet-300",
        bg: "bg-violet-500/10",
        border: "border-violet-500/20",
        description:
          "You have a solid foundation. A few focused improvements can make your performance significantly stronger.",
      };
    }

    if (overallScore >= 50) {
      return {
        label: "Developing",
        color: "text-amber-300",
        bg: "bg-amber-500/10",
        border: "border-amber-500/20",
        description:
          "You have a promising starting point, but several areas need focused practice.",
      };
    }

    return {
      label: "Needs Practice",
      color: "text-red-300",
      bg: "bg-red-500/10",
      border: "border-red-500/20",
      description:
        "Use this assessment as a baseline and focus on consistent practice before your next interview.",
    };
  }, [overallScore]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#05060D] px-4">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-gray-400 backdrop-blur-xl">
          <Loader2
            size={18}
            className="animate-spin text-violet-400"
          />
          Preparing your AI assessment...
        </div>
      </main>
    );
  }

  if (!interview) return null;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05060D] px-3 py-5 text-white sm:px-5 sm:py-6 lg:px-6 lg:py-8">
      {/* =====================================================
          AMBIENT BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-violet-600/[0.07] blur-[120px]" />

        <div className="absolute right-[-150px] top-[25%] h-[420px] w-[420px] rounded-full bg-cyan-500/[0.04] blur-[120px]" />

        <div className="absolute bottom-[-200px] left-[35%] h-[450px] w-[450px] rounded-full bg-violet-500/[0.035] blur-[130px]" />
      </div>

      <div className="relative mx-auto w-full max-w-[1380px]">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <header className="mb-6 flex flex-col gap-4 sm:mb-7 sm:flex-row sm:items-center sm:justify-between">
          <motion.button
            type="button"
            onClick={() => navigate("/interview")}
            initial={{
              opacity: 0,
              x: -8,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{
              x: -2,
            }}
            whileTap={{
              scale: 0.97,
            }}
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.035] px-3.5 py-2.5 text-xs font-medium text-gray-400 transition hover:border-violet-500/30 hover:bg-white/[0.06] hover:text-white sm:px-4"
          >
            <ArrowLeft size={15} />
            Back to AI Interview
          </motion.button>

          <div className="flex items-center gap-3">
            <div className="hidden h-10 w-10 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10 text-violet-300 sm:flex">
              <Sparkles size={18} />
            </div>

            <div className="min-w-0 text-left sm:text-right">
              <p className="truncate text-sm font-semibold text-white">
                {interview.role}
              </p>

              {interview.company && (
                <div className="mt-1 flex items-center gap-2 text-xs text-gray-500 sm:justify-end">
                  <BriefcaseBusiness size={12} />
                  <span className="truncate">
                    {interview.company}
                  </span>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* =====================================================
            HERO ASSESSMENT CARD
        ===================================================== */}

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-5 overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-white/[0.025] backdrop-blur-2xl sm:mb-6 sm:rounded-[1.75rem]"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
              backgroundSize: "45px 45px",
            }}
          />

          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet-600/[0.08] blur-3xl" />

          <div className="relative grid items-center gap-7 p-5 sm:p-7 md:p-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:p-9 xl:grid-cols-[minmax(0,1fr)_320px]">
            {/* LEFT */}

            <div className="min-w-0">
              <div className="mb-4 flex items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-violet-300 sm:text-[10px]">
                  <Sparkles size={11} />
                  AI Assessment Complete
                </span>
              </div>

              <h1 className="text-[2rem] font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.8rem]">
                Interview{" "}
                <span className="text-violet-400">
                  Performance
                </span>
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-500 sm:text-[15px] sm:leading-7">
                CareerPilot AI analyzed your interview performance
                across technical knowledge, communication,
                behavioral responses, and speech.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {interview.role && (
                  <MetaPill
                    icon={<BriefcaseBusiness size={12} />}
                    text={interview.role}
                  />
                )}

                {interview.interviewType && (
                  <MetaPill
                    icon={<Target size={12} />}
                    text={interview.interviewType}
                  />
                )}

                {interview.difficulty && (
                  <MetaPill
                    icon={<Activity size={12} />}
                    text={interview.difficulty}
                  />
                )}

                {interview.createdAt && (
                  <MetaPill
                    icon={<CalendarDays size={12} />}
                    text={formatDate(interview.createdAt)}
                  />
                )}
              </div>
            </div>

            {/* SCORE */}

            <div className="flex justify-center lg:justify-end">
              <ScoreOrb
                score={overallScore}
                label={performance.label}
              />
            </div>
          </div>
        </motion.section>

        {/* =====================================================
            AI VERDICT
        ===================================================== */}

        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className={`relative mb-6 overflow-hidden rounded-[1.5rem] border ${performance.border} ${performance.bg} p-5 sm:p-6`}
        >
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-violet-500/[0.05] blur-3xl" />

          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-black/20 text-violet-300">
              <Zap size={19} />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                  CareerPilot AI Verdict
                </span>

                <span
                  className={`rounded-full border ${performance.border} ${performance.bg} px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider ${performance.color}`}
                >
                  {performance.label}
                </span>
              </div>

              <p className="mt-2.5 max-w-4xl text-sm leading-6 text-gray-300 sm:leading-7">
                {performance.description}
              </p>
            </div>
          </div>
        </motion.section>

        {/* =====================================================
            PERFORMANCE MATRIX
        ===================================================== */}

        <section className="mb-6">
          <SectionTitle
            eyebrow="Performance Matrix"
            title="How you performed"
            description="Your interview broken down into four key dimensions."
          />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              icon={<Brain size={18} />}
              title="Technical"
              score={interview.technicalScore}
              description="Knowledge & problem solving"
              delay={0}
            />

            <MetricCard
              icon={<MessageCircle size={18} />}
              title="Communication"
              score={interview.communicationScore}
              description="Clarity & explanation"
              delay={0.05}
            />

            <MetricCard
              icon={<TrendingUp size={18} />}
              title="Behavioral"
              score={interview.behavioralScore}
              description="Situational responses"
              delay={0.1}
            />

            <MetricCard
              icon={<Mic size={18} />}
              title="Speech"
              score={interview.speechScore}
              description="Delivery & speaking"
              delay={0.15}
            />
          </div>
        </section>

        {/* =====================================================
            AI SUMMARY + QUICK STATS
        ===================================================== */}

        <div className="mb-6 grid gap-5 lg:grid-cols-[minmax(0,1.65fr)_minmax(280px,0.7fr)]">
          {/* SUMMARY */}

          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="min-w-0 rounded-[1.5rem] border border-white/[0.08] bg-white/[0.025] p-5 backdrop-blur-xl sm:p-6"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-500/15 bg-cyan-500/10 text-cyan-300">
                <Brain size={18} />
              </div>

              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
                  AI Analysis
                </p>

                <h2 className="mt-1 text-base font-semibold text-white">
                  Executive Summary
                </h2>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-xl border border-white/[0.06] bg-black/20 p-4 sm:p-5">
              <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-violet-500 via-cyan-400 to-transparent" />

              <p className="text-sm leading-7 text-gray-400">
                {interview.summary ||
                  "No AI summary is available for this interview."}
              </p>
            </div>
          </motion.section>

          {/* QUICK STATS */}

          <QuickStats
            interview={interview}
            overallScore={overallScore}
          />
        </div>

        {/* =====================================================
            STRENGTHS + IMPROVEMENTS
        ===================================================== */}

        <div className="mb-6 grid gap-5 lg:grid-cols-2">
          <InsightPanel
            type="strength"
            title="Strength Signals"
            subtitle="What stood out positively"
            icon={<ShieldCheck size={19} />}
            items={interview.strengths}
          />

          <InsightPanel
            type="weakness"
            title="Growth Signals"
            subtitle="Where your next improvement should focus"
            icon={<Target size={19} />}
            items={interview.weaknesses}
          />
        </div>

        {/* =====================================================
            RECOMMENDATIONS
        ===================================================== */}

        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative mb-7 overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-white/[0.025] backdrop-blur-xl sm:rounded-[1.75rem]"
        >
          <div className="absolute right-[-100px] top-[-100px] h-64 w-64 rounded-full bg-amber-500/[0.05] blur-3xl" />

          <div className="relative border-b border-white/[0.06] p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-500/15 bg-amber-500/10 text-amber-300">
                <Lightbulb size={18} />
              </div>

              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-amber-300">
                  AI Action Plan
                </p>

                <h2 className="mt-1 text-base font-semibold text-white sm:text-lg">
                  What you should work on next
                </h2>
              </div>
            </div>
          </div>

          <div className="relative grid gap-3 p-5 sm:grid-cols-2 sm:p-6">
            {(interview.recommendations || []).length > 0 ? (
              interview.recommendations.map(
                (recommendation, index) => (
                  <Recommendation
                    key={index}
                    number={index + 1}
                    text={recommendation}
                  />
                )
              )
            ) : (
              <p className="text-sm text-gray-600">
                No recommendations available.
              </p>
            )}
          </div>
        </motion.section>

        {/* =====================================================
            FINAL CTA
        ===================================================== */}

        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="relative mb-6 overflow-hidden rounded-[1.5rem] border border-violet-500/15 bg-gradient-to-br from-violet-600/[0.10] via-white/[0.025] to-cyan-500/[0.04] p-5 sm:rounded-[1.75rem] sm:p-7"
        >
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-500/[0.08] blur-3xl" />

          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0">
              <div className="mb-2 flex items-center gap-2 text-violet-300">
                <Sparkles size={14} />

                <span className="text-[9px] font-semibold uppercase tracking-[0.2em]">
                  Keep building
                </span>
              </div>

              <h2 className="text-xl font-semibold text-white sm:text-2xl">
                Turn this feedback into progress.
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
                Practice another interview and see how your
                performance changes over time.
              </p>
            </div>

            <div className="flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row">
              <button
                type="button"
                onClick={() => navigate("/interview")}
                className="group inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-900/20 transition hover:bg-violet-500 sm:w-auto"
              >
                <RotateCcw size={16} />

                Practice Again

                <ChevronRight
                  size={16}
                  className="transition group-hover:translate-x-1"
                />
              </button>

              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-gray-300 transition hover:bg-white/[0.08] hover:text-white sm:w-auto"
              >
                <LayoutDashboard size={16} />

                Dashboard
              </button>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}

/* ============================================================
   SCORE ORB
============================================================ */

function ScoreOrb({ score, label }) {
  const radius = 68;
  const circumference = 2 * Math.PI * radius;

  const safeScore = Math.min(
    100,
    Math.max(0, Number(score || 0))
  );

  const progress =
    circumference -
    (safeScore / 100) * circumference;

  return (
    <div className="relative flex h-[210px] w-[210px] items-center justify-center sm:h-[225px] sm:w-[225px]">
      <div className="absolute inset-8 rounded-full bg-violet-600/10 blur-3xl" />

      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        className="relative -rotate-90"
      >
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.055)"
          strokeWidth="8"
        />

        <motion.circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="url(#scoreGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{
            strokeDashoffset: circumference,
          }}
          animate={{
            strokeDashoffset: progress,
          }}
          transition={{
            duration: 1.5,
            ease: "easeOut",
          }}
        />

        <defs>
          <linearGradient
            id="scoreGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop
              offset="0%"
              stopColor="#8b5cf6"
            />

            <stop
              offset="100%"
              stopColor="#22d3ee"
            />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-600">
          Overall
        </span>

        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.5,
            duration: 0.5,
          }}
          className="mt-1 text-4xl font-bold tracking-tight text-white sm:text-5xl"
        >
          {safeScore}
        </motion.p>

        <span className="mt-1 text-[11px] text-gray-600">
          / 100
        </span>

        <span className="mt-2.5 rounded-full border border-violet-500/20 bg-violet-500/10 px-2.5 py-1 text-[8px] font-bold uppercase tracking-wider text-violet-300">
          {label}
        </span>
      </div>
    </div>
  );
}

/* ============================================================
   METRIC CARD
============================================================ */

function MetricCard({
  icon,
  title,
  score,
  description,
  delay,
}) {
  const safeScore = Math.min(
    100,
    Math.max(0, Number(score || 0))
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -3 }}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4.5 backdrop-blur-xl transition hover:border-violet-500/20 sm:p-5"
    >
      <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-violet-500/[0.06] blur-2xl transition group-hover:bg-violet-500/[0.10]" />

      <div className="relative">
        <div className="flex items-center justify-between">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-500/15 bg-violet-500/10 text-violet-300">
            {icon}
          </div>

          <CircleDot
            size={13}
            className="text-gray-700"
          />
        </div>

        <p className="mt-4 text-sm font-medium text-gray-400">
          {title}
        </p>

        <div className="mt-1.5 flex items-baseline gap-1">
          <span className="text-3xl font-semibold text-white">
            {safeScore}
          </span>

          <span className="text-xs text-gray-600">
            /100
          </span>
        </div>

        <p className="mt-1 text-[10px] leading-4 text-gray-600">
          {description}
        </p>

        <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/[0.05]">
          <motion.div
            initial={{ width: 0 }}
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

/* ============================================================
   QUICK STATS
============================================================ */

function QuickStats({
  interview,
  overallScore,
}) {
  const strengths =
    interview.strengths?.length || 0;

  const weaknesses =
    interview.weaknesses?.length || 0;

  const recommendations =
    interview.recommendations?.length || 0;

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.18 }}
      className="grid grid-cols-2 gap-3"
    >
      <StatBox
        icon={<Award size={16} />}
        value={strengths}
        label="Strengths"
      />

      <StatBox
        icon={<Target size={16} />}
        value={weaknesses}
        label="Growth Areas"
      />

      <StatBox
        icon={<Lightbulb size={16} />}
        value={recommendations}
        label="Next Steps"
      />

      <StatBox
        icon={<Activity size={16} />}
        value={overallScore}
        label="Overall Score"
      />
    </motion.section>
  );
}

/* ============================================================
   STAT BOX
============================================================ */

function StatBox({
  icon,
  value,
  label,
}) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 backdrop-blur-xl sm:p-5">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.04] text-violet-300">
        {icon}
      </div>

      <p className="mt-3 text-2xl font-semibold text-white">
        {value}
      </p>

      <p className="mt-1 text-[9px] uppercase tracking-wider text-gray-600">
        {label}
      </p>
    </div>
  );
}

/* ============================================================
   INSIGHT PANEL
============================================================ */

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
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="relative overflow-hidden rounded-[1.5rem] border border-white/[0.07] bg-white/[0.025] p-5 backdrop-blur-xl sm:p-6"
    >
      <div
        className={`absolute right-[-50px] top-[-50px] h-40 w-40 rounded-full blur-3xl ${
          isStrength
            ? "bg-emerald-500/[0.05]"
            : "bg-orange-500/[0.05]"
        }`}
      />

      <div className="relative">
        <div className="mb-5 flex items-start gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${
              isStrength
                ? "border-emerald-500/15 bg-emerald-500/10 text-emerald-300"
                : "border-orange-500/15 bg-orange-500/10 text-orange-300"
            }`}
          >
            {icon}
          </div>

          <div className="min-w-0">
            <p
              className={`text-[9px] font-semibold uppercase tracking-[0.18em] ${
                isStrength
                  ? "text-emerald-300"
                  : "text-orange-300"
              }`}
            >
              {isStrength
                ? "Positive Signals"
                : "Growth Signals"}
            </p>

            <h2 className="mt-1 text-base font-semibold text-white">
              {title}
            </h2>

            <p className="mt-1 text-xs leading-5 text-gray-600">
              {subtitle}
            </p>
          </div>
        </div>

        <div className="space-y-2.5">
          {(items || []).length > 0 ? (
            items.map((item, index) => (
              <div
                key={index}
                className="group flex gap-3 rounded-xl border border-white/[0.05] bg-black/10 p-3.5 transition hover:border-white/[0.09]"
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

                <p className="min-w-0 text-sm leading-6 text-gray-400">
                  {item}
                </p>
              </div>
            ))
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

/* ============================================================
   RECOMMENDATION
============================================================ */

function Recommendation({
  number,
  text,
}) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="group flex min-w-0 gap-3 rounded-2xl border border-white/[0.06] bg-black/10 p-4 transition hover:border-violet-500/20 hover:bg-white/[0.02] sm:gap-4 sm:p-5"
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-amber-500/15 bg-amber-500/10 text-[10px] font-bold text-amber-300 sm:h-9 sm:w-9 sm:text-xs">
        {String(number).padStart(2, "0")}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm leading-6 text-gray-400">
          {text}
        </p>
      </div>

      <ChevronRight
        size={15}
        className="mt-1 shrink-0 text-gray-700 transition group-hover:translate-x-1 group-hover:text-violet-300"
      />
    </motion.div>
  );
}

/* ============================================================
   META PILL
============================================================ */

function MetaPill({
  icon,
  text,
}) {
  return (
    <div className="inline-flex max-w-full items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-2.5 py-1.5 text-[10px] capitalize text-gray-500 sm:px-3 sm:py-2 sm:text-xs">
      <span className="shrink-0 text-gray-600">
        {icon}
      </span>

      <span className="truncate">{text}</span>
    </div>
  );
}

/* ============================================================
   SECTION TITLE
============================================================ */

function SectionTitle({
  eyebrow,
  title,
  description,
}) {
  return (
    <div className="mb-4">
      <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-violet-300">
        {eyebrow}
      </p>

      <h2 className="mt-1 text-xl font-semibold text-white">
        {title}
      </h2>

      <p className="mt-1 max-w-xl text-xs leading-5 text-gray-600">
        {description}
      </p>
    </div>
  );
}

/* ============================================================
   DATE FORMATTER
============================================================ */

function formatDate(date) {
  try {
    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  } catch {
    return "";
  }
}