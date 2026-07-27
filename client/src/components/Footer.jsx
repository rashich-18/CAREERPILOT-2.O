import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#040612] text-white">

      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-12 md:grid-cols-3">

          {/* Brand */}

          <div>

            <h2 className="text-3xl font-bold">
              CareerPilot
            </h2>

            <p className="mt-4 leading-7 text-gray-400">
              Empowering students with AI-powered resume analysis,
              career roadmaps, and interview preparation.
            </p>

          </div>

          {/* Navigation */}

          <div>

            <h3 className="mb-5 font-semibold">
              Navigation
            </h3>

            <div className="space-y-3">

              <a href="/" className="block hover:text-violet-400 transition">
                Home
              </a>

              <a href="#features" className="block hover:text-violet-400 transition">
                Features
              </a>

              <a href="#how-it-works" className="block hover:text-violet-400 transition">
                How It Works
              </a>

              <a href="#about" className="block hover:text-violet-400 transition">
                About
              </a>

            </div>

          </div>

          {/* Contact */}

          <div>

            <h3 className="mb-5 font-semibold">
              Contact
            </h3>

            <p className="text-gray-400">
              careerpilot.ai@gmail.com
            </p>

            <p className="mt-2 text-gray-400">
              Delhi, India
            </p>

            <Link to="/signup">
            <button className="mt-6 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-6 py-3 font-semibold transition hover:scale-105">

              Get Started

            </button></Link>

          </div>

        </div>

        <div className="mt-14 border-t border-white/10 pt-6 text-center text-sm text-gray-500">

          © 2026 CareerPilot. All rights reserved.
        </div>

      </div>

    </footer>
  );
}