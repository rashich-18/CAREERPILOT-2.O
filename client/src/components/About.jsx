import { Sparkles, BrainCircuit, Target } from "lucide-react";

export default function About() {
  return (
    <section
      id="about"
      className="bg-[#050816] py-28 text-white"
    >
      <div className="mx-auto max-w-6xl px-6">

        <div className="text-center">

          <p className="font-semibold text-violet-400">
            ABOUT CAREERPILOT
          </p>

          <h2 className="mt-4 text-5xl font-bold">
            Your AI Career Companion
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-400">
            CareerPilot helps students and job seekers improve resumes,
            increase ATS scores, discover career opportunities, and prepare
            for interviews using AI—all from one platform.
          </p>

        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-3">

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <BrainCircuit className="text-violet-400" size={40} />
            <h3 className="mt-5 text-xl font-semibold">
              AI Analysis
            </h3>
            <p className="mt-3 text-gray-400">
              Analyze resumes with intelligent insights and ATS optimization.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <Target className="text-cyan-400" size={40} />
            <h3 className="mt-5 text-xl font-semibold">
              Career Roadmaps
            </h3>
            <p className="mt-3 text-gray-400">
              Get personalized learning paths based on your goals and skills.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <Sparkles className="text-pink-400" size={40} />
            <h3 className="mt-5 text-xl font-semibold">
              Interview Prep
            </h3>
            <p className="mt-3 text-gray-400">
              Practice AI-generated interview questions tailored to your resume.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}