import {
  ArrowRight,
  Check,
  Map,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

export default function ContinueJourney({ data, loading }) {
  const roadmap = data?.roadmaps?.[0];

  if (loading) {
    return <JourneySkeleton />;
  }

  if (!roadmap) {
    return <EmptyJourney />;
  }

  const phases = Array.isArray(roadmap.phases)
  ? roadmap.phases
  : [];

const milestones = phases.flatMap((phase) =>
  (phase.tasks || []).map((task) => ({
    ...task,
    phaseTitle: phase.title,
  }))
);

  const calculatedCompleted = milestones.filter(
    (item) =>
      item.completed === true ||
      item.isCompleted === true
  ).length;

  const completed = Number(
    roadmap.completedMilestones ??
      roadmap.completedTasks ??
      calculatedCompleted
  );

  const total = Number(
    roadmap.totalMilestones ??
      roadmap.totalTasks ??
      milestones.length
  );

  const progress =
  total > 0
    ? Math.min(
        Math.round((completed / total) * 100),
        100
      )
    : Number(roadmap.progress ?? 0);
  
    const roadmapCompleted =
  total > 0 && completed >= total;

  const visibleMilestones =
    milestones.length > 0
      ? milestones.slice(0, 7)
      : [];

  const nextMilestone = roadmapCompleted
    ? null
    : milestones.find(
        (task) =>
          !task.completed &&
          !task.isCompleted
      );

  const title =
    roadmap.title ||
    roadmap.targetRole ||
    roadmap.role ||
    roadmap.career ||
    "Your Career Roadmap";

  const currentIndex = Math.min(
    Math.max(completed, 0),
    Math.max(visibleMilestones.length - 1, 0)
  );

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
      }}
      className="group relative flex h-full overflow-hidden rounded-[30px] border border-white/[0.08] bg-[#101522] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.18)] sm:p-6"
    >




        
      {/* Background */}

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.12),transparent_30%),radial-gradient(circle_at_20%_100%,rgba(34,211,238,0.06),transparent_30%)]" />

      {/* Grid */}

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
{/* Moving glow */}

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




      <div className="relative z-10 flex w-full flex-col">

        {/* HEADER */}

        <div className="flex items-start justify-between gap-4">

          <div className="min-w-0">

            <div className="flex items-center gap-2">

              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.08]">
                <Map
                  size={15}
                  className="text-cyan-300"
                />
              </div>

              <span className="text-[10px] font-semibold uppercase tracking-[2.5px] text-cyan-300/80">
                Continue Your Journey
              </span>

            </div>

            <h3 className="mt-4 truncate text-xl font-bold tracking-tight text-white sm:text-2xl">
              {title}
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              {roadmapCompleted
                ? `${completed} of ${total} milestones completed`
                : `${completed} of ${total} milestones completed`}
            </p>

          </div>

          {/* PROGRESS */}

          <div className="flex shrink-0 items-center gap-3">

            <div className="text-right">

              <p className="text-[9px] uppercase tracking-[1.5px] text-gray-600">
                Progress
              </p>

              <p className="mt-0.5 text-2xl font-bold text-white">
                {progress}%
              </p>

            </div>

            <div className="relative h-11 w-11">

              <svg
                viewBox="0 0 48 48"
                className="-rotate-90"
              >

                <circle
                  cx="24"
                  cy="24"
                  r="19"
                  fill="none"
                  stroke="rgba(255,255,255,.07)"
                  strokeWidth="4"
                />

                <motion.circle
                  cx="24"
                  cy="24"
                  r="19"
                  fill="none"
                  stroke="url(#journeyGradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={119.4}
                  initial={{
                    strokeDashoffset: 119.4,
                  }}
                  animate={{
                    strokeDashoffset:
                      119.4 -
                      (Math.min(
                        Math.max(progress, 0),
                        100
                      ) /
                        100) *
                        119.4,
                  }}
                  transition={{
                    duration: 1.2,
                    ease: "easeOut",
                  }}
                />

                <defs>
                  <linearGradient
                    id="journeyGradient"
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
                      stopColor="#8b5cf6"
                    />
                  </linearGradient>
                </defs>

              </svg>

              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles
                  size={12}
                  className="text-violet-300"
                />
              </div>

            </div>

          </div>

        </div>

        {/* MILESTONES */}

        {visibleMilestones.length > 0 && (
          <div className="mt-8 overflow-x-auto pb-2 scrollbar-thin">

            <div className="relative min-w-[620px]">

              {/* Base line */}

              <div className="absolute left-0 right-0 top-4 h-px bg-white/[0.08]" />

              {/* Progress line */}

              <motion.div
                initial={{
                  width: 0,
                }}
                animate={{
                  width:
                    visibleMilestones.length > 1
                      ? `${Math.min(
                          (completed /
                            Math.max(
                              visibleMilestones.length - 1,
                              1
                            )) *
                            100,
                          100
                        )}%`
                      : completed > 0
                      ? "100%"
                      : "0%",
                }}
                transition={{
                  duration: 1.2,
                  ease: "easeOut",
                }}
                className="absolute left-0 top-4 h-px bg-gradient-to-r from-violet-500 via-fuchsia-400 to-cyan-400"
              />

              {/* Milestones */}

              <div className="relative flex justify-between gap-5">

                {visibleMilestones.map(
                  (milestone, index) => {

                    const isCompleted =
                      milestone.completed === true ||
                      milestone.isCompleted === true ||
                      index < completed;

                    const isCurrent =
                      !roadmapCompleted &&
                      !isCompleted &&
                      index === currentIndex;

                    const milestoneName =
                      milestone.title ||
                      milestone.name ||
                      milestone.skill ||
                      `Milestone ${index + 1}`;

                    return (
                      <motion.div
                        key={`${milestoneName}-${index}`}
                        initial={{
                          opacity: 0,
                          y: 8,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          delay:
                            0.15 +
                            index * 0.06,
                        }}
                        className="relative flex min-w-[72px] flex-1 flex-col items-center text-center"
                      >

                        {/* Node */}

                        <motion.div
                          whileHover={{
                            scale: 1.1,
                          }}
                          className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border ${
                            isCompleted
                              ? "border-violet-400/30 bg-violet-500/20"
                              : isCurrent
                              ? "border-cyan-300/50 bg-cyan-400/10"
                              : "border-white/10 bg-[#101522]"
                          }`}
                        >

                          {isCompleted ? (
                            <Check
                              size={13}
                              className="text-violet-300"
                            />
                          ) : (
                            <div
                              className={`h-2 w-2 rounded-full ${
                                isCurrent
                                  ? "bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,.8)]"
                                  : "bg-gray-700"
                              }`}
                            />
                          )}

                          {isCurrent && (
                            <motion.div
                              animate={{
                                scale: [
                                  1,
                                  1.7,
                                  1,
                                ],
                                opacity: [
                                  0.7,
                                  0,
                                  0.7,
                                ],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                              }}
                              className="absolute inset-0 rounded-full border border-cyan-300"
                            />
                          )}

                        </motion.div>

                        {/* Label */}

                        <p
                          className={`mt-3 max-w-[100px] text-[11px] leading-4 ${
                            isCurrent
                              ? "font-semibold text-cyan-200"
                              : isCompleted
                              ? "text-gray-300"
                              : "text-gray-600"
                          }`}
                        >
                          {milestoneName}
                        </p>

                        {isCurrent && (
                          <span className="mt-1 text-[8px] font-bold uppercase tracking-[1.5px] text-cyan-400">
                            You are here
                          </span>
                        )}

                      </motion.div>
                    );
                  }
                )}

              </div>

            </div>

          </div>
        )}

        {/* NO MILESTONES */}

        {visibleMilestones.length === 0 && (
          <div className="mt-8 rounded-2xl border border-white/[0.06] bg-white/[0.025] px-4 py-4">
            <p className="text-xs text-gray-500">
              {roadmapCompleted
                ? "Your roadmap is complete."
                : "Your roadmap milestones will appear here."}
            </p>
          </div>
        )}

        {/* BOTTOM */}

        <div className="mt-auto flex flex-col gap-4 border-t border-white/[0.06] pt-5 sm:flex-row sm:items-end sm:justify-between">

          <div className="min-w-0">

            <p className="text-[9px] font-semibold uppercase tracking-[2px] text-gray-600">
              {roadmapCompleted
                ? "Completed"
                : "Next Milestone"}
            </p>

            <h4 className="mt-1.5 truncate text-sm font-semibold text-white sm:text-base">
              {roadmapCompleted
                ? "Roadmap completed 🎉"
                : nextMilestone?.title ||
                  nextMilestone?.name ||
                  "Continue your roadmap"}
            </h4>

            <p className="mt-1 text-xs text-gray-500">
              {roadmapCompleted
                ? "Great work. You can now start your next career goal."
                : "Keep building momentum one milestone at a time."}
            </p>

          </div>

          {/*<motion.button
            whileHover={{
              x: 3,
            }}
            whileTap={{
              scale: 0.98,
            }}
            onClick={() => {
              window.location.href =
                "/roadmaps";
            }}
            className="group/btn flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-4 py-2.5 text-xs font-semibold text-white shadow-[0_8px_30px_rgba(139,92,246,.18)] transition-all duration-300 hover:shadow-[0_10px_35px_rgba(139,92,246,.3)]"
          >
            {roadmapCompleted
              ? "View Roadmap"
              : "Continue Roadmap"}

            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover/btn:translate-x-1"
            />

          </motion.button>*/}

<motion.button
  whileHover={{
    x: 3,
  }}
  whileTap={{
    scale: 0.96,
  }}
  onClick={() => {
    window.location.href = "/roadmaps";
  }}
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
    duration-300
    hover:border-violet-400/25
    hover:from-violet-500/[0.16]
    hover:to-cyan-500/[0.12]
    hover:shadow-[0_6px_20px_rgba(139,92,246,0.12)]
  "
>
  {roadmapCompleted
    ? "View Roadmap"
    : "Continue Roadmap"}

  <ArrowRight
    size={13}
    className="
      text-violet-300
      transition-transform
      duration-300
      group-hover/btn:translate-x-1
    "
  />
</motion.button>









        </div>

      </div>
    </motion.section>
  );
}


/* =========================================================
   EMPTY
========================================================= */

function EmptyJourney() {
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
      className="relative flex h-full overflow-hidden rounded-[30px] border border-white/[0.08] bg-[#101522] p-6"
    >

      <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-violet-500/[0.08] blur-[70px]" />

      <div className="relative z-10 flex flex-col">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10">
          <Map
            size={18}
            className="text-violet-300"
          />
        </div>

        <p className="mt-5 text-[10px] font-semibold uppercase tracking-[2.5px] text-violet-300/80">
          Your journey starts here
        </p>

        <h3 className="mt-2 text-xl font-bold text-white">
          Build your personalized roadmap
        </h3>

        <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
          Turn your career goals into a structured path with milestones designed around your skills and target role.
        </p>

        <motion.button
          whileHover={{
            y: -2,
          }}
          whileTap={{
            scale: 0.98,
          }}
          onClick={() => {
            window.location.href =
              "/roadmaps";
          }}
          className="mt-auto w-fit rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-4 py-2.5 text-xs font-semibold text-white"
        >
          Create Roadmap
        </motion.button>

      </div>

    </motion.section>
  );
}


/* =========================================================
   SKELETON
========================================================= */

function JourneySkeleton() {
  return (
    <div className="h-full min-h-[300px] animate-pulse rounded-[30px] border border-white/[0.08] bg-[#101522] p-6">

      <div className="h-8 w-44 rounded-lg bg-white/[0.06]" />

      <div className="mt-5 h-7 w-64 rounded-lg bg-white/[0.06]" />

      <div className="mt-8 h-8 rounded bg-white/[0.05]" />

      <div className="mt-8 h-14 rounded-2xl bg-white/[0.05]" />

    </div>
  );
}
