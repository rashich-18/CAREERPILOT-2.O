import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Sparkles,
  FileText,
  Building2,
  BriefcaseBusiness,
  ClipboardList,
  History,
  Trash2,
  ChevronRight,
  Loader2,
  WandSparkles,
  CheckCircle2,
  Target,
  Zap,
  ShieldCheck,
  Copy,
  Upload,
  ArrowUpRight,
  Brain,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { getResumeHistory } from "../api/resumeApi.js";

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/job-applications",
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default function JobApplication() {
  const navigate = useNavigate();

  const [resumeId, setResumeId] = useState("");
  const [resumes, setResumes] = useState([]);

  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const [generating, setGenerating] = useState(false);

  const [applications, setApplications] = useState([]);

  const [historyLoading, setHistoryLoading] = useState(true);

  // ==========================================
  // FETCH DATA
  // ==========================================

  useEffect(() => {
    fetchResumes();
    fetchApplicationHistory();
  }, []);

  const fetchResumes = async () => {
    try {
      const response = await getResumeHistory();

      if (response.data.success) {
        const resumeList = response.data.resumes || [];

        setResumes(resumeList);

        if (resumeList.length > 0) {
          setResumeId(resumeList[0]._id);
        }
      }
    } catch (error) {
      console.error("FETCH RESUMES ERROR:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load resumes."
      );
    }
  };

  const fetchApplicationHistory = async () => {
    try {
      setHistoryLoading(true);

      const response = await API.get("/");

      if (response.data.success) {
        setApplications(
          response.data.applications || []
        );
      }
    } catch (error) {
      console.error(
        "FETCH APPLICATION HISTORY ERROR:",
        error
      );
    } finally {
      setHistoryLoading(false);
    }
  };

  // ==========================================
  // GENERATE
  // ==========================================

  const handleGenerate = async () => {
    if (!resumeId) {
      toast.error("Please select a resume first.");
      return;
    }

    if (!role.trim()) {
      toast.error("Please enter the target role.");
      return;
    }

    if (!company.trim()) {
      toast.error("Please enter the company name.");
      return;
    }

    if (!jobDescription.trim()) {
      toast.error("Please add the job description.");
      return;
    }

    try {
      setGenerating(true);

      const response = await API.post("/", {
        resumeId,
        role: role.trim(),
        company: company.trim(),
        jobDescription: jobDescription.trim(),
      });

      if (response.data.success) {
        toast.success("AI job application generated!");

        const application =
          response.data.application;

        navigate(
          `/job-application/${application._id}`
        );
      }
    } catch (error) {
      console.error(
        "GENERATE APPLICATION ERROR:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to generate application."
      );
    } finally {
      setGenerating(false);
    }
  };

  // ==========================================
  // DELETE
  // ==========================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (!confirmed) return;

    try {
      await API.delete(`/${id}`);

      setApplications((previous) =>
        previous.filter(
          (application) =>
            application._id !== id
        )
      );

      toast.success(
        "Application deleted successfully."
      );
    } catch (error) {
      console.error(
        "DELETE APPLICATION ERROR:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to delete application."
      );
    }
  };

  const selectedResume = resumes.find(
    (resume) => resume._id === resumeId
  );

  return (
    <main className="min-h-screen overflow-hidden bg-[#060711] px-4 pb-24 pt-6 text-white sm:px-6 lg:px-8">

      {/* ==========================================
          BACKGROUND
      ========================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-violet-600/10 blur-[120px]" />

        <div className="absolute -right-40 top-80 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-500/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">

        {/* ==========================================
            NAV
        ========================================== */}

        <div className="mb-8 flex items-center justify-between">

          <button
            onClick={() => navigate("/dashboard")}
            className="group inline-flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-2.5 text-sm text-gray-400 transition hover:border-violet-500/30 hover:bg-white/[0.06] hover:text-white"
          >
            <ArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-1"
            />

            Back to Dashboard
          </button>

          <div className="hidden items-center gap-2 sm:flex">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10">
              <Sparkles
                size={15}
                className="text-violet-300"
              />
            </div>

            <span className="text-xs font-medium text-gray-500">
              CareerPilot AI
            </span>
          </div>

        </div>

        {/* ==========================================
            HERO
        ========================================== */}

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

            <div className="max-w-3xl">

              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1.5">
                <Sparkles
                  size={13}
                  className="text-violet-300"
                />

                <span className="text-[11px] font-medium text-violet-200">
                  AI-powered job applications
                </span>
              </div>

              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Apply smarter.
                <span className="block bg-gradient-to-r from-violet-300 via-purple-200 to-cyan-300 bg-clip-text text-transparent">
                  Stand out faster.
                </span>
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
                Give CareerPilot your resume and the job
                you're targeting. We'll analyze the match
                and create a personalized application based
                on your actual experience.
              </p>

            </div>

            

          </div>

        </motion.section>

        {/* ==========================================
            MAIN WORKSPACE
        ========================================== */}

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">

          {/* ========================================
              LEFT — FORM
          ======================================== */}

          <motion.section
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative overflow-hidden rounded-3xl border border-white/[0.07] bg-[#0B0D17]/90 shadow-2xl backdrop-blur-xl"
          >

            {/* top glow */}

            <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-violet-400/60 to-transparent" />

            <div className="p-6 sm:p-8">

              {/* HEADER */}

              <div className="mb-8 flex items-start justify-between">

                <div>

                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/10 bg-violet-500/10">
                    <WandSparkles
                      size={19}
                      className="text-violet-300"
                    />
                  </div>

                  <h2 className="text-xl font-semibold text-white">
                    Build your application
                  </h2>

                  <p className="mt-1.5 text-sm text-gray-600">
                    Add the details below and let AI do
                    the heavy lifting.
                  </p>

                </div>

                <div className="hidden rounded-xl border border-green-500/10 bg-green-500/5 px-3 py-2 sm:block">
                  <div className="flex items-center gap-2">
                    <ShieldCheck
                      size={14}
                      className="text-green-400"
                    />

                    <span className="text-[10px] font-medium text-green-400">
                      Resume grounded
                    </span>
                  </div>
                </div>

              </div>

              {/* ====================================
                  RESUME
              ==================================== */}

              <div>

                <div className="mb-2.5 flex items-center justify-between">

                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Your resume
                  </label>

                </div>

                {resumes.length > 0 ? (
                  <div className="relative">

                    <div className="pointer-events-none absolute inset-y-0 left-0 w-1 rounded-l-2xl bg-gradient-to-b from-violet-500 to-cyan-500" />

                    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition hover:border-violet-500/20">

                      <div className="flex items-center gap-3">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/10">
                          <FileText
                            size={19}
                            className="text-violet-300"
                          />
                        </div>

                        <div className="min-w-0 flex-1">

                          <p className="truncate text-sm font-medium text-white">
                            {selectedResume?.fileName ||
                              "Uploaded Resume"}
                          </p>

                          <p className="mt-1 text-[11px] text-gray-600">
                            Used by AI for personalization
                          </p>

                        </div>

                        <CheckCircle2
                          size={18}
                          className="shrink-0 text-green-400"
                        />

                      </div>

                      <select
                        value={resumeId}
                        onChange={(e) =>
                          setResumeId(e.target.value)
                        }
                        className="mt-3 w-full rounded-xl border border-white/[0.06] bg-black/20 px-3 py-2.5 text-xs text-gray-400 outline-none transition focus:border-violet-500/40"
                      >
                        {resumes.map((resume) => (
                          <option
                            key={resume._id}
                            value={resume._id}
                            className="bg-[#0D0F18]"
                          >
                            {resume.fileName ||
                              "Uploaded Resume"}
                          </option>
                        ))}
                      </select>

                    </div>

                  </div>
                ) : (
                  <div className="rounded-2xl border border-yellow-500/10 bg-yellow-500/5 p-5">

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500/10">
                        <FileText
                          size={18}
                          className="text-yellow-400"
                        />
                      </div>

                      <div>
                        <p className="text-sm font-medium text-yellow-300">
                          No resume found
                        </p>

                        <p className="mt-1 text-xs text-yellow-500/60">
                          Upload a resume to continue.
                        </p>
                      </div>

                    </div>

                    <button
                      onClick={() =>
                        navigate("/resume")
                      }
                      className="mt-4 inline-flex items-center gap-2 rounded-lg bg-yellow-500/10 px-3 py-2 text-xs font-medium text-yellow-300 transition hover:bg-yellow-500/20"
                    >
                      Upload Resume
                      <ArrowUpRight size={13} />
                    </button>

                  </div>
                )}

              </div>

              {/* ====================================
                  ROLE + COMPANY
              ==================================== */}

              <div className="mt-7 grid gap-5 sm:grid-cols-2">

                <InputField
                  icon={
                    <BriefcaseBusiness size={17} />
                  }
                  label="Target Role"
                  placeholder="Frontend Developer"
                  value={role}
                  onChange={setRole}
                />

                <InputField
                  icon={<Building2 size={17} />}
                  label="Company"
                  placeholder="Google"
                  value={company}
                  onChange={setCompany}
                />

              </div>

              {/* ====================================
                  JOB DESCRIPTION
              ==================================== */}

              <div className="mt-7">

                <div className="mb-2.5 flex items-end justify-between">

                  <div>

                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Job description
                    </label>

                    <p className="mt-1 text-[11px] text-gray-700">
                      Paste the job posting you're applying
                      to.
                    </p>

                  </div>

                  <span
                    className={`text-[10px] ${
                      jobDescription.length > 5000
                        ? "text-red-400"
                        : "text-gray-700"
                    }`}
                  >
                    {jobDescription.length.toLocaleString()}{" "}
                    characters
                  </span>

                </div>

                <div className="group relative">

                  <ClipboardList
                    size={17}
                    className="absolute left-4 top-4 text-gray-600 transition group-focus-within:text-violet-400"
                  />

                  <textarea
                    value={jobDescription}
                    onChange={(e) =>
                      setJobDescription(
                        e.target.value
                      )
                    }
                    rows={10}
                    placeholder={`Paste the job description here...

Example:
• Required skills
• Responsibilities
• Qualifications
• Experience requirements`}
                    className="w-full resize-none rounded-2xl border border-white/[0.07] bg-white/[0.02] py-4 pl-11 pr-4 text-sm leading-6 text-gray-300 outline-none transition placeholder:text-gray-700 focus:border-violet-500/40 focus:bg-white/[0.035] focus:ring-4 focus:ring-violet-500/5"
                  />

                  {jobDescription.length > 0 && (
                    <div className="pointer-events-none absolute bottom-3 right-3 rounded-lg border border-white/[0.05] bg-black/30 px-2 py-1 text-[9px] text-gray-600">
                      AI ready
                    </div>
                  )}

                </div>

              </div>

              {/* ====================================
                  WHAT AI CREATES
              ==================================== */}

              <div className="mt-7 rounded-2xl border border-violet-500/10 bg-gradient-to-r from-violet-500/[0.06] to-cyan-500/[0.04] p-4">

                <div className="flex items-center gap-2">

                  <Sparkles
                    size={15}
                    className="text-violet-300"
                  />

                  <p className="text-xs font-semibold text-violet-200">
                    CareerPilot will generate
                  </p>

                </div>

                <div className="mt-3 grid gap-2 sm:grid-cols-2">

                  <PreviewItem text="Application readiness score" />

                  <PreviewItem text="Candidate-job fit analysis" />

                  <PreviewItem text="Personalized cover letter" />

                  <PreviewItem text="Application message" />

                </div>

              </div>

              {/* ====================================
                  GENERATE
              ==================================== */}

              <motion.button
                whileHover={
                  !generating
                    ? { y: -2 }
                    : {}
                }
                whileTap={
                  !generating
                    ? { scale: 0.985 }
                    : {}
                }
                onClick={handleGenerate}
                disabled={
                  generating ||
                  resumes.length === 0
                }
                className="relative mt-7 flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-500 px-6 py-4 text-sm font-semibold text-white shadow-xl shadow-violet-900/20 transition hover:shadow-violet-900/40 disabled:cursor-not-allowed disabled:opacity-50"
              >

                {!generating && (
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                )}

                {generating ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />

                    <span>
                      CareerPilot is analyzing your profile...
                    </span>
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />

                    <span>
                      Generate My AI Application
                    </span>

                    <ChevronRight size={17} />
                  </>
                )}

              </motion.button>

              <p className="mt-3 text-center text-[10px] text-gray-700">
                AI uses your resume as the source of truth.
              </p>

            </div>

          </motion.section>

          {/* ========================================
              RIGHT — AI INSIGHTS
          ======================================== */}

          <div className="flex h-full flex-col gap-6">

            <motion.section
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative overflow-hidden rounded-3xl border border-white/[0.07] bg-[#0B0D17]/90 p-6 shadow-2xl backdrop-blur-xl"
            >

              <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-violet-500/10 blur-3xl" />

              <div className="relative">

                <div className="mb-6 flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/10">
                    <Brain
                      size={20}
                      className="text-violet-300"
                    />
                  </div>

                  <div>
                    <h2 className="text-base font-semibold text-white">
                      Your AI application
                    </h2>

                    <p className="mt-1 text-[11px] text-gray-600">
                      Built around your actual profile
                    </p>
                  </div>

                </div>

                <div className="space-y-3">

                  <InsightCard
                    icon={<Target size={16} />}
                    title="Fit analysis"
                    description="See how closely your profile matches the role."
                  />

                  <InsightCard
                    icon={<FileText size={16} />}
                    title="Personalized cover letter"
                    description="Written around your real skills and experience."
                  />

                  <InsightCard
                    icon={<Zap size={16} />}
                    title="Application readiness"
                    description="Know whether your profile is ready before applying."
                  />

                  <InsightCard
                    icon={<ShieldCheck size={16} />}
                    title="Resume grounded"
                    description="No invented projects, skills or achievements."
                  />

                </div>

              </div>

            </motion.section>

{/* ====================================
    PRO TIP
==================================== */}

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.35 }}
  className="relative overflow-hidden rounded-3xl border border-cyan-500/10 bg-gradient-to-br from-cyan-500/[0.055] via-white/[0.02] to-violet-500/[0.035] p-5"
>
  {/* Ambient glow */}

  <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-cyan-400/[0.08] blur-3xl" />

  <div className="relative">

    {/* HEADER */}

    <div className="flex items-center gap-3">

      <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/10">
        <Sparkles
          size={16}
          className="text-cyan-300"
        />
      </div>

      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-300">
          Pro Tip
        </p>

        <p className="mt-0.5 text-xs text-gray-500">
          Get better results from CareerPilot
        </p>
      </div>

    </div>


    {/* CONTENT */}

    <div className="mt-5">

      <h3 className="text-sm font-semibold text-white">
        Give AI more context.
      </h3>

      <p className="mt-2 text-xs leading-5 text-gray-500">
        Include the responsibilities, required skills,
        and preferred qualifications from the job posting.
        More context helps AI create a more targeted application.
      </p>

    </div>


    {/* MINI INSIGHT */}

    <div className="mt-5 flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-black/20 px-4 py-3">

      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-violet-500/10">
        <Zap
          size={13}
          className="text-violet-300"
        />
      </div>

      <div>
        <p className="text-[10px] font-semibold text-gray-300">
          Better input
        </p>

        <p className="mt-0.5 text-[10px] text-gray-600">
          → Better application
        </p>
      </div>

    </div>

  </div>
</motion.div>


{/* ====================================
    WHAT HAPPENS NEXT
==================================== */}

<motion.div
  initial={{ opacity: 0, y: 25 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3 }}
  className="relative overflow-hidden rounded-3xl border border-cyan-500/10 bg-cyan-500/[0.035] p-6"
>
  <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-500/[0.06] blur-3xl" />

  <div className="relative">

    {/* HEADER */}

    <div className="mb-6 flex items-center gap-3">

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10">
        <Sparkles
          size={17}
          className="text-cyan-300"
        />
      </div>

      <div>
        <p className="text-xs font-semibold text-cyan-200">
          What happens next?
        </p>

        <p className="mt-1 text-[10px] text-gray-600">
          Your AI application journey
        </p>
      </div>

    </div>


    {/* STEPS */}

    <div className="relative space-y-5">

      {/* CONNECTING LINE */}

      <div className="absolute left-[15px] top-3 h-[calc(100%-24px)] w-px bg-gradient-to-b from-violet-500/40 via-cyan-500/20 to-transparent" />


      {/* STEP 1 */}

      <div className="relative flex gap-3">

        <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-violet-500/20 bg-[#0B0D17] text-[10px] font-bold text-violet-300">
          01
        </div>

        <div className="pt-1">

          <p className="text-xs font-medium text-gray-300">
            Analyze your resume
          </p>

          <p className="mt-1 text-[10px] leading-4 text-gray-600">
            CareerPilot understands your skills and experience.
          </p>

        </div>

      </div>


      {/* STEP 2 */}

      <div className="relative flex gap-3">

        <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-violet-500/20 bg-[#0B0D17] text-[10px] font-bold text-violet-300">
          02
        </div>

        <div className="pt-1">

          <p className="text-xs font-medium text-gray-300">
            Understand the role
          </p>

          <p className="mt-1 text-[10px] leading-4 text-gray-600">
            AI identifies the skills and requirements that matter.
          </p>

        </div>

      </div>


      {/* STEP 3 */}

      <div className="relative flex gap-3">

        <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cyan-500/20 bg-[#0B0D17] text-[10px] font-bold text-cyan-300">
          03
        </div>

        <div className="pt-1">

          <p className="text-xs font-medium text-gray-300">
            Find your strongest matches
          </p>

          <p className="mt-1 text-[10px] leading-4 text-gray-600">
            Your profile is compared with the job requirements.
          </p>

        </div>

      </div>


      {/* STEP 4 */}

      <div className="relative flex gap-3">

        <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cyan-500/20 bg-[#0B0D17] text-[10px] font-bold text-cyan-300">
          04
        </div>

        <div className="pt-1">

          <p className="text-xs font-medium text-gray-300">
            Generate your application
          </p>

          <p className="mt-1 text-[10px] leading-4 text-gray-600">
            Get a tailored cover letter and application message.
          </p>

        </div>

      </div>


      {/* STEP 5 */}

      <div className="relative flex gap-3">

        <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-emerald-500/20 bg-[#0B0D17] text-[10px] font-bold text-emerald-300">
          05
        </div>

        <div className="pt-1">

          <p className="text-xs font-medium text-gray-300">
            Get your readiness score
          </p>

          <p className="mt-1 text-[10px] leading-4 text-gray-600">
            Know how ready you are before you hit apply.
          </p>

        </div>

      </div>

    </div>


    {/* BOTTOM TIP */}

    <div className="mt-6 border-t border-white/[0.06] pt-4">

      <div className="flex items-center gap-2">

        <div className="h-1.5 w-1.5 rounded-full bg-cyan-400" />

        <p className="text-[10px] text-gray-600">
          Better job description → better AI analysis
        </p>

      </div>

    </div>

  </div>
</motion.div>

  

          </div>

        </div>

        {/* ==========================================
            HISTORY
        ========================================== */}

        <motion.section
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-8 rounded-3xl border border-white/[0.07] bg-[#0B0D17]/90 p-6 shadow-2xl backdrop-blur-xl sm:p-8"
        >

          <div className="mb-7 flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10">
                <History
                  size={19}
                  className="text-violet-300"
                />
              </div>

              <div>

                <h2 className="text-lg font-semibold text-white">
                  Application history
                </h2>

                <p className="mt-1 text-xs text-gray-600">
                  Revisit applications you've generated.
                </p>

              </div>

            </div>

            {applications.length > 0 && (
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] px-3 py-2">

                <span className="text-xs text-gray-500">
                  {applications.length}{" "}
                  {applications.length === 1
                    ? "application"
                    : "applications"}
                </span>

              </div>
            )}

          </div>

          {historyLoading ? (
            <div className="rounded-2xl border border-white/[0.05] bg-white/[0.015] py-12 text-center">

              <Loader2
                size={21}
                className="mx-auto animate-spin text-violet-400"
              />

              <p className="mt-3 text-xs text-gray-600">
                Loading your applications...
              </p>

            </div>
          ) : applications.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/[0.07] bg-white/[0.015] px-6 py-14 text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10">
                <FileText
                  size={22}
                  className="text-violet-300/70"
                />
              </div>

              <h3 className="mt-4 text-sm font-medium text-gray-400">
                No applications yet
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-gray-700">
                Your personalized AI applications
                will appear here after you generate
                your first one.
              </p>

            </div>
          ) : (
            <div className="grid gap-3">

              {applications.map(
                (application, index) => (
                  <motion.div
                    key={application._id}
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: index * 0.04,
                    }}
                  >
                    <ApplicationCard
                      application={application}
                      onDelete={() =>
                        handleDelete(
                          application._id
                        )
                      }
                      onClick={() =>
                        navigate(
                          `/job-application/${application._id}`
                        )
                      }
                    />
                  </motion.div>
                )
              )}

            </div>
          )}

        </motion.section>

      </div>

      {/* ==========================================
          GENERATING OVERLAY
      ========================================== */}

      <AnimatePresence>
        {generating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[2px]"
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              className="rounded-2xl border border-violet-500/20 bg-[#0D0F18]/95 px-6 py-5 shadow-2xl"
            >

              <div className="flex items-center gap-4">

                <div className="relative flex h-10 w-10 items-center justify-center">

                  <div className="absolute inset-0 animate-ping rounded-xl bg-violet-500/10" />

                  <Sparkles
                    size={19}
                    className="relative text-violet-300"
                  />

                </div>

                <div>

                  <p className="text-sm font-medium text-white">
                    Building your application
                  </p>

                  <p className="mt-1 text-[11px] text-gray-600">
                    Analyzing resume × job description
                  </p>

                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}

// ==========================================
// INPUT FIELD
// ==========================================

function InputField({
  icon,
  label,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div>

      <label className="mb-2.5 block text-xs font-semibold uppercase tracking-wider text-gray-500">
        {label}
      </label>

      <div className="group relative">

        <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 transition group-focus-within:text-violet-400">
          {icon}
        </div>

        <input
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          placeholder={placeholder}
          className="w-full rounded-2xl border border-white/[0.07] bg-white/[0.02] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-gray-700 focus:border-violet-500/40 focus:bg-white/[0.035] focus:ring-4 focus:ring-violet-500/5"
        />

      </div>

    </div>
  );
}

// ==========================================
// MINI STAT
// ==========================================

function MiniStat({
  icon,
  value,
  label,
}) {
  return (
    <div className="min-w-[75px] rounded-2xl border border-white/[0.06] bg-white/[0.025] px-3 py-3 text-center">

      <div className="mb-1 flex justify-center text-violet-300">
        {icon}
      </div>

      <p className="text-xs font-semibold text-white">
        {value}
      </p>

      <p className="mt-0.5 text-[9px] text-gray-700">
        {label}
      </p>

    </div>
  );
}

// ==========================================
// PREVIEW ITEM
// ==========================================

function PreviewItem({ text }) {
  return (
    <div className="flex items-center gap-2">

      <CheckCircle2
        size={13}
        className="shrink-0 text-violet-300"
      />

      <span className="text-[11px] text-gray-500">
        {text}
      </span>

    </div>
  );
}

// ==========================================
// AI INSIGHT
// ==========================================

function InsightCard({
  icon,
  title,
  description,
}) {
  return (
    <div className="group flex gap-3 rounded-2xl border border-white/[0.05] bg-white/[0.02] p-3.5 transition hover:border-violet-500/15 hover:bg-white/[0.035]">

      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-300 transition group-hover:bg-violet-500/15">
        {icon}
      </div>

      <div>

        <p className="text-xs font-medium text-gray-300">
          {title}
        </p>

        <p className="mt-1 text-[10px] leading-5 text-gray-600">
          {description}
        </p>

      </div>

    </div>
  );
}

// ==========================================
// APPLICATION CARD
// ==========================================

function ApplicationCard({
  application,
  onDelete,
  onClick,
}) {
  const score =
    application.applicationReadiness ?? null;

  const scoreLabel =
    score === null
      ? "Analyzed"
      : score >= 80
      ? "Strong fit"
      : score >= 60
      ? "Good potential"
      : "Needs work";

  return (
    <div className="group flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 transition hover:border-violet-500/20 hover:bg-white/[0.035]">

      {/* ICON */}

      <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/15 to-cyan-500/10 sm:flex">

        <FileText
          size={18}
          className="text-violet-300"
        />

      </div>

      {/* MAIN */}

      <button
        type="button"
        onClick={onClick}
        className="min-w-0 flex-1 text-left"
      >

        <div className="flex flex-wrap items-center gap-2">

          <h3 className="truncate text-sm font-semibold text-white">
            {application.role ||
              "Job Application"}
          </h3>

          {application.company && (
            <span className="rounded-md border border-cyan-500/10 bg-cyan-500/5 px-2 py-1 text-[10px] font-medium text-cyan-300">
              {application.company}
            </span>
          )}

        </div>

        <div className="mt-1.5 flex flex-wrap items-center gap-2">

          <span className="text-[10px] text-gray-700">
            {application.createdAt
              ? formatDate(
                  application.createdAt
                )
              : "Recently generated"}
          </span>

          {application.recommendation && (
            <>
              <span className="text-gray-800">
                •
              </span>

              <span className="truncate text-[10px] text-gray-600">
                {scoreLabel}
              </span>
            </>
          )}

        </div>

      </button>

      {/* SCORE */}

      {score !== null && (
        <div className="hidden text-right sm:block">

          <p
            className={`text-lg font-semibold ${
              score >= 80
                ? "text-green-400"
                : score >= 60
                ? "text-yellow-400"
                : "text-orange-400"
            }`}
          >
            {score}
            <span className="text-[10px] text-gray-700">
              /100
            </span>
          </p>

          <p className="text-[9px] text-gray-700">
            Readiness
          </p>

        </div>
      )}

      {/* DELETE */}

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-red-500/10 bg-red-500/5 text-gray-600 transition hover:border-red-500/20 hover:bg-red-500/10 hover:text-red-400"
        title="Delete application"
      >
        <Trash2 size={15} />
      </button>

      {/* ARROW */}

      <button
        type="button"
        onClick={onClick}
        className="hidden shrink-0 text-gray-700 transition group-hover:translate-x-1 group-hover:text-violet-300 sm:block"
      >
        <ChevronRight size={17} />
      </button>

    </div>
  );
}

// ==========================================
// DATE
// ==========================================

function formatDate(date) {
  try {
    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  } catch {
    return "";
  }
}