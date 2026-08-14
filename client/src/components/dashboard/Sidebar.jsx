import {
  LayoutDashboard,
  FileText,
  Target,
  Map,
  BriefcaseBusiness,
  MessageSquareText,
  UserRound,
  Menu,
  X,
  ChevronRight,
  LogOut,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    title: "Resume",
    icon: FileText,
    path: "/upload",
  },
  {
    title: "Career Match",
    icon: Target,
    path: "/career-match",
  },
  {
    title: "Roadmap",
    icon: Map,
    path: "/roadmaps",
  },
  {
    title: "Job Applications",
    icon: BriefcaseBusiness,
    path: "/job-application",
  },
  {
    title: "Interview AI",
    icon: MessageSquareText,
    path: "/interview",
  },
  {
    title: "Profile",
    icon: UserRound,
    path: "/profile",
  },
];

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("authToken");

    navigate("/login");
  };

  return (
    <>
      {/* =====================================================
          MOBILE OVERLAY
      ===================================================== */}

      <AnimatePresence>
        {expanded && (
          <motion.button
            type="button"
            aria-label="Close navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpanded(false)}
            className="
              fixed
              inset-0
              z-40
              cursor-default
              bg-black/50
              backdrop-blur-[2px]
              lg:hidden
            "
          />
        )}
      </AnimatePresence>

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <motion.aside
        initial={false}
        animate={{
          width: expanded ? 252 : 82,
        }}
        transition={{
          duration: 0.32,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`
          fixed
          left-0
          top-0
          z-50
          flex
          h-screen
          flex-col
          overflow-hidden

          border-r
          border-white/[0.07]

          bg-[#090d19]/90
          backdrop-blur-2xl
          backdrop-saturate-150

          shadow-[8px_0_40px_rgba(0,0,0,0.18)]

          lg:z-50

          ${expanded ? "max-lg:w-[252px]" : "max-lg:w-[82px]"}
        `}
      >

        {/* =================================================
            AMBIENT GLOW
        ================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            -left-20
            top-20
            h-52
            w-52
            rounded-full
            bg-violet-600/[0.10]
            blur-[90px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -right-20
            top-[45%]
            h-48
            w-48
            rounded-full
            bg-cyan-500/[0.05]
            blur-[90px]
          "
        />

        {/* =================================================
            LOGO / MENU
        ================================================= */}

        <div
          className="
            relative
            flex
            h-[76px]
            shrink-0
            items-center
            border-b
            border-white/[0.06]
          "
        >

          {/* LOGO */}

          <motion.button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            whileTap={{ scale: 0.96 }}
            className="
              group
              relative
              ml-[15px]
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-2xl
              border
              border-violet-400/20
              bg-gradient-to-br
              from-violet-500
              via-purple-500
              to-cyan-500
              shadow-[0_0_28px_rgba(139,92,246,0.28)]
            "
          >

            <span
              className="
                text-lg
                font-black
                tracking-tight
                text-white
              "
            >
              CP
            </span>

            {/* ONLINE DOT */}

            <span
              className="
                absolute
                bottom-0.5
                right-0.5
                h-2.5
                w-2.5
                rounded-full
                border-2
                border-[#090d19]
                bg-emerald-400
              "
            />

          </motion.button>

          {/* BRAND */}

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial={{
                  opacity: 0,
                  x: -10,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: -10,
                }}
                transition={{
                  duration: 0.2,
                }}
                className="ml-3 min-w-0"
              >

                <p
                  className="
                    whitespace-nowrap
                    text-[15px]
                    font-bold
                    tracking-tight
                    text-white
                  "
                >
                  CareerPilot
                </p>

                <p
                  className="
                    mt-0.5
                    whitespace-nowrap
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[2px]
                    text-gray-500
                  "
                >
                  AI Career Coach
                </p>

              </motion.div>
            )}
          </AnimatePresence>

          {/* HAMBURGER */}

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.button
                initial={{
                  opacity: 0,
                  scale: 0.8,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.8,
                }}
                type="button"
                onClick={() => setExpanded(false)}
                aria-label="Collapse sidebar"
                className="
                  absolute
                  right-3
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  text-gray-500
                  transition
                  hover:bg-white/[0.06]
                  hover:text-white
                "
              >
                <X size={16} />
              </motion.button>
            )}
          </AnimatePresence>

        </div>

        {/* =================================================
            NAVIGATION
        ================================================= */}

        <nav className="relative z-10 flex-1 overflow-y-auto px-3 py-5">

          {/* SECTION LABEL */}

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                className="
                  mb-3
                  px-3
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[2px]
                  text-gray-600
                "
              >
                Workspace
              </motion.p>
            )}
          </AnimatePresence>

          <div className="space-y-1.5">

            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.title}
                  to={item.path}
                  onClick={() => {
                    if (
                      window.innerWidth < 1024
                    ) {
                      setExpanded(false);
                    }
                  }}
                  className="block"
                >
                  {({ isActive }) => (
                    <motion.div
                      whileHover={{
                        x: expanded ? 3 : 0,
                      }}
                      whileTap={{
                        scale: 0.98,
                      }}
                      className={`
                        group
                        relative
                        flex
                        h-12
                        items-center
                        rounded-xl
                        transition-all
                        duration-200

                        ${
                          expanded
                            ? "gap-3 px-3"
                            : "justify-center"
                        }

                        ${
                          isActive
                            ? `
                              border
                              border-violet-500/20
                              bg-violet-500/[0.10]
                              text-white
                              shadow-[0_0_24px_rgba(139,92,246,0.10)]
                            `
                            : `
                              text-gray-500
                              hover:bg-white/[0.045]
                              hover:text-gray-200
                            `
                        }
                      `}
                    >

                      {/* ACTIVE LINE */}

                      {isActive && (
                        <motion.div
                          layoutId="sidebar-active"
                          className="
                            absolute
                            left-0
                            top-1/2
                            h-6
                            w-[3px]
                            -translate-y-1/2
                            rounded-r-full
                            bg-gradient-to-b
                            from-violet-400
                            to-cyan-400
                          "
                        />
                      )}

                      {/* ICON */}

                      <div
                        className={`
                          flex
                          h-9
                          w-9
                          shrink-0
                          items-center
                          justify-center
                          rounded-lg
                          transition-all
                          duration-200

                          ${
                            isActive
                              ? "bg-violet-500/15 text-violet-300"
                              : "bg-transparent"
                          }

                          group-hover:scale-105
                        `}
                      >
                        <Icon size={19} strokeWidth={1.8} />
                      </div>

                      {/* LABEL */}

                      <AnimatePresence initial={false}>
                        {expanded && (
                          <motion.span
                            initial={{
                              opacity: 0,
                              width: 0,
                            }}
                            animate={{
                              opacity: 1,
                              width: "auto",
                            }}
                            exit={{
                              opacity: 0,
                              width: 0,
                            }}
                            transition={{
                              duration: 0.18,
                            }}
                            className="
                              whitespace-nowrap
                              text-[13px]
                              font-medium
                            "
                          >
                            {item.title}
                          </motion.span>
                        )}
                      </AnimatePresence>

                      {/* ARROW */}

                      {expanded && isActive && (
                        <motion.div
                          initial={{
                            opacity: 0,
                            x: -3,
                          }}
                          animate={{
                            opacity: 1,
                            x: 0,
                          }}
                          className="ml-auto"
                        >
                          <ChevronRight
                            size={14}
                            className="text-violet-300/60"
                          />
                        </motion.div>
                      )}

                    </motion.div>
                  )}
                </NavLink>
              );
            })}

          </div>
        </nav>

        {/* =================================================
    LOGOUT
================================================= */}

<div
  className="
    relative
    z-10
    border-t
    border-white/[0.06]
    p-3
  "
>
  <motion.button
    type="button"
    onClick={handleLogout}
    whileHover={{
      x: expanded ? 2 : 0,
    }}
    whileTap={{
      scale: 0.97,
    }}
    className={`
      group
      flex
      h-12
      w-full
      items-center
      rounded-xl
      text-gray-500
      transition-all
      duration-200

      ${
        expanded
          ? "gap-3 px-3"
          : "justify-center"
      }

      hover:bg-red-500/[0.07]
      hover:text-red-400
    `}
  >

    {/* ICON */}

    <div
      className="
        flex
        h-9
        w-9
        shrink-0
        items-center
        justify-center
        rounded-lg
        transition-all
        duration-200
        group-hover:bg-red-500/10
        group-hover:scale-105
      "
    >
      <LogOut
        size={19}
        strokeWidth={1.8}
      />
    </div>

    {/* LABEL */}

    <AnimatePresence initial={false}>
      {expanded && (
        <motion.span
          initial={{
            opacity: 0,
            width: 0,
          }}
          animate={{
            opacity: 1,
            width: "auto",
          }}
          exit={{
            opacity: 0,
            width: 0,
          }}
          transition={{
            duration: 0.18,
          }}
          className="
            whitespace-nowrap
            text-[13px]
            font-medium
          "
        >
          Log out
        </motion.span>
      )}
    </AnimatePresence>

  </motion.button>
</div>

      </motion.aside>

      {/* =====================================================
          DESKTOP CONTENT SPACER

          Keeps dashboard aligned with collapsed sidebar.
      ===================================================== */}

      <div
        className="
          hidden
          shrink-0
          lg:block
          w-[82px]
        "
      />

    </>
  );
}