import {
  Upload,
  FileSearch,
  Target,
  Map,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload your resume",
    description:
      "Start by uploading your resume. CareerPilot uses it as the foundation for your personalized career journey.",
  },
  {
    number: "02",
    icon: FileSearch,
    title: "Understand your profile",
    description:
      "AI analyzes your experience, skills, education, and strengths to build a clearer picture of where you stand.",
  },
  {
    number: "03",
    icon: Target,
    title: "Find your career fit",
    description:
      "Choose a target role and see how well your current skills align with what the role requires.",
  },
  {
    number: "04",
    icon: Map,
    title: "Build your roadmap",
    description:
      "Turn your skill gaps into a focused learning path so you know what to work on next.",
  },
  {
    number: "05",
    icon: MessageSquare,
    title: "Prepare with confidence",
    description:
      "Use AI-powered preparation to practice for interviews and become more ready for real opportunities.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="
        relative
        overflow-hidden
        bg-[#050816]
        py-20
        text-white
        sm:py-24
      "
    >
      {/* =========================
          AMBIENT GLOW
      ========================= */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/3
          h-80
          w-80
          -translate-x-1/2
          rounded-full
          bg-violet-600/[0.045]
          blur-[110px]
        "
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">

        {/* =========================
            HEADER
        ========================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.5,
          }}
          className="mx-auto max-w-2xl text-center"
        >
          <div
            className="
              mb-5
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
              How it works
            </span>
          </div>

          <h2
            className="
              text-3xl
              font-bold
              tracking-tight
              sm:text-4xl
              md:text-5xl
            "
          >
            Your journey with
            <span className="text-violet-300">
              {" "}CareerPilot.
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-xl
              text-sm
              leading-7
              text-gray-500
              sm:text-base
            "
          >
            From understanding your current profile to preparing
            for your next opportunity, CareerPilot guides you
            through each step.
          </p>
        </motion.div>

        {/* =========================
            TIMELINE
        ========================= */}

        <div className="relative mt-16">

          {/* Desktop connecting line */}

          <div
            className="
              absolute
              left-[10%]
              right-[10%]
              top-5
              hidden
              h-px
              bg-white/[0.08]
              lg:block
            "
          />

          {/* Animated progress line */}

          <motion.div
            initial={{
              scaleX: 0,
            }}
            whileInView={{
              scaleX: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 1.4,
              ease: "easeOut",
            }}
            className="
              absolute
              left-[10%]
              right-[10%]
              top-5
              hidden
              h-px
              origin-left
              bg-violet-400/30
              lg:block
            "
          />

          <div className="grid gap-7 lg:grid-cols-5 lg:gap-4">

            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.number}
                  initial={{
                    opacity: 0,
                    y: 18,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    margin: "-40px",
                  }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.45,
                  }}
                  className="
                    group
                    relative
                    lg:text-center
                  "
                >

                  {/* =========================
                      MOBILE LINE
                  ========================= */}

                  {index < steps.length - 1 && (
                    <div
                      className="
                        absolute
                        left-5
                        top-11
                        h-[calc(100%+28px)]
                        w-px
                        bg-white/[0.07]
                        lg:hidden
                      "
                    />
                  )}

                  <div className="relative flex gap-4 lg:block">

                    {/* =========================
                        TIMELINE NODE
                    ========================= */}

                    <motion.div
                      whileHover={{
                        scale: 1.08,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 18,
                      }}
                      className="
                        relative
                        z-10
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-violet-400/15
                        bg-[#101522]
                        shadow-[0_0_20px_rgba(139,92,246,0.08)]
                        lg:mx-auto
                      "
                    >
                      <Icon
                        size={16}
                        strokeWidth={1.8}
                        className="text-violet-300"
                      />

                      {/* Pulse */}

                      <motion.span
                        animate={{
                          scale: [1, 1.35, 1],
                          opacity: [0.25, 0, 0.25],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          delay: index * 0.25,
                        }}
                        className="
                          absolute
                          inset-0
                          rounded-full
                          border
                          border-violet-400/30
                        "
                      />
                    </motion.div>

                    {/* =========================
                        CONTENT
                    ========================= */}

                    <div className="min-w-0 flex-1 lg:mt-6">

                      <div
                        className="
                          text-[9px]
                          font-semibold
                          tracking-[1.8px]
                          text-violet-300/60
                        "
                      >
                        STEP {step.number}
                      </div>

                      <h3
                        className="
                          mt-1.5
                          text-base
                          font-semibold
                          text-white
                        "
                      >
                        {step.title}
                      </h3>

                      <p
                        className="
                          mt-2
                          text-[11px]
                          leading-5
                          text-gray-500
                          lg:px-2
                        "
                      >
                        {step.description}
                      </p>

                    </div>

                  </div>
                </motion.div>
              );
            })}

          </div>
        </div>

        {/* =========================
            END MESSAGE
        ========================= */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.97,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: 0.5,
            duration: 0.4,
          }}
          className="
            mx-auto
            mt-14
            flex
            max-w-fit
            items-center
            gap-2
            rounded-full
            border
            border-white/[0.06]
            bg-white/[0.025]
            px-4
            py-2
          "
        >
          <span
            className="
              h-1.5
              w-1.5
              rounded-full
              bg-violet-400
              shadow-[0_0_10px_rgba(139,92,246,0.6)]
            "
          />

          <span
            className="
              text-[9px]
              font-medium
              uppercase
              tracking-[1.4px]
              text-gray-600
            "
          >
            One journey · One workspace · Your career
          </span>
        </motion.div>

      </div>
    </section>
  );
}