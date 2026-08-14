import {
  ArrowUpRight,
  FileText,
  Map,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
  MessageSquare,
  Rocket,
} from "lucide-react";

import { motion } from "framer-motion";

export default function TodaysFocus({
  data,
  loading,
}) {
  const resume =
    data?.resumes?.find((item) => item.isCurrent) ||
    data?.resumes?.[0];

  const match =
    data?.careerMatches?.[0];

  const roadmap =
    data?.roadmaps?.[0];

  const interviews =
    data?.interviews || [];

  if (loading) {
    return <FocusSkeleton />;
  }

  const focus = getFocus({
    resume,
    match,
    roadmap,
    interviews,
  });

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 18,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
      className="
        group
        relative
        h-full
        min-h-[230px]
        overflow-hidden
        rounded-3xl
        border
        border-white/[0.08]
        bg-[#111522]/90
        p-5
        shadow-[0_15px_50px_rgba(0,0,0,0.18)]
        backdrop-blur-xl
        sm:p-5
      "
    >
      {/* ===================================================
          AMBIENT LIGHT
      =================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-16
          -top-16
          h-36
          w-36
          rounded-full
          bg-violet-500/[0.10]
          blur-[60px]
          transition-all
          duration-700
          group-hover:bg-violet-500/[0.16]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-16
          -left-8
          h-32
          w-32
          rounded-full
          bg-cyan-500/[0.06]
          blur-[60px]
        "
      />

      {/* ===================================================
          DECORATIVE ORBIT
      =================================================== */}

      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          pointer-events-none
          absolute
          -right-10
          -top-10
          h-28
          w-28
          rounded-full
          border
          border-violet-400/[0.08]
        "
      />

      {/* ===================================================
          CONTENT
      =================================================== */}

      <div className="relative z-10 flex h-full flex-col">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="flex items-start justify-between">

          <div className="min-w-0">

            <div className="flex items-center gap-2">

              <div
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-violet-400/10
                  bg-violet-500/10
                "
              >
                <Sparkles
                  size={14}
                  className="text-violet-300"
                />
              </div>

              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[2.2px]
                  text-violet-300/80
                "
              >
                Today's Focus
              </p>

            </div>

            <motion.h3
              key={focus.title}
              initial={{
                opacity: 0,
                y: 5,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.35,
              }}
              className="
                mt-3
                max-w-[280px]
                text-lg
                font-bold
                leading-snug
                tracking-tight
                text-white
              "
            >
              {focus.title}
            </motion.h3>

          </div>

          <motion.div
            animate={{
              y: [0, -3, 0],
              rotate: [0, 4, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-white/[0.07]
              bg-white/[0.035]
            "
          >
            <Zap
              size={14}
              className="text-amber-300"
            />
          </motion.div>

        </div>

        {/* =================================================
            DESCRIPTION
        ================================================= */}

        <motion.p
          key={focus.description}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.05,
          }}
          className="
            mt-2.5
            line-clamp-2
            text-xs
            leading-5
            text-gray-400
          "
        >
          {focus.description}
        </motion.p>

        {/* =================================================
            ACTION
        ================================================= */}

        <motion.button
          whileHover={{
            scale: 1.01,
            y: -1,
          }}
          whileTap={{
            scale: 0.98,
          }}
          onClick={() => {
            window.location.href = focus.path;
          }}
          className="
            mt-4
            flex
            w-full
            items-center
            justify-between
            rounded-2xl
            border
            border-white/[0.08]
            bg-white/[0.045]
            px-3.5
            py-3
            text-left
            transition-all
            duration-300
            hover:border-violet-400/20
            hover:bg-white/[0.07]
          "
        >

          <div className="flex min-w-0 items-center gap-3">

            <div
              className="
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-gradient-to-br
                from-violet-500/20
                to-cyan-500/10
              "
            >
              <focus.icon
                size={15}
                className="text-violet-300"
              />
            </div>

            <div className="min-w-0">

              <p className="truncate text-xs font-semibold text-white">
                {focus.action}
              </p>

              <p className="mt-0.5 text-[10px] text-gray-500">
                {focus.time}
              </p>

            </div>

          </div>

          <ArrowUpRight
            size={15}
            className="
              shrink-0
              text-gray-500
              transition-all
              duration-300
              group-hover:text-violet-300
            "
          />

        </motion.button>

        {/* =================================================
            AI INSIGHT
        ================================================= */}

        <div
          className="
            mt-auto
            border-t
            border-white/[0.06]
            pt-3
          "
        >

          <div className="flex items-center gap-2">

            <Sparkles
              size={12}
              className="text-cyan-300"
            />

            <span
              className="
                text-[9px]
                font-semibold
                uppercase
                tracking-[1.8px]
                text-gray-500
              "
            >
              AI Insight
            </span>

          </div>

          <p
            className="
              mt-1.5
              line-clamp-2
              text-[10px]
              leading-4
              text-gray-500
            "
          >
            {focus.insight}
          </p>

        </div>

      </div>
    </motion.div>
  );
}

/* =========================================================
   DYNAMIC FOCUS LOGIC
========================================================= */

function getFocus({
  resume,
  match,
  roadmap,
  interviews,
}) {
  /* =======================================================
     1. NO RESUME
  ======================================================= */

  if (!resume) {
    return {
      title: "Start with your resume",

      description:
        "Upload your resume and let CareerPilot understand your skills, experience and career direction.",

      action: "Analyze Resume",

      path: "/upload",

      time: "~ 5 mins",

      icon: FileText,

      insight:
        "Your resume is the foundation of your CareerPilot profile. Once analyzed, your recommendations become personalized.",
    };
  }

  /* =======================================================
     2. NO CAREER MATCH
  ======================================================= */

  if (!match) {
    return {
      title: "Discover your career fit",

      description:
        "Compare your current skills with a target role and find out where you stand.",

      action: "Find Career Match",

      path: "/career-match",

      time: "~ 3 mins",

      icon: Target,

      insight:
        "Career Match identifies your strongest skills and separates genuine skill gaps from areas where your resume needs stronger evidence.",
    };
  }

  /* =======================================================
     CAREER MATCH GAPS
  ======================================================= */

  const skillsToDevelop =
    Array.isArray(match.skillsToDevelop)
      ? match.skillsToDevelop
      : [];

  const criticalGaps =
    Array.isArray(match.criticalGaps)
      ? match.criticalGaps
      : [];

  const evidenceGaps =
    Array.isArray(match.evidenceGaps)
      ? match.evidenceGaps
      : [];

  const experienceGaps =
    Array.isArray(match.experienceGaps)
      ? match.experienceGaps
      : [];

  /* =======================================================
     3. SKILLS TO DEVELOP
  ======================================================= */

  if (skillsToDevelop.length > 0) {
    const prioritySkill =
      skillsToDevelop[0];

    return {
      title:
        `Strengthen ${prioritySkill}`,

      description:
        `${prioritySkill} is one of the skills CareerPilot identified as worth developing for your target role.`,

      action:
        `Learn ${prioritySkill}`,

      path: "/roadmaps",

      time: "High priority",

      icon: TrendingUp,

      insight:
        `Improving ${prioritySkill} can directly strengthen your profile for ${
          match.targetRole || "your target role"
        }.`,
    };
  }

  /* =======================================================
     4. CRITICAL GAPS
  ======================================================= */

  if (criticalGaps.length > 0) {
    return {
      title: "Work on your biggest gap",

      description:
        `Your Career Match identified ${criticalGaps[0]} as an important area to improve.`,

      action: "Review Career Match",

      path: "/career-match",

      time: "High priority",

      icon: Target,

      insight:
        "Addressing your most important gap first is usually more effective than trying to improve everything at once.",
    };
  }

  /* =======================================================
     5. ROADMAP
     
     Your backend structure is:
     
     roadmap
       └── phases[]
            └── tasks[]
     
     ======================================================= */

  if (roadmap) {
    const phases = Array.isArray(
      roadmap.phases
    )
      ? roadmap.phases
      : [];

    const tasks = phases.flatMap(
      (phase) =>
        Array.isArray(phase.tasks)
          ? phase.tasks
          : []
    );

    const completed =
      roadmap.completedTasks ??
      tasks.filter(
        (task) => task.completed === true
      ).length;

    const total =
      roadmap.totalTasks ??
      tasks.length;

    const nextTask =
      roadmap.nextTask ??
      tasks.find(
        (task) => task.completed !== true
      );

    if (nextTask) {
      const taskName =
        nextTask.title ||
        "your next milestone";

      return {
        title:
          `Continue ${taskName}`,

        description:
          `${completed} of ${total} roadmap milestones are complete. Keep your momentum going.`,

        action:
          "Continue Roadmap",

        path:
          "/roadmaps",

        time:
          `${completed}/${total} complete`,

        icon: Map,

        insight:
          "Small, consistent progress is more valuable than trying to complete your entire roadmap at once.",
      };
    }
  }

  /* =======================================================
     6. EVIDENCE GAPS
  ======================================================= */

  if (evidenceGaps.length > 0) {
    return {
      title:
        "Strengthen your resume evidence",

      description:
        "Your Career Match found skills that may be present but are not clearly demonstrated on your resume.",

      action:
        "Improve Resume",

      path:
        "/resume",

      time:
        "~ 10 mins",

      icon: FileText,

      insight:
        "Sometimes the problem isn't missing skills — it's that recruiters cannot see enough evidence of them.",
    };
  }

  /* =======================================================
     7. EXPERIENCE GAPS
  ======================================================= */

  if (experienceGaps.length > 0) {
    return {
      title:
        "Build practical experience",

      description:
        "Your profile would benefit from more hands-on experience related to your target role.",

      action:
        "View Career Match",

      path:
        "/career-match",

      time:
        "Long-term focus",

      icon: Rocket,

      insight:
        "A strong project, internship or real-world application can turn theoretical knowledge into stronger career evidence.",
    };
  }

  /* =======================================================
     8. NO INTERVIEW
  ======================================================= */

  if (interviews.length === 0) {
    return {
      title:
        "Test your interview readiness",

      description:
        "You've established your career direction. Now test how confidently you can explain your skills and projects.",

      action:
        "Start Interview",

      path:
        "/interview",

      time:
        "~ 15 mins",

      icon: MessageSquare,

      insight:
        "Interview practice reveals weaknesses that a resume analysis cannot measure.",
    };
  }

  /* =======================================================
     9. DEFAULT
  ======================================================= */

  return {
    title:
      "Keep building momentum",

    description:
      "Your CareerPilot profile is active. Continue improving your roadmap, projects and interview readiness.",

    action:
      "Continue Roadmap",

    path:
      "/roadmaps",

    time:
      "Keep building",

    icon: Map,

    insight:
      "You don't need to improve everything at once. Pick one meaningful milestone and finish it.",
  };
}

/* =========================================================
   SKELETON
========================================================= */

function FocusSkeleton() {
  return (
    <div
      className="
        min-h-[230px]
        animate-pulse
        rounded-3xl
        border
        border-white/[0.08]
        bg-[#111522]/80
        p-5
      "
    >
      <div className="h-8 w-32 rounded-lg bg-white/[0.06]" />

      <div className="mt-4 h-6 w-52 rounded-lg bg-white/[0.06]" />

      <div className="mt-3 h-4 w-full rounded bg-white/[0.05]" />

      <div className="mt-2 h-4 w-4/5 rounded bg-white/[0.05]" />

      <div className="mt-5 h-14 rounded-2xl bg-white/[0.05]" />

      <div className="mt-5 border-t border-white/[0.05] pt-4">
        <div className="h-3 w-20 rounded bg-white/[0.05]" />

        <div className="mt-2 h-8 w-full rounded bg-white/[0.05]" />
      </div>
    </div>
  );
}