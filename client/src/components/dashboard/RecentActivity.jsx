import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const activities = [
  {
    title: "Profile completed",
    time: "Today",
  },
  {
    title: "Skills and interests added",
    time: "Today",
  },
  {
    title: "Career goals updated",
    time: "Yesterday",
  },
];

export default function RecentActivity() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="border-t border-white/10 pt-8"
    >
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-white">
          Recent Activity
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Your latest progress
        </p>
      </div>

      <div className="space-y-5">
        {activities.map((activity, index) => (
          <div
            key={activity.title}
            className="flex items-center gap-4"
          >
            {/* Timeline */}
            <div className="relative flex h-8 w-8 shrink-0 items-center justify-center">
              <CheckCircle2
                size={18}
                className="text-emerald-400"
              />

              {index !== activities.length - 1 && (
                <div className="absolute left-1/2 top-8 h-5 w-px -translate-x-1/2 bg-white/10" />
              )}
            </div>

            {/* Activity */}
            <div className="flex w-full items-center justify-between">

              <p className="text-sm text-gray-300">
                {activity.title}
              </p>

              <span className="text-xs text-gray-600">
                {activity.time}
              </span>

            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
} 