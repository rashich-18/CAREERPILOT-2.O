import {
  FileSearch,
  Brain,
  Briefcase,
  ChartColumn,
  Send,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    number: "01",
    title: "AI Resume Analysis",
    description:
      "Upload your resume and get AI-powered insights, ATS feedback, keyword suggestions, and actionable improvements.",
    icon: FileSearch,
  },
  {
    number: "02",
    title: "Career Match",
    description:
      "Compare your skills with a target role, discover your strengths, identify skill gaps, and see how ready you are to apply.",
    icon: ChartColumn,
  },
  {
    number: "03",
    title: "Personalized Roadmap",
    description:
      "Get a clear learning path based on your current skills and the career you're working toward.",
    icon: Briefcase,
  },
  {
    number: "04",
    title: "AI Interview",
    description:
      "Practice realistic interview questions tailored to your resume, skills, and target career.",
    icon: Brain,
  },
  {
    number: "05",
    title: "Job Applications",
    description:
      "Turn your career preparation into action with smarter job application support and personalized opportunities.",
    icon: Send,
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="
        relative
        overflow-hidden
        bg-[#050816]
        py-24
        text-white
        sm:py-28
      "
    >
      {/* Background glow */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[420px]
          w-[420px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-violet-600/[0.045]
          blur-[140px]
        "
      />

      <div className="relative mx-auto max-w-6xl px-6">

        {/* HEADER */}

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
          <p
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[3px]
              text-violet-400
            "
          >
            Everything you need
          </p>

          <h2
            className="
              mt-5
              text-3xl
              font-bold
              tracking-tight
              sm:text-4xl
              lg:text-5xl
            "
          >
            Your career journey,
            <span
              className="
                ml-2
                bg-gradient-to-r
                from-violet-400
                to-cyan-400
                bg-clip-text
                text-transparent
              "
            >
              powered by AI.
            </span>
          </h2>

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
            From improving your resume to preparing for interviews
            and finding your next opportunity, CareerPilot brings
            everything together in one place.
          </p>
        </motion.div>

        {/* FEATURE GRID */}

        <div
          className="
            mx-auto
            mt-14
            grid
            max-w-5xl
            gap-4
            sm:mt-16
            sm:grid-cols-2
            lg:grid-cols-6
          "
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;

            const isLast = index === 4;

            return (
              <motion.div
                key={feature.title}
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
                  duration: 0.45,
                  delay: index * 0.07,
                }}
                className={`
                  group
                  relative
                  overflow-hidden
                  rounded-[24px]
                  border
                  border-white/[0.07]
                  bg-white/[0.025]
                  p-6
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-violet-400/20
                  hover:bg-white/[0.035]

                  ${
                    isLast
                      ? "sm:col-span-2 lg:col-span-2 lg:col-start-3"
                      : "lg:col-span-2"
                  }
                `}
              >

                {/* Hover glow */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    -right-16
                    -top-16
                    h-32
                    w-32
                    rounded-full
                    bg-violet-500/[0.08]
                    blur-[55px]
                    opacity-0
                    transition-opacity
                    duration-500
                    group-hover:opacity-100
                  "
                />

                {/* Top */}

                <div
                  className="
                    relative
                    flex
                    items-center
                    justify-between
                  "
                >
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-violet-400/10
                      bg-violet-500/[0.07]
                      text-violet-300
                      transition-all
                      duration-300
                      group-hover:border-violet-400/20
                      group-hover:bg-violet-500/[0.11]
                    "
                  >
                    <Icon
                      size={20}
                      strokeWidth={1.7}
                    />
                  </div>

                  <span
                    className="
                      text-[10px]
                      font-medium
                      tracking-[1px]
                      text-gray-700
                    "
                  >
                    {feature.number}
                  </span>
                </div>

                {/* Content */}

                <div className="relative mt-7">

                  <h3
                    className="
                      text-xl
                      font-semibold
                      tracking-tight
                      text-white
                    "
                  >
                    {feature.title}
                  </h3>

                  <p
                    className="
                      mt-3
                      text-sm
                      leading-6
                      text-gray-500
                    "
                  >
                    {feature.description}
                  </p>

                </div>

                {/* Arrow */}

                <ArrowUpRight
                  size={15}
                  className="
                    absolute
                    bottom-6
                    right-6
                    text-gray-700
                    transition-all
                    duration-300
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                    group-hover:text-violet-300
                  "
                />

                {/* Bottom accent */}

                <div
                  className="
                    absolute
                    bottom-0
                    left-7
                    right-7
                    h-px
                    origin-left
                    scale-x-0
                    bg-gradient-to-r
                    from-violet-400/60
                    to-cyan-400/40
                    transition-transform
                    duration-500
                    group-hover:scale-x-100
                  "
                />

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}