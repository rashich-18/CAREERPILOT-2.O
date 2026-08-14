import {
  ArrowUpRight,
  Check,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function LatestCareerMatch({ data, loading }) {
  const navigate = useNavigate();

  const match = data?.careerMatches?.[0];

  if (loading) {
    return <MatchSkeleton />;
  }

  if (!match) {
    return <EmptyMatch />;
  }

  const score = Math.min(
    Math.max(
      Number(
        match.matchScore ??
          match.matchPercentage ??
          match.score ??
          0
      ),
      0
    ),
    100
  );

  const role =
    match.targetRole ||
    match.role ||
    match.jobTitle ||
    match.career ||
    "Career Match";

  const company =
    match.targetCompany ||
    match.company ||
    "";

  const strongSkills =
    match.strongMatches ||
    match.strongSkills ||
    match.matchedSkills ||
    [];

  const skillGaps =
    match.skillsToDevelop ||
    match.skillGaps ||
    match.missingSkills ||
    match.gaps ||
    [];

  const safeStrongSkills = Array.isArray(strongSkills)
    ? strongSkills.filter(Boolean).slice(0, 4)
    : [];

  const safeSkillGaps = Array.isArray(skillGaps)
    ? skillGaps.filter(Boolean).slice(0, 4)
    : [];

  const getScoreLabel = () => {
    if (score >= 90) return "Excellent fit";
    if (score >= 80) return "Strong fit";
    if (score >= 70) return "Good potential";
    if (score >= 50) return "Needs development";
    return "Early stage";
  };

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 24,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        group
        relative
        h-full
        min-h-[390px]
        overflow-hidden
        rounded-[30px]
        border
        border-white/[0.08]
        bg-[#0d1220]
        shadow-[0_25px_80px_rgba(0,0,0,0.22)]
      "
    >
      {/* =====================================================
          AMBIENT BACKGROUND
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-24
          -top-24
          h-72
          w-72
          rounded-full
          bg-violet-600/[0.10]
          blur-[100px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-24
          left-1/3
          h-64
          w-64
          rounded-full
          bg-cyan-500/[0.06]
          blur-[100px]
        "
      />

      {/* Animated grid */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.035]
          [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)]
          [background-size:32px_32px]
        "
      />

      {/* Top shimmer */}

      <motion.div
        animate={{
          x: ["-100%", "200%"],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 3,
        }}
        className="
          pointer-events-none
          absolute
          left-0
          top-0
          h-px
          w-1/2
          bg-gradient-to-r
          from-transparent
          via-violet-400/60
          to-transparent
        "
      />

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative z-10 flex h-full flex-col p-5 sm:p-6">

        {/* ===================================================
            TOP HEADER
        =================================================== */}

        <div className="flex items-start justify-between">

          {/* LABEL */}

          <div>
            <div className="flex items-center gap-2">

              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-violet-400/15
                  bg-violet-500/[0.10]
                  shadow-[0_0_25px_rgba(139,92,246,0.12)]
                "
              >
                <Sparkles
                  size={16}
                  className="text-violet-300"
                />
              </motion.div>

              <div>
                <p
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[2.5px]
                    text-violet-300/70
                  "
                >
                  AI Career Intelligence
                </p>

                <p
                  className="
                    mt-0.5
                    text-[10px]
                    text-gray-600
                  "
                >
                  Latest analysis
                </p>
              </div>

            </div>
          </div>

          {/* ANALYZED BADGE */}

          <div
            className="
              flex
              items-center
              gap-1.5
              rounded-full
              border
              border-emerald-400/10
              bg-emerald-400/[0.05]
              px-2.5
              py-1.5
            "
          >
            <motion.span
              animate={{
                opacity: [0.4, 1, 0.4],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-emerald-400
              "
            />

            <span
              className="
                text-[9px]
                font-medium
                text-emerald-300/80
              "
            >
              ANALYZED
            </span>
          </div>

        </div>

        {/* ===================================================
            MAIN HERO
        =================================================== */}

        <div
          className="
            mt-6
            flex
            flex-col
            gap-5
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >

          {/* ROLE */}

          <div className="min-w-0">

            <p
              className="
                mb-2
                text-[10px]
                font-medium
                uppercase
                tracking-[1.8px]
                text-gray-600
              "
            >
              Your strongest career match
            </p>

            <h3
              className="
                max-w-[280px]
                truncate
                text-2xl
                font-bold
                tracking-tight
                text-white
                sm:text-[27px]
              "
            >
              {role}
            </h3>

            {company && (
              <p
                className="
                  mt-1.5
                  truncate
                  text-xs
                  text-gray-500
                "
              >
                {company}
              </p>
            )}

            {/* FIT BADGE */}

            <motion.div
              initial={{
                opacity: 0,
                x: -8,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 0.35,
              }}
              className="
                mt-4
                inline-flex
                items-center
                gap-1.5
                rounded-full
                border
                border-cyan-400/10
                bg-cyan-400/[0.05]
                px-2.5
                py-1.5
              "
            >
              <Zap
                size={11}
                className="text-cyan-300"
              />

              <span
                className="
                  text-[10px]
                  font-medium
                  text-cyan-200
                "
              >
                {getScoreLabel()}
              </span>
            </motion.div>

          </div>

          {/* SCORE RING */}

          <ScoreRing score={score} />

        </div>

        {/* ===================================================
            SKILL ANALYSIS
        =================================================== */}

        <div
          className="
            mt-6
            grid
            gap-3
            sm:grid-cols-2
          "
        >

          <SkillPanel
            title="You already have"
            icon={Check}
            iconClass="text-emerald-300"
            accent="emerald"
            skills={safeStrongSkills}
            emptyText="Build more role-specific skills"
          />

          <SkillPanel
            title="Worth improving"
            icon={TrendingUp}
            iconClass="text-amber-300"
            accent="amber"
            skills={safeSkillGaps}
            emptyText="You're looking strong here"
          />

        </div>

        {/* ===================================================
            FOOTER
        =================================================== */}

        <div
          className="
            mt-auto
            flex
            items-center
            justify-between
            gap-3
            border-t
            border-white/[0.06]
            pt-4
          "
        >

          <div
            className="
              flex
              min-w-0
              items-center
              gap-2
            "
          >
            <div
              className="
                flex
                h-6
                w-6
                shrink-0
                items-center
                justify-center
                rounded-lg
                bg-violet-500/[0.08]
              "
            >
              <Target
                size={12}
                className="text-violet-300"
              />
            </div>

            <span
              className="
                truncate
                text-[10px]
                text-gray-600
              "
            >
              Based on your resume & skills
            </span>
          </div>

          <motion.button
            whileHover={{
              x: 3,
            }}
            whileTap={{
              scale: 0.96,
            }}
            onClick={() => navigate("/career-match")}
            className="
              group/btn
              flex
              shrink-0
              items-center
              gap-1.5
              rounded-xl
              border
              border-violet-400/10
              bg-gradient-to-r
              from-violet-500/[0.10]
              to-cyan-500/[0.08]
              px-3.5
              py-2
              text-[11px]
              font-semibold
              text-white
              transition-all
              hover:border-violet-400/25
              hover:from-violet-500/[0.16]
              hover:to-cyan-500/[0.12]
            "
          >
            Explore match

            <ArrowUpRight
              size={13}
              className="
                text-violet-300
                transition-transform
                group-hover/btn:translate-x-0.5
                group-hover/btn:-translate-y-0.5
              "
            />
          </motion.button>

        </div>

      </div>
    </motion.section>
  );
}


/* =========================================================
   SCORE RING
========================================================= */

function ScoreRing({ score }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;

  const offset =
    circumference -
    (score / 100) * circumference;

  const scoreColor =
    score >= 80
      ? "text-emerald-300"
      : score >= 70
      ? "text-cyan-300"
      : "text-amber-300";

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.7,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 0.7,
        delay: 0.15,
        type: "spring",
      }}
      className="
        relative
        flex
        h-[112px]
        w-[112px]
        shrink-0
        items-center
        justify-center
      "
    >

      {/* Outer glow */}

      <motion.div
        animate={{
          opacity: [0.25, 0.5, 0.25],
          scale: [0.95, 1.05, 0.95],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          inset-1
          rounded-full
          bg-violet-500/10
          blur-xl
        "
      />

      <svg
        width="112"
        height="112"
        viewBox="0 0 112 112"
        className="-rotate-90"
      >

        {/* Background */}

        <circle
          cx="56"
          cy="56"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="7"
        />

        {/* Progress */}

        <motion.circle
          cx="56"
          cy="56"
          r={radius}
          fill="none"
          stroke="url(#scoreGradient)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{
            strokeDashoffset: circumference,
          }}
          animate={{
            strokeDashoffset: offset,
          }}
          transition={{
            duration: 1.4,
            delay: 0.25,
            ease: [0.22, 1, 0.36, 1],
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

      {/* Center */}

      <div
        className="
          absolute
          inset-0
          flex
          flex-col
          items-center
          justify-center
        "
      >

        <motion.span
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.8,
          }}
          className={`
            text-2xl
            font-bold
            tracking-tight
            ${scoreColor}
          `}
        >
          {score}%
        </motion.span>

        <span
          className="
            mt-0.5
            text-[8px]
            font-semibold
            uppercase
            tracking-[1.5px]
            text-gray-600
          "
        >
          Match
        </span>

      </div>

    </motion.div>
  );
}


/* =========================================================
   SKILL PANEL
========================================================= */

function SkillPanel({
  title,
  icon: Icon,
  iconClass,
  accent,
  skills,
  emptyText,
}) {
  const isEmerald = accent === "emerald";

  return (
    <motion.div
      whileHover={{
        y: -2,
      }}
      transition={{
        duration: 0.2,
      }}
      className={`
        rounded-2xl
        border
        p-3.5
        transition-all
        ${
          isEmerald
            ? "border-emerald-400/[0.08] bg-emerald-400/[0.025] hover:border-emerald-400/[0.14]"
            : "border-amber-400/[0.08] bg-amber-400/[0.025] hover:border-amber-400/[0.14]"
        }
      `}
    >

      <div className="flex items-center gap-2">

        <Icon
          size={13}
          className={iconClass}
        />

        <span
          className={`
            text-[9px]
            font-semibold
            uppercase
            tracking-[1.5px]
            ${
              isEmerald
                ? "text-emerald-300/80"
                : "text-amber-300/80"
            }
          `}
        >
          {title}
        </span>

      </div>

      <div
        className="
          mt-3
          flex
          min-h-[30px]
          flex-wrap
          gap-1.5
        "
      >

        {skills.length > 0 ? (
          skills.map((skill, index) => (
            <motion.span
              key={`${skill}-${index}`}
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                delay: 0.35 + index * 0.06,
              }}
              whileHover={{
                y: -2,
              }}
              className={`
                cursor-default
                rounded-lg
                border
                px-2
                py-1
                text-[10px]
                ${
                  isEmerald
                    ? "border-emerald-400/10 bg-emerald-400/[0.06] text-emerald-200"
                    : "border-amber-400/10 bg-amber-400/[0.06] text-amber-200"
                }
              `}
            >
              {skill}
            </motion.span>
          ))
        ) : (
          <span className="text-[10px] text-gray-600">
            {emptyText}
          </span>
        )}

      </div>

    </motion.div>
  );
}


/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyMatch() {
  const navigate = useNavigate();

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="
        relative
        flex
        h-full
        min-h-[390px]
        flex-col
        justify-center
        overflow-hidden
        rounded-[30px]
        border
        border-white/[0.08]
        bg-[#0d1220]
        p-6
      "
    >

      {/* Background glow */}

      <div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-52
          w-52
          rounded-full
          bg-violet-600/10
          blur-[80px]
        "
      />

      {/* Icon */}

      <motion.div
        animate={{
          rotate: [0, 8, -8, 0],
          scale: [1, 1.04, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-2xl
          border
          border-violet-400/15
          bg-violet-500/10
        "
      >
        <Target
          size={21}
          className="text-violet-300"
        />
      </motion.div>

      <p
        className="
          mt-5
          text-[9px]
          font-semibold
          uppercase
          tracking-[2.5px]
          text-violet-300/70
        "
      >
        AI Career Intelligence
      </p>

      <h3
        className="
          mt-2
          text-2xl
          font-bold
          tracking-tight
          text-white
        "
      >
        Discover your career fit
      </h3>

      <p
        className="
          mt-2
          max-w-sm
          text-sm
          leading-6
          text-gray-500
        "
      >
        Let CareerPilot compare your resume,
        skills and experience against your target
        career.
      </p>

      <motion.button
        whileHover={{
          y: -2,
        }}
        whileTap={{
          scale: 0.97,
        }}
        onClick={() => navigate("/career-match")}
        className="
          mt-6
          flex
          w-fit
          items-center
          gap-2
          rounded-xl
          bg-gradient-to-r
          from-violet-600
          to-cyan-500
          px-4
          py-2.5
          text-xs
          font-semibold
          text-white
          shadow-[0_10px_30px_rgba(139,92,246,0.18)]
        "
      >
        Find my career match

        <ArrowUpRight size={14} />
      </motion.button>

    </motion.section>
  );
}


/* =========================================================
   SKELETON
========================================================= */

function MatchSkeleton() {
  return (
    <div
      className="
        min-h-[390px]
        animate-pulse
        rounded-[30px]
        border
        border-white/[0.08]
        bg-[#0d1220]
        p-6
      "
    >

      <div className="flex justify-between">

        <div className="flex gap-3">

          <div
            className="
              h-9
              w-9
              rounded-xl
              bg-white/[0.06]
            "
          />

          <div>

            <div
              className="
                h-2
                w-32
                rounded
                bg-white/[0.06]
              "
            />

            <div
              className="
                mt-2
                h-2
                w-20
                rounded
                bg-white/[0.04]
              "
            />

          </div>

        </div>

        <div
          className="
            h-6
            w-16
            rounded-full
            bg-white/[0.05]
          "
        />

      </div>

      <div
        className="
          mt-7
          flex
          items-center
          justify-between
        "
      >

        <div>

          <div
            className="
              h-3
              w-28
              rounded
              bg-white/[0.05]
            "
          />

          <div
            className="
              mt-3
              h-8
              w-48
              rounded
              bg-white/[0.07]
            "
          />

          <div
            className="
              mt-2
              h-2
              w-24
              rounded
              bg-white/[0.04]
            "
          />

        </div>

        <div
          className="
            h-28
            w-28
            rounded-full
            border-8
            border-white/[0.05]
          "
        />

      </div>

      <div
        className="
          mt-7
          grid
          grid-cols-2
          gap-3
        "
      >

        <div
          className="
            h-20
            rounded-2xl
            bg-white/[0.04]
          "
        />

        <div
          className="
            h-20
            rounded-2xl
            bg-white/[0.04]
          "
        />

      </div>

      <div
        className="
          mt-6
          h-px
          bg-white/[0.05]
        "
      />

    </div>
  );
}