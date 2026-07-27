import { ArrowRight,  } from "lucide-react";
import { Link } from "react-router-dom";


export default function HeroContent() {
  return (
    <div className="max-w-2xl">

    

      {/* Heading */}

      <h1 className="mt-8 text-5xl font-extrabold leading-tight text-white lg:text-7xl">

        Navigate Your

        <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">

          Dream Career

        </span>

        with AI

      </h1>

      

      {/* Description */}

      <p className="mt-8 max-w-xl text-lg leading-8 text-gray-300">

        Upload your resume, discover missing skills, improve your ATS
        score, prepare for interviews, and receive a personalized AI
        roadmap to land your dream job.

      </p>

      {/* Buttons */}

      <div className="mt-10 flex flex-wrap gap-5">

        <Link to="/signup">
        <button className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-7 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-violet-500/40">

          Get Started

          <ArrowRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />

        </button>
        </Link>

        <a href="#features">
        <button className="rounded-xl border border-white/20 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20">

          Explore Features

        </button>
        </a>
      </div>

      {/* Stats */}

      <div className="mt-14 flex flex-wrap gap-10">

        <div>

          <h2 className="text-3xl font-bold text-white">
            25K+
          </h2>

          <p className="mt-1 text-gray-400">
            Students Guided
          </p>

        </div>

        <div>

          <h2 className="text-3xl font-bold text-white">
            95%
          </h2>

          <p className="mt-1 text-gray-400">
            ATS Accuracy
          </p>

        </div>

        <div>

          <h2 className="text-3xl font-bold text-white">
            24/7
          </h2>

          <p className="mt-1 text-gray-400">
            AI Assistance
          </p>

        </div>

      </div>

    </div>
  );
}