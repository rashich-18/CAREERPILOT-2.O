import { Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
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
          SUBTLE BACKGROUND
      ========================= */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-72
          w-72
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-violet-600/[0.05]
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
          className="mx-auto max-w-3xl text-center"
        >
          {/* Label */}

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
              Why CareerPilot
            </span>
          </div>

          {/* Heading */}

          <h2
            className="
              text-3xl
              font-bold
              tracking-tight
              sm:text-4xl
              md:text-5xl
            "
          >
            Your career shouldn't
            <span className="text-violet-300">
              {" "}feel like guesswork.
            </span>
          </h2>

          {/* Description */}

          <p
            className="
              mx-auto
              mt-5
              max-w-2xl
              text-sm
              leading-7
              text-gray-500
              sm:text-base
            "
          >
            Building a career can feel overwhelming when you don't
            know what to focus on, what to improve, or what step to
            take next. CareerPilot brings clarity to that journey
            with an AI-powered workspace built around you.
          </p>
        </motion.div>

        {/* =========================
            MAIN MESSAGE
        ========================= */}

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
            delay: 0.12,
            duration: 0.5,
          }}
          className="
            mx-auto
            mt-12
            max-w-4xl
            rounded-2xl
            border
            border-white/[0.07]
            bg-[#101522]/80
            p-6
            backdrop-blur-xl
            sm:p-8
          "
        >
          <div className="grid gap-8 md:grid-cols-[1fr_auto_1fr] md:items-center">

            {/* LEFT */}

            <div>
              <p
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[1.8px]
                  text-gray-600
                "
              >
                The idea
              </p>

              <h3
                className="
                  mt-2
                  text-xl
                  font-semibold
                  text-white
                "
              >
                From uncertainty to direction.
              </h3>

              <p
                className="
                  mt-3
                  text-[11px]
                  leading-5
                  text-gray-500
                "
              >
                Instead of searching through countless resources
                and trying to figure everything out yourself,
                CareerPilot helps turn your career goals into
                a clearer, more actionable journey.
              </p>
            </div>

            {/* CENTER */}

            <motion.div
              animate={{
                x: [0, 4, 0],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                hidden
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                border-violet-400/10
                bg-violet-500/[0.07]
                md:flex
              "
            >
              <ArrowRight
                size={16}
                className="text-violet-300"
              />
            </motion.div>

            {/* RIGHT */}

            <div>
              <p
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[1.8px]
                  text-gray-600
                "
              >
                The goal
              </p>

              <h3
                className="
                  mt-2
                  text-xl
                  font-semibold
                  text-white
                "
              >
                Make better career decisions.
              </h3>

              <p
                className="
                  mt-3
                  text-[11px]
                  leading-5
                  text-gray-500
                "
              >
                CareerPilot is designed to give you a clearer
                understanding of where you are, where you want
                to go, and how to move forward with confidence.
              </p>
            </div>

          </div>
        </motion.div>

        {/* =========================
            BOTTOM LINE
        ========================= */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: 0.3,
            duration: 0.5,
          }}
          className="
            mt-8
            flex
            items-center
            justify-center
            gap-2
          "
        >
          <motion.span
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="
              h-1.5
              w-1.5
              rounded-full
              bg-violet-400
              shadow-[0_0_10px_rgba(139,92,246,0.6)]
            "
          />

          <p
            className="
              text-[9px]
              font-medium
              uppercase
              tracking-[1.5px]
              text-gray-600
            "
          >
            Built to make your next step clearer
          </p>
        </motion.div>

      </div>
    </section>
  );
}