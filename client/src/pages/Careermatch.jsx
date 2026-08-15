import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import PageBackground from "../components/common/PageBackground";


import {
  Target,
  FileText,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Loader2,
  Upload,
  Trash2,
  Check,
  ClipboardList,
  ChevronRight,
  Clock3,
  ShieldCheck,
  WandSparkles,
  Eye,
} from "lucide-react";

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

  const [careerMatchHistory, setCareerMatchHistory] = useState([]);

  const [loadingHistory, setLoadingHistory] = useState(true);

  const [selectedMatches, setSelectedMatches] = useState([]);

  const [deletingSelected, setDeletingSelected] = useState(false);

  // ==========================================
  // LOAD RESUMES
  // ==========================================

  useEffect(() => {
    const loadResumes = async () => {
      try {
        setLoadingResumes(true);

        const response = await getResumeHistory();

        if (response.data?.success) {
          const resumeList = response.data.resumes || [];

          setResumes(resumeList);

          const currentResume = resumeList.find(
            (resume) => resume.isCurrent
          );

          if (currentResume) {
            setSelectedResume(currentResume._id);
          } else if (resumeList.length > 0) {
            setSelectedResume(resumeList[0]._id);
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

    if (
      file.type !== "application/pdf" &&
      !file.name.toLowerCase().endsWith(".pdf")
    ) {
      toast.error("Please upload a PDF resume.");

      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Resume must be smaller than 5 MB.");

      e.target.value = "";
      return;
    }

    try {
      setUploadingResume(true);

      const response = await uploadResume(file);

      if (response.data?.success) {
        const newResume = response.data.resume;

        setResumes((prev) => [
          newResume,
          ...prev,
        ]);

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
      e.target.value = "";
    }
  };

  // ==========================================
  // SELECTED RESUME OBJECT
  // ==========================================

  const selectedResumeData = resumes.find(
    (resume) => resume._id === selectedResume
  );

  // ==========================================
  // TOGGLE MATCH SELECTION
  // ==========================================

  const toggleMatchSelection = (id) => {
    setSelectedMatches((prev) =>
      prev.includes(id)
        ? prev.filter(
            (matchId) => matchId !== id
          )
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
  // DELETE SELECTED
  // ==========================================

  const handleDeleteSelected = async () => {
    if (
      selectedMatches.length === 0 ||
      deletingSelected
    ) {
      return;
    }

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

      await Promise.all(
        selectedMatches.map((id) =>
          deleteCareerMatch(id)
        )
      );

      setCareerMatchHistory((prev) =>
        prev.filter(
          (match) =>
            !selectedMatches.includes(match._id)
        )
      );

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

    if (!selectedResume) {
      toast.error(
        "Please select or upload a resume."
      );

      return;
    }

    if (!targetRole.trim()) {
      toast.error(
        "Please enter your target role."
      );

      return;
    }

    try {
      setAnalyzing(true);

      const response = await createCareerMatch({
        resumeId: selectedResume,
        targetRole: targetRole.trim(),
        targetCompany: targetCompany.trim(),
        jobDescription: jobDescription.trim(),
      });

      if (response.success) {
        toast.success(
          "Career Match analysis generated!"
        );

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
    <div className="min-h-screen bg-[#070712] px-5 py-8 text-white sm:px-8 sm:py-10">

<PageBackground />
      <div className="mx-auto w-full max-w-[1600px]">

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
          className="mb-8 inline-flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.035] px-4 py-2.5 text-xs font-medium text-gray-400 transition hover:border-violet-500/30 hover:bg-white/[0.06] hover:text-white"
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
          className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
        >
          {/* LEFT */}

          <div>
            <div className="mb-3 flex items-center gap-2">

              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10">
                <Target
                  size={17}
                  className="text-violet-300"
                />
              </div>

              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-violet-300">
                CareerPilot AI
              </p>

            </div>

            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Career Match
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
              Compare your resume with your target
              career and discover how well you're
              prepared for the role.
            </p>
          </div>

          {/* HISTORY COUNT */}

          <div className="flex shrink-0 items-center gap-3 self-start rounded-2xl border border-white/[0.07] bg-white/[0.035] px-4 py-3 backdrop-blur-xl sm:self-auto">

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10">
              <Target
                size={17}
                className="text-violet-300"
              />
            </div>

            <div>
              <p className="text-lg font-semibold leading-none text-white">
                {careerMatchHistory.length}
              </p>

              <p className="mt-1 text-[10px] uppercase tracking-wider text-gray-600">
                Career Matches
              </p>
            </div>

          </div>

        </motion.div>
{/* ==========================================
    MAIN FORM
========================================== */}

<motion.form
  onSubmit={handleAnalyze}
  initial={{
    opacity: 0,
    y: 12,
  }}
  animate={{
    opacity: 1,
    y: 0,
  }}
  transition={{
    duration: 0.5,
    delay: 0.06,
    ease: [0.22, 1, 0.36, 1],
  }}
  className="relative overflow-hidden rounded-[28px] border border-white/[0.07] bg-[#0B0D17]/90 shadow-2xl shadow-black/30 backdrop-blur-xl"
>

  {/* TOP ACCENT */}

  <motion.div
    initial={{
      opacity: 0,
      scaleX: 0.5,
    }}
    animate={{
      opacity: 1,
      scaleX: 1,
    }}
    transition={{
      duration: 0.7,
      delay: 0.15,
      ease: [0.22, 1, 0.36, 1],
    }}
    className="pointer-events-none absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-violet-400/60 to-transparent"
  />

  {/* SUBTLE GLOW */}

  <div className="pointer-events-none absolute right-[-120px] top-[-120px] h-[300px] w-[300px] rounded-full bg-violet-500/[0.045] blur-[100px]" />

  <div className="relative p-5 sm:p-7 lg:p-8">

    {/* ======================================
        FORM HEADER
    ====================================== */}

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
        delay: 0.1,
      }}
      className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
    >

      <div className="flex items-center gap-3">

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-violet-500/15 bg-violet-500/[0.08]">
          <WandSparkles
            size={19}
            className="text-violet-300"
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white">
            Find your career fit
          </h2>

          <p className="mt-1 text-xs text-gray-600">
            Tell CareerPilot what role you're targeting.
          </p>
        </div>

      </div>

      <div className="flex w-fit items-center gap-2 rounded-full border border-emerald-500/10 bg-emerald-500/[0.05] px-3 py-1.5">

        <ShieldCheck
          size={13}
          className="text-emerald-400"
        />

        <span className="text-[10px] font-medium text-emerald-400">
          Resume grounded
        </span>

      </div>

    </motion.div>


    {/* ====================================
    STEP 01 + STEP 02
==================================== */}

<div className="grid items-stretch gap-5 lg:grid-cols-2">

  {/* ====================================
      RESUME PANEL
  ==================================== */}

  <motion.div
    initial={{
      opacity: 0,
      x: -8,
    }}
    animate={{
      opacity: 1,
      x: 0,
    }}
    transition={{
      duration: 0.4,
      delay: 0.12,
    }}
    className="flex h-full flex-col rounded-2xl border border-white/[0.07] bg-white/[0.018] p-5"
  >

    {/* HEADER */}

    <div className="mb-4 flex items-center justify-between">

      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-violet-300">
          Step 01
        </p>

        <h3 className="mt-1 text-sm font-semibold text-white">
          Choose your resume
        </h3>
      </div>

      <FileText
        size={17}
        className="text-gray-600"
      />
    </div>


    {/* CONTENT */}

    <div>

      {loadingResumes ? (

        <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-black/10 p-4 text-xs text-gray-600">

          <Loader2
            size={17}
            className="animate-spin text-violet-400"
          />

          Loading your resumes...

        </div>

      ) : resumes.length > 0 ? (

        <>

          {/* SELECTED RESUME */}

          <div className="relative overflow-hidden rounded-xl border border-violet-500/15 bg-violet-500/[0.045] p-4">

            <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-violet-500 to-cyan-500" />

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-500/15 bg-violet-500/[0.08]">

                <FileText
                  size={18}
                  className="text-violet-300"
                />

              </div>

              <div className="min-w-0 flex-1">

                <p className="truncate text-sm font-medium text-white">
                  {selectedResumeData?.fileName ||
                    "Uploaded Resume"}
                </p>

                <p className="mt-1 truncate text-[10px] text-gray-600">
                  Ready for Career Match
                </p>

              </div>

              {selectedResume && (
                <CheckCircle2
                  size={17}
                  className="shrink-0 text-emerald-400"
                />
              )}

            </div>

          </div>


          {/* SELECT */}

          <select
            value={selectedResume}
            onChange={(e) =>
              setSelectedResume(e.target.value)
            }
            className="mt-3 w-full rounded-xl border border-white/[0.06] bg-black/20 px-3 py-3 text-sm text-gray-300 outline-none transition focus:border-violet-500/40 focus:bg-black/30"
          >

            <option
              value=""
              className="bg-[#0D0F18]"
            >
              Select a resume
            </option>

            {resumes.map((resume) => (
              <option
                key={resume._id}
                value={resume._id}
                className="bg-[#0D0F18]"
              >
                {resume.fileName || "Uploaded Resume"}

                {resume.isCurrent
                  ? " — Current"
                  : ""}
              </option>
            ))}

          </select>


          {/* SELECTED MESSAGE */}

          {selectedResume && (
            <div className="mt-3 flex items-center gap-2 rounded-xl border border-emerald-500/10 bg-emerald-500/[0.04] px-3 py-2">

              <CheckCircle2
                size={14}
                className="shrink-0 text-emerald-400"
              />

              <p className="truncate text-[10px] text-emerald-300">

                Selected:

                <span className="ml-1 font-medium text-emerald-200">
                  {selectedResumeData?.fileName ||
                    "this resume"}
                </span>

              </p>

            </div>
          )}


          {/* UPLOAD */}

          <label
            htmlFor="career-match-resume-upload"
            className={`group mt-3 flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-white/[0.08] bg-white/[0.012] p-3 transition hover:border-violet-500/30 hover:bg-violet-500/[0.025] ${
              uploadingResume
                ? "pointer-events-none opacity-60"
                : ""
            }`}
          >

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.035]">

              {uploadingResume ? (
                <Loader2
                  size={16}
                  className="animate-spin text-violet-400"
                />
              ) : (
                <Upload
                  size={16}
                  className="text-violet-400 transition-transform group-hover:-translate-y-0.5"
                />
              )}

            </div>

            <div className="min-w-0 flex-1">

              <p className="text-xs font-medium text-gray-300">
                {uploadingResume
                  ? "Uploading & analyzing..."
                  : "Upload a different resume"}
              </p>

              <p className="mt-0.5 text-[10px] text-gray-700">
                PDF only • Maximum 5 MB
              </p>

            </div>

            <ArrowRight
              size={14}
              className="text-gray-700 transition-transform group-hover:translate-x-0.5 group-hover:text-violet-400"
            />

            <input
              id="career-match-resume-upload"
              type="file"
              accept="application/pdf,.pdf"
              className="hidden"
              disabled={uploadingResume}
              onChange={handleResumeUpload}
            />

          </label>

        </>

      ) : (

        <div className="rounded-xl border border-yellow-500/10 bg-yellow-500/[0.04] p-4">

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

              <p className="mt-1 text-[10px] text-yellow-500/60">
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
            <ArrowRight size={13} />
          </button>

        </div>

      )}

    </div>

  </motion.div>


  {/* ====================================
      TARGET ROLE PANEL
  ==================================== */}

  <motion.div
    initial={{
      opacity: 0,
      x: 8,
    }}
    animate={{
      opacity: 1,
      x: 0,
    }}
    transition={{
      duration: 0.4,
      delay: 0.16,
    }}
    className="flex h-full flex-col rounded-2xl border border-white/[0.07] bg-white/[0.018] p-5"
  >

    {/* HEADER */}

    <div className="mb-5">

      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-300">
        Step 02
      </p>

      <h3 className="mt-1 text-sm font-semibold text-white">
        Define your target
      </h3>

      <p className="mt-1 text-[11px] text-gray-600">
        What position are you preparing for?
      </p>

    </div>


    {/* TARGET ROLE */}

    <InputField
      label="Target role"
      icon={
        <BriefcaseBusiness size={17} />
      }
      placeholder="e.g. Full Stack Developer"
      value={targetRole}
      onChange={setTargetRole}
    />


    {/* TARGET COMPANY */}

    <div className="mt-5">

      <InputField
        icon={<Building2 size={17} />}
        label="Target Company"
        placeholder="e.g. Google"
        value={targetCompany}
        onChange={setTargetCompany}
        optional
      />

    </div>

  </motion.div>

</div>


    {/* ======================================
        JOB DESCRIPTION
    ====================================== */}

    <motion.div
      initial={{
        opacity: 0,
        y: 8,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
        delay: 0.2,
      }}
      className="mt-5 rounded-2xl border border-white/[0.07] bg-white/[0.018] p-5"
    >

      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

        <div>

          <div className="flex items-center gap-2">

            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500/[0.08]">

              <ClipboardList
                size={14}
                className="text-violet-300"
              />

            </div>

            <div>

              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-violet-300">
                Step 03
              </p>

              <h3 className="mt-0.5 text-sm font-semibold text-white">
                Add job description
              </h3>

            </div>

          </div>

          <p className="mt-2 text-[11px] text-gray-600">
            Paste the job posting so CareerPilot can
            compare the actual requirements.
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
          className="absolute left-4 top-4 text-gray-700 transition group-focus-within:text-violet-400"
        />

        <textarea
          value={jobDescription}
          onChange={(e) =>
            setJobDescription(e.target.value)
          }
          rows={7}
          placeholder={`Paste the job description here...

Required skills, responsibilities, qualifications, experience...`}
          className="w-full resize-none rounded-xl border border-white/[0.06] bg-black/10 py-4 pl-11 pr-4 text-sm leading-6 text-gray-300 outline-none transition placeholder:text-gray-700 focus:border-violet-500/40 focus:bg-white/[0.025] focus:ring-4 focus:ring-violet-500/5"
        />

        {jobDescription.length > 0 && (

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 rounded-lg border border-emerald-500/10 bg-emerald-500/[0.05] px-2 py-1"
          >

            <CheckCircle2
              size={11}
              className="text-emerald-400"
            />

            <span className="text-[9px] text-emerald-400">
              AI ready
            </span>

          </motion.div>

        )}

      </div>

    </motion.div>


    {/* ======================================
        AI ANALYSIS PREVIEW
    ====================================== */}

    <motion.div
      initial={{
        opacity: 0,
        y: 8,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
        delay: 0.24,
      }}
      className="mt-5 rounded-2xl border border-violet-500/10 bg-violet-500/[0.035] p-4"
    >

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-2.5">

          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10">

            <Sparkles
              size={15}
              className="text-violet-300"
            />

          </div>

          <div>

            <p className="text-xs font-semibold text-violet-200">
              CareerPilot will analyze
            </p>

            <p className="mt-0.5 text-[10px] text-gray-600">
              Resume evidence against target requirements
            </p>

          </div>

        </div>

        <span className="w-fit rounded-full border border-violet-500/10 bg-violet-500/[0.05] px-2.5 py-1 text-[9px] text-violet-300">
          AI Powered
        </span>

      </div>


      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">

        <PreviewItem text="Skills" />

        <PreviewItem text="Experience" />

        <PreviewItem text="Projects" />

        <PreviewItem text="Skill gaps" />

        <PreviewItem text="Resume evidence" />

        <PreviewItem text="Improvement opportunities" />

      </div>

    </motion.div>


    {/* ======================================
        ANALYZE BUTTON
    ====================================== */}

    <motion.button
      type="submit"
      disabled={
        analyzing ||
        uploadingResume ||
        loadingResumes ||
        resumes.length === 0 ||
        !selectedResume
      }
      whileHover={{
        y: -2,
      }}
      whileTap={{
        scale: 0.985,
      }}
      transition={{
        duration: 0.18,
      }}
      className="group relative mt-5 flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-500 px-6 py-4 text-sm font-semibold text-white shadow-xl shadow-violet-900/20 transition hover:shadow-violet-900/40 disabled:cursor-not-allowed disabled:opacity-50"
    >

      {/* SHIMMER */}

      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.12] to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

      <span className="relative flex items-center justify-center gap-2">

        {analyzing ? (

          <>
            <Loader2
              size={18}
              className="animate-spin"
            />

            <span>
              CareerPilot is analyzing
              your career fit...
            </span>
          </>

        ) : (

          <>
            <Sparkles size={18} />

            <span>
              Analyze My Career Fit
            </span>

            <ChevronRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          </>

        )}

      </span>

    </motion.button>


    <p className="mt-3 text-center text-[10px] text-gray-700">
      AI compares your resume with your target role
      and job requirements.
    </p>

  </div>

</motion.form>
        

        {/* ==========================================
            CAREER MATCH HISTORY
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
            delay: 0.14,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-8 overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.025] shadow-2xl shadow-black/20 backdrop-blur-xl"
        >

          <div className="p-5 sm:p-8">

            {/* HISTORY HEADER */}

            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-violet-500/10 text-violet-300">

                  <Target size={18} />

                </div>

                <div>

                  <h2 className="text-lg font-semibold text-white">
                    Career Match History
                  </h2>

                  <p className="mt-1 text-xs text-gray-600">
                    Your previous career assessments
                  </p>

                </div>

              </div>

              {/* DELETE */}

              {careerMatchHistory.length > 0 && (
                <motion.button
                  type="button"
                  onClick={handleDeleteSelected}
                  disabled={
                    selectedMatches.length === 0 ||
                    deletingSelected
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

                  {selectedMatches.length > 0 && (
                    <span>
                      ({selectedMatches.length})
                    </span>
                  )}

                </motion.button>
              )}

            </div>

            {/* SELECT ALL */}

            {!loadingHistory &&
              careerMatchHistory.length > 0 && (

                <div className="mb-4 flex items-center justify-between rounded-xl border border-white/[0.05] bg-white/[0.015] px-4 py-3">

                  <button
                    type="button"
                    onClick={handleSelectAll}
                    disabled={deletingSelected}
                    className="flex cursor-pointer items-center gap-3 text-xs text-gray-500 transition hover:text-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
                  >

                    <div
                      className={`flex h-4 w-4 items-center justify-center rounded border transition ${
                        selectedMatches.length ===
                          careerMatchHistory.length &&
                        careerMatchHistory.length > 0
                          ? "border-violet-400 bg-violet-500"
                          : "border-white/20 bg-white/5"
                      }`}
                    >

                      {selectedMatches.length ===
                        careerMatchHistory.length &&
                        careerMatchHistory.length > 0 && (
                          <Check
                            size={11}
                            className="text-white"
                          />
                        )}

                    </div>

                    {selectedMatches.length ===
                      careerMatchHistory.length &&
                    careerMatchHistory.length > 0
                      ? "Deselect all matches"
                      : "Select all matches"}

                  </button>

                  {selectedMatches.length > 0 && (
                    <span className="text-xs font-medium text-violet-400">
                      {selectedMatches.length} selected
                    </span>
                  )}

                </div>
              )}

            {/* ======================================
                LOADING
            ====================================== */}

            {loadingHistory && (
              <div className="rounded-2xl border border-white/[0.05] bg-white/[0.015] py-14 text-center">

                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/10 bg-violet-500/[0.05]">

                  <Loader2
                    size={20}
                    className="animate-spin text-violet-400"
                  />

                </div>

                <p className="mt-4 text-sm text-gray-600">
                  Loading your Career Match
                  history...
                </p>

              </div>
            )}

            {/* ======================================
                EMPTY
            ====================================== */}

            {!loadingHistory &&
              careerMatchHistory.length === 0 && (

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
                  className="relative overflow-hidden rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.012] py-14 text-center"
                >

                  <div className="absolute left-1/2 top-0 h-32 w-32 -translate-x-1/2 rounded-full bg-violet-500/10 blur-[60px]" />

                  <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.025]">

                    <Target
                      size={21}
                      className="text-gray-600"
                    />

                  </div>

                  <p className="relative mt-4 text-sm font-medium text-gray-400">
                    No Career Match history yet
                  </p>

                  <p className="relative mx-auto mt-2 max-w-sm text-xs leading-5 text-gray-600">
                    Generate your first Career
                    Match and your AI assessment
                    will appear here.
                  </p>

                </motion.div>
              )}

            {/* ======================================
                MATCH LIST
            ====================================== */}

            {!loadingHistory &&
              careerMatchHistory.length > 0 && (

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
                  className="space-y-3"
                >

                  {careerMatchHistory.map((match) => {

                    const isSelected =
                      selectedMatches.includes(
                        match._id
                      );

                    return (
                      <motion.div
                        key={match._id}
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
                        className={`group rounded-2xl border p-4 transition-all duration-200 sm:p-5 ${
                          isSelected
                            ? "border-violet-500/30 bg-violet-500/[0.07]"
                            : "border-white/[0.05] bg-white/[0.015] hover:border-violet-500/20 hover:bg-white/[0.03]"
                        }`}
                      >

                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">

                          {/* LEFT */}

                          <div className="flex min-w-0 flex-1 items-start gap-3 sm:items-center sm:gap-4">

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
                              className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition sm:mt-0 ${
                                isSelected
                                  ? "border-violet-400 bg-violet-500"
                                  : "border-white/20 bg-white/5 hover:border-violet-400/50"
                              }`}
                            >

                              {isSelected && (
                                <Check
                                  size={11}
                                  className="text-white"
                                />
                              )}

                            </button>

                            {/* ICON */}

                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-violet-500/10 bg-violet-500/[0.07]">

                              <Target
                                size={20}
                                className="text-violet-300"
                              />

                            </div>

                            {/* INFORMATION */}

                            <button
                              type="button"
                              onClick={() =>
                                navigate(
                                  `/career-match/${match._id}`
                                )
                              }
                              className="min-w-0 flex-1 text-left"
                            >

                              <div className="flex flex-wrap items-center gap-2">

                                <h3 className="max-w-full truncate text-sm font-semibold text-white">
                                  {match.targetRole ||
                                    "Career Match"}
                                </h3>

                                {match.targetCompany && (
                                  <span className="rounded-full border border-white/[0.06] bg-white/[0.025] px-2 py-1 text-[9px] text-gray-500">
                                    {match.targetCompany}
                                  </span>
                                )}

                              </div>

                              <div className="mt-1.5 flex flex-wrap items-center gap-2">

                                <span className="flex items-center gap-1 text-[10px] text-gray-600">

                                  <Clock3 size={10} />

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

                                </span>

                              </div>

                            </button>

                          </div>

                          {/* RIGHT */}

                          <div className="flex w-full items-center gap-3 sm:w-auto">

                            {/* SCORE */}

                            <div className="flex min-w-[62px] flex-col items-center justify-center rounded-xl border border-white/[0.05] bg-white/[0.015] px-3 py-2">

                              <p className="text-base font-semibold text-white">

                                {Math.round(
                                  Number(
                                    match.matchScore
                                  ) || 0
                                )}
                                %

                              </p>

                              <p className="text-[9px] uppercase tracking-wider text-gray-600">
                                Match
                              </p>

                            </div>

                            {/* VIEW */}

                            <motion.button
                              type="button"
                              onClick={() =>
                                navigate(
                                  `/career-match/${match._id}`
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

                              View Analysis

                              <ChevronRight
                                size={14}
                                className="transition-transform group-hover/view:translate-x-0.5"
                              />

                            </motion.button>

                          </div>

                        </div>

                      </motion.div>
                    );
                  })}

                </motion.div>
              )}

          </div>

        </motion.section>

      </div>

    </div>
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
  optional = false,
}) {
  return (
    <div>

      <label className="mb-2.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500">

        <span className="text-violet-300">
          {icon}
        </span>

        {label}

        {optional && (
          <span className="font-normal normal-case tracking-normal text-gray-700">
            (Optional)
          </span>
        )}

      </label>

      <div className="group relative">

        <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 transition group-focus-within:text-violet-400">
          {icon}
        </div>

        <input
          type="text"
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          placeholder={placeholder}
          className="w-full rounded-2xl border border-white/[0.07] bg-white/[0.02] py-3.5 pl-11 pr-4 text-sm text-gray-300 outline-none transition placeholder:text-gray-700 focus:border-violet-500/40 focus:bg-white/[0.035] focus:ring-4 focus:ring-violet-500/5"
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
    <div className="flex items-center gap-2.5 text-xs text-gray-500">

      <CheckCircle2
        size={14}
        className="shrink-0 text-violet-200"
      />

      <span>{text}</span>

    </div>
  );
}