import {
  LayoutDashboard,
  FileText,
  Target,
  Map,
  BriefcaseBusiness,
  MessageSquareText,
  Bot,
  BarChart3,
  User,
  Settings,
  LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    title: "Resume",
    icon: FileText,
    path: "/upload",
  },
  {
    title: "Career Match",
    icon: Target,
    path: "/career-match",
  },
  {
  title: "Roadmap",
  icon: Map,
  path: "/roadmaps",
},

  {
    title: "Job Applications",
    icon: BriefcaseBusiness,
    path: "/job-application",
  },
  {
    title: "Interview AI",
    icon: MessageSquareText,
    path: "/interview",
  },
  {
    title: "Profile",
    icon: User,
    path: "/profile",
  },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 flex h-screen w-72 flex-col border-r border-white/10 bg-slate-950/70 backdrop-blur-xl">

      {/* Logo */}

      <div className="relative overflow-hidden border-b border-white/5 p-7">

  {/* Background Glow */}
  <div className="absolute -left-10 top-0 h-40 w-40 rounded-full bg-violet-500/20 blur-3xl" />

  <div className="absolute right-0 top-10 h-28 w-28 rounded-full bg-cyan-500/20 blur-3xl" />

  <div className="relative z-10">

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-3xl font-bold text-transparent"
        >
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 text-xl font-bold shadow-[0_0_30px_rgba(139,92,246,0.5)]">
        CP
        </div>
        <div>
            <h1 className="bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text text-2xl font-bold text-transparent">
                CareerPilot
            </h1>
        <p className="text-sm text-gray-400">
            AI Career Coach
        </p>
        </div>
    </motion.div>

       
      </div>
      </div>

      {/* Navigation */}
<nav className="flex-1 space-y-2 p-5">
  {menuItems.map((item) => {
    const Icon = item.icon;

    return (
      <NavLink key={item.title} to={item.path}>
        {({ isActive }) => (
          <motion.div
            whileHover={{ x: 4 }}
            className={`relative group flex items-center gap-4 overflow-hidden rounded-2xl px-5 py-4 transition-all duration-300 ${
              isActive
                ? "border border-violet-500/30 bg-gradient-to-r from-violet-600/25 to-cyan-500/20 text-white shadow-[0_0_25px_rgba(139,92,246,0.35)]"
                : "text-gray-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            {/* Active Indicator */}
            {isActive && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-full bg-gradient-to-b from-violet-400 to-cyan-400"
              />
            )}

            <Icon
              size={22}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110"
            />

            <span className="font-medium">{item.title}</span>
          </motion.div>
        )}
      </NavLink>
    );
  })}
</nav>



      {/* Logout */}

      <div className="border-t border-white/10 p-5">

        <button
          className="group flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-gray-400 transition-all duration-300 hhover:bg-gradient-to-r hover:from-red-500/15 hover:to-pink-500/10 hover:text-red-400"
        >
          <LogOut
            size={22}
            className="transition-transform group-hover:-translate-x-1"
          />

          Logout

        </button>

      </div>

    </aside>
  );
}