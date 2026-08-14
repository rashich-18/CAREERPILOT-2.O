import {
  FileText,
  Target,
  Map,
  Mic2,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

export default function CareerSnapshot({ data, loading }) {
  // =========================================================
  // CURRENT DATA
  // =========================================================

  const resume =
    data?.resumes?.find((item) => item.isCurrent) ||
    data?.resumes?.[0];

  const match = data?.careerMatches?.[0];
  const roadmap = data?.roadmaps?.[0];
  const interviews = data?.interviews || [];

  // =========================================================
  // RESUME SCORE
  // =========================================================

  const resumeScore = Number(
    resume?.score ??
      resume?.analysis?.resumeScore?.overall ??
      0
  );

  // =========================================================
  // CAREER MATCH
  // =========================================================

  const matchScore = Number(
    match?.matchPercentage ??
      match?.matchScore ??
      match?.score ??
      0
  );

  // =========================================================
  // ROADMAP
  // =========================================================

  const roadmapTasks =
    roadmap?.phases?.flatMap(
      (phase) => phase.tasks || []
    ) || [];

  const completed =
    roadmap?.completedMilestones ??
    roadmap?.completedTasks ??
    roadmapTasks.filter(
      (task) => task.completed === true
    ).length;

  const total =
    roadmap?.totalMilestones ??
    roadmap?.totalTasks ??
    roadmapTasks.length;

  const roadmapProgress =
    total > 0
      ? Math.round((completed / total) * 100)
      : Number(roadmap?.progress ?? 0);
     
  // =========================================================
  // INTERVIEW
  // =========================================================

  const interviewCount = interviews.length;

  const latestInterview = interviews[0];

  const interviewScore = Number(
    latestInterview?.overallScore ??
    latestInterview?.score ??
      latestInterview?.percentage ??
      0
  );

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <motion.div
            key={item}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-[190px] animate-pulse rounded-3xl border border-white/[0.08] bg-white/[0.035]"
          >
            <div className="p-5">
              <div className="h-10 w-10 rounded-xl bg-white/10" />

              <div className="mt-6 h-3 w-20 rounded bg-white/10" />

              <div className="mt-3 h-7 w-24 rounded bg-white/10" />

              <div className="mt-5 h-2 w-full rounded bg-white/10" />

              <div className="mt-3 h-2 w-2/3 rounded bg-white/10" />
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  // =========================================================
  // MAIN
  // =========================================================

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {/* =====================================================
          RESUME
      ===================================================== */}

      <SnapshotCard delay={0}>
        <div className="relative flex h-full flex-col overflow-hidden">
          {/* Ambient glow */}

          <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-violet-500/10 blur-3xl transition-all duration-500 group-hover:bg-violet-500/20" />

          <div className="pointer-events-none absolute -bottom-20 left-1/3 h-28 w-28 rounded-full bg-fuchsia-500/[0.04] blur-3xl" />

          <div className="relative z-10 flex h-full flex-col">
            {/* HEADER */}

            <div className="flex items-start justify-between">
              <IconBox
                icon={FileText}
                className="border-violet-400/10 bg-violet-500/10 text-violet-400"
              />

              {resume ? (
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-1 rounded-full border border-emerald-400/10 bg-emerald-400/[0.06] px-2 py-1 text-[10px] font-medium text-emerald-400"
                >
                  <CheckCircle2 size={11} />
                  Analyzed
                </motion.span>
              ) : (
                <span className="text-[10px] font-medium uppercase tracking-[1px] text-gray-600">
                  Step 01
                </span>
              )}
            </div>

            {/* CONTENT */}

            <div className="mt-auto pt-7">
              <p className="text-[11px] font-semibold uppercase tracking-[1.8px] text-gray-500">
                Resume Score
              </p>

              <div className="mt-1 flex items-end gap-2">
                <motion.span
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="text-3xl font-bold tracking-tight text-white"
                >
                  {resumeScore}
                </motion.span>

                <span className="mb-1 text-xs text-gray-600">
                  / 100
                </span>
              </div>

              {/* SCORE BAR */}

              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${Math.min(
                      Math.max(resumeScore, 0),
                      100
                    )}%`,
                  }}
                  transition={{
                    duration: 1,
                    delay: 0.25,
                    ease: "easeOut",
                  }}
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-400 to-cyan-400"
                />
              </div>

              <p className="mt-2 text-[11px] text-gray-500">
                {resume
                  ? "AI analysis completed"
                  : "Upload your resume to begin"}
              </p>
            </div>
          </div>
        </div>
      </SnapshotCard>

      {/* =====================================================
          CAREER MATCH
      ===================================================== */}

      <SnapshotCard delay={0.08}>
        <div className="relative flex h-full flex-col overflow-hidden">
          {/* Cyan glow */}

          <div className="pointer-events-none absolute -right-14 -top-14 h-36 w-36 rounded-full bg-cyan-500/10 blur-3xl transition-all duration-500 group-hover:bg-cyan-500/20" />

          <div className="pointer-events-none absolute bottom-0 left-0 h-24 w-24 rounded-full bg-blue-500/[0.04] blur-3xl" />

          <div className="relative z-10 flex h-full flex-col">
            {/* HEADER */}

            <div className="flex items-start justify-between">
              <IconBox
                icon={Target}
                className="border-cyan-400/10 bg-cyan-500/10 text-cyan-400"
              />

              <motion.div
                whileHover={{
                  x: 2,
                  y: -2,
                }}
              >
                <ArrowUpRight
                  size={17}
                  className="text-gray-700 transition-colors duration-300 group-hover:text-cyan-400"
                />
              </motion.div>
            </div>

            {/* CONTENT */}

            <div className="mt-auto pt-6">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[1.8px] text-gray-500">
                    Career Match
                  </p>

                  <p className="mt-1 text-3xl font-bold tracking-tight text-white">
                    {matchScore}%
                  </p>
                </div>

                <ProgressRing
                  value={matchScore}
                  size={54}
                  strokeWidth={4}
                />
              </div>

              {/* STATUS */}

              <div className="mt-4 flex items-center justify-between">
                <span
                  className={`text-[11px] font-medium ${
                    matchScore >= 80
                      ? "text-emerald-400"
                      : matchScore >= 70
                      ? "text-cyan-400"
                      : matchScore > 0
                      ? "text-amber-400"
                      : "text-gray-500"
                  }`}
                >
                  {matchScore >= 80
                    ? "Excellent alignment"
                    : matchScore >= 70
                    ? "Strong alignment"
                    : matchScore > 0
                    ? "Room to improve"
                    : "Not analyzed yet"}
                </span>

                <Sparkles
                  size={13}
                  className="text-cyan-400/50"
                />
              </div>
            </div>
          </div>
        </div>
      </SnapshotCard>

      {/* =====================================================
          ROADMAP
      ===================================================== */}

      <SnapshotCard delay={0.16}>
        <div className="relative flex h-full flex-col overflow-hidden">
          {/* Emerald glow */}

          <div className="pointer-events-none absolute -bottom-14 -right-10 h-36 w-36 rounded-full bg-emerald-500/10 blur-3xl transition-all duration-500 group-hover:bg-emerald-500/20" />

          <div className="pointer-events-none absolute right-1/2 top-0 h-20 w-20 rounded-full bg-cyan-500/[0.035] blur-3xl" />

          <div className="relative z-10 flex h-full flex-col">
            {/* HEADER */}

            <div className="flex items-start justify-between">
              <IconBox
                icon={Map}
                className="border-emerald-400/10 bg-emerald-500/10 text-emerald-400"
              />

              <span className="rounded-full border border-white/[0.06] bg-white/[0.025] px-2 py-1 text-[10px] font-medium text-gray-500">
                {completed}/{total}
              </span>
            </div>

            {/* CONTENT */}

            <div className="mt-auto pt-6">
              <p className="text-[11px] font-semibold uppercase tracking-[1.8px] text-gray-500">
                Roadmap
              </p>

              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-3xl font-bold tracking-tight text-white">
                  {roadmapProgress}%
                </span>

                <span className="text-xs text-gray-600">
                  complete
                </span>
              </div>

              {/* SEGMENTED PROGRESS */}

              <div className="mt-4 flex gap-1.5">
                {Array.from({ length: 8 }).map(
                  (_, index) => {
                    const threshold =
                      (index + 1) * 12.5;

                    const active =
                      roadmapProgress >= threshold;

                    return (
                      <motion.div
                        key={index}
                        initial={{
                          opacity: 0,
                          scaleX: 0,
                        }}
                        animate={{
                          opacity: 1,
                          scaleX: 1,
                        }}
                        transition={{
                          duration: 0.35,
                          delay:
                            0.25 +
                            index * 0.045,
                          ease: "easeOut",
                        }}
                        className={`h-1.5 flex-1 origin-left rounded-full ${
                          active
                            ? "bg-gradient-to-r from-emerald-400 to-cyan-400"
                            : "bg-white/[0.07]"
                        }`}
                      />
                    );
                  }
                )}
              </div>

              <p className="mt-2 text-[11px] text-gray-500">
                {roadmap
                  ? `${completed} milestones completed`
                  : "Your personalized path awaits"}
              </p>
            </div>
          </div>
        </div>
      </SnapshotCard>

      {/* =====================================================
          AI INTERVIEW
      ===================================================== */}

      <SnapshotCard delay={0.24}>
        <div className="relative flex h-full flex-col overflow-hidden">
          {/* Amber glow */}

          <div className="pointer-events-none absolute -left-12 -top-12 h-32 w-32 rounded-full bg-amber-500/10 blur-3xl transition-all duration-500 group-hover:bg-amber-500/20" />

          <div className="pointer-events-none absolute bottom-0 right-0 h-24 w-24 rounded-full bg-orange-500/[0.035] blur-3xl" />

          <div className="relative z-10 flex h-full flex-col">
            {/* HEADER */}

            <div className="flex items-start justify-between">
              <IconBox
                icon={Mic2}
                className="border-amber-400/10 bg-amber-500/10 text-amber-400"
              />

              <span className="text-[10px] font-medium uppercase tracking-[1.2px] text-gray-600">
                Practice
              </span>
            </div>

            {/* CONTENT */}

            <div className="mt-auto pt-6">
              <p className="text-[11px] font-semibold uppercase tracking-[1.8px] text-gray-500">
                AI Interview
              </p>

              <div className="mt-1 flex items-end gap-3">
                <span className="text-3xl font-bold tracking-tight text-white">
                  {interviewCount}
                </span>

                <span className="mb-1 text-xs text-gray-500">
                  sessions
                </span>
              </div>

              {/* LATEST SCORE */}

              <motion.div
                whileHover={{
                  scale: 1.015,
                }}
                className="mt-4 flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.025] px-3 py-2.5"
              >
                <div>
                  <p className="text-[9px] font-medium uppercase tracking-[1px] text-gray-600">
                    Latest score
                  </p>

                  <p className="mt-0.5 text-sm font-semibold text-white">
                    {interviewCount > 0
                      ? `${interviewScore}%`
                      : "—"}
                  </p>
                </div>

                <motion.div
                  animate={
                    interviewCount > 0
                      ? {
                          scale: [1, 1.15, 1],
                        }
                      : {}
                  }
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                  className={`h-2 w-2 rounded-full ${
                    interviewCount > 0
                      ? "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]"
                      : "bg-gray-700"
                  }`}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </SnapshotCard>
    </div>
  );
}

/* =========================================================
   SNAPSHOT CARD
========================================================= */

function SnapshotCard({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 14,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.45,
        delay,
        ease: "easeOut",
      }}
      whileHover={{
        y: -4,
      }}
      className="group relative min-h-[190px] overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.055] to-white/[0.018] p-[1px] shadow-[0_10px_40px_rgba(0,0,0,0.12)] transition-all duration-300 hover:border-white/[0.14] hover:shadow-[0_18px_50px_rgba(0,0,0,0.22)]"
    >
      <div className="h-full rounded-[23px] bg-[#111522]/95 p-5 backdrop-blur-xl">
        {children}
      </div>
    </motion.div>
  );
}

/* =========================================================
   ICON BOX
========================================================= */

function IconBox({ icon: Icon, className }) {
  return (
    <motion.div
      whileHover={{
        rotate: -5,
        scale: 1.06,
      }}
      transition={{
        duration: 0.2,
      }}
      className={`flex h-10 w-10 items-center justify-center rounded-xl border ${className}`}
    >
      <Icon size={18} strokeWidth={1.8} />
    </motion.div>
  );
}

/* =========================================================
   PROGRESS RING
========================================================= */

function ProgressRing({
  value,
  size = 54,
  strokeWidth = 4,
}) {
  const radius = (size - strokeWidth) / 2;

  const circumference =
    2 * Math.PI * radius;

  const safeValue = Math.min(
    Math.max(Number(value) || 0, 0),
    100
  );

  const offset =
    circumference -
    (safeValue / 100) * circumference;

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.8,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 0.45,
        delay: 0.3,
      }}
      className="relative shrink-0"
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
      >
        <defs>
          <linearGradient
            id="careerMatchGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop
              offset="0%"
              stopColor="#22d3ee"
            />

            <stop
              offset="100%"
              stopColor="#818cf8"
            />
          </linearGradient>
        </defs>

        {/* Background */}

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth={strokeWidth}
        />

        {/* Progress */}

        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#careerMatchGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{
            strokeDashoffset: circumference,
          }}
          animate={{
            strokeDashoffset: offset,
          }}
          transition={{
            duration: 1,
            delay: 0.3,
            ease: "easeOut",
          }}
        />
      </svg>

      {/* Center value */}

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[10px] font-bold text-white">
          {safeValue}%
        </span>
      </div>
    </motion.div>
  );
}