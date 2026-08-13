import {
  FileSearch,
  Brain,
  Briefcase,
  ChartColumn,
  ArrowRight,
} from "lucide-react";

export default function Features() {
  return (
    <section
      id="features"
      className="relative bg-[#050816] py-28 text-white"
    >
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="text-center">
          <p className="font-semibold text-violet-400">
            FEATURES
          </p>

          <h2 className="mt-4 text-5xl font-bold">
            Everything You Need To
            <span className="block bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Launch Your Career
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            CareerPilot combines AI with career guidance to help you
            improve your resume, prepare for interviews and become
            job-ready.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="mt-20 grid auto-rows-[240px] gap-6 lg:grid-cols-3">

          {/* Large Card */}
          <div className="group col-span-2 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition hover:border-violet-500/40 hover:bg-white/10">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500">
              <FileSearch size={28} />
            </div>

            <h3 className="mt-8 text-3xl font-bold">
              AI Resume Analysis
            </h3>

            <p className="mt-4 max-w-lg text-gray-400 leading-7">
              Upload your resume and instantly receive an job match,
              personalized feedback, keyword suggestions and actionable
              improvements.
            </p>

            <button className="mt-8 flex items-center gap-2 text-violet-400 hover:text-violet-300">
              Learn More
              <ArrowRight size={18} />
            </button>

          </div>

          {/* Card */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition hover:border-cyan-500/40 hover:bg-white/10">

            <Brain size={34} className="text-cyan-400" />

            <h3 className="mt-6 text-2xl font-semibold">
              AI Interview
            </h3>

            <p className="mt-4 text-gray-400">
              Practice personalized interview questions generated from
              your resume.
            </p>

          </div>

          {/* Card */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition hover:border-pink-500/40 hover:bg-white/10">

            <Briefcase size={34} className="text-pink-400" />

            <h3 className="mt-6 text-2xl font-semibold">
              Career Roadmap
            </h3>

            <p className="mt-4 text-gray-400">
              Know exactly what to learn next based on your target role.
            </p>

          </div>

          {/* Wide Card */}
          <div className="col-span-2 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition hover:border-green-500/40 hover:bg-white/10">

            <ChartColumn size={34} className="text-green-400" />

            <h3 className="mt-6 text-3xl font-bold">
  Career Match
</h3>

<p className="mt-4 max-w-xl text-gray-400 leading-7">
  See how well your skills match a specific role,
  discover the skills you already have, and identify what you
  need to develop before applying.
</p>

<div className="mt-0 flex flex-wrap gap-3">
  <span className="rounded-full bg-violet-500/20 px-4 py-2 text-sm text-violet-300">
    Strong Match
  </span>

  <span className="rounded-full bg-cyan-500/20 px-4 py-2 text-sm text-cyan-300">
    Partial Match
  </span>

  <span className="rounded-full bg-pink-500/20 px-4 py-2 text-sm text-pink-300">
    Skills to Develop
  </span>

  <span className="rounded-full bg-green-500/20 px-4 py-2 text-sm text-green-300">
    Apply Recommendation
  </span>

</div>
            

          </div>

        </div>

      </div>
    </section>
  );
}
