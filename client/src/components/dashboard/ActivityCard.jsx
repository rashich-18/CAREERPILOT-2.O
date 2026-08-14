import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function ActivityCard({ data, loading }) {
  const activities = [];

  const resumes = data?.resumes || [];
  const careerMatches = data?.careerMatches || [];
  const roadmaps = data?.roadmaps || [];
  const interviews = data?.interviews || [];
  const applications = data?.applications || [];

  /* =========================================================
     BUILD ACTIVITY LIST
  ========================================================= */

  if (careerMatches.length > 0) {
    activities.push({
      title: "Career Match generated",
      time: formatTime(
        careerMatches[0]?.createdAt ||
          careerMatches[0]?.updatedAt
      ),
    });
  }

  if (roadmaps.length > 0) {
    activities.push({
      title: "Roadmap milestone completed",
      time: formatTime(
        roadmaps[0]?.updatedAt ||
          roadmaps[0]?.createdAt
      ),
    });
  }

  if (interviews.length > 0) {
    activities.push({
      title: "AI Interview completed",
      time: formatTime(
        interviews[0]?.createdAt ||
          interviews[0]?.updatedAt
      ),
    });
  }

  if (applications.length > 0) {
    activities.push({
      title: "Application generated",
      time: formatTime(
        applications[0]?.createdAt ||
          applications[0]?.updatedAt
      ),
    });
  }

  if (resumes.length > 0) {
    activities.push({
      title: "Resume analyzed",
      time: formatTime(
        resumes[0]?.createdAt ||
          resumes[0]?.updatedAt
      ),
    });
  }

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <div
        className="
          relative
          overflow-hidden
          rounded-[24px]
          border
          border-white/[0.08]
          bg-[#101522]/90
          p-4
          shadow-[0_20px_60px_rgba(0,0,0,0.12)]
          backdrop-blur-xl
          sm:p-5
        "
      >
        <div className="animate-pulse">

          <div className="flex items-center gap-3">

            <div
              className="
                h-8
                w-8
                rounded-xl
                bg-white/[0.06]
              "
            />

            <div>
              <div
                className="
                  h-2
                  w-24
                  rounded
                  bg-white/[0.06]
                "
              />

              <div
                className="
                  mt-2
                  h-4
                  w-36
                  rounded
                  bg-white/[0.07]
                "
              />
            </div>

          </div>

          <div className="mt-4 space-y-2.5">

            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="
                  flex
                  items-center
                  gap-3
                  px-2
                  py-2
                "
              >
                <div
                  className="
                    h-2
                    w-2
                    rounded-full
                    bg-white/[0.07]
                  "
                />

                <div
                  className="
                    h-2.5
                    w-40
                    rounded
                    bg-white/[0.06]
                  "
                />
              </div>
            ))}

          </div>

        </div>
      </div>
    );
  }

  /* =========================================================
     MAIN CARD
  ========================================================= */

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-[24px]
        border
        border-white/[0.08]
        bg-[#101522]/90
        p-4
        shadow-[0_20px_60px_rgba(0,0,0,0.12)]
        backdrop-blur-xl
        sm:p-5
      "
    >

      {/* =====================================================
          AMBIENT BACKGROUND
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-44
          w-44
          rounded-full
          bg-violet-600/[0.055]
          blur-[75px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-20
          left-1/3
          h-36
          w-36
          rounded-full
          bg-cyan-500/[0.035]
          blur-[70px]
        "
      />

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        className="
          relative
          z-10
          flex
          items-center
          justify-between
        "
      >

        <div className="flex items-center gap-2.5">

          {/* ONLY ICON IN THE CARD */}

          <motion.div
            animate={{
              rotate: [0, 4, -4, 0],
              scale: [1, 1.03, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              border-violet-400/10
              bg-violet-500/[0.08]
              shadow-[0_0_22px_rgba(139,92,246,0.07)]
            "
          >
            <CheckCircle2
              size={15}
              className="text-violet-300"
            />
          </motion.div>

          <div>

            <p
              className="
                text-[8px]
                font-semibold
                uppercase
                tracking-[2.3px]
                text-violet-300/70
              "
            >
              Activity
            </p>

            <h3
              className="
                mt-0.5
                text-base
                font-bold
                tracking-tight
                text-white
              "
            >
              Recent Activity
            </h3>

          </div>

        </div>

        {/* LIVE */}

        <motion.div
          animate={{
            opacity: [0.45, 0.9, 0.45],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
          }}
          className="
            hidden
            items-center
            gap-1.5
            rounded-full
            border
            border-emerald-400/10
            bg-emerald-400/[0.04]
            px-2
            py-1
            sm:flex
          "
        >

          <span
            className="
              h-1.5
              w-1.5
              rounded-full
              bg-emerald-400
            "
          />

          <span
            className="
              text-[8px]
              font-medium
              uppercase
              tracking-[1px]
              text-gray-600
            "
          >
            Live
          </span>

        </motion.div>

      </div>

      {/* =====================================================
          ACTIVITY LIST
      ===================================================== */}

      <div className="relative z-10 mt-3.5">

        {activities.length === 0 ? (

          <div
            className="
              rounded-xl
              border
              border-white/[0.06]
              bg-white/[0.025]
              px-3.5
              py-3
            "
          >
            <p
              className="
                text-[11px]
                leading-5
                text-gray-500
              "
            >
              No activity yet. Start by uploading
              your resume.
            </p>
          </div>

        ) : (

          <div className="space-y-0.5">

            {activities.slice(0, 5).map(
              (activity, index) => {

                const isLast =
                  index ===
                  Math.min(
                    activities.length,
                    5
                  ) - 1;

                return (
                  <motion.div
                    key={`${activity.title}-${index}`}
                    initial={{
                      opacity: 0,
                      x: -8,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: index * 0.06,
                      duration: 0.35,
                    }}
                    whileHover={{
                      x: 3,
                    }}
                    className="
                      group/activity
                      relative
                      flex
                      items-center
                      gap-3
                      rounded-xl
                      px-2
                      py-2
                      transition-all
                      duration-300
                      hover:bg-white/[0.025]
                    "
                  >

                    {/* =================================================
                        TIMELINE
                    ================================================= */}

                    <div
                      className="
                        relative
                        flex
                        h-7
                        w-3
                        shrink-0
                        items-center
                        justify-center
                      "
                    >

                      {/* Connecting line */}

                      {!isLast && (
                        <div
                          className="
                            absolute
                            left-1/2
                            top-[18px]
                            h-[23px]
                            w-px
                            -translate-x-1/2
                            bg-white/[0.07]
                          "
                        />
                      )}

                      {/* Animated dot */}

                      {/*<motion.span
                        animate={{
                          scale: [1, 1.15, 1],
                          opacity: [0.65, 1, 0.65],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          delay: index * 0.15,
                        }}
                        className="
                          relative
                          z-10
                          h-1.5
                          w-1.5
                          rounded-full
                          bg-violet-400
                          shadow-[0_0_10px_rgba(139,92,246,0.55)]
                        "
                      />*/}

{/* Animated dot */}

                      <motion.span
                        animate={{
                          scale: [1, 1.15, 1],
                          opacity: [0.65, 1, 0.65],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          delay: index * 0.15,
                        }}
                        className="
                          relative
                          z-10
                          h-1.5
                          w-1.5
                          rounded-full
                          bg-violet-400
                          shadow-[0_0_10px_rgba(139,92,246,0.55)]
                        "
                      />

                    </div>

                    {/* =================================================
                        ACTIVITY TEXT
                    ================================================= */}

                    <div className="min-w-0 flex-1">

                      <p
                        className="
                          truncate
                          text-[11px]
                          font-medium
                          text-gray-300
                          transition-colors
                          duration-300
                          group-hover/activity:text-white
                        "
                      >
                        {activity.title}
                      </p>

                    </div>

                    {/* =================================================
                        TIME
                    ================================================= */}

                    <span
                      className="
                        shrink-0
                        text-[9px]
                        text-gray-600
                      "
                    >
                      {activity.time}
                    </span>

                  </motion.div>
                );
              }
            )}

          </div>

        )}

      </div>

    </motion.section>
  );
}


/* =========================================================
   DATE / TIME FORMATTER
========================================================= */

function formatTime(dateValue) {
  if (!dateValue) {
    return "Recently";
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "Recently";
  }

  const now = new Date();

  const diff = Math.floor(
    (now.getTime() - date.getTime()) / 1000
  );

  const minutes = Math.floor(diff / 60);
  const hours = Math.floor(diff / 3600);
  const days = Math.floor(diff / 86400);

  if (diff < 60) {
    return "Just now";
  }

  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  if (hours < 24) {
    return `${hours}h ago`;
  }

  if (days === 1) {
    return "Yesterday";
  }

  if (days < 7) {
    return `${days}d ago`;
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}