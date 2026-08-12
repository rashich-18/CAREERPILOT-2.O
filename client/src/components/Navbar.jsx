import {  Menu, X } from "lucide-react";
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

  return (
    <nav
  className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${
    scrolled ? "py-3" : "py-5"
  }`}
>

      <div
  className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-8 py-4 transition-all duration-500 ${
    scrolled
      ? "border border-white/10 bg-[#0B1023]/70 backdrop-blur-2xl shadow-2xl"
      : "bg-transparent"
  }`}
>

        {/* Logo */}

        <div className="flex items-center gap-2">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 font-bold text-white">

            C

          </div>

          <div>

            <h1 className="text-xl font-bold text-white">
              CareerPilot
            </h1>

            <p className="text-xs text-gray-400">
              AI Career Coach
            </p>

          </div>

        </div>

        {/* Desktop Menu */}

        <div className="hidden items-center gap-8 text-gray-300 lg:flex">

          <a href="#" className="transition hover:text-white">
            Home
          </a>

          <a href="#features" className="transition hover:text-white">
            Features
          </a>

          <a href="#how-it-works" className="transition hover:text-white">
            How It Works
          </a>

          <a href="#about" className="transition hover:text-white">
            About
          </a>

        </div>

        {/* Right Side */}

        <div className="hidden items-center gap-4 lg:flex">

        <Link to="/login">
          <button className="text-gray-300 transition hover:text-white">
            Login
          </button>
        </Link>

        <Link to="/signup">  <button className="rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-5 py-2 font-medium text-white transition hover:scale-105">

            Get Started
          </button>
        </Link>

        </div>

        {/* Mobile Button */}

        <button
          className="text-white lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>

      {/* Mobile Menu */}

      {menuOpen && (

        <div className="mx-5 mt-3 rounded-2xl border border-white/10 bg-[#111827]/90 p-6 backdrop-blur-xl lg:hidden">

          <div className="flex flex-col gap-5 text-white">

            <a href="#"className="block hover:text-violet-400 transition">Home</a>

            <a href="#features"className="block hover:text-violet-400 transition">Features</a>

            <a href="#how-it-works"className="block hover:text-violet-400 transition">How It Works</a>

            <a href="#about" className="block hover:text-violet-400 transition">About</a>

            <Link to="/signup"><button className="mt-4 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 py-3 ">

              Get Started

            </button></Link>

          </div>

        </div>

      )}

    </nav>
  );
}
