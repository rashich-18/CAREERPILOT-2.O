import { useEffect, useState } from "react";
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
  AlertTriangle,
  Target,
  Lightbulb,
  Gauge,
  TrendingUp,
} from "lucide-react";

import { getResumeById } from "../api/resumeApi";

export default function Analysis() {
  const location = useLocation();
  const navigate = useNavigate();

  const resumeId = location.state?.resumeId;

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // LOAD SAVED RESUME ANALYSIS
  // ==========================================

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

  // ==========================================
  // LOADING SCREEN
  // ==========================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#070712] text-white">
        <div className="text-center">
          <Loader2
            size={45}
            className="mx-auto animate-spin text-violet-400"
          />

          <p className="mt-5 text-lg text-gray-300">
            Loading your AI analysis...
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Fetching your saved CareerPilot analysis
          </p>
        </div>
      </div>
    );
  }

  if (!resume) {
    return null;
  }

  const analysis = resume.analysis || {};

  // ==========================================
  // REUSABLE LIST COMPONENT
  // ==========================================

  const ListCard = ({
    items,
    icon: Icon,
    title,
    iconClass,
  }) => {
    if (!items || items.length === 0) return null;

    return (
      <section className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl">

        {/* Header */}

        <div className="mb-6 flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5">
            <Icon
              size={21}
              className={iconClass}
            />
          </div>

          <h2 className="text-xl font-semibold">
            {title}
          </h2>

        </div>

        {/* Items */}

        <div className="space-y-4">

          {items.map((item, index) => (

            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >

              {/* ==========================================
                  EDUCATION
              =========================================== */}

              {title === "Education" &&
              typeof item === "object" ? (

                <div className="space-y-2">

                  <h3 className="text-lg font-semibold text-white">
                    {item.degree || "Degree not specified"}
                  </h3>

                  {item.institution && (
                    <p className="text-gray-300">
                      {item.institution}
                    </p>
                  )}

                  {item.field && (
                    <p className="text-sm text-gray-400">
                      Field: {item.field}
                    </p>
                  )}

                  {item.dates && (
                    <p className="text-sm text-gray-400">
                      {item.dates}
                    </p>
                  )}

                  {item.score && (
                    <p className="text-sm text-cyan-300">
                      {item.score}
                    </p>
                  )}

                </div>

              ) : title === "Experience" &&
                typeof item === "object" ? (

                /* ==========================================
                    EXPERIENCE
                =========================================== */

                <div className="space-y-3">

                  <div>

                    <h3 className="text-lg font-semibold text-white">
                      {item.role || "Role not specified"}
                    </h3>

                    {item.company && (
                      <p className="text-gray-300">
                        {item.company}
                      </p>
                    )}

                    {item.duration && (
                      <p className="mt-1 text-sm text-gray-500">
                        {item.duration}
                      </p>
                    )}

                  </div>

                  {item.responsibilities?.length > 0 && (

                    <ul className="space-y-2">

                      {(Array.isArray(item.responsibilities)
                      ? item.responsibilities
                      : [item.responsibilities]
                    ).map((responsibility, i) => (

                          <li
                            key={i}
                            className="flex gap-2 text-sm leading-6 text-gray-400"
                          >

                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />

                            <span>
                              {responsibility}
                            </span>

                          </li>

                        )
                      )}

                    </ul>

                  )}

                </div>

              ) : title === "Projects" &&
                typeof item === "object" ? (

                /* ==========================================
                    PROJECTS
                =========================================== */

                <div className="space-y-3">

                  <h3 className="text-lg font-semibold text-white">
                    {item.name || "Project"}
                  </h3>

                  {item.technologies?.length > 0 && (

                    <div className="flex flex-wrap gap-2">

                      {item.technologies.map(
                        (technology, i) => (

                          <span
                            key={i}
                            className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs text-cyan-300"
                          >
                            {technology}
                          </span>

                        )
                      )}

                    </div>

                  )}

                  {item.description && (

                    <p className="text-sm leading-6 text-gray-400">
                      {item.description}
                    </p>

                  )}

                </div>

              ) : (

                /* ==========================================
                    NORMAL STRING
                =========================================== */

                <p className="text-sm leading-6 text-gray-300">

                  {typeof item === "string"
                    ? item
                    : JSON.stringify(item)}

                </p>

              )}

            </div>

          ))}

        </div>

      </section>
    );
  };

  // ==========================================
  // MAIN UI
  // ==========================================

  return (
    <div className="min-h-screen bg-[#070712] px-5 py-8 text-white md:px-8">

      {/* ==========================================
          BACKGROUND GLOW
      =========================================== */}

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">

        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-violet-600/10 blur-[130px]" />

        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[130px]" />

      </div>

      <div className="mx-auto max-w-7xl">

        {/* ==========================================
            TOP BAR
        =========================================== */}

        <div className="mb-8 flex items-center justify-between">

          <button
            onClick={() => navigate("/upload")}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-gray-300 transition hover:border-violet-500/50 hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Resumes
          </button>

        </div>

        {/* ==========================================
            HEADER
        =========================================== */}

        <div className="mb-10">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div className="flex items-center gap-4">

              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 shadow-lg shadow-violet-500/20">
                <Sparkles size={30} />
              </div>

              <div>

                <h1 className="text-3xl font-bold md:text-4xl">
                  AI Resume Analysis
                </h1>

                <div className="mt-2 flex items-center gap-2 text-sm text-gray-400">

                  <FileText size={15} />

                  <span className="max-w-[250px] truncate">
                    {resume.fileName}
                  </span>

                  {resume.isCurrent && (

                    <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-400">

                      <CheckCircle2 size={12} />

                      Current

                    </span>

                  )}

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* ==========================================
            AI SUMMARY
        =========================================== */}

        {analysis.summary && (

          <section className="mb-6 rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-cyan-500/5 p-7 backdrop-blur-xl">

            <div className="mb-5 flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/20">

                <Sparkles
                  size={22}
                  className="text-violet-400"
                />

              </div>

              <div>

                <h2 className="text-xl font-semibold">
                  AI Summary
                </h2>

                <p className="text-xs text-gray-500">
                  CareerPilot AI
                </p>

              </div>

            </div>

            <p className="max-w-5xl leading-8 text-gray-300">
              {analysis.summary}
            </p>

          </section>

        )}

        {/* ==========================================
    RESUME SCORE
========================================== */}

{analysis.resumeScore && (
  <section className="mb-6 rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 via-white/[0.03] to-cyan-500/5 p-7 backdrop-blur-xl">

    <div className="mb-7 flex items-center gap-3">

      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10">
        <Gauge
          size={22}
          className="text-violet-400"
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold">
          Resume Score
        </h2>

        <p className="text-sm text-gray-500">
          Overall strength of your resume
        </p>
      </div>

    </div>

    <div className="grid gap-8 lg:grid-cols-[240px_1fr]">

      {/* ==========================================
          OVERALL SCORE
      =========================================== */}

      <div className="flex flex-col items-center justify-center">

        <div
          className="relative flex h-48 w-48 items-center justify-center rounded-full"
          style={{
            background: `conic-gradient(
              rgb(139 92 246) ${analysis.resumeScore.overall * 3.6}deg,
              rgba(255,255,255,0.06) 0deg
            )`,
          }}
        >

          <div className="flex h-40 w-40 flex-col items-center justify-center rounded-full bg-[#070712]">

            <span className="text-5xl font-bold text-white">
              {analysis.resumeScore.overall}
            </span>

            <span className="mt-1 text-sm text-gray-500">
              / 100
            </span>

          </div>

        </div>

        <div className="mt-5 text-center">

          <p className="font-semibold text-violet-300">
            {analysis.resumeScore.overall >= 85
              ? "Excellent Resume"
              : analysis.resumeScore.overall >= 70
              ? "Good Resume"
              : analysis.resumeScore.overall >= 50
              ? "Needs Improvement"
              : "Needs Significant Improvement"}
          </p>

          {analysis.resumeScore.feedback && (
            <p className="mt-2 max-w-xs text-sm leading-6 text-gray-400">
              {analysis.resumeScore.feedback}
            </p>
          )}

        </div>

      </div>


      {/* ==========================================
          SCORE BREAKDOWN
      =========================================== */}

      <div>

        <div className="mb-4 flex items-center gap-2">

          <TrendingUp
            size={18}
            className="text-cyan-400"
          />

          <h3 className="font-semibold text-gray-200">
            Score Breakdown
          </h3>

        </div>

        <div className="grid gap-4 sm:grid-cols-2">

          {[
            {
              label: "Content Quality",
              value: analysis.resumeScore.contentQuality,
            },
            {
              label: "Skills",
              value: analysis.resumeScore.skills,
            },
            {
              label: "Projects & Experience",
              value: analysis.resumeScore.projectsExperience,
            },
            {
              label: "Keywords",
              value: analysis.resumeScore.keywords,
            },
            {
              label: "Structure",
              value: analysis.resumeScore.structure,
            },
          ].map((item) => (

            <div
              key={item.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
            >

              <div className="mb-3 flex items-center justify-between">

                <span className="text-sm text-gray-400">
                  {item.label}
                </span>

                <span className="text-sm font-semibold text-white">
                  {item.value}/100
                </span>

              </div>

              <div className="h-2 overflow-hidden rounded-full bg-white/10">

                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-700"
                  style={{
                    width: `${item.value}%`,
                  }}
                />

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  </section>
)}


        {/* ==========================================
            SKILLS
        =========================================== */}

        <div className="mb-6 grid gap-6 lg:grid-cols-2">

          {/* Technical Skills */}

          {analysis.technicalSkills?.length > 0 && (

            <section className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl">

              <div className="mb-6 flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10">

                  <Code2
                    size={22}
                    className="text-cyan-400"
                  />

                </div>

                <h2 className="text-xl font-semibold">
                  Technical Skills
                </h2>

              </div>

              <div className="flex flex-wrap gap-3">

                {analysis.technicalSkills.map(
                  (skill, index) => (

                    <span
                      key={index}
                      className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300"
                    >
                      {skill}
                    </span>

                  )
                )}

              </div>

            </section>

          )}

          {/* Soft Skills */}

          {analysis.softSkills?.length > 0 && (

            <section className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl">

              <div className="mb-6 flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10">

                  <Users
                    size={22}
                    className="text-violet-400"
                  />

                </div>

                <h2 className="text-xl font-semibold">
                  Soft Skills
                </h2>

              </div>

              <div className="flex flex-wrap gap-3">

                {analysis.softSkills.map(
                  (skill, index) => (

                    <span
                      key={index}
                      className="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300"
                    >
                      {skill}
                    </span>

                  )
                )}

              </div>

            </section>

          )}

        </div>

        {/* ==========================================
            STRENGTHS + WEAKNESSES
        =========================================== */}

        <div className="mb-6 grid gap-6 lg:grid-cols-2">

          <ListCard
            items={analysis.strengths}
            icon={CheckCircle2}
            title="Your Strengths"
            iconClass="text-emerald-400"
          />

          <ListCard
            items={analysis.weaknesses}
            icon={AlertTriangle}
            title="Areas to Improve"
            iconClass="text-orange-400"
          />

        </div>

        {/* ==========================================
            MISSING SKILLS
        =========================================== */}

        {analysis.missingSkills?.length > 0 && (

          <section className="mb-6 rounded-3xl border border-orange-500/20 bg-orange-500/5 p-7 backdrop-blur-xl">

            <div className="mb-6 flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10">

                <Lightbulb
                  size={22}
                  className="text-orange-400"
                />

              </div>

              <div>

                <h2 className="text-xl font-semibold">
                  Skills You Should Develop
                </h2>

                <p className="text-sm text-gray-500">
                  Recommended based on your career direction
                </p>

              </div>

            </div>

            <div className="flex flex-wrap gap-3">

              {analysis.missingSkills.map(
                (skill, index) => (

                  <div
                    key={index}
                    className="rounded-xl border border-orange-500/20 bg-orange-500/10 px-4 py-3 text-sm text-orange-300"
                  >
                    {skill}
                  </div>

                )
              )}

            </div>

          </section>

        )}

        {/* ==========================================
            SUGGESTED ROLES
        =========================================== */}

        {analysis.suggestedRoles?.length > 0 && (

          <section className="mb-6 rounded-3xl border border-violet-500/20 bg-violet-500/5 p-7 backdrop-blur-xl">

            <div className="mb-6 flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10">

                <Target
                  size={22}
                  className="text-violet-400"
                />

              </div>

              <div>

                <h2 className="text-xl font-semibold">
                  Suggested Career Roles
                </h2>

                <p className="text-sm text-gray-500">
                  Roles that match your current profile
                </p>

              </div>

            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

              {analysis.suggestedRoles.map(
                (role, index) => (

                  <div
                    key={index}
                    className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-violet-500/40 hover:bg-white/10"
                  >

                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10">

                      <Briefcase
                        size={20}
                        className="text-violet-400"
                      />

                    </div>

                    <h3 className="font-medium text-gray-200">
                      {role}
                    </h3>

                  </div>

                )
              )}

            </div>

          </section>

        )}

        {/* ==========================================
            EDUCATION
        =========================================== */}

        <ListCard
          items={analysis.education}
          icon={GraduationCap}
          title="Education"
          iconClass="text-blue-400"
        />

        {/* ==========================================
            EXPERIENCE
        =========================================== */}

        <div className="mt-6">

          <ListCard
            items={analysis.experience}
            icon={Briefcase}
            title="Experience"
            iconClass="text-emerald-400"
          />

        </div>

        {/* ==========================================
            PROJECTS
        =========================================== */}

        <div className="mt-6">

          <ListCard
            items={analysis.projects}
            icon={FolderGit2}
            title="Projects"
            iconClass="text-cyan-400"
          />

        </div>

        {/* ==========================================
            FOOTER
        =========================================== */}

        <div className="mt-10 rounded-2xl border border-white/5 bg-white/[0.03] p-5 text-center">

          <p className="flex items-center justify-center gap-2 text-sm text-gray-500">

            <Sparkles size={15} />

            Analysis generated by CareerPilot AI

          </p>

        </div>

      </div>

    </div>
  );
}
