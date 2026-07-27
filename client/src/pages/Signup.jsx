import AuthLayout from "../components/auth/AuthLayout";
import AuthCard from "../components/auth/AuthCard";
import SignupForm from "../components/auth/SignupForm";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Signup() {
  return (
    <AuthLayout>
      <AuthCard>
        <div className="text-center">

          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-700 to-indigo-700 text-lg font-bold text-white shadow-lg">
            CP
          </div>

          <h1 className="text-3xl font-bold text-white">
            Create Account
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Start your personalized AI career journey.
          </p>

        </div>

        <SignupForm />

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?



          <motion.div whileHover={{ x:3}}>
          <Link
            to="/login"
            className="ml-2 font-semibold text-violet-400 hover:text-violet-300"
          >
            Login
          </Link>
          </motion.div>

        </p>

      </AuthCard>
    </AuthLayout>
  );
}