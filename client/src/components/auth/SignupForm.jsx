import { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

import { FcGoogle } from "react-icons/fc";

import { motion } from "framer-motion";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="mt-6 space-y-4"
    >
      {/* Name */}
      <div className="flex items-center rounded-xl border border-white/10 bg-white/5 px-4 transition duration-300 focus-within:border-violet-500 focus-within:shadow-[0_0_20px_rgba(139,92,246,0.3)]">
        <User size={18} className="text-gray-400" />

        <input
          type="text"
          placeholder="Full Name"
          className="w-full bg-transparent px-3 py-3 text-white outline-none placeholder:text-gray-400"
        />
      </div>

      {/* Email */}
      <div className="flex items-center rounded-xl border border-white/10 bg-white/5 px-4 transition duration-300 focus-within:border-violet-500 focus-within:shadow-[0_0_20px_rgba(139,92,246,0.3)]">
        <Mail size={18} className="text-gray-400" />

        <input
          type="email"
          placeholder="Email Address"
          className="w-full bg-transparent px-3 py-3 text-white outline-none placeholder:text-gray-400"
        />
      </div>

      {/* Password */}
      <div className="flex items-center rounded-xl border border-white/10 bg-white/5 px-4 transition duration-300 focus-within:border-violet-500 focus-within:shadow-[0_0_20px_rgba(139,92,246,0.3)]">
        <Lock size={18} className="text-gray-400" />

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="w-full bg-transparent px-3 py-3 text-white outline-none placeholder:text-gray-400"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="text-gray-400 hover:text-white"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {/* Confirm Password */}
      <div className="flex items-center rounded-xl border border-white/10 bg-white/5 px-4 transition duration-300 focus-within:border-violet-500 focus-within:shadow-[0_0_20px_rgba(139,92,246,0.3)]">
        <Lock size={18} className="text-gray-400" />

        <input
          type={showConfirm ? "text" : "password"}
          placeholder="Confirm Password"
          className="w-full bg-transparent px-3 py-3 text-white outline-none placeholder:text-gray-400"
        />

        <button
          type="button"
          onClick={() => setShowConfirm(!showConfirm)}
          className="text-gray-400 hover:text-white"
        >
          {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {/* Terms */}
      <label className="flex items-center gap-2 text-sm text-gray-400">
        <input
          type="checkbox"
          className="h-4 w-4 accent-violet-600"
        />

        I agree to the Terms & Privacy Policy
      </label>

      {/* Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 py-4 font-semibold text-white shadow-lg transition-all"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          Create Account
          <ArrowRight
            size={18}
            className="transition group-hover:translate-x-1"
          />
        </span>

        <div className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-700 group-hover:translate-x-full" />
      </motion.button>

      {/* Divider */}
      <div className="flex items-center gap-3 py-1">
        <div className="h-px flex-1 bg-white/10"></div>
        <span className="text-xs text-gray-500">OR</span>
        <div className="h-px flex-1 bg-white/10"></div>
      </div>

      {/* Google */}
      <button
      
      className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 py-3 text-white transition-all duration-300 hover:bg-white/10 hover:border-violet-500">
      <FcGoogle size={22} />
      Continue with Google
      </button>
    </motion.form>
  );
}