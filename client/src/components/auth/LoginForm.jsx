
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import API from "../../api/authApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

const [formData, setFormData] = useState({
  email: "",
  password: "",
});

const [loading, setLoading] = useState(false);

const navigate = useNavigate();
const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const res = await API.post("/login", formData);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    toast.success(res.data.message);

    navigate("/dashboard");

  } catch (error) {
    toast.error(
      error.response?.data?.message || "Login failed"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <motion.form
     onSubmit={handleSubmit}
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
            name="email"
            value={formData.email}
            onChange={handleChange}
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
            name="password"
            value={formData.password}
            onChange={handleChange}
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
  type="submit"
  disabled={loading}
  whileHover={{ scale: loading ? 1 : 1.02 }}
  whileTap={{ scale: loading ? 1 : 0.98 }}
  className={`group relative w-full overflow-hidden rounded-xl py-4 font-semibold text-white shadow-lg transition-all ${
    loading
      ? "cursor-not-allowed bg-gray-600"
      : "bg-gradient-to-r from-violet-600 to-cyan-500"
  }`}
>
  <span className="relative z-10 flex items-center justify-center gap-2">
    {loading ? "Signing In..." : "Login"}

    {!loading && (
      <ArrowRight
        size={18}
        className="transition group-hover:translate-x-1"
      />
    )}
  </span>

  {!loading && (
    <div className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-700 group-hover:translate-x-full" />
  )}
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
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 py-3 text-white transition-all duration-300 hover:bg-white/10 hover:border-violet-500">
            <FcGoogle size={22} />
            Continue with Google
            </button>
    </motion.form>
  );
}