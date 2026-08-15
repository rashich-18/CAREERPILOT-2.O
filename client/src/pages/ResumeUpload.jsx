import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import PageBackground from "../components/common/PageBackground";

import {
  Upload,
  FileText,
  X,
  Loader2,
  History,
  Eye,
  CheckCircle2,
  Trash2,
  AlertTriangle,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Clock3,
  ChevronRight,
} from "lucide-react";

import {
  uploadResume,
  getResumeHistory,
  deleteResumes,
} from "../api/resumeApi";

import { motion } from "framer-motion";

// ============================================================
// ANIMATION
// ============================================================

const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// ============================================================
// PAGE
// ============================================================

export default function ResumeUpload() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [resumes, setResumes] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  const [selectedResumes, setSelectedResumes] = useState([]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // ==========================================================
  // LOAD RESUME HISTORY
  // ==========================================================

  const loadResumeHistory = async () => {
    try {
      setLoadingHistory(true);

      const response = await getResumeHistory();

      if (response.data.success) {
        setResumes(response.data.resumes || []);
      }
    } catch (error) {
      console.error("RESUME HISTORY ERROR:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load resume history."
      );
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    loadResumeHistory();
  }, []);

  // ==========================================================
  // FILE SELECT
  // ==========================================================

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      toast.error("Please upload a PDF file.");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error("Resume must be smaller than 5 MB.");
      return;
    }

    setFile(selectedFile);
  };

  // ==========================================================
  // UPLOAD RESUME
  // ==========================================================

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select your resume.");
      return;
    }

    try {
      setUploading(true);

      const response = await uploadResume(file);

      if (response.data.success) {
        toast.success("Resume analyzed successfully!");

        console.log("RESUME RESPONSE:", response.data);

        const resumeId =
          response.data.resume?._id ||
          response.data.resume?.id;

        if (!resumeId) {
          toast.error(
            "Resume uploaded but ID was not returned."
          );
          return;
        }

        await loadResumeHistory();

        navigate("/analysis", {
          state: {
            resumeId,
          },
        });
      }
    } catch (error) {
      console.error("RESUME UPLOAD ERROR:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to upload resume."
      );
    } finally {
      setUploading(false);
    }
  };

  // ==========================================================
  // VIEW OLD RESUME
  // ==========================================================

  const handleViewResume = (resume) => {
    navigate("/analysis", {
      state: {
        resumeId: resume._id,
      },
    });
  };

  // ==========================================================
  // SELECT / UNSELECT
  // ==========================================================

  const handleSelectResume = (resumeId) => {
    setSelectedResumes((previous) => {
      if (previous.includes(resumeId)) {
        return previous.filter(
          (id) => id !== resumeId
        );
      }

      return [...previous, resumeId];
    });
  };

  // ==========================================================
  // SELECT ALL
  // ==========================================================

  const handleSelectAll = () => {
    if (selectedResumes.length === resumes.length) {
      setSelectedResumes([]);
    } else {
      setSelectedResumes(
        resumes.map((resume) => resume._id)
      );
    }
  };

  // ==========================================================
  // OPEN DELETE MODAL
  // ==========================================================

  const handleDeleteClick = () => {
    if (selectedResumes.length === 0) {
      toast.error(
        "Please select at least one resume."
      );
      return;
    }

    setShowDeleteModal(true);
  };

  // ==========================================================
  // DELETE SELECTED
  // ==========================================================

  const handleDeleteSelected = async () => {
    try {
      setDeleting(true);

      const response = await deleteResumes(
        selectedResumes
      );

      if (response.data.success) {
        toast.success(
          response.data.message ||
            "Resume(s) deleted successfully."
        );

        setShowDeleteModal(false);
        setSelectedResumes([]);

        await loadResumeHistory();
      }
    } catch (error) {
      console.error(
        "DELETE RESUMES ERROR:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to delete resumes."
      );
    } finally {
      setDeleting(false);
    }
  };

  // ==========================================================
  // FORMAT DATE
  // ==========================================================

  const formatDate = (date) => {
    if (!date) return "";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "";
    }

    return parsedDate.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // ==========================================================
  // UI
  // ==========================================================

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05060D] px-3 pb-16 pt-5 text-white sm:px-5 lg:px-6 xl:px-8">

      {/* ======================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute left-[-6%] top-[-8%] h-[420px] w-[420px] rounded-full bg-violet-600/10 blur-[130px]" />

        <div className="absolute right-[-6%] top-[20%] h-[360px] w-[360px] rounded-full bg-cyan-500/[0.07] blur-[120px]" />

        <div className="absolute bottom-[-10%] left-[30%] h-[400px] w-[400px] rounded-full bg-indigo-600/[0.06] blur-[130px]" />

        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />

      </div>

      <PageBackground />

      {/* ======================================================
          MAIN CONTAINER

          IMPORTANT:
          max-w-6xl -> REMOVED

          This allows the page to use much more horizontal
          space on desktop.
      ====================================================== */}

      <div className="relative mx-auto w-full max-w-[1400px]">

        {/* ====================================================
            TOP HEADER
        ==================================================== */}

        <div className="mb-6">

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
            className="mb-6 inline-flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.035] px-4 py-2.5 text-xs font-medium text-gray-400 transition hover:border-violet-500/30 hover:bg-white/[0.06] hover:text-white"
          >
            <ArrowLeft size={16} />

            Back to Dashboard
          </motion.button>

          {/* PAGE HEADER */}

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

            {/* LEFT */}

            <div>

              <div className="mb-2 flex items-center gap-2">

                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10">
                  <FileText
                    size={17}
                    className="text-violet-300"
                  />
                </div>

                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-violet-300">
                  CareerPilot AI
                </p>

              </div>

              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Resume Intelligence
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                Upload your resume and let CareerPilot analyze
                your skills, strengths, ATS readiness and
                career potential.
              </p>

            </div>

            {/* COUNT */}

            <div className="flex shrink-0 items-center gap-3 self-start rounded-2xl border border-white/[0.07] bg-white/[0.035] px-4 py-3 backdrop-blur-xl sm:self-auto">

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10">
                <History
                  size={17}
                  className="text-violet-300"
                />
              </div>

              <div>

                <p className="text-lg font-semibold leading-none text-white">
                  {resumes.length}
                </p>

                <p className="mt-1 text-[10px] uppercase tracking-wider text-gray-600">
                  Resume Analyses
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* ====================================================
            UPLOAD SECTION
        ==================================================== */}

        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.15,
          }}
          className="relative overflow-hidden rounded-[26px] border border-white/[0.08] bg-white/[0.025] shadow-2xl shadow-black/20 backdrop-blur-xl"
        >

          {/* TOP GLOW */}

          <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-violet-400/60 to-transparent" />

          {/* CARD GLOW */}

          <div className="pointer-events-none absolute right-[-100px] top-[-100px] h-[320px] w-[320px] rounded-full bg-violet-500/[0.08] blur-[110px]" />

          <div className="relative p-5 sm:p-7 lg:p-8">

            {/* SECTION HEADER */}

            <motion.div
              variants={itemVariants}
              className="mb-6 flex items-start justify-between gap-4"
            >

              <div>

                <div className="mb-2 flex items-center gap-2">

                  <Upload
                    size={15}
                    className="text-cyan-300"
                  />

                  <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-cyan-300">
                    Resume intelligence
                  </span>

                </div>

                <h2 className="text-xl font-semibold text-white">
                  Upload your latest resume
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                  PDF only · Maximum file size 5 MB
                </p>

              </div>

              <div className="hidden rounded-xl border border-white/[0.06] bg-white/[0.025] p-3 sm:block">

                <ShieldCheck
                  size={20}
                  className="text-violet-300"
                />

              </div>

            </motion.div>

            {/* =================================================
                FILE DROP AREA
            ================================================= */}

            {!file ? (

              <label className="group relative flex min-h-[250px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-white/[0.10] bg-white/[0.015] px-6 py-10 text-center transition-all duration-300 hover:border-violet-500/40 hover:bg-violet-500/[0.025]">

                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">

                  <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[70px]" />

                </div>

                <div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/[0.08] text-violet-300 transition-transform duration-300 group-hover:-translate-y-1">

                  <Upload size={27} />

                </div>

                <h3 className="relative text-base font-semibold text-white">
                  Drop your resume here
                </h3>

                <p className="relative mt-2 text-sm text-gray-500">
                  or click anywhere to browse your files
                </p>

                <div className="relative mt-4 flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.025] px-3 py-1.5">

                  <FileText
                    size={12}
                    className="text-gray-600"
                  />

                  <span className="text-[10px] text-gray-600">
                    PDF · up to 5 MB
                  </span>

                </div>

                <input
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />

              </label>

            ) : (

              /* =================================================
                  SELECTED FILE
              ================================================= */

              <div className="rounded-2xl border border-violet-500/20 bg-violet-500/[0.035] p-4 sm:p-5">

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10">

                    <FileText
                      size={23}
                      className="text-violet-300"
                    />

                  </div>

                  <div className="min-w-0 flex-1">

                    <p className="truncate text-sm font-semibold text-white">
                      {file.name}
                    </p>

                    <div className="mt-1 flex items-center gap-2">

                      <span className="text-xs text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(
                          2
                        )}{" "}
                        MB
                      </span>

                      <span className="text-gray-700">
                        •
                      </span>

                      <span className="flex items-center gap-1 text-xs text-emerald-400">

                        <CheckCircle2 size={12} />

                        Ready to analyze

                      </span>

                    </div>

                  </div>

                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    disabled={uploading}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.025] text-gray-500 transition hover:border-red-500/20 hover:bg-red-500/10 hover:text-red-400 disabled:opacity-40"
                  >
                    <X size={17} />
                  </button>

                </div>

              </div>

            )}

            {/* =================================================
                UPLOAD BUTTON
            ================================================= */}

            {file && (

              <button
                onClick={handleUpload}
                disabled={uploading}
                className="group relative mt-5 flex w-full overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 via-violet-500 to-cyan-500 px-6 py-4 text-sm font-semibold text-white shadow-xl shadow-violet-900/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-violet-900/40 disabled:cursor-not-allowed disabled:opacity-50"
              >

                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

                <span className="relative flex w-full items-center justify-center gap-2">

                  {uploading ? (

                    <>
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />

                      Analyzing your resume...
                    </>

                  ) : (

                    <>
                      <Sparkles size={17} />

                      Upload & Analyze Resume

                      <ChevronRight
                        size={17}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </>

                  )}

                </span>

              </button>

            )}

            {/* TRUST */}

            <div className="mt-3 flex items-center justify-center gap-2">

              <ShieldCheck
                size={13}
                className="text-gray-700"
              />

              <p className="text-[10px] text-gray-600">
                Your resume is securely linked to your account.
              </p>

            </div>

          </div>

        </motion.section>

        {/* ====================================================
            RESUME HISTORY
        ==================================================== */}

        <section className="mt-6 overflow-hidden rounded-[26px] border border-white/[0.08] bg-white/[0.025] shadow-2xl shadow-black/20 backdrop-blur-xl">

          <div className="p-5 sm:p-7 lg:p-8">

            {/* HISTORY HEADER */}

            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-violet-500/10 text-violet-300">

                  <History size={18} />

                </div>

                <div>

                  <h2 className="text-lg font-semibold text-white">
                    Resume History
                  </h2>

                  <p className="mt-1 text-xs text-gray-600">
                    Your previous resume analyses
                  </p>

                </div>

              </div>

              {resumes.length > 0 && (

                <button
                  onClick={handleDeleteClick}
                  disabled={
                    selectedResumes.length === 0
                  }
                  className="flex items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/[0.07] px-4 py-2.5 text-xs font-medium text-red-300 transition hover:bg-red-500/15 disabled:cursor-not-allowed disabled:opacity-30"
                >

                  <Trash2 size={15} />

                  Delete Selected

                  {selectedResumes.length > 0 && (
                    <span>
                      ({selectedResumes.length})
                    </span>
                  )}

                </button>

              )}

            </div>

            {/* SELECT ALL */}

            {!loadingHistory &&
              resumes.length > 0 && (

                <div className="mb-4 flex items-center justify-between rounded-xl border border-white/[0.05] bg-white/[0.015] px-4 py-3">

                  <label className="flex cursor-pointer items-center gap-3 text-xs text-gray-500">

                    <input
                      type="checkbox"
                      checked={
                        selectedResumes.length ===
                          resumes.length &&
                        resumes.length > 0
                      }
                      onChange={handleSelectAll}
                      className="h-4 w-4 cursor-pointer accent-violet-500"
                    />

                    Select all resumes

                  </label>

                  {selectedResumes.length > 0 && (

                    <span className="text-xs font-medium text-violet-400">
                      {selectedResumes.length} selected
                    </span>

                  )}

                </div>

              )}

            {/* =================================================
                LOADING
            ================================================= */}

            {loadingHistory && (

              <div className="rounded-2xl border border-white/[0.05] bg-white/[0.015] py-12 text-center">

                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/10 bg-violet-500/[0.05]">

                  <Loader2
                    size={20}
                    className="animate-spin text-violet-400"
                  />

                </div>

                <p className="mt-3 text-sm text-gray-600">
                  Loading your resume history...
                </p>

              </div>

            )}

            {/* =================================================
                EMPTY
            ================================================= */}

            {!loadingHistory &&
              resumes.length === 0 && (

                <div className="relative overflow-hidden rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.012] py-12 text-center">

                  <div className="absolute left-1/2 top-0 h-32 w-32 -translate-x-1/2 rounded-full bg-violet-500/10 blur-[60px]" />

                  <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.025]">

                    <FileText
                      size={21}
                      className="text-gray-600"
                    />

                  </div>

                  <p className="relative mt-4 text-sm font-medium text-gray-400">
                    No previous resumes yet
                  </p>

                  <p className="relative mx-auto mt-2 max-w-sm text-xs leading-5 text-gray-600">
                    Upload your first resume and your AI
                    analysis will appear here.
                  </p>

                </div>

              )}

            {/* =================================================
                RESUME LIST
            ================================================= */}

            {!loadingHistory &&
              resumes.length > 0 && (

                <div className="space-y-3">

                  {resumes.map((resume) => {

                    const isSelected =
                      selectedResumes.includes(
                        resume._id
                      );

                    return (

                      <div
                        key={resume._id}
                        className={`group rounded-2xl border p-4 transition-all duration-200 sm:p-5 ${
                          isSelected
                            ? "border-violet-500/30 bg-violet-500/[0.07]"
                            : "border-white/[0.05] bg-white/[0.015] hover:border-violet-500/20 hover:bg-white/[0.03]"
                        }`}
                      >

                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">

                          {/* LEFT */}

                          <div className="flex min-w-0 flex-1 items-start gap-3 sm:items-center sm:gap-4">

                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() =>
                                handleSelectResume(
                                  resume._id
                                )
                              }
                              className="mt-2 h-4 w-4 shrink-0 cursor-pointer accent-violet-500 sm:mt-0"
                            />

                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-violet-500/10 bg-violet-500/[0.07]">

                              <FileText
                                size={20}
                                className="text-violet-300"
                              />

                            </div>

                            <div className="min-w-0 flex-1">

                              <div className="flex flex-wrap items-center gap-2">

                                <h3 className="max-w-full truncate text-sm font-semibold text-white">
                                  {resume.fileName}
                                </h3>

                                {resume.isCurrent && (

                                  <span className="flex shrink-0 items-center gap-1 rounded-full border border-emerald-500/10 bg-emerald-500/[0.07] px-2 py-1 text-[9px] font-medium text-emerald-400">

                                    <CheckCircle2 size={10} />

                                    Current

                                  </span>

                                )}

                              </div>

                              <div className="mt-1.5 flex flex-wrap items-center gap-2">

                                <span className="flex items-center gap-1 text-[10px] text-gray-600">

                                  <Clock3 size={10} />

                                  Uploaded{" "}
                                  {formatDate(
                                    resume.uploadedAt ||
                                      resume.createdAt
                                  )}

                                </span>

                              </div>

                              {resume.analysis?.summary && (

                                <p className="mt-2 line-clamp-1 max-w-3xl text-xs leading-5 text-gray-600">

                                  {resume.analysis.summary}

                                </p>

                              )}

                            </div>

                          </div>

                          {/* VIEW */}

                          <button
                            onClick={() =>
                              handleViewResume(
                                resume
                              )
                            }
                            className="group/view flex w-full shrink-0 items-center justify-center gap-2 rounded-xl border border-violet-500/15 bg-violet-500/[0.07] px-4 py-2.5 text-xs font-medium text-violet-300 transition hover:border-violet-500/30 hover:bg-violet-500/[0.12] sm:w-auto"
                          >

                            <Eye size={15} />

                            View Analysis

                            <ChevronRight
                              size={14}
                              className="transition-transform group-hover/view:translate-x-0.5"
                            />

                          </button>

                        </div>

                      </div>

                    );

                  })}

                </div>

              )}

          </div>

        </section>

      </div>

      {/* ======================================================
          DELETE MODAL
      ====================================================== */}

      {showDeleteModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">

          <div className="w-full max-w-md overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0D0E17] p-6 shadow-2xl shadow-black/50 sm:p-7">

            {/* ICON */}

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/10 bg-red-500/[0.08]">

              <AlertTriangle
                size={26}
                className="text-red-400"
              />

            </div>

            {/* TEXT */}

            <div className="mt-5 text-center">

              <h2 className="text-xl font-semibold text-white">
                Delete selected resumes?
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-400">

                You are about to permanently delete{" "}

                <span className="font-semibold text-white">
                  {selectedResumes.length}{" "}
                  resume
                  {selectedResumes.length !== 1
                    ? "s"
                    : ""}
                </span>
                .

              </p>

              <p className="mt-2 text-xs leading-5 text-gray-600">
                This will also remove their saved AI
                analysis. This action cannot be undone.
              </p>

            </div>

            {/* BUTTONS */}

            <div className="mt-7 grid grid-cols-2 gap-3">

              <button
                onClick={() =>
                  setShowDeleteModal(false)
                }
                disabled={deleting}
                className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm font-medium text-gray-400 transition hover:bg-white/[0.06] hover:text-white disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteSelected}
                disabled={deleting}
                className="flex items-center justify-center gap-2 rounded-xl bg-red-500/90 px-4 py-3 text-sm font-medium text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60"
              >

                {deleting ? (

                  <>
                    <Loader2
                      size={17}
                      className="animate-spin"
                    />

                    Deleting...
                  </>

                ) : (

                  <>
                    <Trash2 size={17} />

                    Delete
                  </>

                )}

              </button>

            </div>

          </div>

        </div>

      )}

    </main>
  );
}