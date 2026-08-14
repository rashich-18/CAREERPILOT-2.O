import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Sparkles,
  CalendarDays,
  ChevronDown,
  LogOut,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TopNavbar() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  // =========================================================
  // USER
  // =========================================================

  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user") || "{}")
  );

  // =========================================================
  // REFRESH USER WHEN PROFILE IS UPDATED
  // =========================================================

  useEffect(() => {
    const handleUserUpdate = () => {
      setUser(
        JSON.parse(
          localStorage.getItem("user") || "{}"
        )
      );
    };

    window.addEventListener(
      "userUpdated",
      handleUserUpdate
    );

    return () => {
      window.removeEventListener(
        "userUpdated",
        handleUserUpdate
      );
    };
  }, []);

  // =========================================================
  // USER DATA
  // =========================================================

  const userName = user?.name || "User";

  const firstName =
    userName.split(" ")[0] || "User";

  const initial =
    userName.charAt(0).toUpperCase() || "U";

  // =========================================================
  // PROFILE IMAGE
  //
  // Supports the most common field names.
  // =========================================================

  const profileImage =
    user?.profilePic ||
    user?.profileImage ||
    user?.profilePicture ||
    user?.profilePhoto ||
    user?.avatar ||
    user?.avatarUrl ||
    null;

  // =========================================================
  // GREETING
  // =========================================================

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good morning"
      : hour < 18
      ? "Good afternoon"
      : "Good evening";

  // =========================================================
  // DATE
  // =========================================================

  const today = new Date().toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
    }
  );

  // =========================================================
  // PROFILE
  // =========================================================

  const handleProfile = () => {
    setMenuOpen(false);
    navigate("/profile");
  };

  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("authToken");

    setMenuOpen(false);

    navigate("/login");
  };

  return (
    <header
      className="
        sticky
        top-0
        z-40

        flex
        h-[76px]
        items-center
        justify-between

        overflow-visible

        border-b
        border-white/[0.07]

        bg-[#0b1020]/55
        backdrop-blur-2xl
        backdrop-saturate-150

        shadow-[0_8px_32px_rgba(0,0,0,0.18)]

        px-4
        sm:px-6
        lg:px-8
      "
    >

      {/* =====================================================
          GLASS TOP EDGE
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-violet-400/30
          to-transparent
        "
      />

      {/* =====================================================
          SOFT GLASS AMBIENT LIGHT
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_70%_0%,rgba(139,92,246,0.07),transparent_35%)]
        "
      />

      {/* =====================================================
          LEFT — GREETING
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          x: -10,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 0.45,
          ease: "easeOut",
        }}
        className="relative z-10 min-w-0"
      >

        <div className="flex items-center gap-2">

          <h2
            className="
              truncate
              text-base
              font-semibold
              tracking-tight
              text-white
              sm:text-lg
            "
          >
            {greeting},{" "}

            <span className="text-violet-300">
              {firstName}
            </span>
          </h2>

          {/* Animated sparkle */}

          <motion.span
            animate={{
              y: [0, -2, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="hidden text-sm sm:inline"
          >
            ✨
          </motion.span>

        </div>

        {/* DATE */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.15,
            duration: 0.4,
          }}
          className="
            mt-1
            flex
            items-center
            gap-1.5
            text-[11px]
            text-gray-500
            sm:text-xs
          "
        >

          <CalendarDays
            size={13}
            className="text-gray-600"
          />

          <span>{today}</span>

        </motion.div>

      </motion.div>

      {/* =====================================================
          RIGHT SIDE
      ===================================================== */}

      <div className="relative z-10 flex items-center gap-2 sm:gap-4">

        {/* ===================================================
            AI STATUS
        =================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.4,
            delay: 0.1,
          }}
          whileHover={{
            y: -1,
          }}
          className="
            hidden
            items-center
            gap-2
            rounded-full
            border
            border-violet-400/10
            bg-violet-500/[0.06]
            px-3
            py-1.5
            shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]
            lg:flex
          "
        >

          {/* LIVE STATUS */}

          <span className="relative flex h-2 w-2">

            <motion.span
              animate={{
                opacity: [0.25, 0.8, 0.25],
                scale: [1, 1.35, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                inset-0
                rounded-full
                bg-emerald-400
              "
            />

            <span
              className="
                relative
                h-2
                w-2
                rounded-full
                bg-emerald-400
              "
            />

          </span>

          <Sparkles
            size={13}
            className="text-violet-300"
          />

          <span
            className="
              text-[11px]
              font-medium
              tracking-wide
              text-violet-200
            "
          >
            AI Career Coach
          </span>

        </motion.div>

        {/* ===================================================
    PROFILE AREA
=================================================== */}

<motion.button
  type="button"
  onClick={handleProfile}
  whileHover={{
    y: -2,
    scale: 1.01,
  }}
  whileTap={{
    scale: 0.97,
  }}
  className="
    group
    relative
    flex
    items-center
    gap-2.5

    rounded-2xl
    border
    border-white/[0.07]

    bg-white/[0.035]

    px-2
    py-1.5

    shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]

    transition-all
    duration-300

    hover:border-violet-400/20
    hover:bg-white/[0.06]
    hover:shadow-[0_8px_30px_rgba(139,92,246,0.10)]

    sm:gap-3
    sm:px-3
  "
>
  {/* =================================================
      SUBTLE HOVER GLOW
  ================================================= */}

  <motion.div
    initial={{ opacity: 0 }}
    whileHover={{ opacity: 1 }}
    transition={{ duration: 0.25 }}
    className="
      pointer-events-none
      absolute
      inset-0
      rounded-2xl
      bg-[radial-gradient(circle_at_30%_50%,rgba(139,92,246,0.12),transparent_60%)]
    "
  />

  {/* =================================================
      AVATAR
  ================================================= */}

  <div className="relative z-10">

    {profileImage ? (
      <motion.img
        src={profileImage}
        alt={`${userName}'s profile`}
        whileHover={{
          scale: 1.06,
          rotate: 1,
        }}
        transition={{
          duration: 0.25,
        }}
        className="
          relative
          h-9
          w-9
          rounded-xl

          border
          border-white/10

          object-cover

          shadow-[0_0_20px_rgba(139,92,246,0.12)]

          sm:h-10
          sm:w-10
        "
      />
    ) : (
      <motion.div
        whileHover={{
          scale: 1.06,
          rotate: 1,
        }}
        transition={{
          duration: 0.25,
        }}
        className="
          flex
          h-9
          w-9
          items-center
          justify-center

          rounded-xl

          border
          border-violet-400/20

          bg-gradient-to-br
          from-violet-500/80
          to-cyan-500/70

          text-sm
          font-bold
          text-white

          shadow-[0_0_20px_rgba(139,92,246,0.16)]

          sm:h-10
          sm:w-10
        "
      >
        {initial}
      </motion.div>
    )}

    {/* ONLINE DOT */}

    <motion.span
      animate={{
        scale: [1, 1.15, 1],
        opacity: [0.8, 1, 0.8],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="
        absolute
        -bottom-0.5
        -right-0.5

        h-2.5
        w-2.5

        rounded-full

        border-2
        border-[#0b1020]

        bg-emerald-400
      "
    />
  </div>

  {/* =================================================
      USER INFO
  ================================================= */}

  <div className="relative z-10 hidden text-left md:block">

    <p
      className="
        max-w-[120px]
        truncate

        text-sm
        font-semibold
        text-white
      "
    >
      {userName}
    </p>

    <div className="mt-0.5 flex items-center gap-1.5">

      <span
        className="
          text-[10px]
          font-medium
          uppercase
          tracking-[1.2px]
          text-gray-600
        "
      >
        Career Explorer
      </span>

      {/* Small navigation hint */}

      <motion.span
        initial={{ opacity: 0, x: -3 }}
        whileHover={{ opacity: 1, x: 0 }}
        className="
          text-[9px]
          text-violet-400/70
        "
      >
        →
      </motion.span>

    </div>

  </div>

  {/* =================================================
      PROFILE ARROW
  ================================================= */}

  <motion.div
    animate={{
      x: [0, 2, 0],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="
      relative
      z-10
      hidden
      md:block
    "
  >
    <ChevronDown
      size={15}
      className="
        -rotate-90
        text-gray-600
        transition-colors
        duration-200
        group-hover:text-violet-300
      "
    />
  </motion.div>

</motion.button>

      </div>

      {/* =====================================================
          CLICK OUTSIDE
      ===================================================== */}

      {menuOpen && (
        <button
          type="button"
          aria-label="Close profile menu"
          onClick={() => setMenuOpen(false)}
          className="
            fixed
            inset-0
            z-[-1]
            cursor-default
          "
        />
      )}

    </header>
  );
}