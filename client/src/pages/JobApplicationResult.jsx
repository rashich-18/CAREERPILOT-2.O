import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Award,
  BriefcaseBusiness,
  Building2,
  Check,
  CheckCircle2,
  Copy,
  FileText,
  Lightbulb,
  Loader2,
  MessageSquare,
  Send,
  Sparkles,
  Target,
  TrendingUp,
  AlertTriangle,
  ChevronRight,
  RotateCcw,
  LayoutDashboard,
  ShieldCheck,
  Zap,
  CalendarDays,
  CircleDot,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { getJobApplicationById } from "../api/jobApplicationApi";

export default function JobApplicationResult() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplication();
  }, [id]);

  const fetchApplication = async () => {
    try {
      setLoading(true);

      const response = await getJobApplicationById(id);

      if (response.data.success) {
        setApplication(response.data.application);
      }
    } catch (error) {
      console.error(
        "GET JOB APPLICATION RESULT ERROR:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to load application."
      );

      navigate("/job-application");
    } finally {
      setLoading(false);
    }
  };

  const copyText = async (text, message) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(message);
    } catch {
      toast.error("Failed to copy.");
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (!application) {
    return <NotFoundScreen />;
  }

  const readiness = Math.min(
    100,
    Math.max(
      0,
      Number(application.applicationReadiness || 0)
    )
  );

  const performance = getReadinessStatus(readiness);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05060D] px-4 py-6 text-white sm:px-6 lg:px-8">

      {/* =====================================================
          AMBIENT BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-violet-600/[0.08] blur-[130px]" />

        <div className="absolute right-[-180px] top-[20%] h-[500px] w-[500px] rounded-full bg-cyan-500/[0.045] blur-[130px]" />

        <div className="absolute bottom-[-250px] left-[30%] h-[550px] w-[550px] rounded-full bg-violet-500/[0.04] blur-[140px]" />

      </div>

      <div className="relative mx-auto max-w-7xl">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <button
            onClick={() =>
              navigate("/job-application")
            }
            className="group flex w-fit items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-2.5 text-sm text-gray-400 backdrop-blur-xl transition hover:border-violet-500/30 hover:bg-white/[0.05] hover:text-white"
          >
            <ArrowLeft
              size={16}
              className="transition group-hover:-translate-x-1"
            />

            Back to Job Applications
          </button>

          <div className="flex items-center gap-3">

            <div className="hidden h-10 w-10 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10 text-violet-300 sm:flex">
              <Sparkles size={18} />
            </div>

            <div className="text-left sm:text-right">

              <p className="text-sm font-semibold text-white">
                {application.company || "Company"}
              </p>

              <p className="mt-1 text-xs text-gray-600">
                AI Application Analysis
              </p>

            </div>

          </div>

        </header>

        {/* =====================================================
            HERO
        ===================================================== */}

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-6 overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.025] backdrop-blur-2xl"
        >

          {/* subtle grid */}

          <div
            className="pointer-events-none absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
              backgroundSize: "45px 45px",
            }}
          />

          {/* glow */}

          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-violet-600/[0.08] blur-3xl" />

          <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_350px] lg:p-10">

            {/* LEFT */}

            <div className="flex flex-col justify-center">

              <div className="mb-5 flex items-center gap-2">

                <span className="flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-300">

                  <Sparkles size={12} />

                  AI Analysis Complete

                </span>

              </div>

              <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">

                Your Application
                <span className="text-violet-400">
                  {" "}Readiness
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">

                CareerPilot AI compared your resume with
                the requirements of this specific role to
                determine how ready you are to apply.

              </p>

              {/* META */}

              <div className="mt-7 flex flex-wrap gap-2">

                {application.role && (
                  <MetaPill
                    icon={
                      <BriefcaseBusiness size={12} />
                    }
                    text={application.role}
                  />
                )}

                {application.company && (
                  <MetaPill
                    icon={<Building2 size={12} />}
                    text={application.company}
                  />
                )}

                {application.createdAt && (
                  <MetaPill
                    icon={<CalendarDays size={12} />}
                    text={formatDate(
                      application.createdAt
                    )}
                  />
                )}

              </div>

            </div>

            {/* SCORE */}

            <div className="flex items-center justify-center">

              <ReadinessOrb
                score={readiness}
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
          className={`relative mb-7 overflow-hidden rounded-[1.75rem] border ${performance.border} ${performance.bg} p-6 sm:p-7`}
        >

          <div className="absolute right-[-50px] top-[-50px] h-44 w-44 rounded-full bg-violet-500/[0.05] blur-3xl" />

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
                {getVerdict(
                  readiness,
                  application.recommendation
                )}
              </p>

            </div>

          </div>

        </motion.section>

        {/* =====================================================
            MATCH MATRIX
        ===================================================== */}

        <section className="mb-7">

          <SectionTitle
            eyebrow="Match Analysis"
            title="How your profile aligns"
            description="CareerPilot compared your background with the requirements of this role."
          />

          <div className="grid gap-4 lg:grid-cols-3">

            <MatchCard
              type="success"
              icon={<CheckCircle2 size={18} />}
              title="Relevant Skills"
              subtitle="Skills already supporting your application"
              items={application.relevantSkills}
              empty="No specific skills identified."
            />

            <MatchCard
              type="normal"
              icon={<BriefcaseBusiness size={18} />}
              title="Relevant Experience"
              subtitle="Experience that supports this role"
              items={application.relevantExperience}
              empty="No specific experience identified."
            />

            <MatchCard
              type="warning"
              icon={<AlertTriangle size={18} />}
              title="Skills to Develop"
              subtitle="Requirements that may need attention"
              items={application.missingRequirements}
              empty="No major gaps identified."
            />

          </div>

        </section>

        {/* =====================================================
            QUICK INSIGHT + RECOMMENDATION
        ===================================================== */}

        <div className="mb-7 grid gap-5 lg:grid-cols-[0.7fr_1.3fr]">

          {/* QUICK STATS */}

          <QuickStats
            application={application}
            readiness={readiness}
          />

          {/* RECOMMENDATION */}

          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="relative overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-white/[0.025] p-6 backdrop-blur-xl sm:p-7"
          >

            <div className="absolute right-[-60px] top-[-60px] h-44 w-44 rounded-full bg-amber-500/[0.05] blur-3xl" />

            <div className="relative">

              <div className="mb-6 flex items-center gap-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-amber-500/15 bg-amber-500/10 text-amber-300">
                  <Lightbulb size={19} />
                </div>

                <div>

                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-300">
                    AI Recommendation
                  </p>

                  <h2 className="mt-1 font-semibold text-white">
                    What should you do?
                  </h2>

                </div>

              </div>

              <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-black/20 p-5 sm:p-6">

                <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-amber-400 via-violet-500 to-transparent" />

                <p className="text-sm leading-7 text-gray-400">
                  {application.recommendation ||
                    "No recommendation is available for this application."}
                </p>

              </div>

            </div>

          </motion.section>

        </div>

        {/* =====================================================
    AI COVER LETTER
===================================================== */}

<motion.section
  initial={{ opacity: 0, y: 15 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.24 }}
  className="relative mb-5 overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.025] backdrop-blur-xl"
>
  {/* Ambient glow */}

  <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-violet-600/[0.06] blur-3xl" />

  <div className="relative">

    {/* HEADER */}

    <div className="flex flex-col gap-5 border-b border-white/[0.06] p-6 sm:p-7 lg:flex-row lg:items-center lg:justify-between">

      <div className="flex items-start gap-4">

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-violet-500/15 bg-violet-500/10 text-violet-300">
          <FileText size={19} />
        </div>

        <div>

          <div className="flex flex-wrap items-center gap-2">

            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-300">
              AI Generated
            </p>

            <span className="rounded-full border border-violet-500/15 bg-violet-500/10 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-violet-300">
              Personalized
            </span>

          </div>

          <h2 className="mt-1.5 text-lg font-semibold text-white">
            Your Cover Letter
          </h2>

          <p className="mt-1 text-xs text-gray-600">
            Tailored to your resume and this specific opportunity.
          </p>

        </div>

      </div>

      <CopyButton
        onClick={() =>
          copyText(
            application.coverLetter || "",
            "Cover letter copied!"
          )
        }
      />

    </div>


    {/* DOCUMENT */}

    <div className="p-5 sm:p-7">

      <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#090B13]">

        {/* top document bar */}

        <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3">

          <div className="flex items-center gap-2">

            <div className="h-2 w-2 rounded-full bg-violet-400/70" />

            <span className="text-[10px] font-medium uppercase tracking-wider text-gray-600">
              Application Letter
            </span>

          </div>

          <span className="text-[10px] text-gray-700">
            {application.company}
          </span>

        </div>


        {/* LETTER */}

        <div className="relative p-6 sm:p-8 lg:p-10">

          {/* accent line */}

          <div className="absolute bottom-8 left-0 top-8 w-[2px] rounded-full bg-gradient-to-b from-violet-500 via-cyan-400 to-transparent" />

          <div className="pl-4 sm:pl-5">

            {/* letter metadata */}

            <div className="mb-7">

              <p className="text-xs font-medium text-gray-500">
                Application for
              </p>

              <p className="mt-1 text-base font-semibold text-white">
                {application.role}
              </p>

              <p className="mt-1 text-xs text-gray-600">
                {application.company}
              </p>

            </div>


            {/* letter content */}

            <p className="whitespace-pre-line text-sm leading-8 text-gray-400">
              {application.coverLetter ||
                "No cover letter generated."}
            </p>


            {/* footer */}

            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-5">

              <div className="flex items-center gap-2">

                <Sparkles
                  size={13}
                  className="text-violet-400"
                />

                <span className="text-[10px] text-gray-600">
                  Generated with CareerPilot AI
                </span>

              </div>

              <span className="text-[10px] text-gray-700">
                {application.coverLetter
                  ? `${application.coverLetter.trim().split(/\s+/).length} words`
                  : "0 words"}
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>

</motion.section>

        {/* =====================================================
            APPLICATION MESSAGE
        ===================================================== */}

        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="relative mb-3 overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.025] backdrop-blur-xl"
        >

          <div className="relative border-b border-white/[0.06] px-6 py-5 sm:px-7 sm:py-8">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-center gap-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-500/15 bg-cyan-500/10 text-cyan-300">
                  <MessageSquare size={19} />
                </div>

                <div>

                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
                    Ready to Send
                  </p>

                  <h2 className="mt-1 font-semibold text-white">
                    Application Message
                  </h2>

                  <p className="mt-1 text-xs text-gray-600">
                    For LinkedIn, email or job portals
                  </p>

                </div>

              </div>

              <CopyButton
                onClick={() =>
                  copyText(
                    application.applicationMessage ||
                      "",
                    "Application message copied!"
                  )
                }
              />

            </div>

          </div>

          <div className="relative px-6 py-5 sm:px-7 sm:py-8">

            <div className="rounded-2xl border border-white/[0.06] bg-black/20 p-6">

              <p className="whitespace-pre-line text-sm leading-7 text-gray-400">
                {application.applicationMessage ||
                  "No application message generated."}
              </p>

            </div>

          </div>

        </motion.section>

        {/* =====================================================
            FINAL CTA
        ===================================================== */}

        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative mb-10 overflow-hidden rounded-[2rem] border border-violet-500/15 bg-gradient-to-br from-violet-600/[0.10] via-white/[0.025] to-cyan-500/[0.04] p-7 sm:p-9"
        >

          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-500/[0.08] blur-3xl" />

          <div className="relative flex flex-col gap-7 md:flex-row md:items-center md:justify-between">

            <div>

              <div className="mb-3 flex items-center gap-2 text-violet-300">

                <Sparkles size={15} />

                <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">
                  Next Step
                </span>

              </div>

              <h2 className="text-2xl font-semibold text-white">
                Ready for your next application?
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
                Use CareerPilot to tailor another application
                for your next opportunity.
              </p>

            </div>

            <div className="flex flex-col gap-3 sm:flex-row">

              <button
                onClick={() =>
                  navigate("/job-application")
                }
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-900/20 transition hover:bg-violet-500"
              >

                <RotateCcw size={16} />

                New Application

                <ChevronRight
                  size={16}
                  className="transition group-hover:translate-x-1"
                />

              </button>

              <button
                onClick={() =>
                  navigate("/dashboard")
                }
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
   READINESS STATUS
============================================================ */

function getReadinessStatus(score) {
  if (score >= 80) {
    return {
      label: "Strong Match",
      color: "text-emerald-300",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
    };
  }

  if (score >= 60) {
    return {
      label: "Good Potential",
      color: "text-violet-300",
      bg: "bg-violet-500/10",
      border: "border-violet-500/20",
    };
  }

  if (score >= 40) {
    return {
      label: "Partial Match",
      color: "text-amber-300",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
    };
  }

  return {
    label: "Needs Improvement",
    color: "text-red-300",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
  };
}


/* ============================================================
   VERDICT
============================================================ */

function getVerdict(score, recommendation) {
  if (recommendation) {
    return recommendation;
  }

  if (score >= 80) {
    return "You are a strong match for this position. Your resume demonstrates the core skills and experience needed for the role. This is a good opportunity to apply.";
  }

  if (score >= 60) {
    return "You have a solid foundation for this position. You meet many of the important requirements, although strengthening a few areas could improve your chances.";
  }

  if (score >= 40) {
    return "You partially match this opportunity. Consider improving the identified skill gaps before prioritizing this application.";
  }

  return "Your current profile has several gaps compared with this role. Focus on the identified areas and consider similar positions with requirements closer to your current experience.";
}


/* ============================================================
   READINESS ORB
============================================================ */

function ReadinessOrb({ score, label }) {
  const radius = 76;
  const circumference = 2 * Math.PI * radius;

  const progress =
    circumference -
    (score / 100) * circumference;

  return (
    <div className="relative flex h-[250px] w-[250px] items-center justify-center">

      <div className="absolute inset-5 rounded-full bg-violet-600/10 blur-3xl" />

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
          stroke="url(#applicationScoreGradient)"
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
            id="applicationScoreGradient"
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

        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-600">
          Readiness
        </span>

        <motion.p
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            delay: 0.5,
            duration: 0.5,
          }}
          className="mt-1 text-5xl font-bold tracking-tight text-white"
        >
          {score}
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
   MATCH CARD
============================================================ */

function MatchCard({
  type,
  icon,
  title,
  subtitle,
  items,
  empty,
}) {
  const styles = {
    success: {
      icon: "border-emerald-500/15 bg-emerald-500/10 text-emerald-300",
      glow: "bg-emerald-500/[0.05]",
      number: "bg-emerald-500/10 text-emerald-300",
    },

    normal: {
      icon: "border-violet-500/15 bg-violet-500/10 text-violet-300",
      glow: "bg-violet-500/[0.05]",
      number: "bg-violet-500/10 text-violet-300",
    },

    warning: {
      icon: "border-amber-500/15 bg-amber-500/10 text-amber-300",
      glow: "bg-amber-500/[0.05]",
      number: "bg-amber-500/10 text-amber-300",
    },
  };

  const style = styles[type];

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
      whileHover={{
        y: -3,
      }}
      className="relative overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-white/[0.025] p-6 backdrop-blur-xl"
    >

      <div
        className={`absolute -right-12 -top-12 h-36 w-36 rounded-full blur-3xl ${style.glow}`}
      />

      <div className="relative">

        <div className="flex items-start justify-between">

          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl border ${style.icon}`}
          >
            {icon}
          </div>

          <CircleDot
            size={14}
            className="text-gray-700"
          />

        </div>

        <h3 className="mt-5 text-sm font-semibold text-white">
          {title}
        </h3>

        <p className="mt-1 text-xs leading-5 text-gray-600">
          {subtitle}
        </p>

        <div className="mt-5 space-y-2.5">

          {items?.length > 0 ? (
            items.slice(0, 5).map((item, index) => (
              <div
                key={index}
                className="flex gap-3 rounded-xl border border-white/[0.05] bg-black/10 p-3"
              >

                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[9px] font-bold ${style.number}`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p className="text-xs leading-5 text-gray-400">
                  {item}
                </p>

              </div>
            ))
          ) : (
            <p className="py-2 text-xs leading-5 text-gray-600">
              {empty}
            </p>
          )}

        </div>

      </div>

    </motion.div>
  );
}


/* ============================================================
   QUICK STATS
============================================================ */

function QuickStats({
  application,
  readiness,
}) {
  const skills =
    application.relevantSkills?.length || 0;

  const experience =
    application.relevantExperience?.length || 0;

  const gaps =
    application.missingRequirements?.length || 0;

  return (
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
      className="grid grid-cols-2 gap-3"
    >

      <StatBox
        icon={<CheckCircle2 size={16} />}
        value={skills}
        label="Matched Skills"
      />

      <StatBox
        icon={<BriefcaseBusiness size={16} />}
        value={experience}
        label="Relevant Experience"
      />

      <StatBox
        icon={<Target size={16} />}
        value={gaps}
        label="Skill Gaps"
      />

      <StatBox
        icon={<Award size={16} />}
        value={readiness}
        label="Readiness"
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
    <motion.div
      whileHover={{
        y: -2,
      }}
      className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 backdrop-blur-xl"
    >

      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.04] text-violet-300">
        {icon}
      </div>

      <p className="mt-4 text-2xl font-semibold text-white">
        {value}
      </p>

      <p className="mt-1 text-[10px] uppercase tracking-wider text-gray-600">
        {label}
      </p>

    </motion.div>
  );
}


/* ============================================================
   COPY BUTTON
============================================================ */

function CopyButton({ onClick }) {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    await onClick();

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-medium text-gray-400 transition hover:border-violet-500/30 hover:bg-violet-500/5 hover:text-violet-300"
    >

      {copied ? (
        <>
          <Check size={14} />
          Copied
        </>
      ) : (
        <>
          <Copy size={14} />
          Copy
        </>
      )}

    </button>
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
   LOADING
============================================================ */

function LoadingScreen() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#05060D]">

      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-gray-400 backdrop-blur-xl">

        <Loader2
          size={18}
          className="animate-spin text-violet-400"
        />

        Preparing your AI application analysis...

      </div>

    </main>
  );
}


/* ============================================================
   NOT FOUND
============================================================ */

function NotFoundScreen() {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#05060D] px-4">

      <div className="text-center">

        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10 text-violet-300">
          <FileText size={22} />
        </div>

        <h1 className="mt-5 text-xl font-semibold text-white">
          Application not found
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          This application may have been deleted or
          is no longer available.
        </p>

        <button
          onClick={() =>
            navigate("/job-application")
          }
          className="mt-6 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500"
        >
          Back to Job Applications
        </button>

      </div>

    </main>
  );
}


/* ============================================================
   DATE
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