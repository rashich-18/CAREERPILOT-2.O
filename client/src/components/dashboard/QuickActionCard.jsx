/*import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function QuickActionCard({
  title,
  subtitle,
  icon,
  path,
}) {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      whileTap={{
        scale: 0.98,
      }}
      onClick={() => navigate(path)}
      className="group cursor-pointer rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:border-violet-500/40 hover:shadow-[0_0_35px_rgba(139,92,246,0.25)]"
    >
      <div className="flex items-center justify-between">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 text-violet-300">
          {icon}
        </div>

        <ArrowRight
          className="transition duration-300 group-hover:translate-x-1"
        />

      </div>

      <h3 className="mt-6 text-lg font-semibold text-white">
        {title}
      </h3>

      <p className="mt-2 text-sm text-gray-400">
        {subtitle}
      </p>
    </motion.div>
  );
}*/


import {
  ArrowUpRight,
  FileText,
  Map,
  Mic2,
} from "lucide-react";
import { motion } from "framer-motion";

const actions = [
  {
    title: "Analyze Resume",
    description: "Get your AI resume score",
    icon: FileText,
    iconClass: "text-violet-400",
    bgClass: "bg-violet-500/10",
  },
  {
    title: "View Roadmap",
    description: "Continue your career path",
    icon: Map,
    iconClass: "text-cyan-400",
    bgClass: "bg-cyan-500/10",
  },
  {
    title: "Practice Interview",
    description: "Test your interview readiness",
    icon: Mic2,
    iconClass: "text-emerald-400",
    bgClass: "bg-emerald-500/10",
  },
];

export default function QuickActions() {
  return (
    <div>
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-white">
          Quick Actions
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Jump back into your career journey
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {actions.map((action, index) => {
          const Icon = action.icon;

          return (
            <motion.button
              key={action.title}
              type="button"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -3 }}
              className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]"
            >
              <div className="flex items-center gap-4">

                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${action.bgClass}`}
                >
                  <Icon
                    size={20}
                    className={action.iconClass}
                  />
                </div>

                <div>
                  <h3 className="font-medium text-white">
                    {action.title}
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    {action.description}
                  </p>
                </div>

              </div>

              <ArrowUpRight
                size={18}
                className="text-gray-600 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
              />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}