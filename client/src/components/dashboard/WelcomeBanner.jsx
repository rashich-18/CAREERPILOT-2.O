import { Sparkles, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function WelcomeBanner({ data, loading }) {
  // ==========================================
  // USER
  // ==========================================

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good morning"
      : hour < 18
      ? "Good afternoon"
      : "Good evening";

  const name = user?.name || "there";

  // ==========================================
  // DATA
  // ==========================================

  const resume = data?.resumes?.[0];
  const match = data?.careerMatches?.[0];
  const roadmap = data?.roadmaps?.[0];

  // ==========================================
  // RESUME SCORE
  // ==========================================

  const resumeScore =
    resume?.score ??
    resume?.resumeScore ??
    resume?.overallScore ??
    0;

  // ==========================================
  // CAREER MATCH SCORE
  // ==========================================

  const matchScore =
    match?.matchPercentage ??
    match?.matchScore ??
    match?.score ??
    0;

  // ==========================================
  // ROADMAP PROGRESS
  // ==========================================

  const completed =
    roadmap?.completedMilestones ??
    roadmap?.completed ??
    0;

  const total =
    roadmap?.totalMilestones ??
    roadmap?.total ??
    roadmap?.milestones?.length ??
    0;

  const roadmapProgress =
    total > 0
      ? Math.round((completed / total) * 100)
      : roadmap?.progress ?? 0;

  // ==========================================
  // CAREER READINESS
  // ==========================================

  const readinessValues = [
    resumeScore,
    matchScore,
    roadmapProgress,
  ].filter((value) => value > 0);

  const readiness =
    readinessValues.length > 0
      ? Math.round(
          readinessValues.reduce(
            (sum, value) => sum + value,
            0
          ) / readinessValues.length
        )
      : 0;

  // ==========================================
  // READINESS MESSAGE
  // ==========================================

  const readinessMessage =
    readiness >= 80
      ? "You're highly prepared for your target role."
      : readiness >= 60
      ? "You're making strong progress toward your target role."
      : readiness > 0
      ? "You're making steady progress toward your target role."
      : "Complete your career profile to get started.";

  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
      className="
        relative
        overflow-hidden
        rounded-3xl
        border border-white/10
        bg-[#121628]
        shadow-2xl
        shadow-violet-950/20
      "
    >
      {/* =====================================================
          UNIFIED BACKGROUND
          IMPORTANT:
          There is intentionally NO separate background
          behind the illustration.
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_50%,rgba(99,70,180,0.18),transparent_34%)]" />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_45%_100%,rgba(34,211,238,0.06),transparent_35%)]" />

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="relative z-10 flex min-h-[230px] flex-col lg:min-h-[250px] lg:flex-row">

        {/* ==================================================
            LEFT CONTENT
        ================================================== */}

        <div className="relative z-20 flex w-full items-center px-6 py-7 sm:px-8 sm:py-8 lg:w-[56%] lg:px-9 lg:py-8">
          <div className="w-full max-w-2xl">

            {/* ==========================================
                BRAND LABEL
            ========================================== */}

            <div className="mb-3 flex items-center gap-2">

              <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-violet-400/10 bg-violet-500/10">
                <Sparkles
                  size={14}
                  className="text-violet-400"
                />
              </div>

              <span className="text-[10px] font-semibold uppercase tracking-[2.5px] text-violet-300 sm:text-[11px]">
                CareerPilot AI
              </span>

            </div>

           {/* ==========================================
    GREETING
========================================== */}

<motion.h1
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.6,
    delay: 0.1,
    ease: "easeOut",
  }}
  className="
    text-2xl
    font-bold
    leading-tight
    tracking-tight
    text-white
    sm:text-3xl
    lg:text-[2.15rem]
  "
>
  <motion.span
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5, delay: 0.15 }}
  >
    {greeting},{" "}
  </motion.span>

  <motion.span
    initial={{ opacity: 0, x: 8 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{
      duration: 0.55,
      delay: 0.3,
      ease: "easeOut",
    }}
    className="text-white"
  >
    {name}
  </motion.span>

  <motion.span
    initial={{ opacity: 0, scale: 0.7 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
      duration: 0.4,
      delay: 0.5,
      type: "spring",
      stiffness: 220,
      damping: 12,
    }}
    className="ml-1.5 inline-block text-lg sm:text-xl"
  >
    ✦
  </motion.span>
</motion.h1>

<motion.p
  initial={{ opacity: 0, y: 6 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.5,
    delay: 0.45,
  }}
  className="mt-2 text-sm text-gray-400 sm:text-base"
>
  Let's move your career forward.
</motion.p>
            

            {/* ==========================================
                CAREER READINESS
            ========================================== */}

            <div className="mt-5 max-w-xl">

              <div className="mb-2 flex items-center justify-between">

                <span className="text-xs font-medium text-gray-300 sm:text-sm">
                  Career readiness
                </span>

                <span className="text-sm font-bold text-violet-300">
                  {loading ? "--" : `${readiness}%`}
                </span>

              </div>

              {/* PROGRESS BAR */}

              <div className="h-2 overflow-hidden rounded-full bg-white/10 sm:h-2.5">

                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${readiness}%`,
                  }}
                  transition={{
                    duration: 1,
                    delay: 0.2,
                    ease: "easeOut",
                  }}
                  className="
                    h-full
                    rounded-full
                    bg-gradient-to-r
                    from-violet-500
                    via-purple-400
                    to-cyan-400
                  "
                />

              </div>

              {/* MESSAGE */}

              <div className="mt-2.5 flex items-start gap-2">

                <TrendingUp
                  size={13}
                  className="mt-0.5 shrink-0 text-emerald-400"
                />

                <p className="text-xs leading-5 text-gray-500 sm:text-sm">
                  {readinessMessage}
                </p>

              </div>

            </div>

          </div>
        </div>

        {/* ==================================================
            RIGHT — ILLUSTRATION
        ================================================== */}

        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[50%] lg:block">

          {/* ------------------------------------------
              SOFT GLOW BEHIND ILLUSTRATION
          ------------------------------------------ */}

          <div
            className="
              absolute
              right-[8%]
              top-1/2
              h-[300px]
              w-[400px]
              -translate-y-1/2
              rounded-full
              bg-violet-600/10
              blur-[80px]
            "
          />

          {/* ------------------------------------------
              IMAGE
              
              The mask is the important fix.
              It fades the baked-in dark background
              of the PNG into our banner background.
          ------------------------------------------ */}

          <motion.img
            src="/career-banner.png"
            alt="CareerPilot AI career illustration"
            initial={{
              opacity: 0,
              x: 25,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: "easeOut",
            }}
            className="
              absolute
              right-[-3%]
              top-1/2
              h-[108%]
              w-auto
              max-w-none
              -translate-y-1/2
              object-contain
              object-right

              [mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.35)_12%,black_28%,black_100%)]
              [-webkit-mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.35)_12%,black_28%,black_100%)]

              mix-blend-screen
            "
          />

        </div>

        {/* ==================================================
            TABLET VISUAL
        ================================================== */}

        <div className="pointer-events-none absolute -right-24 top-1/2 hidden -translate-y-1/2 opacity-30 md:block lg:hidden">

          <img
            src="/career-banner.png"
            alt=""
            aria-hidden="true"
            className="
              h-[260px]
              w-auto
              max-w-none
              object-contain
              mix-blend-screen
              [mask-image:linear-gradient(to_right,transparent,black_45%)]
              [-webkit-mask-image:linear-gradient(to_right,transparent,black_45%)]
            "
          />

        </div>

      </div>
    </motion.section>
  );
}