import AuthLayout from "../components/auth/AuthLayout";
import AuthCard from "../components/auth/AuthCard";
import LoginForm from "../components/auth/LoginForm";
import { motion } from "framer-motion";

export default function Login() {
  return (
    <AuthLayout>
      <div className="flex w-full max-w-6xl items-center justify-center gap-16">

        {/* Left Side - Hidden on Mobile */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden max-w-lg lg:block"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 text-2xl font-bold text-white shadow-lg">
              C
            </div>

            <h1 className="text-4xl font-bold text-white">
              CareerPilot
            </h1>
          </div>

          <h2 className="text-5xl font-bold leading-tight text-white">
            Navigate Your
            <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              {" "}Dream Career{" "}
            </span>
            with AI
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            Upload your resume, discover your strengths, identify skill gaps,
            receive personalized career roadmaps, and prepare for interviews—
            all powered by AI.
          </p>

          {/* Feature Pills */}
          <div className="mt-10 flex flex-wrap gap-3">

            <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
              Resume Analysis
            </span>

            <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
              AI Career Matching
            </span>

            <span className="rounded-full border border-pink-500/30 bg-pink-500/10 px-4 py-2 text-sm text-pink-300">
              AI Roadmap
            </span>

            <span className="rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm text-green-300">
              Interview Prep
            </span>

          </div>
        </motion.div>

        {/* Login Card */}
        <AuthCard>

          <h2 className="text-center text-3xl font-bold text-white">
            Welcome Back 👋
          </h2>

          <p className="mt-3 text-center text-gray-400">
            Continue your AI career journey
          </p>

          <LoginForm />

          <p className="mt-8 text-center text-gray-400">
            Don't have an account?

            <motion.div whileHover={{ x:3}}>
              <a
              href="/signup"
              className="ml-2 font-semibold text-violet-300 transition hover:text-violet-50"
            >
              Sign Up
            </a> </motion.div>

            <motion.div whileHover={{ x:3}}>
              <a
              href="/#"
              className="ml-2 font-semibold text-violet-300 transition hover:text-violet-50"
            >
              Back
            </a>
            </motion.div>

          </p>

        </AuthCard>

      </div>
    </AuthLayout>
  );
}