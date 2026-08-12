import { motion } from "framer-motion";
import {
  Search,
  Bell,
  Sparkles,
  CalendarDays,
  ChevronDown,
} from "lucide-react";

export default function TopNavbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning ☀️"
      : hour < 18
      ? "Good Afternoon 🌤️"
      : "Good Evening 🌙";

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-white/5 bg-slate-950/40 px-8 backdrop-blur-xl">

      {/* Left */}
      <div>

        <h2 className="text-lg font-semibold text-white">
          {greeting}
        </h2>

        <p className="mt-1 flex items-center gap-2 text-sm text-gray-400">
          <CalendarDays size={15} />
          {today}
        </p>

      </div>

      {/* Center Search */}

      <motion.div
        whileFocus={{ scale: 1.02 }}
        className="relative hidden w-[420px] lg:block"
      >

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
        />

        <input
          type="text"
          placeholder="Search careers, skills, roadmap..."
          className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-11 pr-5 text-white outline-none transition-all duration-300 placeholder:text-gray-500 focus:border-violet-500 focus:shadow-[0_0_25px_rgba(139,92,246,0.25)]"
        />

      </motion.div>

      {/* Right */}

      <div className="flex items-center gap-5">

        {/* AI Status */}

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="hidden items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 lg:flex"
        >
          <Sparkles
            size={16}
            className="text-violet-300"
          />

          <span className="text-sm text-violet-200">
            Gemini Ready
          </span>

        </motion.div>

        {/* Notification */}

        <button className="relative rounded-2xl bg-white/5 p-3 transition hover:bg-white/10">

          <Bell
            size={20}
            className="text-gray-300"
          />

          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-cyan-400" />

        </button>

        {/* Profile */}

        <button className="flex items-center gap-3 rounded-2xl bg-white/5 px-3 py-2 transition hover:bg-white/10">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 text-lg font-bold text-white shadow-lg">

            {user?.name?.charAt(0).toUpperCase() || "U"}

          </div>

          <div className="hidden text-left lg:block">

            <p className="font-medium text-white">

              {user?.name || "User"}

            </p>

            <p className="text-xs text-gray-400">

              Career Explorer

            </p>

          </div>

          <ChevronDown
            size={18}
            className="hidden text-gray-400 lg:block"
          />

        </button>

      </div>

    </header>
  );
}