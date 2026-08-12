import { FileText, Target, Route, Mic } from "lucide-react";

const stats = [
  {
    label: "Resume",
    value: 82,
    icon: FileText,
    color: "from-violet-500 to-fuchsia-500",
  },
  {
    label: "ATS",
    value: 76,
    icon: Target,
    color: "from-cyan-500 to-blue-500",
  },
  {
    label: "Roadmap",
    value: 42,
    icon: Route,
    color: "from-emerald-500 to-green-500",
  },
  {
    label: "Interview",
    value: 18,
    icon: Mic,
    color: "from-amber-500 to-orange-500",
  },
];

export default function CareerSnapshot() {
  const overall = Math.round(
    stats.reduce((sum, item) => sum + item.value, 0) / stats.length
  );

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[3px] text-violet-300">
            AI Career Snapshot
          </p>
          <h2 className="mt-2 text-2xl font-bold text-white">
            Internship Readiness
          </h2>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-center">
          <p className="text-[11px] uppercase tracking-[2px] text-gray-400">
            Overall
          </p>
          <p className="mt-1 text-2xl font-bold text-white">{overall}%</p>
        </div>
      </div>

      <div className="space-y-5">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.label}>
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} shadow-lg`}
                  >
                    <Icon size={18} className="text-white" />
                  </div>

                  <div>
                    <p className="font-medium text-white">{item.label}</p>
                    <p className="text-sm text-gray-400">
                      {item.label === "Interview"
                        ? "Start practicing"
                        : item.label === "Roadmap"
                        ? "In progress"
                        : "Looking good"}
                    </p>
                  </div>
                </div>

                <span className="text-sm font-semibold text-white">
                  {item.value}%
                </span>
              </div>

              <div className="h-2 rounded-full bg-white/10">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${item.color} transition-all duration-700`}
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 rounded-2xl border border-violet-500/20 bg-gradient-to-r from-violet-500/10 to-cyan-500/10 p-4">
        <p className="text-sm font-medium text-white">
          Your strongest area is <span className="text-violet-300">Resume Quality</span>.
        </p>
        <p className="mt-1 text-sm text-gray-300">
          Focus on interview practice to improve your overall readiness the fastest.
        </p>
      </div>
    </div>
  );
}