import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Trophy, Clock } from "lucide-react";

export default function AIMissionCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -3 }}
      className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 via-slate-900/80 to-cyan-500/10 p-8 backdrop-blur-xl"
    >
      {/* Glow Effects */}

      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-violet-500/20 blur-[120px]" />

      <div className="absolute -bottom-20 left-0 h-52 w-52 rounded-full bg-cyan-500/20 blur-[120px]" />

      <div className="relative z-10">

        {/* Header */}

        <div className="flex items-center gap-3">

          <div className="rounded-2xl bg-violet-500/20 p-3">

            <Sparkles className="text-violet-300" size={24} />

          </div>

          <div>

            <h2 className="text-2xl font-bold text-white">
              Mission of the Day
            </h2>

            <p className="text-gray-400">
              Your personalized next step
            </p>

          </div>

        </div>

        {/* Mission */}

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">

          <p className="text-sm uppercase tracking-widest text-violet-300">
            TODAY'S FOCUS
          </p>

          <h3 className="mt-2 text-3xl font-bold text-white">
            Upload Your Resume
          </h3>

          <p className="mt-3 max-w-xl text-gray-400">
            Upload your resume to unlock AI Resume Analysis,
            Career Matching, Personalized Roadmap,
            And Interview Preparation.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">

            <div className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2">

              <Clock size={16} className="text-cyan-300" />

              <span className="text-sm text-gray-300">
                5 mins
              </span>

            </div>

          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group mt-8 flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 px-7 py-4 font-semibold text-white shadow-[0_0_35px_rgba(139,92,246,0.35)]"
          >
            Start Mission

            <ArrowRight
              size={18}
              className="transition group-hover:translate-x-1"
            />

          </motion.button>

        </div>

      </div>

    </motion.div>
  );
}