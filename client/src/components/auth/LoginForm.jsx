
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="mt-8 space-y-5"
    >
      {/* Email */}
      <div>
        <label className="mb-2 block text-sm text-gray-300">
          Email
        </label>

        <div className="flex items-center rounded-xl border border-white/10 bg-white/5 px-4 transition-all duration-300 focus-within:border-violet-500 focus-within:shadow-[0_0_20px_rgba(139,92,246,0.3)]">

          <Mail size={18} className="text-gray-400" />

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full bg-transparent px-3 py-4 text-white outline-none placeholder:text-gray-400"
          />

        </div>
      </div>

      {/* Password */}
      <div>
        <label className="mb-2 block text-sm text-gray-300">
          Password
        </label>

        <div className="flex items-center rounded-xl border border-white/10 bg-white/5 px-4 transition-all duration-300 focus-within:border-violet-500 focus-within:shadow-[0_0_20px_rgba(139,92,246,0.3)]">

          <Lock size={18} className="text-gray-400" />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full bg-transparent px-3 py-4 text-white outline-none placeholder:text-gray-400"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-400 hover:text-white transition"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>

        </div>
      </div>

      {/* Forgot Password */}
      <div className="flex justify-end">

        <button
          type="button"
          className="text-sm text-violet-300 transition hover:text-violet-100"
        >
          Forgot Password?
        </button>

      </div>

      {/* Login Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 py-4 font-semibold text-white shadow-lg transition-all"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          Login
          <ArrowRight
            size={18}
            className="transition group-hover:translate-x-1"
          />
        </span>

        <div className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-700 group-hover:translate-x-full" />
      </motion.button>

      {/* Divider */}
      <div className="flex items-center gap-4">

        <div className="h-px flex-1 bg-white/10" />

        <span className="text-sm text-gray-400">
          OR
        </span>

        <div className="h-px flex-1 bg-white/10" />

      </div>

      {/* Google Button */}
      <button
            
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 py-3 text-white transition-all duration-300 hover:bg-white/10 hover:border-violet-500">
            <FcGoogle size={22} />
            Continue with Google
            </button>
    </motion.form>
  );
}