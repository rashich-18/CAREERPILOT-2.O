import { Clock } from "lucide-react";

const activities = [
  {
    title: "Account Created",
    time: "Today",
  },
  {
    title: "Profile Setup Pending",
    time: "Now",
  },
  {
    title: "Resume Upload",
    time: "Waiting",
  },
];

export default function ActivityCard() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

      <h2 className="mb-6 text-xl font-bold text-white">
        Recent Activity
      </h2>

      <div className="space-y-5">

        {activities.map((item) => (
          <div
            key={item.title}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">

              <div className="rounded-lg bg-violet-500/20 p-2">
                <Clock
                  size={18}
                  className="text-violet-300"
                />
              </div>

              <p className="text-gray-300">
                {item.title}
              </p>

            </div>

            <span className="text-sm text-gray-500">
              {item.time}
            </span>

          </div>
        ))}

      </div>

    </div>
  );
}