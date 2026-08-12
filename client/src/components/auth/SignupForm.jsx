import { useState } from "react";
import {useNavigate} from "react-router-dom";
import Requirement from "./Requirement";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

import API from "../../api/authApi";
import toast from "react-hot-toast";

import { FcGoogle } from "react-icons/fc";

import { motion } from "framer-motion";

export default function SignupForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [formData, setFormData] = useState({
  name: "",
  email: "",
  password: "",
});

const [loading, setLoading] = useState(false);



  
  const validations = {
  length: password.length >= 8,
  uppercase: /[A-Z]/.test(password),
  lowercase: /[a-z]/.test(password),
  number: /[0-9]/.test(password),
  special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
};

const passwordsMatch =
  confirmPassword.length > 0 &&
  password === confirmPassword;

  const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });

  // Keep password validation working
  if (e.target.name === "password") {
    setPassword(e.target.value);
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!passwordsMatch) {
    toast.error("Passwords do not match");
    return;
  }

  if (!Object.values(validations).every(Boolean)) {
    toast.error("Please meet all password requirements");
    return;
  }

  try {
    setLoading(true);

    const res = await API.post("/register", {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      confirmPassword: confirmPassword,
    });
    console.log("REGISTER RESPONSE:", res.data);

    if (!res.data.token) {
  toast.error("No authentication token received.");
  return;
}

localStorage.removeItem("token");
// Save authentication token
    localStorage.setItem("token", res.data.token);

    toast.success(res.data.message);
    // Go to onboarding
    navigate("/onboarding");


    // Reset form
    setFormData({
      name: "",
      email: "",
      password: "",
    });

    setPassword("");
    setConfirmPassword("");

  } catch (error) {
    toast.error(
      error.response?.data?.message || "Something went wrong"
    );
  } finally {
    setLoading(false);
  }
};


  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="mt-6 space-y-4"
      onSubmit={handleSubmit}
    >
      {/* Name */}
      <div className="flex items-center rounded-xl border border-white/10 bg-white/5 px-4 transition duration-300 focus-within:border-violet-500 focus-within:shadow-[0_0_20px_rgba(139,92,246,0.3)]">
        <User size={18} className="text-gray-400" />

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full bg-transparent px-3 py-3 text-white outline-none placeholder:text-gray-400"
        />
      </div>

      {/* Email */}
      <div className="flex items-center rounded-xl border border-white/10 bg-white/5 px-4 transition duration-300 focus-within:border-violet-500 focus-within:shadow-[0_0_20px_rgba(139,92,246,0.3)]">
        <Mail size={18} className="text-gray-400" />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-transparent px-3 py-3 text-white outline-none placeholder:text-gray-400"
        />
      </div>

      {/* Password */}
      <div className="flex items-center rounded-xl border border-white/10 bg-white/5 px-4 transition duration-300 focus-within:border-violet-500 focus-within:shadow-[0_0_20px_rgba(139,92,246,0.3)]">
        <Lock size={18} className="text-gray-400" />

        <input
  type={showPassword ? "text" : "password"}
  name="password"
  placeholder="Password"
  value={formData.password}
  onChange={handleChange}
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

      {password && (
  <div className="mt-3 space-y-2 rounded-xl bg-white/5 p-3">

    <p className="text-xs font-semibold text-gray-300">
      Password must contain:
    </p>

    <Requirement valid={validations.length} text="At least 8 characters" />
    <Requirement valid={validations.uppercase} text="One uppercase letter" />
    <Requirement valid={validations.lowercase} text="One lowercase letter" />
    <Requirement valid={validations.number} text="One number" />
    <Requirement valid={validations.special} text="One special character" />

  </div>
)}

      {/* Confirm Password */}
      <div className="flex items-center rounded-xl border border-white/10 bg-white/5 px-4 transition duration-300 focus-within:border-violet-500 focus-within:shadow-[0_0_20px_rgba(139,92,246,0.3)]">
        <Lock size={18} className="text-gray-400" />
        <input
  type={showConfirm ? "text" : "password"}
  placeholder="Confirm Password"
  value={confirmPassword}
  onChange={(e) => setConfirmPassword(e.target.value)}
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

      {confirmPassword && (
  <p
    className={`mt-2 text-sm ${
      passwordsMatch
        ? "text-green-400"
        : "text-red-400"
    }`}
  >
    {passwordsMatch
      ? "✓ Passwords match"
      : "✗ Passwords do not match"}
  </p>
)}




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
    {loading ? "Creating Account..." : "Create Account"}

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
      <div className="flex items-center gap-3 py-1">
        <div className="h-px flex-1 bg-white/10"></div>
        <span className="text-xs text-gray-500">OR</span>
        <div className="h-px flex-1 bg-white/10"></div>
      </div>

      {/* Google */}
      <button
      type="button"
      className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 py-3 text-white transition-all duration-300 hover:bg-white/10 hover:border-violet-500">
      <FcGoogle size={22} />
      Continue with Google
      </button>
    </motion.form>
  );
}