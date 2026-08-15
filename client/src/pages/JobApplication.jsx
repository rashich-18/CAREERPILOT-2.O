import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageBackground from "../components/common/PageBackground";

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
  ShieldCheck,
  ArrowUpRight,
  CircleCheck,
  Eye,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

import { getResumeHistory } from "../api/resumeApi.js";

// ==========================================
// API
// ==========================================

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

// ==========================================
// MAIN
// ==========================================

export default function JobApplication() {
  const navigate = useNavigate();

  // ==========================================
  // STATE
  // ==========================================

  const [resumeId, setResumeId] = useState("");
  const [resumes, setResumes] = useState([]);

  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const [generating, setGenerating] = useState(false);

  const [applications, setApplications] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);

  const [selectedApplications, setSelectedApplications] =
    useState([]);

  const [deletingSelected, setDeletingSelected] =
    useState(false);

  // ==========================================
  // FETCH DATA
  // ==========================================

  useEffect(() => {
    fetchResumes();
    fetchApplicationHistory();
  }, []);

  // ==========================================
  // FETCH RESUMES
  // ==========================================

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

  // ==========================================
  // FETCH APPLICATION HISTORY
  // ==========================================

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
  // SELECT APPLICATION
  // ==========================================

  const toggleApplicationSelection = (id) => {
    setSelectedApplications((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  // ==========================================
  // SELECT ALL
  // ==========================================

  const handleSelectAll = () => {
    if (
      selectedApplications.length ===
      applications.length
    ) {
      setSelectedApplications([]);
    } else {
      setSelectedApplications(
        applications.map(
          (application) => application._id
        )
      );
    }
  };

  // ==========================================
  // DELETE SELECTED
  // ==========================================

  const handleDeleteSelected = async () => {
    if (selectedApplications.length === 0) {
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete ${
        selectedApplications.length
      } ${
        selectedApplications.length === 1
          ? "application"
          : "applications"
      }?`
    );

    if (!confirmed) return;

    try {
      setDeletingSelected(true);

      await Promise.all(
        selectedApplications.map((id) =>
          API.delete(`/${id}`)
        )
      );

      setApplications((previous) =>
        previous.filter(
          (application) =>
            !selectedApplications.includes(
              application._id
            )
        )
      );

      setSelectedApplications([]);

      toast.success(
        selectedApplications.length === 1
          ? "Application deleted successfully."
          : "Applications deleted successfully."
      );
    } catch (error) {
      console.error(
        "DELETE SELECTED APPLICATIONS ERROR:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to delete applications."
      );
    } finally {
      setDeletingSelected(false);
    }
  };

  // ==========================================
  // GENERATE APPLICATION
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

    if (jobDescription.trim().length < 50) {
      toast.error(
        "Please provide a more detailed job description."
      );
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
        toast.success(
          "AI job application generated!"
        );

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
  // SELECTED RESUME
  // ==========================================

  const selectedResume = resumes.find(
    (resume) => resume._id === resumeId
  );

  // ==========================================
  // FORM PROGRESS
  // ==========================================

  const completedFields = [
    resumeId,
    role.trim(),
    company.trim(),
    jobDescription.trim(),
  ].filter(Boolean).length;

  const progress = Math.round(
    (completedFields / 4) * 100
  );

  // ==========================================
  // UI
  // ==========================================

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#060711] px-4 pb-16 pt-5 text-white sm:px-6 lg:px-8">

      {/* ==========================================
          BACKGROUND
      ========================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-violet-600/10 blur-[120px]" />

        <div className="absolute -right-40 top-80 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-500/5 blur-[100px]" />
      </div>

      <PageBackground />

      {/* WIDER DESKTOP CONTAINER */}

      <div className="relative mx-auto w-full max-w-[1400px]">

        {/* ==========================================
            BACK TO DASHBOARD
        ========================================== */}

        <motion.button
          type="button"
          onClick={() => navigate("/dashboard")}
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
            ease: [0.22, 1, 0.36, 1],
          }}
          whileHover={{
            x: -2,
          }}
          whileTap={{
            scale: 0.97,
          }}
          className="mb-5 inline-flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.035] px-4 py-2.5 text-xs font-medium text-gray-400 transition hover:border-violet-500/30 hover:bg-white/[0.06] hover:text-white"
        >
          <ArrowLeft size={16} />

          Back to Dashboard
        </motion.button>

        {/* ==========================================
            PAGE HEADER
        ========================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >

          {/* LEFT */}

          <div>
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10">
                <WandSparkles
                  size={17}
                  className="text-violet-300"
                />
              </div>

              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-violet-300">
                CareerPilot AI
              </p>
            </div>

            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Job Application
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
              Create a personalized application
              tailored to your resume and the job
              you're applying for.
            </p>
          </div>

          {/* HISTORY COUNT */}

          <div className="flex shrink-0 items-center gap-3 self-start rounded-2xl border border-white/[0.07] bg-white/[0.035] px-4 py-3 backdrop-blur-xl sm:self-auto">

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10">
              <History
                size={17}
                className="text-violet-300"
              />
            </div>

            <div>
              <p className="text-lg font-semibold leading-none text-white">
                {applications.length}
              </p>

              <p className="mt-1 text-[10px] uppercase tracking-wider text-gray-600">
                Applications
              </p>
            </div>

          </div>

        </motion.div>

        {/* ==========================================
            MAIN FORM
        ========================================== */}

        <motion.section
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.1,
            duration: 0.5,
          }}
          className="relative overflow-hidden rounded-3xl border border-white/[0.07] bg-[#0B0D17]/90 shadow-2xl backdrop-blur-xl"
        >

          {/* TOP GLOW */}

          <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-violet-400/60 to-transparent" />

          <div className="p-5 sm:p-6 lg:p-7">

            {/* ========================================
                FORM HEADER
            ======================================== */}

            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

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

                <p className="mt-1.5 max-w-lg text-sm leading-5 text-gray-600">
                  Give CareerPilot the context it needs
                  and AI will create an application
                  tailored to the opportunity.
                </p>
              </div>

              {/* PROGRESS */}

              <div className="w-full sm:w-44">

                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[10px] font-medium uppercase tracking-wider text-gray-600">
                    Application setup
                  </span>

                  <span className="text-[10px] font-medium text-violet-300">
                    {progress}%
                  </span>
                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    animate={{
                      width: `${progress}%`,
                    }}
                    transition={{
                      duration: 0.4,
                    }}
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
                  />
                </div>

              </div>

            </div>

            {/* ========================================
                RESUME
            ======================================== */}

            <div>

              <div className="mb-2.5 flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Your resume
                </label>

                {resumeId && (
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2
                      size={13}
                      className="text-green-400"
                    />

                    <span className="text-[10px] text-green-400">
                      Ready
                    </span>
                  </div>
                )}
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
                          CareerPilot will use this
                          resume as the source of truth.
                        </p>
                      </div>

                      <ShieldCheck
                        size={18}
                        className="hidden shrink-0 text-green-400 sm:block"
                      />

                    </div>

                    <select
                      value={resumeId}
                      onChange={(e) =>
                        setResumeId(e.target.value)
                      }
                      className="mt-3 w-full rounded-xl border border-white/[0.06] bg-black/20 px-3 py-3 text-sm text-gray-300 outline-none transition focus:border-violet-500/40 focus:bg-black/30"
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
                    type="button"
                    onClick={() => navigate("/resume")}
                    className="mt-4 inline-flex items-center gap-2 rounded-lg bg-yellow-500/10 px-3 py-2 text-xs font-medium text-yellow-300 transition hover:bg-yellow-500/20"
                  >
                    Upload Resume
                    <ArrowUpRight size={13} />
                  </button>

                </div>
              )}

            </div>

            {/* ========================================
                ROLE + COMPANY
            ======================================== */}

            <div className="mt-5 grid gap-4 sm:grid-cols-2">

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

            {/* ========================================
                JOB DESCRIPTION
            ======================================== */}

            <div className="mt-5">

              <div className="mb-2.5 flex items-end justify-between">

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Job description
                  </label>

                  <p className="mt-1 text-[11px] text-gray-700">
                    Paste the complete job posting for
                    a more targeted application.
                  </p>
                </div>

                <span
                  className={`text-[10px] ${
                    jobDescription.length > 5000
                      ? "text-red-400"
                      : jobDescription.length > 0
                      ? "text-gray-600"
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
                  rows={9}
                  maxLength={10000}
                  placeholder={`Paste the job description here...

Example:
• Required skills
• Responsibilities
• Qualifications
• Experience requirements
• Preferred skills`}
                  className="w-full resize-none rounded-2xl border border-white/[0.07] bg-white/[0.02] py-4 pl-11 pr-4 text-sm leading-6 text-gray-300 outline-none transition placeholder:text-gray-700 focus:border-violet-500/40 focus:bg-white/[0.035] focus:ring-4 focus:ring-violet-500/5"
                />

                {jobDescription.length > 0 && (
                  <div className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 rounded-lg border border-white/[0.05] bg-black/40 px-2 py-1">

                    <CircleCheck
                      size={10}
                      className="text-green-400"
                    />

                    <span className="text-[9px] text-gray-500">
                      AI ready
                    </span>

                  </div>
                )}

              </div>

            </div>

            {/* ========================================
                APPLICATION PREVIEW
            ======================================== */}

            <div className="mt-5 rounded-2xl border border-violet-500/10 bg-gradient-to-r from-violet-500/[0.06] to-cyan-500/[0.035] p-5">

              <div className="flex items-start gap-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-500/10">
                  <Sparkles
                    size={16}
                    className="text-violet-300"
                  />
                </div>

                <div>
                  <p className="text-xs font-semibold text-violet-200">
                    Your application will include
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-gray-600">
                    CareerPilot analyzes your resume
                    against the job before creating your
                    application.
                  </p>
                </div>

              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">

                <PreviewItem
                  text="Application readiness score"
                />

                <PreviewItem
                  text="Candidate-job fit analysis"
                />

                <PreviewItem
                  text="Personalized cover letter"
                />

                <PreviewItem
                  text="Application message"
                />

              </div>

            </div>

            {/* ========================================
                IMPORTANT NOTE
            ======================================== */}

            <div className="mt-3 flex items-start gap-3 rounded-2xl border border-white/[0.05] bg-white/[0.015] px-4 py-3.5">

              <ShieldCheck
                size={15}
                className="mt-0.5 shrink-0 text-green-400"
              />

              <p className="text-[10px] leading-5 text-gray-600">
                CareerPilot uses your resume as the
                source of truth. It will not intentionally
                invent projects, skills, experience, or
                achievements that aren't supported by your
                profile.
              </p>

            </div>

            {/* ========================================
                GENERATE BUTTON
            ======================================== */}

            <motion.button
              type="button"
              whileHover={
                !generating
                  ? {
                      y: -2,
                    }
                  : {}
              }
              whileTap={
                !generating
                  ? {
                      scale: 0.985,
                    }
                  : {}
              }
              onClick={handleGenerate}
              disabled={
                generating ||
                resumes.length === 0
              }
              className="relative mt-5 flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-500 px-6 py-4 text-sm font-semibold text-white shadow-xl shadow-violet-900/20 transition hover:shadow-violet-900/40 disabled:cursor-not-allowed disabled:opacity-50"
            >

              {generating ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />

                  <span>
                    CareerPilot is creating your
                    application...
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
              Your resume + job description →
              personalized application
            </p>

          </div>
        </motion.section>

        {/* ==========================================
            APPLICATION HISTORY
        ========================================== */}

        <motion.section
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
            delay: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-6 overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.025] shadow-2xl shadow-black/20 backdrop-blur-xl"
        >

          <div className="p-5 sm:p-6 lg:p-7">

            {/* ======================================
                HISTORY HEADER
            ====================================== */}

            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-violet-500/10 text-violet-300">
                  <History size={18} />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-white">
                    Application History
                  </h2>

                  <p className="mt-1 text-xs text-gray-600">
                    Your previously generated job
                    applications
                  </p>
                </div>

              </div>

              {/* DELETE SELECTED */}

              {applications.length > 0 && (
                <motion.button
                  type="button"
                  onClick={handleDeleteSelected}
                  disabled={
                    selectedApplications.length ===
                      0 || deletingSelected
                  }
                  whileHover={{
                    y: -1,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/[0.07] px-4 py-2.5 text-xs font-medium text-red-300 transition hover:border-red-500/30 hover:bg-red-500/[0.12] disabled:cursor-not-allowed disabled:opacity-30"
                >

                  {deletingSelected ? (
                    <Loader2
                      size={15}
                      className="animate-spin"
                    />
                  ) : (
                    <Trash2 size={15} />
                  )}

                  {deletingSelected
                    ? "Deleting..."
                    : "Delete Selected"}

                  {selectedApplications.length >
                    0 && (
                    <span>
                      ({selectedApplications.length})
                    </span>
                  )}

                </motion.button>
              )}

            </div>

            {/* ======================================
                SELECT ALL
            ====================================== */}

            {!historyLoading &&
              applications.length > 0 && (
                <div className="mb-3 flex items-center justify-between rounded-xl border border-white/[0.05] bg-white/[0.015] px-4 py-3">

                  <button
                    type="button"
                    onClick={handleSelectAll}
                    disabled={deletingSelected}
                    className="flex cursor-pointer items-center gap-3 text-xs text-gray-500 transition hover:text-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
                  >

                    <div
                      className={`flex h-4 w-4 items-center justify-center rounded border transition ${
                        selectedApplications.length ===
                          applications.length &&
                        applications.length > 0
                          ? "border-violet-400 bg-violet-500"
                          : "border-white/20 bg-white/5"
                      }`}
                    >

                      {selectedApplications.length ===
                        applications.length &&
                        applications.length > 0 && (
                          <CheckCircle2
                            size={11}
                            className="text-white"
                          />
                        )}

                    </div>

                    {selectedApplications.length ===
                        applications.length &&
                    applications.length > 0
                      ? "Deselect all applications"
                      : "Select all applications"}

                  </button>

                  {selectedApplications.length >
                    0 && (
                    <span className="text-xs font-medium text-violet-400">
                      {selectedApplications.length}{" "}
                      selected
                    </span>
                  )}

                </div>
              )}

            {/* ======================================
                LOADING
            ====================================== */}

            {historyLoading && (
              <div className="rounded-2xl border border-white/[0.05] bg-white/[0.015] py-12 text-center">

                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/10 bg-violet-500/[0.05]">

                  <Loader2
                    size={20}
                    className="animate-spin text-violet-400"
                  />

                </div>

                <p className="mt-4 text-sm text-gray-600">
                  Loading your application history...
                </p>

              </div>
            )}

            {/* ======================================
                EMPTY
            ====================================== */}

            {!historyLoading &&
              applications.length === 0 && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 6,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.35,
                  }}
                  className="relative overflow-hidden rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.012] py-12 text-center"
                >

                  <div className="absolute left-1/2 top-0 h-32 w-32 -translate-x-1/2 rounded-full bg-violet-500/10 blur-[60px]" />

                  <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.025]">

                    <FileText
                      size={21}
                      className="text-gray-600"
                    />

                  </div>

                  <p className="relative mt-4 text-sm font-medium text-gray-400">
                    No applications yet
                  </p>

                  <p className="relative mx-auto mt-2 max-w-sm text-xs leading-5 text-gray-600">
                    Generate your first personalized AI
                    application and it will appear here.
                  </p>

                </motion.div>
              )}

            {/* ======================================
                APPLICATION LIST
            ====================================== */}

            {!historyLoading &&
              applications.length > 0 && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: 0.05,
                      },
                    },
                  }}
                  className="space-y-2.5"
                >

                  {applications.map(
                    (application) => {
                      const isSelected =
                        selectedApplications.includes(
                          application._id
                        );

                      const score =
                        application.applicationReadiness ??
                        null;

                      return (
                        <motion.div
                          key={application._id}
                          variants={{
                            hidden: {
                              opacity: 0,
                              y: 6,
                            },
                            visible: {
                              opacity: 1,
                              y: 0,
                              transition: {
                                duration: 0.3,
                                ease: [
                                  0.22,
                                  1,
                                  0.36,
                                  1,
                                ],
                              },
                            },
                          }}
                          whileHover={{
                            y: -2,
                          }}
                          className={`group rounded-2xl border p-4 transition-all duration-200 sm:p-4 ${
                            isSelected
                              ? "border-violet-500/30 bg-violet-500/[0.07]"
                              : "border-white/[0.05] bg-white/[0.015] hover:border-violet-500/20 hover:bg-white/[0.03]"
                          }`}
                        >

                          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

                            {/* LEFT */}

                            <div className="flex min-w-0 flex-1 items-start gap-3 sm:items-center sm:gap-4">

                              {/* CHECKBOX */}

                              <button
                                type="button"
                                onClick={() =>
                                  toggleApplicationSelection(
                                    application._id
                                  )
                                }
                                disabled={
                                  deletingSelected
                                }
                                aria-label={`Select ${
                                  application.role ||
                                  "job application"
                                }`}
                                className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition sm:mt-0 ${
                                  isSelected
                                    ? "border-violet-400 bg-violet-500"
                                    : "border-white/20 bg-white/5 hover:border-violet-400/50"
                                }`}
                              >

                                {isSelected && (
                                  <CheckCircle2
                                    size={11}
                                    className="text-white"
                                  />
                                )}

                              </button>

                              {/* ICON */}

                              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-violet-500/10 bg-violet-500/[0.07]">

                                <FileText
                                  size={20}
                                  className="text-violet-300"
                                />

                              </div>

                              {/* INFORMATION */}

                              <button
                                type="button"
                                onClick={() =>
                                  navigate(
                                    `/job-application/${application._id}`
                                  )
                                }
                                className="min-w-0 flex-1 text-left"
                              >

                                <div className="flex flex-wrap items-center gap-2">

                                  <h3 className="max-w-full truncate text-sm font-semibold text-white">
                                    {application.role ||
                                      "Job Application"}
                                  </h3>

                                  {application.company && (
                                    <span className="rounded-full border border-white/[0.06] bg-white/[0.025] px-2 py-1 text-[9px] text-gray-500">
                                      {
                                        application.company
                                      }
                                    </span>
                                  )}

                                </div>

                                <div className="mt-1.5 flex flex-wrap items-center gap-2">

                                  <span className="text-[10px] text-gray-600">
                                    {application.createdAt
                                      ? formatDate(
                                          application.createdAt
                                        )
                                      : "Date unavailable"}
                                  </span>

                                </div>

                              </button>

                            </div>

                            {/* RIGHT */}

                            <div className="flex w-full items-center gap-3 sm:w-auto">

                              {/* SCORE */}

                              {score !== null && (
                                <div className="flex min-w-[62px] flex-col items-center justify-center rounded-xl border border-white/[0.05] bg-white/[0.015] px-3 py-2">

                                  <p
                                    className={`text-base font-semibold ${
                                      score >= 80
                                        ? "text-green-400"
                                        : score >= 60
                                        ? "text-yellow-400"
                                        : "text-orange-400"
                                    }`}
                                  >
                                    {Math.round(
                                      Number(score) || 0
                                    )}
                                    %
                                  </p>

                                  <p className="text-[9px] uppercase tracking-wider text-gray-600">
                                    Readiness
                                  </p>

                                </div>
                              )}

                              {/* VIEW */}

                              <motion.button
                                type="button"
                                onClick={() =>
                                  navigate(
                                    `/job-application/${application._id}`
                                  )
                                }
                                whileHover={{
                                  x: 2,
                                }}
                                whileTap={{
                                  scale: 0.97,
                                }}
                                className="group/view flex flex-1 items-center justify-center gap-2 rounded-xl border border-violet-500/15 bg-violet-500/[0.07] px-4 py-2.5 text-xs font-medium text-violet-300 transition hover:border-violet-500/30 hover:bg-violet-500/[0.12] sm:flex-none"
                              >

                                <Eye size={15} />

                                View Application

                                <ChevronRight
                                  size={14}
                                  className="transition-transform group-hover/view:translate-x-0.5"
                                />

                              </motion.button>

                            </div>

                          </div>

                        </motion.div>
                      );
                    }
                  )}

                </motion.div>
              )}

          </div>
        </motion.section>

      </div>

      {/* ==========================================
          GENERATING OVERLAY
      ========================================== */}

      <AnimatePresence>

        {generating && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
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

          <span className="text-gray-800">
            •
          </span>

          <span className="truncate text-[10px] text-gray-600">
            {scoreLabel}
          </span>

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
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.02] text-gray-600 transition hover:border-red-500/20 hover:bg-red-500/10 hover:text-red-400"
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