import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#050816]
        py-20
        text-white
        sm:py-24
      "
    >
      {/* =====================================================
          AMBIENT GLOW
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[380px]
          w-[380px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-violet-600/[0.08]
          blur-[120px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-32
          bottom-0
          h-64
          w-64
          rounded-full
          bg-cyan-500/[0.035]
          blur-[100px]
        "
      />

      {/* =====================================================
          CTA CARD
      ===================================================== */}

      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-6">

        <motion.div
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
          transition={{
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative
            overflow-hidden
            rounded-[28px]
            border
            border-white/[0.08]
            bg-[#101522]/85
            px-6
            py-12
            text-center
            shadow-[0_25px_80px_rgba(0,0,0,0.18)]
            backdrop-blur-xl
            sm:px-12
            sm:py-14
          "
        >

          {/* Inner glow */}

          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-0
              h-32
              w-72
              -translate-x-1/2
              rounded-full
              bg-violet-500/[0.06]
              blur-[60px]
            "
          />

          <div className="relative z-10">

            {/* Badge */}

            <div
              className="
                mx-auto
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-violet-400/10
                bg-violet-500/[0.05]
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
                CareerPilot AI
              </span>
            </div>

            {/* Heading */}

            <h2
              className="
                mx-auto
                mt-6
                max-w-2xl
                text-3xl
                font-bold
                leading-tight
                tracking-tight
                text-white
                sm:text-4xl
                md:text-5xl
              "
            >
              Your next career move
              <span className="block text-violet-300">
                starts here.
              </span>
            </h2>

            {/* Description */}

            <p
              className="
                mx-auto
                mt-5
                max-w-xl
                text-sm
                leading-6
                text-gray-500
                sm:text-base
                sm:leading-7
              "
            >
              Analyze your resume, discover your career fit,
              build a personalized roadmap, and prepare for
              what comes next.
            </p>

            {/* Buttons */}

            <div
              className="
                mt-8
                flex
                flex-col
                items-center
                justify-center
                gap-3
                sm:flex-row
              "
            >

              {/* Get Started */}

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
                    py-3
                    text-sm
                    font-semibold
                    text-white
                    shadow-[0_8px_25px_rgba(139,92,246,0.18)]
                    transition-all
                    duration-300
                    hover:shadow-[0_10px_30px_rgba(139,92,246,0.28)]
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

              {/* Learn More */}

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
                    border-white/[0.08]
                    bg-white/[0.025]
                    px-6
                    py-3
                    text-sm
                    font-medium
                    text-gray-400
                    transition-all
                    duration-300
                    hover:border-white/[0.12]
                    hover:bg-white/[0.05]
                    hover:text-white
                  "
                >
                  Learn More
                </motion.button>
              </a>

            </div>

          </div>

          {/* Bottom accent */}

          <div
            className="
              pointer-events-none
              absolute
              bottom-0
              left-1/4
              right-1/4
              h-px
              bg-gradient-to-r
              from-transparent
              via-violet-400/30
              to-transparent
            "
          />

        </motion.div>

      </div>
    </section>
  );
}