import { useEffect, useState } from "react";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import WelcomeBanner from "../components/dashboard/WelcomeBanner";
import CareerSnapshot from "../components/dashboard/CareerSnapshot";
import ActivityCard from "../components/dashboard/ActivityCard";
import TodaysFocus from "../components/dashboard/TodaysFocus";
import ContinueJourney from "../components/dashboard/ContinueJourney";
import LatestCareerMatch from "../components/dashboard/LatestCareerMatch";
import QuickActions from "../components/dashboard/QuickActions";
import { getDashboardData } from "../api/dashboardApi";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    resumes: [],
    careerMatches: [],
    roadmaps: [],
    interviews: [],
    applications: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getDashboardData();

        setDashboardData(data);
      } catch (err) {
        console.error("Dashboard API Error:", err);
        setError("Unable to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        loadDashboard();
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, []);

  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-[1600px] space-y-8 pb-12 sm:space-y-10">

        {/* =====================================================
            HERO
        ===================================================== */}

        <WelcomeBanner
          data={dashboardData}
          loading={loading}
        />

        {/* =====================================================
            ERROR
        ===================================================== */}

        {error && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-300">
            {error}
          </div>
        )}

        {/* =====================================================
            SNAPSHOT + TODAY'S FOCUS
        ===================================================== */}
<section className="grid items-stretch gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">

  {/* LEFT */}
  <div className="flex min-w-0 flex-col">

    <SectionHeading
      eyebrow="Overview"
      title="Your career at a glance"
      description="A quick look at your current career readiness."
    />

    <div className="mt-6 flex-1">
      <CareerSnapshot
        data={dashboardData}
        loading={loading}
      />
    </div>

  </div>

  {/* RIGHT */}
  <div className="h-full">
    <TodaysFocus
      data={dashboardData}
      loading={loading}
    />
  </div>

</section>

{/* =====================================================
    JOURNEY + CAREER MATCH
===================================================== */}

<section className="grid items-stretch gap-6 lg:grid-cols-[1.1fr_0.9fr]">

  {/* Continue Your Journey */}

  <div className="min-w-0">
    <ContinueJourney
      data={dashboardData}
      loading={loading}
    />
  </div>

  {/* Latest Career Match */}

  <div className="min-w-0">
    <LatestCareerMatch
      data={dashboardData}
      loading={loading}
    />
  </div>

</section>
        
{/* =====================================================
    QUICK ACTIONS + RECENT ACTIVITY
===================================================== */}

<section className="grid items-stretch gap-5 xl:grid-cols-[0.82fr_1.18fr]">

  {/* ===================================================
      QUICK ACTIONS
  =================================================== */}

  <div className="min-w-0">
    <QuickActions
      data={dashboardData}
    />
  </div>

  {/* ===================================================
      RECENT ACTIVITY
  =================================================== */}

  <div className="min-w-0">
    <ActivityCard
      data={dashboardData}
      loading={loading}
    />
  </div>

</section>
        
      </div>
    </DashboardLayout>
  );
}

/* =========================================================
   SECTION HEADING
========================================================= */

function SectionHeading({
  eyebrow,
  title,
  description,
}) {
  return (
    <div className="mb-5">
      <p className="text-[10px] font-semibold uppercase tracking-[3px] text-violet-300/80 sm:text-[11px]">
        {eyebrow}
      </p>

      <h2 className="mt-1.5 text-xl font-bold tracking-tight text-white sm:text-2xl">
        {title}
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        {description}
      </p>
    </div>
  );
}






{/*import { useEffect, useState } from "react";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import WelcomeBanner from "../components/dashboard/WelcomeBanner";
import CareerSnapshot from "../components/dashboard/CareerSnapshot";
import RecentActivity from "../components/dashboard/ActivityCard";
import { getDashboardData } from "../api/dashboardApi";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    resumes: [],
    careerMatches: [],
    roadmaps: [],
    interviews: [],
    applications: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getDashboardData();

      setDashboardData(data);
    } catch (err) {
      console.error("Dashboard API Error:", err);
      setError("Unable to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  loadDashboard();

  const handleVisibilityChange = () => {
    if (document.visibilityState === "visible") {
      loadDashboard();
    }
  };

  document.addEventListener(
    "visibilitychange",
    handleVisibilityChange
  );

  return () => {
    document.removeEventListener(
      "visibilitychange",
      handleVisibilityChange
    );
  };
}, []);

  return (
    <DashboardLayout>
      <div className="space-y-10">

        {/* HERO 
        <WelcomeBanner
          data={dashboardData}
          loading={loading}
        />

        {/* ERROR 
        {error && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-300">
            {error}
          </div>
        )}

        {/* CAREER SNAPSHOT 
        <section>
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-[3px] text-violet-300">
              Overview
            </p>

            <h2 className="mt-2 text-2xl font-bold text-white">
              Career Snapshot
            </h2>
          </div>

          <CareerSnapshot
            data={dashboardData}
            loading={loading}
          />
        </section>

        {/* ACTIVITY 
        <section>
          <RecentActivity
            data={dashboardData}
            loading={loading}
          />
        </section>

      </div>
    </DashboardLayout>
  );
}*/}

















{/* =========================================================
   CONTINUE JOURNEY
========================================================= 

function ContinueJourney({ data, loading }) {
  const roadmap = data?.roadmaps?.[0];

  if (loading) {
    return <LoadingCard />;
  }

  if (!roadmap) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl">
        <h3 className="text-xl font-semibold text-white">
          Start your career roadmap
        </h3>

        <p className="mt-2 text-gray-400">
          Generate a personalized roadmap to begin your journey.
        </p>

        <button
          onClick={() => {
            window.location.href = "/roadmaps";
          }}
          className="mt-6 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-5 py-3 font-semibold text-white transition hover:scale-[1.02]"
        >
          Generate Roadmap →
        </button>
      </div>
    );
  }

  const completed =
    roadmap.completedMilestones ??
    roadmap.completed ??
    0;

  const total =
    roadmap.totalMilestones ??
    roadmap.total ??
    roadmap.milestones?.length ??
    0;

  const progress =
    total > 0
      ? Math.round((completed / total) * 100)
      : roadmap.progress ?? 0;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-[#141827] via-[#171b2d] to-[#211638] p-7 backdrop-blur-xl">

      <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative z-10">

        <p className="text-sm font-medium text-violet-300">
          Your next best step
        </p>

        <h3 className="mt-3 text-2xl font-bold text-white">
          Continue your{" "}
          {roadmap.title ||
            roadmap.role ||
            "career"}{" "}
          roadmap
        </h3>

        <p className="mt-2 text-gray-400">
          {completed} of {total} milestones completed
        </p>

        <div className="mt-6 flex items-center justify-between text-sm">
          <span className="text-gray-400">
            Progress
          </span>

          <span className="font-semibold text-violet-300">
            {progress}%
          </span>
        </div>

        <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>

        <button
          onClick={() => {
            window.location.href = "/roadmaps";
          }}
          className="mt-7 rounded-xl bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/15"
        >
          Continue Roadmap →
        </button>

      </div>
    </div>
  );
}


=========================================================
   LATEST CAREER MATCH
========================================================= 

function LatestCareerMatch({ data, loading }) {
  const match = data?.careerMatches?.[0];

  if (loading) {
    return <LoadingCard />;
  }

  if (!match) {
    return (
      <EmptyCard
        title="No Career Match Yet"
        description="Analyze your profile to discover careers that match your skills."
        button="Find Your Career Match →"
        path="/career-match"
      />
    );
  }

  const score =
    match.matchPercentage ??
    match.matchScore ??
    match.score ??
    0;

  const role =
    match.role ||
    match.jobTitle ||
    match.career ||
    "Career Match";

  const company =
    match.company ||
    match.targetCompany ||
    "Your target company";

  const strongSkills =
    match.strongSkills ||
    match.matchedSkills ||
    match.skills ||
    [];

  const skillGaps =
    match.skillGaps ||
    match.missingSkills ||
    match.gaps ||
    [];

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl">

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">

        <div>

          <div className="flex flex-wrap items-center gap-3">

            <h3 className="text-2xl font-bold text-white">
              {role}
            </h3>

            <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-sm font-semibold text-violet-300">
              {score}% Match
            </span>

          </div>

          <p className="mt-2 text-gray-400">
            {company}
          </p>

          <div className="mt-7">

            <p className="text-sm font-semibold text-emerald-400">
              Strong match
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {strongSkills.length > 0 ? (
                strongSkills.slice(0, 6).map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-sm text-gray-500">
                  No skill data available
                </span>
              )}
            </div>

          </div>

          <div className="mt-6">

            <p className="text-sm font-semibold text-amber-400">
              Focus next
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {skillGaps.length > 0 ? (
                skillGaps.slice(0, 6).map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg bg-amber-500/10 px-3 py-2 text-sm text-amber-300"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-sm text-gray-500">
                  No skill gaps identified
                </span>
              )}
            </div>

          </div>

        </div>

        <button
          onClick={() => {
            window.location.href = "/career-match";
          }}
          className="shrink-0 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-5 py-3 font-semibold text-white transition hover:scale-[1.02]"
        >
          View Career Match →
        </button>

      </div>

    </div>
  );
}


=========================================================
   ROADMAP
=========================================================

function RoadmapProgress({ data, loading }) {
  const roadmap = data?.roadmaps?.[0];

  if (loading) {
    return <LoadingCard />;
  }

  if (!roadmap) {
    return (
      <EmptyCard
        title="Your roadmap is waiting"
        description="Generate your personalized roadmap to start building your career."
        button="Create Roadmap →"
        path="/roadmaps"
      />
    );
  }

  const completed =
    roadmap.completedMilestones ??
    roadmap.completed ??
    0;

  const total =
    roadmap.totalMilestones ??
    roadmap.total ??
    roadmap.milestones?.length ??
    0;

  const progress =
    total > 0
      ? Math.round((completed / total) * 100)
      : roadmap.progress ?? 0;

  const milestones = roadmap.milestones || [];

  const nextMilestone =
    milestones.find(
      (milestone) =>
        !milestone.completed &&
        !milestone.isCompleted
    );

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl">

      <div className="flex items-center justify-between">

        <div>

          <h3 className="text-xl font-bold text-white">
            {roadmap.title ||
              roadmap.role ||
              "Career Roadmap"}
          </h3>

          <p className="mt-2 text-sm text-gray-400">
            {completed} / {total} completed
          </p>

        </div>

        <span className="text-xl font-bold text-violet-300">
          {progress}%
        </span>

      </div>

      <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">

        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-700"
          style={{ width: `${progress}%` }}
        />

      </div>

      <div className="mt-7 rounded-2xl border border-white/10 bg-black/20 p-5">

        <p className="text-xs font-semibold uppercase tracking-[2px] text-gray-500">
          Next Milestone
        </p>

        <p className="mt-2 text-lg font-semibold text-white">
          {nextMilestone?.title ||
            nextMilestone?.name ||
            "Continue your roadmap"}
        </p>

      </div>

      <button
        onClick={() => {
          window.location.href = "/roadmaps";
        }}
        className="mt-6 rounded-xl bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/15"
      >
        Continue →
      </button>

    </div>
  );
}


=========================================================
   HELPERS
========================================================= 

function LoadingCard() {
  return (
    <div className="animate-pulse rounded-3xl border border-white/10 bg-white/[0.03] p-7">

      <div className="h-5 w-40 rounded bg-white/10" />

      <div className="mt-4 h-8 w-2/3 rounded bg-white/10" />

      <div className="mt-6 h-3 w-full rounded bg-white/10" />

      <div className="mt-4 h-3 w-1/2 rounded bg-white/10" />

    </div>
  );
}


function EmptyCard({
  title,
  description,
  button,
  path,
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">

      <h3 className="text-xl font-semibold text-white">
        {title}
      </h3>

      <p className="mt-2 text-gray-400">
        {description}
      </p>

      <button
        onClick={() => {
          window.location.href = path;
        }}
        className="mt-6 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-5 py-3 font-semibold text-white"
      >
        {button}
      </button>

    </div>
  );
} */}