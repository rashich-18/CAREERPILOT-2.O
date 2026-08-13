import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Mic,
  Video,
  Brain,
  Building2,
  BriefcaseBusiness,
  ChevronDown,
  Sparkles,
  ArrowLeft,
  History,
  Trophy,
  Clock,
  ChevronRight,
  Trash2,
  Zap,
  Target,
  ShieldCheck,
  Bot,
  Layers3,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  createInterview,
  getInterviewHistory,
  deleteInterview,
} from "../api/interviewApi";

export default function Interview() {
  const navigate = useNavigate();

const [role, setRole] = useState("");
const [customRole, setCustomRole] = useState("");

const [company, setCompany] = useState("");
const [customCompany, setCustomCompany] = useState("");

const [companyCategory, setCompanyCategory] = useState("");
const [customCompanyCategory, setCustomCompanyCategory] = useState("");
  const [interviewType, setInterviewType] =
    useState("mixed");

  const [difficulty, setDifficulty] =
    useState("medium");

  const [starting, setStarting] = useState(false);

  const [interviews, setInterviews] = useState([]);
  const [historyLoading, setHistoryLoading] =
    useState(true);

  // ==========================================
  // FETCH HISTORY
  // ==========================================

  useEffect(() => {
    fetchInterviewHistory();
  }, []);

  const fetchInterviewHistory = async () => {
    try {
      setHistoryLoading(true);

      const response =
        await getInterviewHistory();

      if (response.data.success) {
        setInterviews(
          response.data.interviews || []
        );
      }
    } catch (error) {
      console.error(
        "GET INTERVIEW HISTORY ERROR:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to load interview history."
      );
    } finally {
      setHistoryLoading(false);
    }
  };

  // ==========================================
  // START INTERVIEW
  // ==========================================

  const handleStartInterview = async () => {
  const finalRole =
    role === "Other" ? customRole.trim() : role;

  const finalCompany =
    company === "Other"
      ? customCompany.trim()
      : company;

  const finalCompanyCategory =
    companyCategory === "Other"
      ? customCompanyCategory.trim()
      : companyCategory;

  if (!finalRole) {
    toast.error("Please select or enter a target role.");
    return;
  }

  if (role === "Other" && !customRole.trim()) {
    toast.error("Please enter your custom role.");
    return;
  }

  if (company === "Other" && !customCompany.trim()) {
    toast.error("Please enter your company name.");
    return;
  }

  if (
    companyCategory === "Other" &&
    !customCompanyCategory.trim()
  ) {
    toast.error("Please enter your company category.");
    return;
  }

  try {
    setStarting(true);

    const response = await createInterview({
      role: finalRole,
      company: finalCompany,
      companyCategory: finalCompanyCategory,
      interviewType,
      difficulty,
    });

    if (response.data.success) {
      toast.success("Your AI interview is ready!");

      navigate(
        `/interview/${response.data.interview.id}`
      );
    }
  } catch (error) {
    console.error(
      "START INTERVIEW ERROR:",
      error
    );

    toast.error(
      error.response?.data?.message ||
        "Failed to create interview."
    );
  } finally {
    setStarting(false);
  }
};

  // ==========================================
  // DELETE INTERVIEW
  // ==========================================

  const handleDeleteInterview = async (
    interviewId
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this interview report?"
    );

    if (!confirmed) return;

    try {
      await deleteInterview(interviewId);

      toast.success(
        "Interview deleted successfully."
      );

      setInterviews((previous) =>
        previous.filter(
          (interview) =>
            interview._id !== interviewId
        )
      );
    } catch (error) {
      console.error(
        "DELETE INTERVIEW ERROR:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to delete interview."
      );
    }
  };

  // ==========================================
  // VIEW INTERVIEW
  // ==========================================

  const handleViewInterview = (interview) => {
    if (interview.status === "completed") {
      navigate(
        `/interview/${interview._id}/report`
      );
      return;
    }

    if (
      interview.status === "in-progress" ||
      interview.status === "setup"
    ) {
      navigate(
        `/interview/${interview._id}`
      );
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05060D] px-4 pb-20 pt-6 sm:px-6 lg:px-8">

      {/* ==========================================
          AMBIENT BACKGROUND
      ========================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute left-[8%] top-[-10%] h-[420px] w-[420px] rounded-full bg-violet-600/10 blur-[120px]" />

        <div className="absolute right-[-5%] top-[20%] h-[350px] w-[350px] rounded-full bg-cyan-500/8 blur-[120px]" />

        <div className="absolute bottom-[-10%] left-[35%] h-[400px] w-[400px] rounded-full bg-indigo-600/8 blur-[130px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />

      </div>

      <div className="relative mx-auto max-w-6xl">

        {/* ==========================================
            TOP BAR
        ========================================== */}

        <div className="mb-8 flex items-center justify-between">

          <button
            onClick={() =>
              navigate("/dashboard")
            }
            className="group inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.035] px-4 py-2.5 text-sm text-gray-400 backdrop-blur-xl transition hover:border-violet-500/30 hover:bg-white/[0.06] hover:text-white"
          >
            <ArrowLeft
              size={16}
              className="transition group-hover:-translate-x-0.5"
            />

            Back to Dashboard
          </button>

          <div className="hidden items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/5 px-3 py-1.5 sm:flex">

            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-50" />

              <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-400" />
            </span>

            <span className="text-[11px] font-medium tracking-wide text-violet-300">
              AI INTERVIEW ENGINE
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

          <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">

            <div>

              <div className="mb-5 flex items-center gap-3">

                <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/15 to-cyan-500/10 shadow-lg shadow-violet-900/10">

                  <Brain
                    size={23}
                    className="text-violet-300"
                  />

                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full border border-[#05060D] bg-cyan-400">
                    <Sparkles
                      size={8}
                      className="text-black"
                    />
                  </span>

                </div>

                <div>

                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-violet-300">
                    CareerPilot AI
                  </p>

                  <p className="mt-0.5 text-[11px] text-gray-600">
                    Intelligent interview simulation
                  </p>

                </div>

              </div>

              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">

                Your next interview,
                <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                  {" "}simulated by AI.
                </span>

              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">

                Practice realistic interviews tailored to
                your target role, company and difficulty.
                Get evaluated on your answers,
                communication and speaking performance.

              </p>

            </div>

            {/* HERO STATS */}

            <div className="grid grid-cols-3 gap-2 sm:gap-3">

              <MiniStat
                icon={<Brain size={15} />}
                value="AI"
                label="Questions"
              />

              <MiniStat
                icon={<Mic size={15} />}
                value="Live"
                label="Speech"
              />

              <MiniStat
                icon={<Target size={15} />}
                value="100"
                label="Score"
              />

            </div>

          </div>

        </motion.section>

        {/* ==========================================
            MAIN SETUP
        ========================================== */}

        <motion.section
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.025] shadow-2xl shadow-black/20 backdrop-blur-xl"
        >

          {/* CARD GLOW */}

          <div className="pointer-events-none absolute right-[-100px] top-[-100px] h-[300px] w-[300px] rounded-full bg-violet-500/8 blur-[100px]" />

          <div className="relative p-6 sm:p-8 lg:p-10">

            {/* HEADER */}

            <div className="mb-9 flex items-start justify-between gap-4">

              <div>

                <div className="mb-2 flex items-center gap-2">

                  <Zap
                    size={15}
                    className="text-cyan-300"
                  />

                  <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-cyan-300">
                    Interview configuration
                  </span>

                </div>

                <h2 className="text-xl font-semibold text-white">
                  Build your interview
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                  Configure the simulation before entering
                  the interview room.
                </p>

              </div>

              <div className="hidden rounded-xl border border-white/[0.06] bg-white/[0.025] p-3 sm:block">

                <Bot
                  size={20}
                  className="text-violet-300"
                />

              </div>

            </div>

            {/* ======================================
                ROLE + COMPANY
            ====================================== */}

            <div className="grid gap-5 sm:grid-cols-2">

              <SelectField
  icon={<BriefcaseBusiness size={17} />}
  label="Target Role"
  value={role}
  onChange={setRole}
  options={[
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Data Analyst",
    "Data Scientist",
    "Machine Learning Engineer",
    "Other",
  ]}
  placeholder="Select role"
/>

{role === "Other" && (
  <CustomInput
    value={customRole}
    onChange={setCustomRole}
    placeholder="e.g. DevOps Engineer, Cybersecurity Analyst..."
  />
)}

              <SelectField
  icon={<Building2 size={17} />}
  label="Company"
  value={company}
  onChange={setCompany}
  options={[
    "Google",
    "Microsoft",
    "Amazon",
    "Meta",
    "Apple",
    "Adobe",
    "TCS",
    "Infosys",
    "Other",
  ]}
  placeholder="Select company"
/>

{company === "Other" && (
  <CustomInput
    value={customCompany}
    onChange={setCustomCompany}
    placeholder="Enter company name"
  />
)}
            </div>

            {/* COMPANY CATEGORY */}

            <div className="mt-5">

              <SelectField
  icon={<Building2 size={17} />}
  label="Company Category"
  value={companyCategory}
  onChange={setCompanyCategory}
  options={[
    "Product",
    "FinTech",
    "SaaS",
    "Consulting",
    "Service Based",
    "Startup",
    "Other",
  ]}
  placeholder="Select category"
/>

{companyCategory === "Other" && (
  <CustomInput
    value={customCompanyCategory}
    onChange={setCustomCompanyCategory}
    placeholder="e.g. EdTech, HealthTech, Gaming..."
  />
)}

            </div>

            {/* ======================================
                INTERVIEW TYPE
            ====================================== */}

            <div className="mt-9">

              <div className="mb-3">

                <label className="text-xs font-medium text-gray-400">
                  Interview Focus
                </label>

                <p className="mt-1 text-[11px] text-gray-600">
                  Choose what the AI interviewer should
                  focus on.
                </p>

              </div>

              <div className="grid gap-3 sm:grid-cols-4">

                {[
                  [
                    "technical",
                    "Technical",
                    "DSA & concepts",
                  ],
                  [
                    "hr",
                    "HR",
                    "Personality",
                  ],
                  [
                    "behavioral",
                    "Behavioral",
                    "Situations",
                  ],
                  [
                    "mixed",
                    "Mixed",
                    "Full simulation",
                  ],
                ].map(
                  ([value, label, description]) => (
                    <InterviewTypeButton
                      key={value}
                      active={
                        interviewType === value
                      }
                      onClick={() =>
                        setInterviewType(value)
                      }
                      label={label}
                      description={description}
                    />
                  )
                )}

              </div>

            </div>

            {/* ======================================
                DIFFICULTY
            ====================================== */}

            <div className="mt-9">

              <div className="mb-3">

                <label className="text-xs font-medium text-gray-400">
                  Difficulty Level
                </label>

                <p className="mt-1 text-[11px] text-gray-600">
                  Set the intensity of your simulation.
                </p>

              </div>

              <div className="grid gap-3 sm:grid-cols-3">

                {[
                  [
                    "easy",
                    "Easy",
                    "Build confidence",
                  ],
                  [
                    "medium",
                    "Medium",
                    "Interview ready",
                  ],
                  [
                    "hard",
                    "Hard",
                    "Push your limits",
                  ],
                ].map(
                  ([value, label, description]) => (
                    <DifficultyButton
                      key={value}
                      active={
                        difficulty === value
                      }
                      onClick={() =>
                        setDifficulty(value)
                      }
                      label={label}
                      description={description}
                    />
                  )
                )}

              </div>

            </div>

            {/* ======================================
                AI CAPABILITIES
            ====================================== */}

            <div className="mt-9 grid gap-3 sm:grid-cols-3">

              <Capability
                icon={<Brain size={17} />}
                title="Adaptive AI"
                text="Questions tailored to your role"
              />

              <Capability
                icon={<Video size={17} />}
                title="Visual Practice"
                text="Camera-based interview room"
              />

              <Capability
                icon={<Mic size={17} />}
                title="Speech Analysis"
                text="Evaluate your spoken answers"
              />

            </div>

            {/* ======================================
                START BUTTON
            ====================================== */}

            <motion.button
              whileHover={{
                y: -2,
                scale: 1.005,
              }}
              whileTap={{
                scale: 0.985,
              }}
              onClick={handleStartInterview}
              disabled={starting}
              className="group relative mt-9 flex w-full overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 via-violet-500 to-cyan-500 px-6 py-4 text-sm font-semibold text-white shadow-xl shadow-violet-900/20 transition hover:shadow-violet-900/40 disabled:cursor-not-allowed disabled:opacity-50"
            >

              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

              <span className="relative flex w-full items-center justify-center gap-2">

                {starting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                    Preparing your AI interview...
                  </>
                ) : (
                  <>
                    <Sparkles size={17} />

                    Enter AI Interview Room

                    <ChevronRight
                      size={17}
                      className="transition group-hover:translate-x-1"
                    />
                  </>
                )}

              </span>

            </motion.button>

            <div className="mt-3 flex items-center justify-center gap-2">

              <ShieldCheck
                size={13}
                className="text-gray-600"
              />

              <p className="text-[10px] text-gray-600">
                Your interview session is private and
                securely linked to your account.
              </p>

            </div>

          </div>

        </motion.section>

        {/* ==========================================
            HISTORY
        ========================================== */}

        <motion.section
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.025] shadow-2xl shadow-black/20 backdrop-blur-xl"
        >

          <div className="p-6 sm:p-8">

            {/* HISTORY HEADER */}

            <div className="mb-6 flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.06] bg-violet-500/10 text-violet-300">

                  <History size={18} />

                </div>

                <div>

                  <h2 className="text-lg font-semibold text-white">
                    Interview History
                  </h2>

                  <p className="mt-1 text-xs text-gray-600">
                    Your previous AI interview sessions
                  </p>

                </div>

              </div>

              {interviews.length > 0 && (
                <div className="rounded-lg border border-white/[0.06] bg-white/[0.025] px-3 py-1.5 text-xs text-gray-500">

                  {interviews.length}{" "}
                  {interviews.length === 1
                    ? "session"
                    : "sessions"}

                </div>
              )}

            </div>

            {/* LOADING */}

            {historyLoading && (
              <div className="rounded-2xl border border-white/[0.05] bg-white/[0.015] py-12 text-center">

                <div className="mx-auto mb-3 h-6 w-6 animate-spin rounded-full border-2 border-violet-500/20 border-t-violet-400" />

                <p className="text-sm text-gray-600">
                  Loading your interview sessions...
                </p>

              </div>
            )}

            {/* EMPTY */}

            {!historyLoading &&
              interviews.length === 0 && (
                <div className="relative overflow-hidden rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.015] py-14 text-center">

                  <div className="absolute left-1/2 top-0 h-32 w-32 -translate-x-1/2 rounded-full bg-violet-500/10 blur-[60px]" />

                  <div className="relative mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.03] text-gray-600">

                    <Brain size={22} />

                  </div>

                  <p className="relative text-sm font-medium text-gray-400">
                    Your interview history is empty
                  </p>

                  <p className="relative mx-auto mt-2 max-w-sm text-xs leading-5 text-gray-600">
                    Complete your first AI interview and
                    your performance report will appear
                    here.
                  </p>

                </div>
              )}

            {/* HISTORY LIST */}

            {!historyLoading &&
              interviews.length > 0 && (
                <div className="space-y-3">

                  {interviews.map(
                    (interview, index) => (
                      <InterviewHistoryCard
                        key={interview._id}
                        interview={interview}
                        index={index}
                        onClick={() =>
                          handleViewInterview(
                            interview
                          )
                        }
                        onDelete={() =>
                          handleDeleteInterview(
                            interview._id
                          )
                        }
                      />
                    )
                  )}

                </div>
              )}

          </div>

        </motion.section>

      </div>
    </main>
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
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] px-4 py-3 text-center backdrop-blur-xl">

      <div className="mb-1 flex justify-center text-violet-300">
        {icon}
      </div>

      <p className="text-sm font-semibold text-white">
        {value}
      </p>

      <p className="text-[9px] uppercase tracking-wider text-gray-600">
        {label}
      </p>

    </div>
  );
}

// ==========================================
// SELECT FIELD
// ==========================================

function SelectField({
  icon,
  label,
  value,
  onChange,
  options,
  placeholder,
}) {
  return (
    <div>

      <label className="mb-2 block text-xs font-medium text-gray-400">
        {label}
      </label>

      <div className="relative">

        <div className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-gray-500">
          {icon}
        </div>

        <select
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          className="w-full appearance-none rounded-xl border border-white/[0.07] bg-[#0B0D15] py-3.5 pl-11 pr-10 text-sm text-white outline-none transition hover:border-white/[0.12] focus:border-violet-500/50 focus:bg-white/[0.035] focus:ring-1 focus:ring-violet-500/20"
        >

          <option
            value=""
            className="bg-[#0D0F18]"
          >
            {placeholder}
          </option>

          {options.map((option) => (
            <option
              key={option}
              value={option}
              className="bg-[#0D0F18]"
            >
              {option}
            </option>
          ))}

        </select>

        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
        />

      </div>

    </div>
  );
}

// ==========================================
// INTERVIEW TYPE BUTTON
// ==========================================

function InterviewTypeButton({
  active,
  onClick,
  label,
  description,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl border p-4 text-left transition ${
        active
          ? "border-violet-500/40 bg-violet-500/[0.09] shadow-lg shadow-violet-900/10"
          : "border-white/[0.07] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.035]"
      }`}
    >

      {active && (
        <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_12px_rgba(167,139,250,0.8)]" />
      )}

      <p
        className={`text-sm font-semibold ${
          active
            ? "text-violet-200"
            : "text-gray-300"
        }`}
      >
        {label}
      </p>

      <p className="mt-1 text-[10px] text-gray-600">
        {description}
      </p>

    </button>
  );
}

// ==========================================
// DIFFICULTY BUTTON
// ==========================================

function DifficultyButton({
  active,
  onClick,
  label,
  description,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border px-4 py-3.5 text-left transition ${
        active
          ? "border-cyan-500/30 bg-cyan-500/[0.07]"
          : "border-white/[0.07] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.035]"
      }`}
    >

      <div className="flex items-center justify-between">

        <p
          className={`text-sm font-semibold ${
            active
              ? "text-cyan-200"
              : "text-gray-300"
          }`}
        >
          {label}
        </p>

        {active && (
          <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.7)]" />
        )}

      </div>

      <p className="mt-1 text-[10px] text-gray-600">
        {description}
      </p>

    </button>
  );
}

// ==========================================
// CAPABILITY
// ==========================================

function Capability({
  icon,
  title,
  text,
}) {
  return (
    <div className="group rounded-2xl border border-white/[0.06] bg-white/[0.018] p-4 transition hover:border-violet-500/20 hover:bg-white/[0.03]">

      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">

        {icon}

      </div>

      <p className="text-xs font-semibold text-gray-300">
        {title}
      </p>

      <p className="mt-1 text-[10px] leading-4 text-gray-600">
        {text}
      </p>

    </div>
  );
}

// ==========================================
// HISTORY CARD
// ==========================================

function InterviewHistoryCard({
  interview,
  index,
  onClick,
  onDelete,
}) {
  const isCompleted =
    interview.status === "completed";

  const score = interview.overallScore;

  return (
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
        delay: index * 0.04,
      }}
      className="group flex items-center gap-3 rounded-2xl border border-white/[0.05] bg-white/[0.018] p-3 transition hover:border-violet-500/20 hover:bg-white/[0.035] sm:gap-4 sm:p-4"
    >

      {/* ICON */}

      <div
        className={`hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl sm:flex ${
          isCompleted
            ? "bg-violet-500/10 text-violet-300"
            : "bg-yellow-500/10 text-yellow-300"
        }`}
      >

        {isCompleted ? (
          <Trophy size={18} />
        ) : (
          <Clock size={18} />
        )}

      </div>

      {/* CLICKABLE CONTENT */}

      <button
        type="button"
        onClick={onClick}
        className="min-w-0 flex-1 text-left"
      >

        <div className="flex flex-wrap items-center gap-2">

          <h3 className="truncate text-sm font-semibold text-white">
            {interview.role}
          </h3>

          <span
            className={`rounded-md px-2 py-1 text-[9px] font-medium uppercase tracking-wide ${
              isCompleted
                ? "bg-green-500/10 text-green-400"
                : "bg-yellow-500/10 text-yellow-400"
            }`}
          >
            {isCompleted
              ? "Completed"
              : "In Progress"}
          </span>

        </div>

        <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-[10px] text-gray-600">

          {interview.company && (
            <>
              <span>
                {interview.company}
              </span>

              <span>•</span>
            </>
          )}

          <span className="capitalize">
            {interview.interviewType}
          </span>

          <span>•</span>

          <span className="capitalize">
            {interview.difficulty}
          </span>

          {interview.createdAt && (
            <>
              <span>•</span>

              <span>
                {formatDate(
                  interview.createdAt
                )}
              </span>
            </>
          )}

        </div>

      </button>

      {/* SCORE */}

      <div className="hidden text-right sm:block">

        {isCompleted ? (
          <>
            <p className="text-lg font-semibold text-white">

              {score ?? 0}

              <span className="text-[10px] text-gray-600">
                /100
              </span>

            </p>

            <p className="text-[9px] text-gray-600">
              Overall score
            </p>
          </>
        ) : (
          <p className="text-[10px] font-medium text-yellow-400">
            Continue
          </p>
        )}

      </div>

      {/* DELETE */}

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.05] bg-white/[0.02] text-gray-600 transition hover:border-red-500/20 hover:bg-red-500/10 hover:text-red-400"
        title="Delete interview"
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

    </motion.div>
  );
}

// ==========================================
// DATE FORMAT
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
function CustomInput({
  value,
  onChange,
  placeholder,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      className="mt-3"
    >
      <input
        type="text"
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        autoFocus
        className="w-full rounded-xl border border-violet-500/20 bg-violet-500/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-violet-500/50 focus:bg-violet-500/[0.06] focus:ring-1 focus:ring-violet-500/20"
      />
    </motion.div>
  );
}

