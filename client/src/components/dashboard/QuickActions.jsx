import {
  ArrowUpRight,
  FileText,
  Map,
  MessageSquare,
  Target,
  Zap,
} from "lucide-react";

import { motion } from "framer-motion";

const actions = [
  {
    title: "Analyze Resume",
    description: "Improve your resume",
    icon: FileText,
    path: "/upload",
    accent: "violet",
  },
  {
    title: "Career Match",
    description: "Check your career fit",
    icon: Target,
    path: "/career-match",
    accent: "cyan",
  },
  {
    title: "View Roadmap",
    description: "Continue learning",
    icon: Map,
    path: "/roadmaps",
    accent: "emerald",
  },
  {
    title: "AI Interview",
    description: "Practice your skills",
    icon: MessageSquare,
    path: "/interview",
    accent: "amber",
  },
];

/* =========================================================
   ACCENT STYLES
========================================================= */

const accentStyles = {
  violet: {
    icon: `
      border-violet-400/10
      bg-violet-500/[0.08]
      text-violet-300
    `,
    glow: "bg-violet-500/[0.10]",
    hover: "hover:border-violet-400/20",
    arrow: "group-hover:text-violet-300",
    line: "bg-violet-400/50",
  },

  cyan: {
    icon: `
      border-cyan-400/10
      bg-cyan-500/[0.08]
      text-cyan-300
    `,
    glow: "bg-cyan-500/[0.10]",
    hover: "hover:border-cyan-400/20",
    arrow: "group-hover:text-cyan-300",
    line: "bg-cyan-400/50",
  },

  emerald: {
    icon: `
      border-emerald-400/10
      bg-emerald-500/[0.08]
      text-emerald-300
    `,
    glow: "bg-emerald-500/[0.10]",
    hover: "hover:border-emerald-400/20",
    arrow: "group-hover:text-emerald-300",
    line: "bg-emerald-400/50",
  },

  amber: {
    icon: `
      border-amber-400/10
      bg-amber-500/[0.08]
      text-amber-300
    `,
    glow: "bg-amber-500/[0.10]",
    hover: "hover:border-amber-400/20",
    arrow: "group-hover:text-amber-300",
    line: "bg-amber-400/50",
  },
};

/* =========================================================
   QUICK ACTIONS
========================================================= */

export default function QuickActions() {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 18,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        relative
        overflow-hidden
        rounded-[24px]
        border
        border-white/[0.08]
        bg-[#101522]/90
        p-4
        shadow-[0_20px_60px_rgba(0,0,0,0.14)]
        backdrop-blur-xl
      "
    >
      {/* =====================================================
          AMBIENT GLOW
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-44
          w-44
          rounded-full
          bg-violet-600/[0.07]
          blur-[75px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-20
          left-1/3
          h-40
          w-40
          rounded-full
          bg-cyan-500/[0.04]
          blur-[75px]
        "
      />

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2.5">

          <motion.div
            animate={{
              rotate: [0, 7, -7, 0],
              scale: [1, 1.04, 1],
            }}
            transition={{
              duration: 4,
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
              rounded-xl
              border
              border-violet-400/10
              bg-violet-500/[0.08]
              shadow-[0_0_22px_rgba(139,92,246,0.08)]
            "
          >
            <Zap
              size={14}
              className="text-violet-300"
            />
          </motion.div>

          <div>
            <p
              className="
                text-[8px]
                font-semibold
                uppercase
                tracking-[2.3px]
                text-violet-300/70
              "
            >
              Quick Actions
            </p>

            <h3
              className="
                mt-0.5
                text-base
                font-bold
                tracking-tight
                text-white
              "
            >
              Keep moving
            </h3>
          </div>
        </div>

        {/* STATUS */}

        <motion.div
          animate={{
            opacity: [0.4, 0.85, 0.4],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
          }}
          className="
            hidden
            items-center
            gap-1.5
            rounded-full
            border
            border-white/[0.06]
            bg-white/[0.025]
            px-2
            py-1
            sm:flex
          "
        >
          <span
            className="
              h-1.5
              w-1.5
              rounded-full
              bg-violet-400
            "
          />

          <span
            className="
              text-[8px]
              font-medium
              uppercase
              tracking-[1px]
              text-gray-600
            "
          >
            Your next step
          </span>
        </motion.div>
      </div>

      {/* =====================================================
          2 × 2 ACTIONS
      ===================================================== */}

      <div
        className="
          relative
          z-10
          mt-3.5
          grid
          grid-cols-2
          gap-2
        "
      >
        {actions.map((action, index) => {
          const Icon = action.icon;
          const style = accentStyles[action.accent];

          return (
            <motion.button
              key={action.title}
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.07,
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                y: -3,
              }}
              whileTap={{
                scale: 0.97,
              }}
              onClick={() => {
                window.location.href = action.path;
              }}
              className={`
                group
                relative
                min-w-0
                overflow-hidden
                rounded-xl
                border
                border-white/[0.06]
                bg-white/[0.025]
                px-2.5
                py-2.5
                text-left
                transition-all
                duration-300
                hover:bg-white/[0.05]
                ${style.hover}
              `}
            >
              {/* Hover glow */}

              <div
                className={`
                  pointer-events-none
                  absolute
                  -right-7
                  -top-7
                  h-20
                  w-20
                  rounded-full
                  blur-[30px]
                  opacity-0
                  transition-opacity
                  duration-500
                  group-hover:opacity-100
                  ${style.glow}
                `}
              />

              {/* Icon */}

              <motion.div
                whileHover={{
                  scale: 1.08,
                  rotate: -5,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                }}
                className={`
                  relative
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  border
                  ${style.icon}
                `}
              >
                <Icon
                  size={14}
                  strokeWidth={1.8}
                />

                <motion.span
                  initial={{
                    scale: 0,
                    opacity: 0,
                  }}
                  whileHover={{
                    scale: 1,
                    opacity: 1,
                  }}
                  className="
                    absolute
                    -right-0.5
                    -top-0.5
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-white/60
                  "
                />
              </motion.div>

              {/* Text */}

              <div className="relative mt-2 min-w-0 pr-7">
                <p
                  className="
                    truncate
                    text-[11px]
                    font-semibold
                    leading-tight
                    text-white
                  "
                >
                  {action.title}
                </p>

                <p
                  className="
                    mt-0.5
                    truncate
                    text-[9px]
                    leading-tight
                    text-gray-600
                    transition-colors
                    duration-300
                    group-hover:text-gray-500
                  "
                >
                  {action.description}
                </p>
              </div>

              {/* Arrow */}

              <div
                className="
                  absolute
                  bottom-2
                  right-2
                  flex
                  h-5
                  w-5
                  items-center
                  justify-center
                  rounded-md
                  border
                  border-white/[0.05]
                  bg-white/[0.035]
                  transition-all
                  duration-300
                  group-hover:bg-white/[0.07]
                "
              >
                <ArrowUpRight
                  size={11}
                  className={`
                    text-gray-600
                    transition-all
                    duration-300
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                    ${style.arrow}
                  `}
                />
              </div>

              {/* Bottom accent */}

              <motion.div
                initial={{
                  scaleX: 0,
                }}
                whileHover={{
                  scaleX: 1,
                }}
                transition={{
                  duration: 0.3,
                }}
                className={`
                  absolute
                  bottom-0
                  left-3
                  right-3
                  h-px
                  origin-left
                  opacity-70
                  ${style.line}
                `}
              />
            </motion.button>
          );
        })}
      </div>
    </motion.section>
  );
}