import AnimatedBackground from "../background/AnimatedBackground";
import HeroContent from "./HeroContent";
import DashboardPreview from "./DashboardPreview";
import { motion } from "framer-motion"

function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">

      {/* Animated Background */}
      <AnimatedBackground />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Hero Container */}
      <motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center justify-between px-6 lg:px-10">

        {/* Left Side */}
        <div className="w-full lg:w-1/2">
          <HeroContent />
        </div>

        {/* Right Side */}
        <div className="hidden lg:flex w-full lg:w-1/2 justify-end">
          <DashboardPreview />
        </div>

      </motion.div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-white/70"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

    </section>
  );
}

export default Hero;