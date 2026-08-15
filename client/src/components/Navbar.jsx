import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu after navigation
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-500 sm:px-6 lg:px-8 ${
          scrolled
            ? "rounded-2xl border border-white/10 bg-[#0B1023]/70 py-3 backdrop-blur-2xl shadow-2xl"
            : "py-3"
        }`}
      >
        {/* =====================================================
            LOGO
        ===================================================== */}

        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-2.5"
        >
          <div
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-gradient-to-r
              from-violet-600
              to-cyan-500
              text-sm
              font-bold
              text-white
              shadow-lg
              shadow-violet-500/10
              sm:h-10
              sm:w-10
              sm:text-base
            "
          >
            C
          </div>

          <div>
            <h1 className="text-base font-bold text-white sm:text-xl">
              CareerPilot
            </h1>

            <p className="hidden text-xs text-gray-400 sm:block">
              AI Career Coach
            </p>
          </div>
        </Link>

        {/* =====================================================
            DESKTOP MENU
        ===================================================== */}

        <div className="hidden items-center gap-8 text-sm text-gray-300 lg:flex">
          <a
            href="#"
            className="transition hover:text-white"
          >
            Home
          </a>

          <a
            href="#features"
            className="transition hover:text-white"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="transition hover:text-white"
          >
            How It Works
          </a>

          <a
            href="#about"
            className="transition hover:text-white"
          >
            About
          </a>
        </div>

        {/* =====================================================
            DESKTOP ACTIONS
        ===================================================== */}

        <div className="hidden items-center gap-5 lg:flex">
          <Link to="/login">
            <button className="text-sm text-gray-300 transition hover:text-white">
              Login
            </button>
          </Link>

          <Link to="/signup">
            <button
              className="
                rounded-xl
                bg-gradient-to-r
                from-violet-600
                to-cyan-500
                px-5
                py-2.5
                text-sm
                font-semibold
                text-white
                transition-all
                duration-300
                hover:scale-105
                hover:shadow-lg
                hover:shadow-violet-500/20
              "
            >
              Get Started
            </button>
          </Link>
        </div>

        {/* =====================================================
            MOBILE MENU BUTTON
        ===================================================== */}

        <button
          type="button"
          aria-label="Toggle menu"
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            border
            border-white/[0.08]
            bg-white/[0.03]
            text-white
            transition
            hover:bg-white/[0.07]
            lg:hidden
          "
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {/* =====================================================
          MOBILE MENU
      ===================================================== */}

      {menuOpen && (
        <div
          className="
            mx-4
            mt-2
            overflow-hidden
            rounded-2xl
            border
            border-white/[0.08]
            bg-[#0B1023]/95
            p-4
            shadow-2xl
            backdrop-blur-2xl
            lg:hidden
          "
        >
          {/* Navigation */}

          <div className="flex flex-col">
            <a
              href="#"
              onClick={closeMenu}
              className="
                rounded-xl
                px-3
                py-3
                text-sm
                text-gray-300
                transition
                hover:bg-white/[0.04]
                hover:text-white
              "
            >
              Home
            </a>

            <a
              href="#features"
              onClick={closeMenu}
              className="
                rounded-xl
                px-3
                py-3
                text-sm
                text-gray-300
                transition
                hover:bg-white/[0.04]
                hover:text-white
              "
            >
              Features
            </a>

            <a
              href="#how-it-works"
              onClick={closeMenu}
              className="
                rounded-xl
                px-3
                py-3
                text-sm
                text-gray-300
                transition
                hover:bg-white/[0.04]
                hover:text-white
              "
            >
              How It Works
            </a>

            <a
              href="#about"
              onClick={closeMenu}
              className="
                rounded-xl
                px-3
                py-3
                text-sm
                text-gray-300
                transition
                hover:bg-white/[0.04]
                hover:text-white
              "
            >
              About
            </a>
          </div>

          {/* Divider */}

          <div className="my-3 h-px bg-white/[0.07]" />

          {/* =================================================
              MOBILE AUTH BUTTONS
          ================================================= */}

          <div className="grid grid-cols-2 gap-2.5">
            <Link
              to="/login"
              onClick={closeMenu}
              className="w-full"
            >
              <button
                className="
                  w-full
                  rounded-xl
                  border
                  border-white/[0.08]
                  bg-white/[0.03]
                  px-4
                  py-3
                  text-sm
                  font-medium
                  text-gray-300
                  transition
                  hover:bg-white/[0.07]
                  hover:text-white
                "
              >
                Login
              </button>
            </Link>

            <Link
              to="/signup"
              onClick={closeMenu}
              className="w-full"
            >
              <button
                className="
                  w-full
                  rounded-xl
                  bg-gradient-to-r
                  from-violet-600
                  to-cyan-500
                  px-4
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:shadow-lg
                  hover:shadow-violet-500/20
                "
              >
                Get Started
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}