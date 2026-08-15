import { ArrowUpRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer
      className="
        relative
        overflow-hidden
        border-t
        border-white/[0.07]
        bg-[#040612]
        text-white
      "
    >
      {/* =========================
          SUBTLE GLOW
      ========================= */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-64
          w-64
          -translate-x-1/2
          rounded-full
          bg-violet-600/[0.04]
          blur-[100px]
        "
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">

        {/* =========================
            MAIN FOOTER
        ========================= */}

        <div
          className="
            flex
            flex-col
            gap-10
            py-12
            sm:py-14
            md:flex-row
            md:items-start
            md:justify-between
          "
        >

          {/* =========================
              BRAND
          ========================= */}

          <div className="max-w-sm">

            <Link
              to="/"
              className="inline-flex items-center gap-2"
            >
              <motion.div
                whileHover={{
                  rotate: 6,
                  scale: 1.05,
                }}
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-violet-400/10
                  bg-violet-500/[0.08]
                "
              >
                <Sparkles
                  size={14}
                  className="text-violet-300"
                />
              </motion.div>

              <span
                className="
                  text-lg
                  font-bold
                  tracking-tight
                "
              >
                CareerPilot
              </span>
            </Link>

            <p
              className="
                mt-4
                max-w-sm
                text-[11px]
                leading-6
                text-gray-500
                sm:text-xs
              "
            >
              An AI-powered career companion that helps you
              understand your profile, explore career opportunities,
              and take your next step with confidence.
            </p>

          </div>

          {/* =========================
              NAVIGATION
          ========================= */}

          <div>

            <p
              className="
                text-[9px]
                font-semibold
                uppercase
                tracking-[1.8px]
                text-gray-600
              "
            >
              Explore
            </p>

            <div className="mt-4 space-y-2.5">

              <a
                href="#about"
                className="
                  block
                  text-xs
                  text-gray-500
                  transition
                  hover:text-white
                "
              >
                About
              </a>

              <a
                href="#features"
                className="
                  block
                  text-xs
                  text-gray-500
                  transition
                  hover:text-white
                "
              >
                Features
              </a>

              <a
                href="#how-it-works"
                className="
                  block
                  text-xs
                  text-gray-500
                  transition
                  hover:text-white
                "
              >
                How It Works
              </a>

            </div>

          </div>

          {/* =========================
              CTA
          ========================= */}

          <div className="md:text-right">

            <p
              className="
                text-[9px]
                font-semibold
                uppercase
                tracking-[1.8px]
                text-gray-600
              "
            >
              Ready to start?
            </p>

            <p
              className="
                mt-2
                text-sm
                font-medium
                text-gray-300
              "
            >
              Take the next step in your career.
            </p>

            <Link
              to="/signup"
              className="
                group
                mt-4
                inline-flex
                items-center
                gap-2
                rounded-xl
                border
                border-violet-400/10
                bg-violet-500/[0.08]
                px-4
                py-2.5
                text-xs
                font-semibold
                text-violet-200
                transition-all
                duration-300
                hover:border-violet-400/20
                hover:bg-violet-500/[0.13]
              "
            >
              Get Started

              <ArrowUpRight
                size={13}
                className="
                  transition-transform
                  duration-300
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                "
              />
            </Link>

          </div>

        </div>

        {/* =========================
            BOTTOM
        ========================= */}

        <div
          className="
            flex
            flex-col
            gap-2
            border-t
            border-white/[0.06]
            py-5
            text-[9px]
            text-gray-700
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >

          <p>
            © 2026 CareerPilot. All rights reserved.
          </p>

          <p className="tracking-wide">
            Built for the next step.
          </p>

        </div>

      </div>
    </footer>
  );
}