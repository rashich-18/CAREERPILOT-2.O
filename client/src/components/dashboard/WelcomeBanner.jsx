{/*import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function WelcomeBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
    >
      {/* Glow */}
      {/*<div className="absolute -top-24 -right-20 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl" />

      <div className="relative z-10">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-violet-500/20 p-3">
            <Sparkles className="text-violet-300" />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-white">
              Welcome Back, Rashi 👋
            </h1>

            <p className="mt-2 text-gray-400">
              Your AI Career Coach is ready to help you land your dream job.
            </p>

          </div>

        </div>

      </div>
    </motion.div>
  );
}*/}




import { ArrowRight, Briefcase, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-[#141827] via-[#171b2d] to-[#24163f] p-8"
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

        {/* LEFT */}

        <div>

          <div className="mb-4 flex items-center gap-2">

            <Sparkles
              size={20}
              className="text-violet-400"
            />

            <p className="text-sm uppercase tracking-[4px] text-violet-300">
              CareerPilot AI
            </p>

          </div>

          <h1 className="text-5xl font-bold text-white">

            Good Evening,
            <br />

            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Rashi 👋
            </span>

          </h1>

          <p className="mt-5 max-w-xl text-lg text-gray-400">

            You're building your journey toward becoming a
            Software Engineer at Google.

          </p>

        </div>

        {/* RIGHT */}

        <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

          <div className="flex items-center gap-3">

            <Briefcase
              className="text-cyan-400"
            />

            <div>

              <p className="text-sm text-gray-400">
                Dream Company
              </p>

              <h3 className="text-lg font-semibold text-white">
                Google
              </h3>

            </div>

          </div>

          <div className="mt-8">

            <div className="mb-2 flex justify-between text-sm">

              <span className="text-gray-400">
                Career Progress
              </span>

              <span className="text-violet-300">
                38%
              </span>

            </div>

            <div className="h-2 rounded-full bg-white/10">

              <div className="h-full w-[38%] rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />

            </div>

          </div>

          <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 py-3 font-semibold text-white transition hover:scale-[1.02]">

            Continue Journey

            <ArrowRight size={18} />

          </button>

        </div>

      </div>
    </motion.div>
  );
}