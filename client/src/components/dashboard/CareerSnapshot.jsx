import {
  FileText,
  Target,
  Map,
  Mic2,
} from "lucide-react";

export default function CareerSnapshot({ data, loading }) {
  const resume = data?.resumes?.[0];
  const match = data?.careerMatches?.[0];
  const roadmap = data?.roadmaps?.[0];
  const interviews = data?.interviews || [];

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

  const interviewCount = interviews.length;

  const latestInterview = interviews[0];

  const interviewScore =
    latestInterview?.score ??
    latestInterview?.percentage ??
    0;

  const stats = [
    {
      label: "Resume",
      value: `${resumeScore}/100`,
      subtitle: resume ? "Analyzed ✓" : "Not analyzed",
      icon: FileText,
      iconClass: "text-violet-400",
      bgClass: "bg-violet-500/10",
    },
    {
      label: "Career Match",
      value: `${matchScore}%`,
      subtitle:
        matchScore >= 70
          ? "Good match"
          : matchScore > 0
          ? "Needs improvement"
          : "Not generated",
      icon: Target,
      iconClass: "text-cyan-400",
      bgClass: "bg-cyan-500/10",
    },
    {
      label: "Roadmap",
      value: `${roadmapProgress}%`,
      subtitle:
        roadmapProgress > 0
          ? "In progress"
          : "Not started",
      icon: Map,
      iconClass: "text-emerald-400",
      bgClass: "bg-emerald-500/10",
    },
    {
      label: "Interview",
      value: `${interviewCount} done`,
      subtitle:
        interviewCount > 0
          ? `Latest: ${interviewScore}%`
          : "Start practicing",
      icon: Mic2,
      iconClass: "text-amber-400",
      bgClass: "bg-amber-500/10",
    },
  ];

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-36 animate-pulse rounded-2xl border border-white/10 bg-white/[0.03]"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]"
          >
            <div className="flex items-start justify-between">

              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.bgClass}`}
              >
                <Icon
                  size={20}
                  className={stat.iconClass}
                />
              </div>

              <span className="text-xs text-gray-600">
                AI
              </span>

            </div>

            <p className="mt-5 text-sm text-gray-400">
              {stat.label}
            </p>

            <p className="mt-1 text-2xl font-bold text-white">
              {stat.value}
            </p>

            <p className="mt-1 text-xs text-gray-500">
              {stat.subtitle}
            </p>

          </div>
        );
      })}
    </div>
  );
}