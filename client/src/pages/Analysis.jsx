import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  ArrowLeft,
  Sparkles,
  FileText,
  Loader2,
  Code2,
  Users,
  GraduationCap,
  Briefcase,
  FolderGit2,
  CheckCircle2,
  Target,
  Lightbulb,
  TrendingUp,
  ShieldCheck,
  Activity,
  CircleDot,
  ChevronRight,
  Zap,
} from "lucide-react";

import { getResumeById } from "../api/resumeApi";

export default function Analysis() {
  const location = useLocation();
  const navigate = useNavigate();

  const resumeId = location.state?.resumeId;

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  // =========================================================
  // LOAD RESUME
  // =========================================================

  useEffect(() => {
    const loadAnalysis = async () => {
      if (!resumeId) {
        toast.error("No resume selected.");
        navigate("/upload");
        return;
      }

      try {
        setLoading(true);

        const response = await getResumeById(resumeId);

        if (response.data.success) {
          setResume(response.data.resume);
        } else {
          toast.error("Could not load resume analysis.");
          navigate("/upload");
        }
      } catch (error) {
        console.error("ANALYSIS LOAD ERROR:", error);

        toast.error(
          error.response?.data?.message ||
            "Failed to load resume analysis."
        );

        navigate("/upload");
      } finally {
        setLoading(false);
      }
    };

    loadAnalysis();
  }, [resumeId, navigate]);

  // =========================================================
  // SAFE DATA
  // =========================================================

  const analysis = resume?.analysis || {};

  const resumeScore = Number(
    analysis.resumeScore?.overall || 0
  );

  const technicalSkills = Array.isArray(
    analysis.technicalSkills
  )
    ? analysis.technicalSkills
    : [];

  const softSkills = Array.isArray(analysis.softSkills)
    ? analysis.softSkills
    : [];

  const strengths = Array.isArray(analysis.strengths)
    ? analysis.strengths
    : [];

  const weaknesses = Array.isArray(analysis.weaknesses)
    ? analysis.weaknesses
    : [];

  const missingSkills = Array.isArray(
    analysis.missingSkills
  )
    ? analysis.missingSkills
    : [];

  const suggestedRoles = Array.isArray(
    analysis.suggestedRoles
  )
    ? analysis.suggestedRoles
    : [];

  const education = Array.isArray(analysis.education)
    ? analysis.education
    : [];

  const experience = Array.isArray(analysis.experience)
    ? analysis.experience
    : [];

  const projects = Array.isArray(analysis.projects)
    ? analysis.projects
    : [];

  // =========================================================
  // PERFORMANCE
  // =========================================================

  const performance = useMemo(() => {
    if (resumeScore >= 85) {
      return {
        label: "Excellent",
        color: "text-emerald-300",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20",
        description:
          "Your resume demonstrates strong overall quality, relevant skills, and a solid professional profile.",
      };
    }

    if (resumeScore >= 70) {
      return {
        label: "Strong",
        color: "text-violet-300",
        bg: "bg-violet-500/10",
        border: "border-violet-500/20",
        description:
          "Your resume has a solid foundation. A few focused improvements can make it significantly stronger.",
      };
    }

    if (resumeScore >= 50) {
      return {
        label: "Developing",
        color: "text-amber-300",
        bg: "bg-amber-500/10",
        border: "border-amber-500/20",
        description:
          "Your resume has potential, but several areas need improvement to make your profile more competitive.",
      };
    }

    return {
      label: "Needs Improvement",
      color: "text-red-300",
      bg: "bg-red-500/10",
      border: "border-red-500/20",
      description:
        "Use this analysis as your starting point and focus on improving the key areas identified below.",
    };
  }, [resumeScore]);

  // =========================================================
  // SCORE BREAKDOWN
  // =========================================================

  const scoreBreakdown = useMemo(
    () => [
      {
        label: "Content Quality",
        value: Number(
          analysis.resumeScore?.contentQuality || 0
        ),
      },
      {
        label: "Skills",
        value: Number(
          analysis.resumeScore?.skills || 0
        ),
      },
      {
        label: "Projects & Experience",
        value: Number(
          analysis.resumeScore?.projectsExperience || 0
        ),
      },
      {
        label: "Keywords",
        value: Number(
          analysis.resumeScore?.keywords || 0
        ),
      },
      {
        label: "Structure",
        value: Number(
          analysis.resumeScore?.structure || 0
        ),
      },
    ],
    [analysis.resumeScore]
  );

  // =========================================================
  // QUICK STATS
  // =========================================================

  const quickStats = useMemo(
    () => [
      {
        icon: <Code2 size={17} />,
        value: technicalSkills.length,
        label: "Technical Skills",
      },
      {
        icon: <ShieldCheck size={17} />,
        value: strengths.length,
        label: "Strengths",
      },
      {
        icon: <Target size={17} />,
        value: missingSkills.length,
        label: "Skills to Develop",
      },
      {
        icon: <Briefcase size={17} />,
        value: suggestedRoles.length,
        label: "Suggested Roles",
      },
    ],
    [
      technicalSkills.length,
      strengths.length,
      missingSkills.length,
      suggestedRoles.length,
    ]
  );

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <main className="flex min-h-screen w-full items-center justify-center bg-[#05060D] px-4 text-white">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-4 text-sm text-gray-400 backdrop-blur-xl">
          <Loader2
            size={18}
            className="animate-spin text-violet-400"
          />
          Loading your AI resume analysis...
        </div>
      </main>
    );
  }

  if (!resume) {
    return null;
  }

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[#05060D] px-3 py-5 text-white sm:px-5 sm:py-6 lg:px-7 xl:px-10">

      {/* =====================================================
          AMBIENT BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-violet-600/[0.08] blur-[120px]" />

        <div className="absolute right-[-150px] top-[25%] h-[450px] w-[450px] rounded-full bg-cyan-500/[0.045] blur-[120px]" />

        <div className="absolute bottom-[-200px] left-[35%] h-[500px] w-[500px] rounded-full bg-violet-500/[0.04] blur-[130px]" />
      </div>

      {/* =====================================================
          FULL WIDTH CONTENT
      ===================================================== */}

      <div className="relative z-10 mx-auto w-full max-w-[1600px]">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <header className="mb-6 flex w-full flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">

          <motion.button
            type="button"
            onClick={() => navigate("/upload")}
            initial={{
              opacity: 0,
              x: -8,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.35,
            }}
            whileHover={{
              x: -2,
            }}
            whileTap={{
              scale: 0.97,
            }}
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.035] px-4 py-2.5 text-xs font-medium text-gray-400 transition hover:border-violet-500/30 hover:bg-white/[0.06] hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to Resume Upload
          </motion.button>

          <div className="flex items-center gap-3">

            <div className="hidden h-10 w-10 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10 text-violet-300 sm:flex">
              <Sparkles size={18} />
            </div>

            <div className="text-left sm:text-right">

              <p className="text-sm font-semibold text-white">
                AI Resume Analysis
              </p>

              <div className="mt-1 flex items-center gap-2 text-xs text-gray-600 sm:justify-end">
                <FileText size={12} />

                <span className="max-w-[260px] truncate">
                  {resume.fileName || "Resume"}
                </span>
              </div>

            </div>
          </div>
        </header>

        {/* =====================================================
            HERO
        ===================================================== */}

        <motion.section
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="relative mb-6 w-full overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-white/[0.025] backdrop-blur-2xl sm:rounded-[2rem]"
        >

          {/* GRID */}

          <div
            className="pointer-events-none absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
              backgroundSize: "45px 45px",
            }}
          />

          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-violet-600/[0.08] blur-3xl" />

          <div className="relative grid w-full gap-8 p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center lg:p-10 xl:p-12">

            {/* LEFT */}

            <div className="min-w-0">

              <div className="mb-5 flex flex-wrap items-center gap-2">

                <span className="flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-300">
                  <Sparkles size={12} />
                  AI Analysis Complete
                </span>

                {resume.isCurrent && (
                  <span className="flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
                    <CheckCircle2 size={11} />
                    Current
                  </span>
                )}

              </div>

              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl">

                Resume{" "}

                <span className="text-violet-400">
                  Performance
                </span>

              </h1>

              <p className="mt-5 max-w-3xl text-sm leading-7 text-gray-500 sm:text-base">
                CareerPilot AI analyzed your resume across
                content quality, skills, experience, projects,
                structure, and career relevance.
              </p>

              {/* META */}

              <div className="mt-7 flex flex-wrap gap-2">

                <MetaPill
                  icon={<FileText size={12} />}
                  text={resume.fileName || "Resume"}
                />

                <MetaPill
                  icon={<Activity size={12} />}
                  text={`${technicalSkills.length} technical skills`}
                />

                <MetaPill
                  icon={<Target size={12} />}
                  text={`${suggestedRoles.length} suggested roles`}
                />

              </div>

            </div>

            {/* SCORE */}

            <div className="flex justify-center lg:justify-end">
              <ResumeScoreOrb
                score={resumeScore}
                label={performance.label}
              />
            </div>

          </div>
        </motion.section>

        {/* =====================================================
            AI VERDICT
        ===================================================== */}

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
            delay: 0.08,
          }}
          className={`relative mb-6 w-full overflow-hidden rounded-[1.5rem] border ${performance.border} ${performance.bg} p-5 sm:rounded-[1.75rem] sm:p-7`}
        >

          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-violet-500/[0.05] blur-3xl" />

          <div className="relative flex flex-col gap-5 sm:flex-row">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/[0.08] bg-black/20 text-violet-300">
              <Zap size={20} />
            </div>

            <div className="min-w-0 flex-1">

              <div className="flex flex-wrap items-center gap-3">

                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">
                  CareerPilot AI Verdict
                </span>

                <span
                  className={`rounded-full border ${performance.border} ${performance.bg} px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${performance.color}`}
                >
                  {performance.label}
                </span>

              </div>

              <p className="mt-3 max-w-5xl text-sm leading-7 text-gray-300">
                {analysis.resumeScore?.feedback ||
                  performance.description}
              </p>

            </div>
          </div>
        </motion.section>

        {/* =====================================================
            QUICK STATS
        ===================================================== */}

        <section className="mb-7 w-full">

          <SectionTitle
            eyebrow="Profile Snapshot"
            title="Your resume at a glance"
            description="A quick overview of the signals CareerPilot found in your resume."
          />

          <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4">

            {quickStats.map((stat, index) => (
              <StatBox
                key={stat.label}
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
                delay={index * 0.05}
              />
            ))}

          </div>
        </section>

        {/* =====================================================
            SUMMARY + SCORE
        ===================================================== */}

        <div className="mb-7 grid w-full gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.5fr)]">

          {/* SUMMARY */}

          {analysis.summary && (
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
                delay: 0.15,
              }}
              className="min-w-0 rounded-[1.75rem] border border-white/[0.08] bg-white/[0.025] p-5 backdrop-blur-xl sm:p-8"
            >

              <div className="mb-6 flex items-center gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-500/15 bg-cyan-500/10 text-cyan-300">
                  <Sparkles size={19} />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
                    AI Analysis
                  </p>

                  <h2 className="mt-1 font-semibold text-white">
                    Executive Summary
                  </h2>
                </div>

              </div>

              <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-black/20 p-5 sm:p-6">

                <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-violet-500 via-cyan-400 to-transparent" />

                <p className="text-sm leading-8 text-gray-400">
                  {analysis.summary}
                </p>

              </div>
            </motion.section>
          )}

          {/* SCORE BREAKDOWN */}

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
              delay: 0.18,
            }}
            className="min-w-0 rounded-[1.75rem] border border-white/[0.08] bg-white/[0.025] p-5 backdrop-blur-xl sm:p-7"
          >

            <div className="mb-6 flex items-center gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-violet-500/15 bg-violet-500/10 text-violet-300">
                <TrendingUp size={19} />
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-300">
                  Score Details
                </p>

                <h2 className="mt-1 font-semibold text-white">
                  Resume Breakdown
                </h2>
              </div>

            </div>

            <div className="space-y-4">

              {scoreBreakdown.map((item, index) => (
                <ScoreBar
                  key={item.label}
                  label={item.label}
                  value={item.value}
                  delay={index * 0.08}
                />
              ))}

            </div>
          </motion.section>
        </div>

        {/* =====================================================
            SKILLS
        ===================================================== */}

        {(technicalSkills.length > 0 ||
          softSkills.length > 0) && (
          <section className="mb-7 w-full">

            <SectionTitle
              eyebrow="Skill Profile"
              title="What you bring to the table"
              description="Skills identified from your resume by CareerPilot AI."
            />

            <div className="grid w-full gap-5 lg:grid-cols-2">

              {technicalSkills.length > 0 && (
                <SkillPanel
                  icon={<Code2 size={19} />}
                  title="Technical Skills"
                  subtitle="Tools, technologies & technical knowledge"
                  skills={technicalSkills}
                  type="technical"
                />
              )}

              {softSkills.length > 0 && (
                <SkillPanel
                  icon={<Users size={19} />}
                  title="Soft Skills"
                  subtitle="Communication, collaboration & professional traits"
                  skills={softSkills}
                  type="soft"
                />
              )}

            </div>
          </section>
        )}

        {/* =====================================================
            STRENGTHS + WEAKNESSES
        ===================================================== */}

        <section className="mb-7 w-full">

          <SectionTitle
            eyebrow="AI Insights"
            title="Your strongest signals"
            description="What your resume communicates well and where you can improve."
          />

          <div className="grid w-full gap-5 lg:grid-cols-2">

            <InsightPanel
              type="strength"
              title="Strength Signals"
              subtitle="What your resume does well"
              icon={<ShieldCheck size={19} />}
              items={strengths}
            />

            <InsightPanel
              type="weakness"
              title="Growth Signals"
              subtitle="Where your resume can improve"
              icon={<Target size={19} />}
              items={weaknesses}
            />

          </div>
        </section>

        {/* =====================================================
            MISSING SKILLS
        ===================================================== */}

        {missingSkills.length > 0 && (
          <motion.section
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="relative mb-7 w-full overflow-hidden rounded-[1.75rem] border border-orange-500/15 bg-orange-500/[0.035] backdrop-blur-xl sm:rounded-[2rem]"
          >

            <div className="absolute right-[-80px] top-[-80px] h-64 w-64 rounded-full bg-orange-500/[0.05] blur-3xl" />

            <div className="relative border-b border-white/[0.06] p-5 sm:p-8">

              <div className="flex items-center gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-orange-500/15 bg-orange-500/10 text-orange-300">
                  <Lightbulb size={19} />
                </div>

                <div className="min-w-0">

                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-orange-300">
                    Growth Opportunities
                  </p>

                  <h2 className="mt-1 font-semibold text-white">
                    Skills You Should Develop
                  </h2>

                  <p className="mt-1 text-xs text-gray-600">
                    Recommended based on your current profile.
                  </p>

                </div>
              </div>
            </div>

            <div className="relative flex flex-wrap gap-3 p-5 sm:p-8">

              {missingSkills.map((skill, index) => (
                <motion.div
                  key={index}
                  whileHover={{
                    y: -2,
                  }}
                  className="max-w-full rounded-xl border border-orange-500/20 bg-orange-500/10 px-4 py-3 text-sm text-orange-300 transition hover:bg-orange-500/15"
                >
                  {typeof skill === "string"
                    ? skill
                    : JSON.stringify(skill)}
                </motion.div>
              ))}

            </div>
          </motion.section>
        )}

        {/* =====================================================
            SUGGESTED ROLES
        ===================================================== */}

        {suggestedRoles.length > 0 && (
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
              delay: 0.1,
            }}
            className="relative mb-7 w-full overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-white/[0.025] backdrop-blur-xl sm:rounded-[2rem]"
          >

            <div className="absolute right-[-80px] top-[-80px] h-64 w-64 rounded-full bg-violet-500/[0.06] blur-3xl" />

            <div className="relative border-b border-white/[0.06] p-5 sm:p-8">

              <div className="flex items-center gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-violet-500/15 bg-violet-500/10 text-violet-300">
                  <Target size={19} />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-300">
                    Career Direction
                  </p>

                  <h2 className="mt-1 font-semibold text-white">
                    Suggested Career Roles
                  </h2>

                  <p className="mt-1 text-xs text-gray-600">
                    Roles that align with your current resume.
                  </p>
                </div>

              </div>
            </div>

            <div className="relative grid gap-3 p-5 sm:grid-cols-2 sm:p-8 lg:grid-cols-3 xl:grid-cols-4">

              {suggestedRoles.map((role, index) => (
                <motion.div
                  key={index}
                  whileHover={{
                    y: -3,
                  }}
                  className="group min-w-0 rounded-2xl border border-white/[0.06] bg-black/10 p-5 transition hover:border-violet-500/20 hover:bg-white/[0.02]"
                >

                  <div className="flex items-center justify-between">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-500/15 bg-violet-500/10 text-violet-300">
                      <Briefcase size={18} />
                    </div>

                    <ChevronRight
                      size={16}
                      className="text-gray-700 transition group-hover:translate-x-1 group-hover:text-violet-300"
                    />

                  </div>

                  <h3 className="mt-5 break-words font-medium text-gray-200">
                    {typeof role === "string"
                      ? role
                      : JSON.stringify(role)}
                  </h3>

                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* =====================================================
            EDUCATION
        ===================================================== */}

        {education.length > 0 && (
          <div className="mb-7 w-full">

            <SectionTitle
              eyebrow="Background"
              title="Education"
              description="Academic information detected from your resume."
            />

            <ListCard
              items={education}
              icon={GraduationCap}
              title="Education"
              iconClass="text-blue-300"
            />

          </div>
        )}

        {/* =====================================================
            EXPERIENCE
        ===================================================== */}

        {experience.length > 0 && (
          <div className="mb-7 w-full">

            <SectionTitle
              eyebrow="Professional Background"
              title="Experience"
              description="Your professional experience identified by CareerPilot AI."
            />

            <ListCard
              items={experience}
              icon={Briefcase}
              title="Experience"
              iconClass="text-emerald-300"
            />

          </div>
        )}

        {/* =====================================================
            PROJECTS
        ===================================================== */}

        {projects.length > 0 && (
          <div className="mb-7 w-full">

            <SectionTitle
              eyebrow="Work & Portfolio"
              title="Projects"
              description="Projects and technologies detected from your resume."
            />

            <ListCard
              items={projects}
              icon={FolderGit2}
              title="Projects"
              iconClass="text-cyan-300"
            />

          </div>
        )}

        {/* =====================================================
            FINAL CTA
        ===================================================== */}

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
            delay: 0.2,
          }}
          className="relative mb-10 w-full overflow-hidden rounded-[1.75rem] border border-violet-500/15 bg-gradient-to-br from-violet-600/[0.10] via-white/[0.025] to-cyan-500/[0.04] p-5 sm:rounded-[2rem] sm:p-9"
        >

          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-500/[0.08] blur-3xl" />

          <div className="relative flex flex-col gap-7 md:flex-row md:items-center md:justify-between">

            <div className="min-w-0">

              <div className="mb-3 flex items-center gap-2 text-violet-300">

                <Sparkles size={15} />

                <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">
                  Keep improving
                </span>

              </div>

              <h2 className="text-2xl font-semibold text-white sm:text-3xl">
                Turn this analysis into progress.
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                Use your strengths, improve your gaps, and
                build a resume that is ready for your target roles.
              </p>

            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">

              <button
                type="button"
                onClick={() => navigate("/upload")}
                className="group inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-900/20 transition hover:bg-violet-500 sm:w-auto"
              >

                <RotateIcon />

                Analyze Another Resume

                <ChevronRight
                  size={16}
                  className="transition group-hover:translate-x-1"
                />

              </button>

              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3.5 text-sm font-semibold text-gray-300 transition hover:bg-white/[0.08] hover:text-white sm:w-auto"
              >

                <Activity size={16} />

                Dashboard

              </button>

            </div>

          </div>
        </motion.section>

        {/* FOOTER */}

        <div className="mb-5 flex items-center justify-center gap-2 text-center text-xs text-gray-700">

          <Sparkles size={13} />

          Analysis generated by CareerPilot AI

        </div>

      </div>
    </main>
  );
}


/* ============================================================
   SCORE ORB
============================================================ */

function ResumeScoreOrb({
  score,
  label,
}) {
  const radius = 76;

  const circumference =
    2 * Math.PI * radius;

  const safeScore = Math.min(
    100,
    Math.max(0, Number(score || 0))
  );

  const progress =
    circumference -
    (safeScore / 100) * circumference;

  return (
    <div className="relative flex h-[210px] w-[210px] items-center justify-center sm:h-[250px] sm:w-[250px]">

      <div className="absolute inset-5 rounded-full bg-violet-600/10 blur-3xl" />

      <svg
        width="220"
        height="220"
        viewBox="0 0 220 220"
        className="relative h-[190px] w-[190px] -rotate-90 sm:h-[220px] sm:w-[220px]"
      >

        <circle
          cx="110"
          cy="110"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.055)"
          strokeWidth="8"
        />

        <motion.circle
          cx="110"
          cy="110"
          r={radius}
          fill="none"
          stroke="url(#resumeScoreGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{
            strokeDashoffset: circumference,
          }}
          animate={{
            strokeDashoffset: progress,
          }}
          transition={{
            duration: 1.5,
            ease: "easeOut",
          }}
        />

        <defs>
          <linearGradient
            id="resumeScoreGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop
              offset="0%"
              stopColor="#8b5cf6"
            />

            <stop
              offset="100%"
              stopColor="#22d3ee"
            />
          </linearGradient>
        </defs>

      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">

        <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-600 sm:text-[10px]">
          Resume Score
        </span>

        <motion.p
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            delay: 0.5,
            duration: 0.5,
          }}
          className="mt-1 text-4xl font-bold tracking-tight text-white sm:text-5xl"
        >
          {safeScore}
        </motion.p>

        <span className="mt-1 text-xs text-gray-600">
          / 100
        </span>

        <span className="mt-3 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-violet-300">
          {label}
        </span>

      </div>
    </div>
  );
}


/* ============================================================
   SCORE BAR
============================================================ */

function ScoreBar({
  label,
  value,
  delay = 0,
}) {
  const safeValue = Math.min(
    100,
    Math.max(0, Number(value || 0))
  );

  return (
    <div>

      <div className="mb-2 flex items-center justify-between gap-4">

        <span className="min-w-0 text-xs text-gray-500">
          {label}
        </span>

        <span className="shrink-0 text-xs font-semibold text-gray-300">
          {safeValue}/100
        </span>

      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.05]">

        <motion.div
          initial={{
            width: 0,
          }}
          animate={{
            width: `${safeValue}%`,
          }}
          transition={{
            delay,
            duration: 0.9,
            ease: "easeOut",
          }}
          className="h-full rounded-full bg-gradient-to-r from-violet-600 to-cyan-400"
        />

      </div>

    </div>
  );
}


/* ============================================================
   STAT BOX
============================================================ */

function StatBox({
  icon,
  value,
  label,
  delay = 0,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay,
      }}
      whileHover={{
        y: -3,
      }}
      className="min-w-0 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 backdrop-blur-xl transition hover:border-violet-500/20 sm:p-5"
    >

      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.04] text-violet-300">
        {icon}
      </div>

      <p className="mt-4 text-2xl font-semibold text-white">
        {value}
      </p>

      <p className="mt-1 truncate text-[10px] uppercase tracking-wider text-gray-600">
        {label}
      </p>

    </motion.div>
  );
}


/* ============================================================
   SKILL PANEL
============================================================ */

function SkillPanel({
  icon,
  title,
  subtitle,
  skills,
  type,
}) {
  const isTechnical = type === "technical";

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
      whileHover={{
        y: -2,
      }}
      className="relative min-w-0 overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-white/[0.025] p-5 backdrop-blur-xl sm:p-7"
    >

      <div
        className={`absolute right-[-50px] top-[-50px] h-40 w-40 rounded-full blur-3xl ${
          isTechnical
            ? "bg-cyan-500/[0.05]"
            : "bg-violet-500/[0.05]"
        }`}
      />

      <div className="relative">

        <div className="mb-6 flex items-start gap-4">

          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${
              isTechnical
                ? "border-cyan-500/15 bg-cyan-500/10 text-cyan-300"
                : "border-violet-500/15 bg-violet-500/10 text-violet-300"
            }`}
          >
            {icon}
          </div>

          <div className="min-w-0">

            <p
              className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${
                isTechnical
                  ? "text-cyan-300"
                  : "text-violet-300"
              }`}
            >
              {isTechnical
                ? "Technical Profile"
                : "Professional Profile"}
            </p>

            <h2 className="mt-1 font-semibold text-white">
              {title}
            </h2>

            <p className="mt-1 text-xs text-gray-600">
              {subtitle}
            </p>

          </div>
        </div>

        <div className="flex flex-wrap gap-2">

          {skills.map((skill, index) => (
            <motion.span
              key={index}
              whileHover={{
                y: -2,
              }}
              className={`max-w-full break-words rounded-full border px-3 py-1.5 text-xs ${
                isTechnical
                  ? "border-cyan-500/20 bg-cyan-500/10 text-cyan-300"
                  : "border-violet-500/20 bg-violet-500/10 text-violet-300"
              }`}
            >
              {typeof skill === "string"
                ? skill
                : JSON.stringify(skill)}
            </motion.span>
          ))}

        </div>

      </div>
    </motion.section>
  );
}


/* ============================================================
   INSIGHT PANEL
============================================================ */

function InsightPanel({
  type,
  title,
  subtitle,
  icon,
  items,
}) {
  const isStrength = type === "strength";

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
      className="relative min-w-0 overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-white/[0.025] p-5 backdrop-blur-xl sm:p-7"
    >

      <div
        className={`absolute right-[-50px] top-[-50px] h-40 w-40 rounded-full blur-3xl ${
          isStrength
            ? "bg-emerald-500/[0.05]"
            : "bg-orange-500/[0.05]"
        }`}
      />

      <div className="relative">

        <div className="mb-6 flex items-start gap-4">

          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${
              isStrength
                ? "border-emerald-500/15 bg-emerald-500/10 text-emerald-300"
                : "border-orange-500/15 bg-orange-500/10 text-orange-300"
            }`}
          >
            {icon}
          </div>

          <div className="min-w-0">

            <p
              className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${
                isStrength
                  ? "text-emerald-300"
                  : "text-orange-300"
              }`}
            >
              {isStrength
                ? "Positive Signals"
                : "Growth Signals"}
            </p>

            <h2 className="mt-1 font-semibold text-white">
              {title}
            </h2>

            <p className="mt-1 text-xs text-gray-600">
              {subtitle}
            </p>

          </div>
        </div>

        <div className="space-y-3">

          {items.length > 0 ? (
            items.map((item, index) => (
              <div
                key={index}
                className="group flex gap-3 rounded-xl border border-white/[0.05] bg-black/10 p-4 transition hover:border-white/[0.09]"
              >

                <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[9px] font-bold ${
                    isStrength
                      ? "bg-emerald-500/10 text-emerald-300"
                      : "bg-orange-500/10 text-orange-300"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </div>

                <p className="min-w-0 text-sm leading-6 text-gray-400">
                  {typeof item === "string"
                    ? item
                    : JSON.stringify(item)}
                </p>

              </div>
            ))
          ) : (
            <p className="text-sm text-gray-600">
              No insights available.
            </p>
          )}

        </div>
      </div>
    </motion.section>
  );
}


/* ============================================================
   LIST CARD
============================================================ */

function ListCard({
  items,
  icon: Icon,
  title,
  iconClass,
}) {
  if (!items || items.length === 0) {
    return null;
  }

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
      className="w-full rounded-[1.75rem] border border-white/[0.07] bg-white/[0.025] p-5 backdrop-blur-xl sm:p-7"
    >

      <div className="mb-6 flex items-center gap-4">

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.04]">

          <Icon
            size={19}
            className={iconClass}
          />

        </div>

        <div>

          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-600">
            Resume Section
          </p>

          <h2 className="mt-1 font-semibold text-white">
            {title}
          </h2>

        </div>
      </div>

      <div className="space-y-3">

        {items.map((item, index) => (
          <ResumeItem
            key={index}
            item={item}
            title={title}
            index={index}
          />
        ))}

      </div>

    </motion.section>
  );
}


/* ============================================================
   RESUME ITEM
============================================================ */

function ResumeItem({
  item,
  title,
  index,
}) {
  /* EDUCATION */

  if (
    title === "Education" &&
    item &&
    typeof item === "object"
  ) {
    return (
      <div className="rounded-2xl border border-white/[0.06] bg-black/10 p-4 sm:p-5">

        <div className="flex gap-4">

          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-xs font-bold text-blue-300">
            {String(index + 1).padStart(2, "0")}
          </div>

          <div className="min-w-0">

            <h3 className="break-words font-semibold text-white">
              {item.degree ||
                "Degree not specified"}
            </h3>

            {item.institution && (
              <p className="mt-1 break-words text-sm text-gray-300">
                {item.institution}
              </p>
            )}

            {item.field && (
              <p className="mt-1 break-words text-xs text-gray-500">
                Field: {item.field}
              </p>
            )}

            {item.dates && (
              <p className="mt-1 break-words text-xs text-gray-500">
                {item.dates}
              </p>
            )}

            {item.score && (
              <span className="mt-3 inline-block rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-300">
                {item.score}
              </span>
            )}

          </div>
        </div>
      </div>
    );
  }

  /* EXPERIENCE */

  if (
    title === "Experience" &&
    item &&
    typeof item === "object"
  ) {
    const responsibilities = normalizeArray(
      item.responsibilities
    );

    return (
      <div className="rounded-2xl border border-white/[0.06] bg-black/10 p-4 sm:p-5">

        <div className="flex gap-4">

          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-xs font-bold text-emerald-300">
            {String(index + 1).padStart(2, "0")}
          </div>

          <div className="min-w-0 flex-1">

            <h3 className="break-words font-semibold text-white">
              {item.role ||
                "Role not specified"}
            </h3>

            {item.company && (
              <p className="mt-1 break-words text-sm text-gray-300">
                {item.company}
              </p>
            )}

            {item.duration && (
              <p className="mt-1 break-words text-xs text-gray-500">
                {item.duration}
              </p>
            )}

            {responsibilities.length > 0 && (
              <ul className="mt-4 space-y-2">

                {responsibilities.map(
                  (responsibility, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-sm leading-6 text-gray-400"
                    >

                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />

                      <span className="min-w-0 break-words">
                        {typeof responsibility ===
                        "string"
                          ? responsibility
                          : JSON.stringify(
                              responsibility
                            )}
                      </span>

                    </li>
                  )
                )}

              </ul>
            )}

          </div>
        </div>
      </div>
    );
  }

  /* PROJECTS */

  if (
    title === "Projects" &&
    item &&
    typeof item === "object"
  ) {
    const technologies = normalizeArray(
      item.technologies
    );

    return (
      <div className="rounded-2xl border border-white/[0.06] bg-black/10 p-4 sm:p-5">

        <div className="flex gap-4">

          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-xs font-bold text-cyan-300">
            {String(index + 1).padStart(2, "0")}
          </div>

          <div className="min-w-0 flex-1">

            <h3 className="break-words font-semibold text-white">
              {item.name || "Project"}
            </h3>

            {technologies.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">

                {technologies.map(
                  (technology, i) => (
                    <span
                      key={i}
                      className="max-w-full break-words rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-[11px] text-cyan-300"
                    >
                      {typeof technology ===
                      "string"
                        ? technology
                        : JSON.stringify(
                            technology
                          )}
                    </span>
                  )
                )}

              </div>
            )}

            {item.description && (
              <p className="mt-4 break-words text-sm leading-6 text-gray-400">
                {item.description}
              </p>
            )}

          </div>
        </div>
      </div>
    );
  }

  /* NORMAL STRING */

  return (
    <div className="flex gap-3 rounded-xl border border-white/[0.05] bg-black/10 p-4">

      <CircleDot
        size={14}
        className="mt-1 shrink-0 text-violet-400"
      />

      <p className="min-w-0 break-words text-sm leading-6 text-gray-400">

        {typeof item === "string"
          ? item
          : JSON.stringify(item)}

      </p>

    </div>
  );
}


/* ============================================================
   NORMALIZE ARRAY
============================================================ */

function normalizeArray(value) {
  if (Array.isArray(value)) {
    return value;
  }

  if (value === null || value === undefined) {
    return [];
  }

  if (typeof value === "string") {
    return value.trim()
      ? [value]
      : [];
  }

  if (typeof value === "object") {
    return [value];
  }

  return [String(value)];
}


/* ============================================================
   META PILL
============================================================ */

function MetaPill({
  icon,
  text,
}) {
  return (
    <div className="flex min-w-0 max-w-full items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-xs text-gray-500">

      <span className="shrink-0 text-gray-600">
        {icon}
      </span>

      <span className="max-w-[260px] truncate">
        {text}
      </span>

    </div>
  );
}


/* ============================================================
   SECTION TITLE
============================================================ */

function SectionTitle({
  eyebrow,
  title,
  description,
}) {
  return (
    <div className="mb-5">

      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-300">
        {eyebrow}
      </p>

      <h2 className="mt-1 text-xl font-semibold text-white sm:text-2xl">
        {title}
      </h2>

      <p className="mt-1 max-w-2xl text-xs leading-5 text-gray-600">
        {description}
      </p>

    </div>
  );
}


/* ============================================================
   ROTATE ICON
============================================================ */

function RotateIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  );
}