import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Award,
  Brain,
  MessageCircle,
  Mic,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
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

  const overallScore = Number(
    interview?.overallScore || 0
  );

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
      <main className="flex min-h-screen items-center justify-center bg-[#05060D]">
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
    <main className="relative min-h-screen overflow-hidden bg-[#05060D] px-4 py-6 text-white sm:px-6 lg:px-8">

      {/* =====================================================
          AMBIENT BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-violet-600/[0.08] blur-[120px]" />

        <div className="absolute right-[-150px] top-[25%] h-[450px] w-[450px] rounded-full bg-cyan-500/[0.045] blur-[120px]" />

        <div className="absolute bottom-[-200px] left-[35%] h-[500px] w-[500px] rounded-full bg-violet-500/[0.04] blur-[130px]" />

      </div>

      <div className="relative mx-auto max-w-7xl">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <button
            onClick={() => navigate("/interview")}
            className="group flex w-fit items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-2.5 text-sm text-gray-400 backdrop-blur-xl transition hover:border-violet-500/30 hover:bg-white/[0.05] hover:text-white"
          >
            <ArrowLeft
              size={16}
              className="transition group-hover:-translate-x-1"
            />

            Back to AI Interview
          </button>

          <div className="flex items-center gap-3">

            <div className="hidden h-10 w-10 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10 text-violet-300 sm:flex">
              <Sparkles size={18} />
            </div>

            <div className="text-left sm:text-right">

              <p className="text-sm font-semibold text-white">
                {interview.role}
              </p>

              <div className="mt-1 flex items-center gap-2 text-xs text-gray-600 sm:justify-end">

                {interview.company && (
                  <>
                    <BriefcaseBusiness size={12} />
                    <span>{interview.company}</span>
                  </>
                )}

              </div>

            </div>

          </div>

        </header>

        {/* =====================================================
            HERO ASSESSMENT CARD
        ===================================================== */}

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
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

          {/* glowing orb */}

          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-violet-600/[0.08] blur-3xl" />

          <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_350px] lg:p-10">

            {/* LEFT */}

            <div className="flex flex-col justify-center">

              <div className="mb-5 flex items-center gap-2">

                <span className="flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-300">

                  <Sparkles size={12} />

                  AI Assessment Complete

                </span>

              </div>

              <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">

                Interview
                <span className="text-violet-400">
                  {" "}Performance
                </span>

              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">

                CareerPilot AI analyzed your interview performance
                across technical knowledge, communication,
                behavioral responses, and speech.

              </p>

              {/* META */}

              <div className="mt-7 flex flex-wrap gap-2">

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
                    text={formatDate(
                      interview.createdAt
                    )}
                  />
                )}

              </div>

            </div>

            {/* SCORE ORB */}

            <div className="flex items-center justify-center">

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
          className={`relative mb-6 overflow-hidden rounded-[1.75rem] border ${performance.border} ${performance.bg} p-6 sm:p-7`}
        >

          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-violet-500/[0.05] blur-3xl" />

          <div className="relative flex flex-col gap-5 sm:flex-row">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/[0.08] bg-black/20 text-violet-300">
              <Zap size={20} />
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

        {/* =====================================================
            PERFORMANCE MATRIX
        ===================================================== */}

        <section className="mb-7">

          <SectionTitle
            eyebrow="Performance Matrix"
            title="How you performed"
            description="Your interview broken down into four key dimensions."
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

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

        <div className="mb-7 grid gap-5 lg:grid-cols-[1.5fr_0.5fr]">

          {/* SUMMARY */}

          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
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
                  Executive Summary
                </h2>

              </div>

            </div>

            <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-black/20 p-5 sm:p-6">

              <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-violet-500 via-cyan-400 to-transparent" />

              <p className="text-sm leading-8 text-gray-400">
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

        <div className="mb-7 grid gap-5 lg:grid-cols-2">

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
          className="relative mb-8 overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.025] backdrop-blur-xl"
        >

          <div className="absolute right-[-100px] top-[-100px] h-64 w-64 rounded-full bg-amber-500/[0.05] blur-3xl" />

          <div className="relative border-b border-white/[0.06] p-6 sm:p-8">

            <div className="flex items-center gap-4">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-amber-500/15 bg-amber-500/10 text-amber-300">
                <Lightbulb size={19} />
              </div>

              <div>

                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-300">
                  AI Action Plan
                </p>

                <h2 className="mt-1 font-semibold text-white">
                  What you should work on next
                </h2>

              </div>

            </div>

          </div>

          <div className="relative grid gap-3 p-6 sm:grid-cols-2 sm:p-8">

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
          className="relative mb-10 overflow-hidden rounded-[2rem] border border-violet-500/15 bg-gradient-to-br from-violet-600/[0.10] via-white/[0.025] to-cyan-500/[0.04] p-7 sm:p-9"
        >

          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-500/[0.08] blur-3xl" />

          <div className="relative flex flex-col gap-7 md:flex-row md:items-center md:justify-between">

            <div>

              <div className="mb-3 flex items-center gap-2 text-violet-300">

                <Sparkles size={15} />

                <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">
                  Keep building
                </span>

              </div>

              <h2 className="text-2xl font-semibold text-white">
                Turn this feedback into progress.
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
                Practice another interview and see how your
                performance changes over time.
              </p>

            </div>

            <div className="flex flex-col gap-3 sm:flex-row">

              <button
                onClick={() => navigate("/interview")}
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-900/20 transition hover:bg-violet-500"
              >

                <RotateCcw size={16} />

                Practice Again

                <ChevronRight
                  size={16}
                  className="transition group-hover:translate-x-1"
                />

              </button>

              <button
                onClick={() => navigate("/dashboard")}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3.5 text-sm font-semibold text-gray-300 transition hover:bg-white/[0.08] hover:text-white"
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
  const radius = 76;
  const circumference = 2 * Math.PI * radius;

  const safeScore = Math.min(
    100,
    Math.max(0, Number(score || 0))
  );

  const progress =
    circumference -
    (safeScore / 100) * circumference;

  return (
    <div className="relative flex h-[250px] w-[250px] items-center justify-center">

      {/* outer glow */}

      <div className="absolute inset-5 rounded-full bg-violet-600/10 blur-3xl" />

      {/* ring */}

      <svg
        width="220"
        height="220"
        viewBox="0 0 220 220"
        className="relative -rotate-90"
      >

        <circle
          cx="110"
          cy="110"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.055)"
          strokeWidth="8"
        />

        <motion.circle
          cx="110"
          cy="110"
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

      {/* center */}

      <div className="absolute inset-0 flex flex-col items-center justify-center">

        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-600">
          Overall
        </span>

        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.5,
            duration: 0.5,
          }}
          className="mt-1 text-5xl font-bold tracking-tight text-white"
        >
          {safeScore}
        </motion.p>

        <span className="mt-1 text-xs text-gray-600">
          / 100
        </span>

        <span className="mt-3 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-violet-300">
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
      className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 backdrop-blur-xl transition hover:border-violet-500/20"
    >

      {/* glow */}

      <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-violet-500/[0.06] blur-2xl transition group-hover:bg-violet-500/[0.10]" />

      <div className="relative">

        <div className="flex items-center justify-between">

          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-500/15 bg-violet-500/10 text-violet-300">
            {icon}
          </div>

          <CircleDot
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
      className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-2"
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
      className="relative overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-white/[0.025] p-6 backdrop-blur-xl sm:p-7"
    >

      <div
        className={`absolute right-[-50px] top-[-50px] h-40 w-40 rounded-full blur-3xl ${
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
            items.map((item, index) => (
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
                  0{index + 1}
                </div>

                <p className="text-sm leading-6 text-gray-400">
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
      className="group flex gap-4 rounded-2xl border border-white/[0.06] bg-black/10 p-5 transition hover:border-violet-500/20 hover:bg-white/[0.02]"
    >

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-amber-500/15 bg-amber-500/10 text-xs font-bold text-amber-300">
        {String(number).padStart(2, "0")}
      </div>

      <div className="flex-1">

        <p className="text-sm leading-6 text-gray-400">
          {text}
        </p>

      </div>

      <ChevronRight
        size={16}
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
    <div className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-xs capitalize text-gray-500">

      <span className="text-gray-600">
        {icon}
      </span>

      {text}

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
    <div className="mb-5">

      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-300">
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