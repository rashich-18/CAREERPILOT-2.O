import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function WelcomeBanner({ data, loading }) {
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

  const resume = data?.resumes?.[0];
  const match = data?.careerMatches?.[0];
  const roadmap = data?.roadmaps?.[0];

  const resumeScore =
    resume?.score ??
    resume?.resumeScore ??
    resume?.overallScore ??
    0;

  const matchScore =
    match?.matchPercentage ??
    match?.matchScore ??
    match?.score ??
    0;

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-[#141827] via-[#171b2d] to-[#24163f] p-8"
    >

      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet-500/15 blur-3xl" />

      <div className="absolute -bottom-24 right-32 h-60 w-60 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative z-10">

        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          <div className="max-w-2xl">

            <div className="mb-4 flex items-center gap-2">

              <Sparkles
                size={19}
                className="text-violet-400"
              />

              <span className="text-sm uppercase tracking-[3px] text-violet-300">
                CareerPilot AI
              </span>

            </div>

            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              {greeting},{" "}
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                {name} 👋
              </span>
            </h1>

            <p className="mt-4 text-lg text-gray-400">
              Here's your career progress at a glance.
            </p>

            <div className="mt-8">

              <div className="mb-2 flex items-center justify-between">

                <span className="text-sm font-medium text-gray-300">
                  Career readiness
                </span>

                <span className="text-sm font-bold text-violet-300">
                  {loading ? "--" : `${readiness}%`}
                </span>

              </div>

              <div className="h-3 overflow-hidden rounded-full bg-white/10">

                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-1000"
                  style={{
                    width: `${readiness}%`,
                  }}
                />

              </div>

              <p className="mt-3 text-sm text-gray-500">
                {readiness >= 70
                  ? "You're making strong progress toward your target role."
                  : readiness > 0
                  ? "You're making steady progress toward your target role."
                  : "Complete your profile and career analysis to get started."}
              </p>

            </div>

          </div>

          {/* Career visual */}

          <div className="hidden h-44 w-44 shrink-0 items-center justify-center rounded-full border border-violet-500/20 bg-violet-500/5 lg:flex">

            <div className="flex h-32 w-32 items-center justify-center rounded-full border border-cyan-400/20 bg-gradient-to-br from-violet-500/10 to-cyan-500/10">

              <Sparkles
                size={42}
                className="text-violet-300"
              />

            </div>

          </div>

        </div>

      </div>

    </motion.div>
  );
}