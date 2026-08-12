import { ArrowUpRight, Brain } from "lucide-react";
import { motion } from "framer-motion";

export default function AIInsight() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="rounded-3xl border border-white/10 bg-white/[0.03] p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10">
            <Brain
              size={19}
              className="text-cyan-400"
            />
          </div>

          <div>
            <h2 className="font-semibold text-white">
              AI Insight
            </h2>

            <p className="text-xs text-gray-500">
              Based on your current profile
            </p>
          </div>

        </div>

        <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-300">
          CareerPilot AI
        </span>

      </div>

      {/* Insight */}
      <div className="mt-6">

        <p className="max-w-3xl text-lg leading-8 text-gray-300">

          Your profile shows strong{" "}
          <span className="font-medium text-violet-300">
            frontend
          </span>{" "}
          fundamentals.

          <br />

          Strengthening your{" "}
          <span className="font-medium text-cyan-300">
            backend skills
          </span>{" "}
          next could make you more prepared for full-stack
          internship opportunities.

        </p>

      </div>

      {/* Action */}
      <button
        type="button"
        className="mt-6 flex items-center gap-2 text-sm font-medium text-gray-300 transition hover:text-white"
      >
        View your roadmap

        <ArrowUpRight size={16} />
      </button>

    </motion.div>
  );
}