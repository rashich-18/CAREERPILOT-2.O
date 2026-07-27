import { Briefcase, FileText, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardPreview() {
  return (
    <motion.div
  animate={{ y: [0, -8, 0] }}
  transition={{
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="relative w-[380px] rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-2xl shadow-2xl"
>

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm text-gray-400">
            CareerPilot AI
          </p>

          <h2 className="text-xl font-bold text-white">
            Dashboard
          </h2>
        </div>

        <div className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-medium text-green-400">
          ● Online
        </div>

      </div>

      {/* Resume Score */}

      <div className="mt-8">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2 text-gray-300">
            <FileText size={18} />
            Resume Score
          </div>

          <span className="font-bold text-white">
            92%
          </span>

        </div>

        <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-700">

          <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"></div>

        </div>

      </div>

      {/* Recommended Role */}

      <div className="mt-8 rounded-2xl bg-white/5 p-4">

        <div className="flex items-center gap-2 text-gray-300">
          <Briefcase size={18} />
          Recommended Role
        </div>

        <h3 className="mt-2 text-lg font-semibold text-white">
          Full Stack Developer
        </h3>

      </div>

      {/* Skills */}

      <div className="mt-8">

        <p className="mb-3 text-gray-300">
          Top Skills
        </p>

        <div className="flex flex-wrap gap-2">

          <span className="rounded-full bg-violet-500/20 px-3 py-1 text-sm text-violet-300">
            React
          </span>

          <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-sm text-cyan-300">
            Node.js
          </span>

          <span className="rounded-full bg-pink-500/20 px-3 py-1 text-sm text-pink-300">
            MongoDB
          </span>

        </div>

      </div>

      {/* Footer */}

      <div className="mt-8 flex items-center justify-between rounded-2xl bg-white/5 p-4">

        <div className="flex items-center gap-2 text-gray-300">
          <TrendingUp size={18} />
          Career Growth
        </div>

        <span className="font-semibold text-green-400">
          Excellent ↗
        </span>

      </div>

    </motion.div>
  );
}
