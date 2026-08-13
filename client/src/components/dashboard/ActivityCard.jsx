import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function ActivityCard({ data, loading }) {
  const activities = [];

  const resumes = data?.resumes || [];
  const careerMatches = data?.careerMatches || [];
  const roadmaps = data?.roadmaps || [];
  const interviews = data?.interviews || [];
  const applications = data?.applications || [];

  if (careerMatches.length > 0) {
    activities.push({
      title: "Career Match generated",
      time: formatTime(
        careerMatches[0]?.createdAt ||
          careerMatches[0]?.updatedAt
      ),
    });
  }

  if (roadmaps.length > 0) {
    activities.push({
      title: "Roadmap milestone completed",
      time: formatTime(
        roadmaps[0]?.updatedAt ||
          roadmaps[0]?.createdAt
      ),
    });
  }

  if (interviews.length > 0) {
    activities.push({
      title: "AI Interview completed",
      time: formatTime(
        interviews[0]?.createdAt ||
          interviews[0]?.updatedAt
      ),
    });
  }

  if (applications.length > 0) {
    activities.push({
      title: "Application generated",
      time: formatTime(
        applications[0]?.createdAt ||
          applications[0]?.updatedAt
      ),
    });
  }

  if (resumes.length > 0) {
    activities.push({
      title: "Resume analyzed",
      time: formatTime(
        resumes[0]?.createdAt ||
          resumes[0]?.updatedAt
      ),
    });
  }

  if (loading) {
    return (
      <div className="animate-pulse">

        <div className="mb-5">
          <div className="h-6 w-40 rounded bg-white/10" />

          <div className="mt-2 h-4 w-52 rounded bg-white/10" />
        </div>

        <div className="space-y-5">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-8 rounded bg-white/5"
            />
          ))}
        </div>

      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-t border-white/10 pt-8"
    >

      <div className="mb-6">

        <p className="text-xs font-semibold uppercase tracking-[3px] text-violet-300">
          Activity
        </p>

        <h2 className="mt-2 text-2xl font-bold text-white">
          Recent Activity
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Your latest career progress
        </p>

      </div>

      {activities.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

          <p className="text-sm text-gray-400">
            No activity yet. Start by uploading your resume.
          </p>

        </div>
      ) : (
        <div className="space-y-5">

          {activities.slice(0, 5).map(
            (activity, index) => (
              <div
                key={`${activity.title}-${index}`}
                className="flex items-center gap-4"
              >

                {/* Timeline icon */}

                <div className="relative flex h-8 w-8 shrink-0 items-center justify-center">

                  <CheckCircle2
                    size={18}
                    className="text-emerald-400"
                  />

                  {index !==
                    Math.min(activities.length, 5) - 1 && (
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
            )
          )}

        </div>
      )}

    </motion.div>
  );
}


/* =========================================================
   DATE / TIME FORMATTER
========================================================= */

function formatTime(dateValue) {
  if (!dateValue) {
    return "Recently";
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "Recently";
  }

  const now = new Date();

  const diff =
    Math.floor(
      (now.getTime() - date.getTime()) / 1000
    );

  const minutes = Math.floor(diff / 60);
  const hours = Math.floor(diff / 3600);
  const days = Math.floor(diff / 86400);

  if (diff < 60) {
    return "Just now";
  }

  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  if (hours < 24) {
    return `${hours}h ago`;
  }

  if (days === 1) {
    return "Yesterday";
  }

  if (days < 7) {
    return `${days}d ago`;
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}