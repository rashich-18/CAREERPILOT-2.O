import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Target,
  FileText,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Loader2,
  Upload,
  Building,
  Trash2,
  Check,
} from "lucide-react";

import toast from "react-hot-toast";

import {
  uploadResume,
  getResumeHistory,
} from "../api/resumeApi";

import {
  createCareerMatch,
  getCareerMatchHistory,
  deleteCareerMatch,
} from "../api/careerMatchApi";

export default function CareerMatch() {
  const navigate = useNavigate();

  // ==========================================
  // STATE
  // ==========================================

  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState("");

  const [uploadingResume, setUploadingResume] = useState(false);

  const [targetRole, setTargetRole] = useState("");
  const [targetCompany, setTargetCompany] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const [loadingResumes, setLoadingResumes] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);

  // Career Match History
  const [careerMatchHistory, setCareerMatchHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  // Multiple selection
  const [selectedMatches, setSelectedMatches] = useState([]);

  // Bulk delete
  const [deletingSelected, setDeletingSelected] = useState(false);

  // ==========================================
  // LOAD SAVED RESUMES
  // ==========================================

  useEffect(() => {
    const loadResumes = async () => {
      try {
        setLoadingResumes(true);

        const response = await getResumeHistory();

        if (response.data?.success) {
          const resumeList = response.data.resumes || [];

          setResumes(resumeList);

          // Automatically select current resume
          const currentResume = resumeList.find(
            (resume) => resume.isCurrent
          );

          if (currentResume) {
            setSelectedResume(currentResume._id);
          }
        }
      } catch (error) {
        console.error("LOAD RESUMES ERROR:", error);

        toast.error(
          error.response?.data?.message ||
            "Failed to load your resumes."
        );
      } finally {
        setLoadingResumes(false);
      }
    };

    loadResumes();
  }, []);

  // ==========================================
  // LOAD CAREER MATCH HISTORY
  // ==========================================

  useEffect(() => {
    const loadCareerMatchHistory = async () => {
      try {
        setLoadingHistory(true);

        const response = await getCareerMatchHistory();

        if (response?.success) {
          setCareerMatchHistory(
            response.careerMatches || []
          );
        }
      } catch (error) {
        console.error(
          "CAREER MATCH HISTORY ERROR:",
          error
        );

        toast.error(
          error?.response?.data?.message ||
            "Failed to load Career Match history."
        );
      } finally {
        setLoadingHistory(false);
      }
    };

    loadCareerMatchHistory();
  }, []);

  // ==========================================
  // UPLOAD NEW RESUME
  // ==========================================

  const handleResumeUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Check PDF
    if (
      file.type !== "application/pdf" &&
      !file.name.toLowerCase().endsWith(".pdf")
    ) {
      toast.error("Please upload a PDF resume.");

      e.target.value = "";

      return;
    }

    try {
      setUploadingResume(true);

      console.log("📄 Uploading resume...");

      const response = await uploadResume(file);

      console.log(
        "📄 RESUME UPLOAD RESPONSE:",
        response.data
      );

      if (response.data?.success) {
        const newResume = response.data.resume;

        // Add new resume to list
        setResumes((prev) => [
          newResume,
          ...prev,
        ]);

        // Automatically select uploaded resume
        setSelectedResume(newResume._id);

        toast.success(
          "Resume uploaded and analyzed successfully!"
        );
      } else {
        toast.error(
          response.data?.message ||
            "Failed to upload resume."
        );
      }
    } catch (error) {
      console.error(
        "CAREER MATCH RESUME UPLOAD ERROR:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to upload resume."
      );
    } finally {
      setUploadingResume(false);

      // Allows same file to be selected again
      e.target.value = "";
    }
  };

  // ==========================================
  // TOGGLE SINGLE MATCH SELECTION
  // ==========================================

  const toggleMatchSelection = (id) => {
    setSelectedMatches((prev) =>
      prev.includes(id)
        ? prev.filter((matchId) => matchId !== id)
        : [...prev, id]
    );
  };

  // ==========================================
  // SELECT / DESELECT ALL
  // ==========================================

  const handleSelectAll = () => {
    if (
      selectedMatches.length ===
      careerMatchHistory.length
    ) {
      setSelectedMatches([]);
    } else {
      setSelectedMatches(
        careerMatchHistory.map(
          (match) => match._id
        )
      );
    }
  };

  // ==========================================
  // DELETE SELECTED MATCHES
  // ==========================================

  const handleDeleteSelected = async () => {
    if (selectedMatches.length === 0) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete ${
        selectedMatches.length
      } Career Match ${
        selectedMatches.length === 1
          ? "analysis"
          : "analyses"
      }?`
    );

    if (!confirmed) return;

    try {
      setDeletingSelected(true);

      // Delete all selected analyses
      await Promise.all(
        selectedMatches.map((id) =>
          deleteCareerMatch(id)
        )
      );

      // Remove deleted items from UI
      setCareerMatchHistory((prev) =>
        prev.filter(
          (match) =>
            !selectedMatches.includes(match._id)
        )
      );

      // Clear selection
      setSelectedMatches([]);

      toast.success(
        "Selected Career Match history deleted successfully."
      );
    } catch (error) {
      console.error(
        "DELETE SELECTED CAREER MATCH ERROR:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to delete selected Career Match history."
      );
    } finally {
      setDeletingSelected(false);
    }
  };

  // ==========================================
  // ANALYZE CAREER FIT
  // ==========================================

  const handleAnalyze = async (e) => {
    e.preventDefault();

    // Check resume
    if (!selectedResume) {
      toast.error(
        "Please select or upload a resume."
      );

      return;
    }

    // Check target role
    if (!targetRole.trim()) {
      toast.error(
        "Please enter your target role."
      );

      return;
    }

    try {
      setAnalyzing(true);

      console.log(
        "🤖 Generating Career Match..."
      );

      const response = await createCareerMatch({
        resumeId: selectedResume,
        targetRole: targetRole.trim(),
        targetCompany: targetCompany.trim(),
        jobDescription: jobDescription.trim(),
      });

      console.log(
        "CAREER MATCH RESULT:",
        response
      );

      if (response.success) {
        toast.success(
          "Career Match analysis generated!"
        );

        // Navigate to result page
        navigate(
          `/career-match/${response.careerMatch._id}`
        );
      } else {
        toast.error(
          response.message ||
            "Failed to generate analysis."
        );
      }
    } catch (error) {
      console.error(
        "CAREER MATCH ERROR:",
        error
      );

      const message =
        error.response?.data?.message ||
        "Failed to generate Career Match analysis.";

      const errorDetails =
        error.response?.data?.error || "";

      // Gemini quota error
      if (
        errorDetails.includes("429") ||
        errorDetails.includes("quota") ||
        errorDetails.includes(
          "RESOURCE_EXHAUSTED"
        )
      ) {
        toast.error(
          "AI quota is currently exhausted. Please try again after the Gemini quota resets."
        );
      } else {
        toast.error(message);
      }
    } finally {
      setAnalyzing(false);
    }
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="min-h-screen bg-[#050510] px-6 py-12 text-white">
      <div className="mx-auto max-w-5xl">

        {/* ==========================================
            BACK BUTTON
        ========================================== */}

        <button
          onClick={() =>
            navigate("/dashboard")
          }
          className="mb-8 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-gray-300 transition hover:border-violet-500/30 hover:bg-white/10 hover:text-white"
        >
          <ArrowLeft size={17} />
          Back to Dashboard
        </button>

        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="mb-10 text-center">

          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 shadow-lg shadow-violet-500/20">
            <Target size={30} />
          </div>

          <h1 className="text-4xl font-bold md:text-5xl">
            Find Your{" "}
            <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Career Fit
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Tell CareerPilot where you want to go.
            We'll compare your actual resume against
            your target career and identify what is
            helping, what's missing, and what you should
            focus on next.
          </p>

        </div>

        {/* ==========================================
            MAIN CARD
        ========================================== */}

        <form
          onSubmit={handleAnalyze}
          className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-xl md:p-10"
        >

          {/* ==========================================
              RESUME
          ========================================== */}

          <div className="mb-8">

            <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-200">

              <FileText
                size={18}
                className="text-cyan-400"
              />

              Select Resume

            </label>

            {loadingResumes ? (

              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-gray-400">

                <Loader2
                  className="animate-spin"
                  size={18}
                />

                Loading your resumes...

              </div>

            ) : (

              <>

                {/* SAVED RESUMES */}

                {resumes.length > 0 && (

                  <select
                    value={selectedResume}
                    onChange={(e) =>
                      setSelectedResume(
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-white/10 bg-[#0c0c1c] px-4 py-4 text-white outline-none transition focus:border-violet-500"
                  >

                    <option value="">
                      Select a saved resume
                    </option>

                    {resumes.map((resume) => (

                      <option
                        key={resume._id}
                        value={resume._id}
                      >
                        {resume.fileName}
                        {resume.isCurrent
                          ? " — Current"
                          : ""}
                      </option>

                    ))}

                  </select>

                )}

                {/* OR */}

                <div className="my-5 flex items-center gap-3">

                  <div className="h-px flex-1 bg-white/10" />

                  <span className="text-xs text-gray-500">
                    OR
                  </span>

                  <div className="h-px flex-1 bg-white/10" />

                </div>

                {/* UPLOAD NEW RESUME */}

                <label
                  htmlFor="career-match-resume-upload"
                  className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-violet-500/40 bg-violet-500/5 p-6 text-center transition hover:border-violet-400 hover:bg-violet-500/10 ${
                    uploadingResume
                      ? "pointer-events-none opacity-60"
                      : ""
                  }`}
                >

                  {uploadingResume ? (

                    <>
                      <Loader2
                        size={30}
                        className="mb-3 animate-spin text-violet-400"
                      />

                      <p className="font-semibold text-white">
                        Uploading & analyzing resume...
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        Please wait while CareerPilot
                        processes your PDF.
                      </p>
                    </>

                  ) : (

                    <>
                      <Upload
                        size={30}
                        className="mb-3 text-violet-400"
                      />

                      <p className="font-semibold text-white">
                        Upload a New Resume
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        PDF only • Your resume will be
                        analyzed automatically
                      </p>
                    </>

                  )}

                  <input
                    id="career-match-resume-upload"
                    type="file"
                    accept="application/pdf,.pdf"
                    className="hidden"
                    disabled={uploadingResume}
                    onChange={handleResumeUpload}
                  />

                </label>

                {/* SELECTED RESUME */}

                {selectedResume && (

                  <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-sm text-emerald-300">

                    <CheckCircle2 size={18} />

                    <span>
                      Resume selected successfully.
                    </span>

                  </div>

                )}

              </>

            )}

          </div>

          {/* ==========================================
              TARGET ROLE
          ========================================== */}

          <div className="mb-8">

            <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-200">

              <Briefcase
                size={18}
                className="text-violet-400"
              />

              What's your target role?

            </label>

            <input
              type="text"
              value={targetRole}
              onChange={(e) =>
                setTargetRole(e.target.value)
              }
              placeholder="e.g. Full Stack Developer"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-white outline-none placeholder:text-gray-500 transition focus:border-violet-500 focus:bg-white/[0.07]"
            />

            <p className="mt-2 text-xs text-gray-500">
              Enter the job you actually want to pursue.
            </p>

          </div>

          {/* ==========================================
              TARGET COMPANY
          ========================================== */}

          <div className="mb-8">

            <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-200">

              <Building
                size={18}
                className="text-blue-400"
              />

              Target Company

              <span className="font-normal text-gray-500">
                (Optional)
              </span>

            </label>

            <input
              type="text"
              value={targetCompany}
              onChange={(e) =>
                setTargetCompany(e.target.value)
              }
              placeholder="e.g. Google, Microsoft"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-white outline-none placeholder:text-gray-500 transition focus:border-blue-500 focus:bg-white/[0.07]"
            />

            <p className="mt-2 text-xs text-gray-500">
              Enter a specific company if you're targeting one.
            </p>

          </div>

          {/* ==========================================
              JOB DESCRIPTION
          ========================================== */}

          <div className="mb-8">

            <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-200">

              <Sparkles
                size={18}
                className="text-pink-400"
              />

              Job Description

              <span className="font-normal text-gray-500">
                (Optional)
              </span>

            </label>

            <textarea
              value={jobDescription}
              onChange={(e) =>
                setJobDescription(e.target.value)
              }
              rows={8}
              placeholder={`Paste a specific job description here...

For example:
• React
• Node.js
• REST APIs
• MongoDB
• 1–2 years experience
• Strong problem solving skills`}
              className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-sm leading-6 text-white outline-none placeholder:text-gray-600 transition focus:border-pink-500 focus:bg-white/[0.07]"
            />

            <p className="mt-2 text-xs text-gray-500">
              Adding a real job description gives you a much
              more specific career-fit analysis.
            </p>

          </div>

          {/* ==========================================
              WHAT WE ANALYZE
          ========================================== */}

          <div className="mb-8 rounded-2xl border border-violet-500/10 bg-violet-500/5 p-5">

            <h3 className="mb-4 flex items-center gap-2 font-semibold">

              <Sparkles
                size={18}
                className="text-violet-400"
              />

              CareerPilot will analyze

            </h3>

            <div className="grid gap-3 sm:grid-cols-2">

              {[
                "Skills you already have",
                "Skills required for your target",
                "Experience alignment",
                "Project relevance",
                "Critical skill gaps",
                "Hidden career gaps",
                "Evidence missing from your resume",
                "Resume improvement opportunities",
              ].map((item) => (

                <div
                  key={item}
                  className="flex items-center gap-2 text-sm text-gray-400"
                >

                  <CheckCircle2
                    size={16}
                    className="shrink-0 text-cyan-400"
                  />

                  {item}

                </div>

              ))}

            </div>

          </div>

          {/* ==========================================
              ANALYZE BUTTON
          ========================================== */}

          <button
            type="submit"
            disabled={
              analyzing ||
              uploadingResume ||
              loadingResumes ||
              resumes.length === 0 ||
              !selectedResume
            }
            className="group flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 py-4 font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
          >

            {analyzing ? (

              <>
                <Loader2
                  size={20}
                  className="animate-spin"
                />

                Analyzing Your Career Fit...
              </>

            ) : (

              <>
                <Sparkles size={20} />

                Analyze My Career Fit

                <ArrowRight
                  size={20}
                  className="transition group-hover:translate-x-1"
                />

              </>

            )}

          </button>

        </form>

        {/* ==========================================
            CAREER MATCH HISTORY
        ========================================== */}

        <section className="mt-12 pb-10">

          {/* ==========================================
              HISTORY HEADER
          ========================================== */}

          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                History
              </p>

              <h2 className="mt-2 text-2xl font-bold text-white">
                Your Career Match History
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Revisit your previous career assessments anytime.
              </p>

            </div>

            {/* ==========================================
                SELECTION CONTROLS
            ========================================== */}

            {careerMatchHistory.length > 0 && (

              <div className="flex flex-wrap items-center gap-2">

                {/* SELECT ALL */}

                <button
                  type="button"
                  onClick={handleSelectAll}
                  disabled={deletingSelected}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-gray-300 transition hover:border-violet-500/30 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >

                  <div
                    className={`flex h-4 w-4 items-center justify-center rounded border ${
                      selectedMatches.length ===
                      careerMatchHistory.length
                        ? "border-violet-400 bg-violet-500"
                        : "border-white/20 bg-white/5"
                    }`}
                  >

                    {selectedMatches.length ===
                      careerMatchHistory.length && (
                      <Check
                        size={12}
                        className="text-white"
                      />
                    )}

                  </div>

                  {selectedMatches.length ===
                  careerMatchHistory.length
                    ? "Deselect All"
                    : "Select All"}

                </button>

                {/* DELETE SELECTED */}

                {selectedMatches.length > 0 && (

                  <button
                    type="button"
                    onClick={handleDeleteSelected}
                    disabled={deletingSelected}
                    className="inline-flex items-center gap-2 rounded-xl border border-rose-400/20 bg-rose-400/10 px-4 py-2.5 text-sm font-medium text-rose-300 transition hover:border-rose-400/40 hover:bg-rose-400/20 disabled:cursor-not-allowed disabled:opacity-50"
                  >

                    {deletingSelected ? (

                      <Loader2
                        size={16}
                        className="animate-spin"
                      />

                    ) : (

                      <Trash2 size={16} />

                    )}

                    {deletingSelected
                      ? "Deleting..."
                      : `Delete Selected (${selectedMatches.length})`}

                  </button>

                )}

              </div>

            )}

          </div>

          {/* ==========================================
              LOADING STATE
          ========================================== */}

          {loadingHistory ? (

            <div className="flex items-center justify-center rounded-3xl border border-white/10 bg-white/[0.03] p-10">

              <Loader2
                className="mr-3 animate-spin text-violet-400"
                size={22}
              />

              <span className="text-sm text-gray-500">
                Loading your history...
              </span>

            </div>

          ) : careerMatchHistory.length === 0 ? (

            /* ==========================================
                EMPTY STATE
            ========================================== */

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center">

              <Target
                size={38}
                className="mx-auto text-gray-600"
              />

              <h3 className="mt-4 font-semibold text-white">
                No Career Match history yet
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Your previous career assessments will appear here.
              </p>

            </div>

          ) : (

            /* ==========================================
                HISTORY LIST
            ========================================== */

            <div className="space-y-3">

              {careerMatchHistory.map((match) => {

                const isSelected =
                  selectedMatches.includes(
                    match._id
                  );

                return (

                  <div
                    key={match._id}
                    className={`group flex flex-col gap-4 rounded-2xl border p-5 transition sm:flex-row sm:items-center sm:justify-between ${
                      isSelected
                        ? "border-violet-500/40 bg-violet-500/[0.08]"
                        : "border-white/10 bg-white/[0.03] hover:border-violet-500/20 hover:bg-white/[0.05]"
                    }`}
                  >

                    {/* ==================================
                        LEFT SIDE
                    ================================== */}

                    <div className="flex min-w-0 flex-1 items-center gap-4">

                      {/* CHECKBOX */}

                      <button
                        type="button"
                        onClick={() =>
                          toggleMatchSelection(
                            match._id
                          )
                        }
                        disabled={deletingSelected}
                        aria-label={`Select ${match.targetRole}`}
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition ${
                          isSelected
                            ? "border-violet-400 bg-violet-500"
                            : "border-white/20 bg-white/5 hover:border-violet-400/50"
                        }`}
                      >

                        {isSelected && (
                          <Check
                            size={13}
                            className="text-white"
                          />
                        )}

                      </button>

                      {/* MATCH INFORMATION */}

                      <button
                        type="button"
                        onClick={() =>
                          navigate(
                            `/career-match/${match._id}`
                          )
                        }
                        className="flex min-w-0 flex-1 items-center gap-4 text-left"
                      >

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/10">

                          <Target
                            size={20}
                            className="text-violet-300"
                          />

                        </div>

                        <div className="min-w-0">

                          <h3 className="truncate font-semibold text-white">
                            {match.targetRole}
                          </h3>

                          <p className="mt-1 text-xs text-gray-500">

                            {match.createdAt
                              ? new Date(
                                  match.createdAt
                                ).toLocaleDateString(
                                  undefined,
                                  {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  }
                                )
                              : "Date unavailable"}

                          </p>

                        </div>

                      </button>

                    </div>

                    {/* ==================================
                        RIGHT SIDE
                    ================================== */}

                    <div className="flex items-center justify-between gap-4 sm:justify-end">

                      {/* SCORE */}

                      <div className="text-right">

                        <p className="text-xl font-bold text-white">

                          {Math.round(
                            Number(
                              match.matchScore
                            ) || 0
                          )}

                          %

                        </p>

                        <p className="text-[11px] text-gray-500">
                          match
                        </p>

                      </div>

                      {/* RECOMMENDATION */}

                      {match.applyRecommendation && (

                        <span className="hidden rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs text-emerald-300 md:block">

                          {match.applyRecommendation}

                        </span>

                      )}

                    </div>

                  </div>

                );
              })}

            </div>

          )}

        </section>

      </div>
    </div>
  );
}