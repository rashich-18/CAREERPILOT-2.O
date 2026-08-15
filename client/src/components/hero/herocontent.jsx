import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function HeroContent() {
  return (
    <div className="max-w-2xl">

      {/* =========================
          EYEBROW
      ========================= */}

      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.15,
          duration: 0.4,
        }}
        className="
          inline-flex
          items-center
          gap-2
          rounded-full
          border
          border-violet-400/10
          bg-violet-500/[0.06]
          px-3
          py-1.5
        "
      >
        <Sparkles
          size={12}
          className="text-violet-300"
        />

        <span
          className="
            text-[9px]
            font-semibold
            uppercase
            tracking-[2px]
            text-violet-300/80
          "
        >
          AI Career Companion
        </span>
      </motion.div>

      {/* =========================
          HEADING
      ========================= */}

      <motion.h1
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.25,
          duration: 0.55,
        }}
        className="
          mt-6
          text-4xl
          font-extrabold
          leading-[1.08]
          tracking-tight
          text-white
          sm:text-5xl
          lg:text-6xl
          xl:text-7xl
        "
      >
        Navigate your

        <span
          className="
            block
            bg-gradient-to-r
            from-violet-300
            via-fuchsia-300
            to-cyan-300
            bg-clip-text
            text-transparent
          "
        >
          dream career
        </span>

        with AI.
      </motion.h1>

      {/* =========================
          DESCRIPTION
      ========================= */}

      <motion.p
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.35,
          duration: 0.5,
        }}
        className="
          mt-6
          max-w-xl
          text-sm
          leading-7
          text-gray-400
          sm:text-base
          lg:text-lg
        "
      >
        Upload your resume and let CareerPilot help you understand
        your strengths, find your career fit, identify skill gaps,
        build a personalized roadmap, and prepare for interviews.
      </motion.p>

      {/* =========================
          BUTTONS
      ========================= */}

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
          delay: 0.45,
          duration: 0.5,
        }}
        className="
          mt-8
          flex
          flex-wrap
          gap-3
        "
      >
        <Link to="/signup">
          <motion.button
            whileHover={{
              y: -2,
            }}
            whileTap={{
              scale: 0.97,
            }}
            className="
              group
              flex
              items-center
              gap-2
              rounded-xl
              bg-gradient-to-r
              from-violet-600
              to-cyan-500
              px-6
              py-3.5
              text-sm
              font-semibold
              text-white
              shadow-[0_8px_30px_rgba(139,92,246,0.18)]
              transition-all
              duration-300
              hover:shadow-[0_10px_35px_rgba(139,92,246,0.28)]
            "
          >
            Get Started

            <ArrowRight
              size={16}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </motion.button>
        </Link>

        <a href="#how-it-works">
          <motion.button
            whileHover={{
              y: -2,
            }}
            whileTap={{
              scale: 0.97,
            }}
            className="
              rounded-xl
              border
              border-white/[0.09]
              bg-white/[0.035]
              px-6
              py-3.5
              text-sm
              font-semibold
              text-gray-300
              backdrop-blur-md
              transition-all
              duration-300
              hover:border-white/[0.15]
              hover:bg-white/[0.06]
              hover:text-white
            "
          >
            See How It Works
          </motion.button>
        </a>
      </motion.div>

      {/* =========================
          TRUST / CAPABILITIES
      ========================= */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.65,
          duration: 0.5,
        }}
        className="
          mt-9
          flex
          flex-wrap
          gap-x-5
          gap-y-2.5
        "
      >

        <div className="flex items-center gap-1.5">
          <CheckCircle2
            size={13}
            className="text-violet-300"
          />

          <span className="text-[10px] text-gray-500">
            AI Resume Analysis
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <CheckCircle2
            size={13}
            className="text-cyan-300"
          />

          <span className="text-[10px] text-gray-500">
            Career Matching
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <CheckCircle2
            size={13}
            className="text-emerald-300"
          />

          <span className="text-[10px] text-gray-500">
            Personalized Roadmaps
          </span>
        </div>

      </motion.div>

    </div>
  );
}