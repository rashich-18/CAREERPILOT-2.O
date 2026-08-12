import DashboardLayout from "../components/dashboard/DashboardLayout";

import WelcomeBanner from "../components/dashboard/WelcomeBanner";
{/*import StatsCard from "../components/dashboard/StatsCard";*/}
import QuickActionCard from "../components/dashboard/QuickActionCard";
import AIMissionCard from "../components/dashboard/AIMissionCard";
import {
  Upload,
  Bot,
} from "lucide-react";

import CareerSnapshot from "../components/dashboard/CareerSnapshot";
import AIInsight from "../components/dashboard/AIInsight";
import {
  FileText,
  Target,
  Map,
  Trophy,
} from "lucide-react";
import RecentActivity from "../components/dashboard/ActivityCard";
export default function Dashboard() {
  return (
    <DashboardLayout>

      <WelcomeBanner />
      <div className="mt-8">
      <AIMissionCard />
      </div>


      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-2">
        <CareerSnapshot />

        <AIInsight />

        <QuickActionCard />

        <RecentActivity />

        {/* <StatsCard
          title="Resume Score"
          value="--"
          icon={<FileText />}
          color="bg-violet-500/20 text-violet-300"
        /> */}

        {/*<StatsCard
          title="ATS Score"
          value="--"
          icon={<Target />}
          color="bg-cyan-500/20 text-cyan-300"
        />*/}

        {/*<StatsCard
          title="Roadmap"
          value="0%"
          icon={<Map />}
          color="bg-emerald-500/20 text-emerald-300"
        />*/}

        {/*<StatsCard
          title="Interview Ready"
          value="0%"
          icon={<Trophy />}
          color="bg-yellow-500/20 text-yellow-300"
        />*/}

      </div>

      {/*<h2 className="mt-12 mb-6 text-2xl font-bold text-white">
  ⚡ Quick Actions
</h2>

<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

  <QuickActionCard
    title="Upload Resume"
    subtitle="Analyze your resume using AI."
    icon={<Upload />}
    path="/resume"
  />

  <QuickActionCard
    title="Skill Gap"
    subtitle="Discover missing skills."
    icon={<Target />}
    path="/skill-gap"
  />

  <QuickActionCard
    title="Generate Roadmap"
    subtitle="Build your learning journey."
    icon={<Map />}
    path="/roadmap"
  />

  <QuickActionCard
    title="AI Mentor"
    subtitle="Ask anything about your career."
    icon={<Bot />}
    path="/mentor"
  />

</div>*/}

    </DashboardLayout>
  );
}