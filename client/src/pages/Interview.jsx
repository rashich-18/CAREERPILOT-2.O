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
  ShieldCheck,
  Bot,
  Check,
  Loader2,
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

  const [interviewType, setInterviewType] = useState("mixed");
  const [difficulty, setDifficulty] = useState("medium");

  const [starting, setStarting] = useState(false);

  const [interviews, setInterviews] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);

  const [selectedInterviews, setSelectedInterviews] = useState([]);
  const [deletingSelected, setDeletingSelected] = useState(false);

  // ==========================================
  // FETCH HISTORY
  // ==========================================

  useEffect(() => {
    fetchInterviewHistory();
  }, []);

  const fetchInterviewHistory = async () => {
    try {
      setHistoryLoading(true);

      const response = await getInterviewHistory();

      if (response.data.success) {
        setInterviews(response.data.interviews || []);
      }
    } catch (error) {
      console.error("GET INTERVIEW HISTORY ERROR:", error);

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
      console.error("START INTERVIEW ERROR:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to create interview."
      );
    } finally {
      setStarting(false);
    }
  };

  // ==========================================
  // SELECTION
  // ==========================================

  const toggleInterviewSelection = (interviewId) => {
    setSelectedInterviews((previous) =>
      previous.includes(interviewId)
        ? previous.filter((id) => id !== interviewId)
        : [...previous, interviewId]
    );
  };

  const handleSelectAll = () => {
    if (
      selectedInterviews.length === interviews.length
    ) {
      setSelectedInterviews([]);
    } else {
      setSelectedInterviews(
        interviews.map((interview) => interview._id)
      );
    }
  };

  // ==========================================
  // DELETE SELECTED
  // ==========================================

  const handleDeleteSelected = async () => {
    if (selectedInterviews.length === 0) return;

    try {
      setDeletingSelected(true);

      await Promise.all(
        selectedInterviews.map((interviewId) =>
          deleteInterview(interviewId)
        )
      );

      setInterviews((previous) =>
        previous.filter(
          (interview) =>
            !selectedInterviews.includes(interview._id)
        )
      );

      setSelectedInterviews([]);

      toast.success(
        selectedInterviews.length === 1
          ? "Interview deleted successfully."
          : `${selectedInterviews.length} interviews deleted successfully.`
      );
    } catch (error) {
      console.error(
        "DELETE SELECTED INTERVIEWS ERROR:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to delete selected interviews."
      );
    } finally {
      setDeletingSelected(false);
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
      navigate(`/interview/${interview._id}`);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05060D] px-3 pb-16 pt-5 sm:px-4 lg:px-5 xl:px-6">

      {/* ==========================================
          BACKGROUND
      ========================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[5%] top-[-10%] h-[420px] w-[420px] rounded-full bg-violet-600/10 blur-[120px]" />

        <div className="absolute right-[-5%] top-[20%] h-[350px] w-[350px] rounded-full bg-cyan-500/8 blur-[120px]" />

        <div className="absolute bottom-[-10%] left-[35%] h-[400px] w-[400px] rounded-full bg-indigo-600/8 blur-[130px]" />

        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      {/* ==========================================
          MAIN CONTAINER
      ========================================== */}

      <div className="relative mx-auto w-full max-w-[1440px]">

        {/* ==========================================
            BACK TO DASHBOARD
        ========================================== */}

        <motion.button
          type="button"
          onClick={() => navigate("/dashboard")}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          whileHover={{ x: -2 }}
          whileTap={{ scale: 0.97 }}
          className="mb-6 inline-flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.035] px-3.5 py-2.5 text-xs font-medium text-gray-400 transition hover:border-violet-500/30 hover:bg-white/[0.06] hover:text-white sm:mb-7"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </motion.button>

        {/* ==========================================
            PAGE HEADER
        ========================================== */}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-6 flex flex-col gap-5 lg:mb-7 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="min-w-0">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10">
                <Brain
                  size={17}
                  className="text-violet-300"
                />
              </div>

              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-violet-300 sm:text-[11px]">
                CareerPilot AI
              </p>
            </div>

            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              AI Interview
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
              Practice realistic interviews tailored to
              your target role, company and difficulty.
              Improve your answers, confidence and
              interview performance.
            </p>
          </div>

          {/* HISTORY COUNT */}

          <div className="flex w-fit shrink-0 items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.035] px-4 py-3 backdrop-blur-xl">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10">
              <History
                size={17}
                className="text-violet-300"
              />
            </div>

            <div>
              <p className="text-lg font-semibold leading-none text-white">
                {interviews.length}
              </p>

              <p className="mt-1 text-[10px] uppercase tracking-wider text-gray-600">
                Interview Sessions
              </p>
            </div>
          </div>
        </motion.div>

        {/* ==========================================
            SETUP CARD
        ========================================== */}

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-white/[0.025] shadow-2xl shadow-black/20 backdrop-blur-xl"
        >
          {/* TOP GLOW */}

          <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-violet-400/60 to-transparent" />

          <div className="pointer-events-none absolute right-[-100px] top-[-100px] h-[300px] w-[300px] rounded-full bg-violet-500/8 blur-[100px]" />

          <div className="relative p-5 sm:p-7 lg:p-8 xl:p-9">

            {/* HEADER */}

            <div className="mb-7 flex items-start justify-between gap-4">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <Zap
                    size={15}
                    className="text-cyan-300"
                  />

                  <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-cyan-300 sm:text-[11px]">
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

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              <div>
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
              </div>

              <div>
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
            </div>

            {/* COMPANY CATEGORY */}

            <div className="mt-5 max-w-full md:max-w-[calc(50%-10px)]">
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

            <div className="mt-8">
              <div className="mb-3">
                <label className="text-xs font-medium text-gray-400">
                  Interview Focus
                </label>

                <p className="mt-1 text-[11px] text-gray-600">
                  Choose what the AI interviewer should
                  focus on.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
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

            <div className="mt-8">
              <div className="mb-3">
                <label className="text-xs font-medium text-gray-400">
                  Difficulty Level
                </label>

                <p className="mt-1 text-[11px] text-gray-600">
                  Set the intensity of your simulation.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
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

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
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
              className="group relative mt-8 flex w-full overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 via-violet-500 to-cyan-500 px-5 py-4 text-sm font-semibold text-white shadow-xl shadow-violet-900/20 transition hover:shadow-violet-900/40 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

              <span className="relative flex w-full items-center justify-center gap-2">
                {starting ? (
                  <>
                    <Loader2
                      size={17}
                      className="animate-spin"
                    />
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

            <div className="mt-3 flex items-center justify-center gap-2 text-center">
              <ShieldCheck
                size={13}
                className="shrink-0 text-gray-600"
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
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.2,
          }}
          className="mt-7 overflow-hidden rounded-[24px] border border-white/[0.08] bg-white/[0.025] shadow-2xl shadow-black/20 backdrop-blur-xl"
        >
          <div className="p-5 sm:p-7 lg:p-8">

            {/* HEADER */}

            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-violet-500/10 text-violet-300">
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
                <motion.button
                  type="button"
                  onClick={handleDeleteSelected}
                  disabled={
                    selectedInterviews.length === 0 ||
                    deletingSelected
                  }
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/[0.07] px-4 py-2.5 text-xs font-medium text-red-300 transition hover:border-red-500/30 hover:bg-red-500/[0.12] disabled:cursor-not-allowed disabled:opacity-30 sm:w-auto"
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

                  {selectedInterviews.length > 0 && (
                    <span>
                      ({selectedInterviews.length})
                    </span>
                  )}
                </motion.button>
              )}
            </div>

            {/* SELECT ALL */}

            {!historyLoading &&
              interviews.length > 0 && (
                <div className="mb-4 flex flex-col gap-2 rounded-xl border border-white/[0.05] bg-white/[0.015] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    onClick={handleSelectAll}
                    disabled={deletingSelected}
                    className="flex cursor-pointer items-center gap-3 text-xs text-gray-500 transition hover:text-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <div
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition ${
                        selectedInterviews.length ===
                          interviews.length &&
                        interviews.length > 0
                          ? "border-violet-400 bg-violet-500"
                          : "border-white/20 bg-white/5"
                      }`}
                    >
                      {selectedInterviews.length ===
                        interviews.length &&
                        interviews.length > 0 && (
                          <Check
                            size={11}
                            className="text-white"
                          />
                        )}
                    </div>

                    {selectedInterviews.length ===
                        interviews.length &&
                      interviews.length > 0
                      ? "Deselect all interviews"
                      : "Select all interviews"}
                  </button>

                  {selectedInterviews.length > 0 && (
                    <span className="text-xs font-medium text-violet-400">
                      {selectedInterviews.length} selected
                    </span>
                  )}
                </div>
              )}

            {/* LOADING */}

            {historyLoading && (
              <div className="rounded-2xl border border-white/[0.05] bg-white/[0.015] py-14 text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/10 bg-violet-500/[0.05]">
                  <Loader2
                    size={20}
                    className="animate-spin text-violet-400"
                  />
                </div>

                <p className="mt-4 text-sm text-gray-600">
                  Loading your interview sessions...
                </p>
              </div>
            )}

            {/* EMPTY */}

            {!historyLoading &&
              interviews.length === 0 && (
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
                    <Brain
                      size={21}
                      className="text-gray-600"
                    />
                  </div>

                  <p className="relative mt-4 text-sm font-medium text-gray-400">
                    Your interview history is empty
                  </p>

                  <p className="relative mx-auto mt-2 max-w-sm text-xs leading-5 text-gray-600">
                    Complete your first AI interview and
                    your performance report will appear here.
                  </p>
                </motion.div>
              )}

            {/* HISTORY LIST */}

            {!historyLoading &&
              interviews.length > 0 && (
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
                  {interviews.map((interview) => {
                    const isSelected =
                      selectedInterviews.includes(
                        interview._id
                      );

                    return (
                      <InterviewHistoryCard
                        key={interview._id}
                        interview={interview}
                        isSelected={isSelected}
                        onSelect={() =>
                          toggleInterviewSelection(
                            interview._id
                          )
                        }
                        onClick={() =>
                          handleViewInterview(
                            interview
                          )
                        }
                        deleting={deletingSelected}
                      />
                    );
                  })}
                </motion.div>
              )}
          </div>
        </motion.section>
      </div>
    </main>
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
    <div className="min-w-0">
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
// INTERVIEW TYPE
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
// DIFFICULTY
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
  isSelected,
  onSelect,
  onClick,
  deleting,
}) {
  const isCompleted =
    interview.status === "completed";

  const score = interview.overallScore;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 6,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      whileHover={{
        y: -2,
      }}
      transition={{
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`group rounded-2xl border p-4 transition-all duration-200 sm:p-5 ${
        isSelected
          ? "border-violet-500/30 bg-violet-500/[0.07]"
          : "border-white/[0.05] bg-white/[0.015] hover:border-violet-500/20 hover:bg-white/[0.03]"
      }`}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">

        {/* LEFT */}

        <div className="flex min-w-0 flex-1 items-start gap-3 sm:items-center sm:gap-4">

          {/* CHECKBOX */}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            disabled={deleting}
            aria-label={`Select ${interview.role} interview`}
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

          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${
              isCompleted
                ? "border-violet-500/10 bg-violet-500/[0.07]"
                : "border-yellow-500/10 bg-yellow-500/[0.07]"
            }`}
          >
            {isCompleted ? (
              <Trophy
                size={18}
                className="text-violet-300"
              />
            ) : (
              <Clock
                size={18}
                className="text-yellow-300"
              />
            )}
          </div>

          {/* INFORMATION */}

          <button
            type="button"
            onClick={onClick}
            className="min-w-0 flex-1 text-left"
          >
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="max-w-full truncate text-sm font-semibold text-white">
                {interview.role || "AI Interview"}
              </h3>

              <span
                className={`rounded-full border px-2 py-1 text-[9px] font-medium uppercase tracking-wide ${
                  isCompleted
                    ? "border-green-500/15 bg-green-500/10 text-green-400"
                    : "border-yellow-500/15 bg-yellow-500/10 text-yellow-400"
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
        </div>

        {/* RIGHT */}

        <div className="flex w-full items-center gap-3 lg:w-auto">

          {/* SCORE */}

          <div className="flex min-w-[70px] flex-col items-center justify-center rounded-xl border border-white/[0.05] bg-white/[0.015] px-3 py-2">
            {isCompleted ? (
              <>
                <p className="text-base font-semibold text-white">
                  {score ?? 0}
                  <span className="text-[9px] text-gray-600">
                    /100
                  </span>
                </p>

                <p className="text-[9px] uppercase tracking-wider text-gray-600">
                  Score
                </p>
              </>
            ) : (
              <>
                <p className="text-[10px] font-medium text-yellow-400">
                  Continue
                </p>

                <p className="text-[9px] uppercase tracking-wider text-gray-600">
                  Pending
                </p>
              </>
            )}
          </div>

          {/* VIEW */}

          <motion.button
            type="button"
            onClick={onClick}
            whileHover={{
              x: 2,
            }}
            whileTap={{
              scale: 0.97,
            }}
            className="group/view flex flex-1 items-center justify-center gap-2 rounded-xl border border-violet-500/15 bg-violet-500/[0.07] px-4 py-2.5 text-xs font-medium text-violet-300 transition hover:border-violet-500/30 hover:bg-violet-500/[0.12] lg:flex-none"
          >
            {isCompleted
              ? "View Report"
              : "Continue"}

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

// ==========================================
// CUSTOM INPUT
// ==========================================

function CustomInput({
  value,
  onChange,
  placeholder,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        height: 0,
      }}
      animate={{
        opacity: 1,
        height: "auto",
      }}
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