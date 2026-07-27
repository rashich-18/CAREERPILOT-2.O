import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-[#050816] py-32 text-white">

      {/* Background Glow */}

      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/20 blur-[180px]" />

      <div className="relative z-10 mx-auto max-w-4xl rounded-[32px] border border-white/10 bg-white/5 p-14 text-center backdrop-blur-xl">

        <span className="rounded-full bg-violet-500/20 px-4 py-2 text-sm font-medium text-violet-300">
          CareerPilot AI
        </span>

        <h2 className="mt-8 text-5xl font-bold leading-tight">

          Ready To Build
          <br />

          <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">

            Your Dream Career?

          </span>

        </h2>

        <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-gray-400">

          Join thousands of students using AI to improve resumes,
          crack interviews and land better opportunities.

        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-5">
<Link to="signup">
          <button className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-8 py-4 font-semibold transition hover:scale-105">

            Get Started

            <ArrowRight
              size={18}
              className="transition group-hover:translate-x-1"
            />

          </button></Link>
          <a href="#how-it-works">
          <button className="rounded-xl border border-white/20 bg-white/10 px-8 py-4 font-semibold backdrop-blur-md transition hover:bg-white/20">

            Learn More

          </button></a>

        </div>

      </div>

    </section>
  );
}