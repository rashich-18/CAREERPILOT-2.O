import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleAlert,
  FileText,
  Lightbulb,
  Target,
  TrendingUp,
  BriefcaseBusiness,
  Brain,
  Sparkles,
  XCircle,
  Loader2,
  Building,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getCareerMatchById } from "../api/careerMatchApi";
import { generateRoadmap } from "../api/roadmapApi";

// ============================================================
// SMALL HELPERS
// ============================================================

const clamp = (value) => {
  const number = Number(value);
  if (Number.isNaN(number)) return 0;
  return Math.min(100, Math.max(0, number));
};

const getRecommendationStyle = (recommendation = "") => {
  const value = recommendation.toLowerCase();

  if (value.includes("apply after")) {
    return {
      label: recommendation,
      icon: TrendingUp,
      className:
        "border-amber-400/30 bg-amber-400/10 text-amber-300",
    };
  }

  if (value.includes("apply")) {
    return {
      label: recommendation,
      icon: CheckCircle2,
      className:
        "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
    };
  }

  return {
    label: recommendation || "Low fit",
    icon: XCircle,
    className:
      "border-rose-400/30 bg-rose-400/10 text-rose-300",
  };
};


// ============================================================
// SCORE BAR
// ============================================================

function ScoreBar({ label, value }) {
  const score = clamp(value);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-400">{label}</span>

        <span className="font-semibold text-white">
          {score}%
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-violet-500 via-purple-500 to-cyan-400"
        />
      </div>
    </div>
  );
}


// ============================================================
// ASSESSMENT CARD
// ============================================================

function AssessmentCard({
  item,
  index,
  total,
  type,
  onNext,
  onPrevious,
}) {
  const isStrong = type === "strong";
  const isPartial = type === "partial";

  const title =
    typeof item === "string"
      ? item
      : item?.skill ||
        item?.title ||
        item?.name ||
        item?.requirement ||
        "Career requirement";

  const description =
    typeof item === "string"
      ? ""
      : item?.reason ||
        item?.impact ||
        item?.description ||
        item?.evidence ||
        "";

  let accent = "rose";

  if (isStrong) accent = "emerald";
  else if (isPartial) accent = "amber";

  const icon = isStrong ? (
    <CheckCircle2 className="h-6 w-6 text-emerald-300" />
  ) : isPartial ? (
    <CircleAlert className="h-6 w-6 text-amber-300" />
  ) : (
    <XCircle className="h-6 w-6 text-rose-300" />
  );

  const heading = isStrong
    ? "Strong match"
    : isPartial
      ? "Partial match"
      : "Important gap";

  return (
    <motion.div
      key={`${type}-${index}`}
      initial={{ opacity: 0, x: 35 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -35 }}
      transition={{ duration: 0.3 }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#111525]/90 p-7 shadow-2xl"
    >
      {/* glow */}
      <div
        className={`pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-${accent}-500/10 blur-3xl`}
      />

      <div className="relative">
        <div className="mb-7 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                isStrong
                  ? "bg-emerald-400/10"
                  : isPartial
                    ? "bg-amber-400/10"
                    : "bg-rose-400/10"
              }`}
            >
              {icon}
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                Assessment
              </p>

              <h3 className="text-lg font-semibold text-white">
                {heading}
              </h3>
            </div>
          </div>

          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-400">
            {index + 1} / {total}
          </span>
        </div>

        <h2 className="mb-3 text-2xl font-bold tracking-tight text-white">
          {title}
        </h2>

        {description && (
  <p className="mt-3 text-sm leading-7 text-slate-400">
    {description}
  </p>
)}


        

        <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
          <button
            onClick={onPrevious}
            disabled={index === 0}
            className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm text-slate-400 transition hover:bg-white/[0.05] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </button>

          <button
            onClick={onNext}
            disabled={index === total - 1}
            className="flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-30"
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}


// ============================================================
// MAIN PAGE
// ============================================================

export default function CareerMatchResult() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [careerMatch, setCareerMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [assessmentType, setAssessmentType] = useState("strong");
  const [assessmentIndex, setAssessmentIndex] = useState(0);

  const [showMore, setShowMore] = useState(false);
  const [generatingRoadmap, setGeneratingRoadmap] = useState(false);
  // ----------------------------------------------------------
  // FETCH RESULT
  // ----------------------------------------------------------

  useEffect(() => {
    const loadCareerMatch = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getCareerMatchById(id);

        console.log("CAREER MATCH RESULT:", response);

        setCareerMatch(response?.careerMatch || response?.data);
      } catch (err) {
        console.error("CAREER MATCH RESULT ERROR:", err);

        setError(
          err?.response?.data?.message ||
            "Unable to load this Career Match result."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadCareerMatch();
    }
  }, [id]);

  // ----------------------------------------------------------
  // ASSESSMENT DATA
  // ----------------------------------------------------------

  const assessmentItems = useMemo(() => {
    if (!careerMatch) return [];

    if (assessmentType === "strong") {
      return careerMatch.strongMatches || [];
    }

    if (assessmentType === "partial") {
      return careerMatch.partialMatches || [];
    }

    return careerMatch.criticalGaps || [];
  }, [careerMatch, assessmentType]);

  const changeAssessment = (type) => {
    setAssessmentType(type);
    setAssessmentIndex(0);
  };

  const nextAssessment = () => {
    if (assessmentIndex < assessmentItems.length - 1) {
      setAssessmentIndex((prev) => prev + 1);
    }
  };

  const previousAssessment = () => {
    if (assessmentIndex > 0) {
      setAssessmentIndex((prev) => prev - 1);
    }
  };


  const handleGenerateRoadmap = async () => {
  try {
    setGeneratingRoadmap(true);

    const response = await generateRoadmap({
      careerMatchId: careerMatch._id,
    });

    console.log("ROADMAP GENERATED:", response);

    const roadmapId =
      response?.roadmap?._id ||
      response?.data?._id ||
      response?.data?.roadmap?._id;

    if (roadmapId) {
      navigate(`/roadmap/${roadmapId}`);
    } else {
      console.error("Roadmap ID not found:", response);
      alert("Roadmap was generated, but its ID was not returned.");
    }
  } catch (error) {
    console.error("ROADMAP GENERATION ERROR:", error);

    alert(
      error?.response?.data?.message ||
        "Unable to generate your roadmap. Please try again."
    );
  } finally {
    setGeneratingRoadmap(false);
  }
};
  // ----------------------------------------------------------
  // LOADING
  // ----------------------------------------------------------

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080b14] px-6 py-20 text-white">
        <div className="mx-auto max-w-5xl">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-40 rounded-lg bg-white/[0.06]" />
            <div className="h-56 rounded-3xl bg-white/[0.05]" />
            <div className="h-32 rounded-3xl bg-white/[0.05]" />
            <div className="h-80 rounded-3xl bg-white/[0.05]" />
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------------
  // ERROR
  // ----------------------------------------------------------

  if (error || !careerMatch) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080b14] px-6 text-white">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#111525] p-8 text-center">
          <CircleAlert className="mx-auto mb-4 h-10 w-10 text-rose-300" />

          <h2 className="text-xl font-bold">
            Couldn't load Career Match
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            {error || "The Career Match result could not be found."}
          </p>

          <button
            onClick={() => navigate("/career-match")}
            className="mt-6 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
          >
            Back to Career Match
          </button>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------------
  // DATA
  // ----------------------------------------------------------

  const matchScore = clamp(careerMatch.matchScore);
  const skillMatch = clamp(careerMatch.skillMatch);
  const experienceMatch = clamp(careerMatch.experienceMatch);
  const projectMatch = clamp(careerMatch.projectMatch);

  const recommendation = getRecommendationStyle(
    careerMatch.applyRecommendation
  );

  const RecommendationIcon = recommendation.icon;

  const hiddenGaps = careerMatch.hiddenGaps || [];
  const evidenceGaps = careerMatch.evidenceGaps || [];
  const experienceGaps = careerMatch.experienceGaps || [];

  // ----------------------------------------------------------
  // PAGE
  // ----------------------------------------------------------

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#080b14] text-white">
      {/* Background atmosphere */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[10%] top-[-10%] h-[420px] w-[420px] rounded-full bg-violet-600/10 blur-[120px]" />

        <div className="absolute right-[-5%] top-[25%] h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[130px]" />

        <div className="absolute bottom-[-10%] left-[30%] h-[400px] w-[400px] rounded-full bg-purple-500/5 blur-[120px]" />
      </div>

      <main className="relative mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:px-10">
        {/* ==================================================
            HEADER
        ================================================== */}

        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between"
        >
          <button
            onClick={() => navigate("/career-match")}
            className="group flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-400 transition hover:bg-white/[0.05] hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
            Career Match
          </button>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Sparkles className="h-4 w-4 text-violet-300" />
            CareerPilot Assessment
          </div>
        </motion.div>

        {/* ==================================================
            HERO
        ================================================== */}

        <motion.section
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#14182a] via-[#101423] to-[#0c101d] p-7 shadow-2xl sm:p-10"
        >
          <div className="absolute right-[-80px] top-[-100px] h-[300px] w-[300px] rounded-full bg-violet-500/10 blur-[90px]" />

          <div className="relative grid gap-10 lg:grid-cols-[1fr_280px] lg:items-center">
            <div>
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1.5 text-xs font-medium text-violet-200">
                  <Target className="h-3.5 w-3.5" />
                  Career Assessment
                </span>

                <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-slate-400">
                  <BriefcaseBusiness className="h-3.5 w-3.5" />
                  {careerMatch.targetRole}
                </span>

                <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-slate-400">
                  <Building className="h-3.5 w-3.5" />
                  {careerMatch.targetCompany || "Not specified"}
                </span>


              </div>

              <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
                Your fit for{" "}
                <span className="bg-gradient-to-r from-violet-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
                  {careerMatch.targetRole}
                </span>
              </h1>

              <p className="mt-5 max-w-2xl leading-7 text-slate-400">
                A practical assessment of how your current resume lines up
                with this career path — and what would make you stronger.
              </p>
            </div>

            {/* MATCH SCORE */}
            <div className="flex justify-center">
              <div className="relative flex h-52 w-52 items-center justify-center rounded-full border border-white/10 bg-[#0b0f1b] shadow-[0_0_80px_rgba(139,92,246,0.15)]">
                <div className="absolute inset-3 rounded-full border border-violet-400/10" />

                <div className="text-center">
                  <div className="text-6xl font-bold tracking-tight">
                    {matchScore}
                    <span className="text-2xl text-slate-500">%</span>
                  </div>

                  <p className="mt-1 text-sm text-slate-400">
                    overall match
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* SCORES */}
          <div className="relative mt-10 grid gap-5 border-t border-white/10 pt-8 sm:grid-cols-3">
            <ScoreBar label="Skill match" value={skillMatch} />
            <ScoreBar label="Experience match" value={experienceMatch} />
            <ScoreBar label="Project match" value={projectMatch} />
          </div>
        </motion.section>

        {/* ==================================================
            CAREER INSIGHT
        ================================================== */}

        {careerMatch.careerInsight && (
          <motion.section
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 rounded-3xl border border-violet-400/15 bg-violet-400/[0.05] p-6 sm:p-8"
          >
            <div className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-violet-400/10">
                <Brain className="h-5 w-5 text-violet-300" />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-300">
                  Career insight
                </p>
                {careerMatch.careerInsight &&
  careerMatch.careerInsight !==
    "Your resume contains relevant information for this assessment." && (
    <p className="mt-3 max-w-4xl leading-7 text-slate-300">
      {careerMatch.careerInsight}
    </p>
  )}
                
                
              </div>
            </div>
          </motion.section>
        )}

        {/* ==================================================
            ASSESSMENT
        ================================================== */}

        <section className="mt-12">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Assessment
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              What your resume tells us
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Explore the assessment one point at a time.
            </p>
          </div>

          {/* TABS */}

          <div className="mb-5 flex overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.025] p-1">
            <button
              onClick={() => changeAssessment("strong")}
              className={`flex-1 whitespace-nowrap rounded-xl px-4 py-3 text-sm font-medium transition ${
                assessmentType === "strong"
                  ? "bg-emerald-400/10 text-emerald-300"
                  : "text-slate-500 hover:text-white"
              }`}
            >
              ✓ Strong matches
              <span className="ml-2 opacity-60">
                {careerMatch.strongMatches?.length || 0}
              </span>
            </button>

            <button
              onClick={() => changeAssessment("partial")}
              className={`flex-1 whitespace-nowrap rounded-xl px-4 py-3 text-sm font-medium transition ${
                assessmentType === "partial"
                  ? "bg-amber-400/10 text-amber-300"
                  : "text-slate-500 hover:text-white"
              }`}
            >
              ◐ Partial
              <span className="ml-2 opacity-60">
                {careerMatch.partialMatches?.length || 0}
              </span>
            </button>
            
          </div>

          {/* FLASHCARD */}

          {assessmentItems.length > 0 ? (
            <AnimatePresence mode="wait">
              <AssessmentCard
                key={`${assessmentType}-${assessmentIndex}`}
                item={assessmentItems[assessmentIndex]}
                index={assessmentIndex}
                total={assessmentItems.length}
                type={assessmentType}
                onNext={nextAssessment}
                onPrevious={previousAssessment}
              />
            </AnimatePresence>
          ) : (
            <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-10 text-center">
              <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-300" />

              <h3 className="mt-4 text-lg font-semibold">
                Nothing to show here
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                CareerPilot didn't identify anything in this category.
              </p>
            </div>
          )}
        </section>
{/* ==================================================
    SKILL GAP
================================================== */}

{careerMatch.criticalGaps?.length > 0 && (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="mt-12"
  >
    <div className="mb-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        Skill Gap
      </p>

      <h2 className="mt-2 text-2xl font-bold">
        Skills you need to develop
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        These are the key skills identified as gaps for your target role.
      </p>
    </div>

    <div className="rounded-3xl border border-rose-400/10 bg-[#101423] p-6">
      <div className="flex flex-wrap gap-3">
        {careerMatch.criticalGaps.map((item, index) => {
          const skill =
            typeof item === "string"
              ? item
              : item?.skill ||
                item?.name ||
                item?.title ||
                item?.requirement ||
                "";

          if (!skill) return null;

          return (
            <span
              key={index}
              className="rounded-xl border border-rose-400/20 bg-rose-400/[0.08] px-4 py-2.5 text-sm font-medium text-rose-200"
            >
              {skill}
            </span>
          );
        })}
      </div>
    </div>
  </motion.section>
)}
        {/* ==================================================
            NEXT STEPS
        ================================================== */}

        {careerMatch.skillPriorities?.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Next steps
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                What to improve first
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Focus on the highest-impact improvements instead of trying to
                fix everything at once.
              </p>
            </div>

            <div className="grid gap-4">
              {careerMatch.skillPriorities.map((item, index) => {
                const skill =
                  typeof item === "string"
                    ? item
                    : item?.skill || "Skill";

                const reason =
                  typeof item === "string"
                    ? ""
                    : item?.reason || item?.impact || "";

                const priority =
                  typeof item === "string"
                    ? ""
                    : item?.priority || "";

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="group flex gap-4 rounded-2xl border border-white/10 bg-[#101423] p-5 transition hover:border-violet-400/20 hover:bg-[#13182a]"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-400/10 text-sm font-bold text-violet-300">
                      {index + 1}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-semibold text-white">
                          {skill}
                        </h3>

                        {priority && (
                          <span className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-slate-500">
                            {priority}
                          </span>
                        )}
                      </div>

                      {reason && (
                        <p className="mt-2 text-sm leading-6 text-slate-400">
                          {reason}
                        </p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>
        )}

        {/* ==================================================
    ROADMAP CTA
================================================== */}

<motion.section
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  className="mt-12 overflow-hidden rounded-3xl border border-violet-400/15 bg-gradient-to-br from-violet-500/[0.08] via-[#101423] to-cyan-500/[0.04] p-6 sm:p-8"
>
  <div className="relative">
    {/* Glow */}
    <div className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-violet-500/10 blur-3xl" />

    <div className="relative">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/15">
          <Sparkles className="text-violet-300" size={22} />
        </div>

        <div>
          <p className="text-sm font-medium text-violet-300">
            Your next step
          </p>

          <h2 className="text-2xl font-bold text-white">
            Turn this analysis into a plan
          </h2>
        </div>
      </div>

      <p className="max-w-2xl text-sm leading-6 text-slate-400">
        We'll turn your career gaps and priorities into a
        step-by-step roadmap so you know what to learn,
        build, and focus on next.
      </p>

      <button
        onClick={handleGenerateRoadmap}
        disabled={generatingRoadmap}
        className="mt-6 inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.02] hover:shadow-violet-500/30 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {generatingRoadmap ? (
          <>
            <Loader2 size={19} className="animate-spin" />
            Building your roadmap...
          </>
        ) : (
          <>
            <Sparkles size={19} />
            Build My Roadmap
            <ArrowRight size={18} />
          </>
        )}
      </button>
    </div>
  </div>
</motion.section>

        {/* ==================================================
            RESUME SUGGESTIONS
        ================================================== */}

        {careerMatch.resumeSuggestions?.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 rounded-3xl border border-cyan-400/10 bg-cyan-400/[0.03] p-6 sm:p-8"
          >
            <div className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-400/10">
                <FileText className="h-5 w-5 text-cyan-300" />
              </div>

              <div className="w-full">
                <h2 className="text-xl font-bold">
                  Make your resume stronger
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Improvements based on what your current resume already
                  demonstrates.
                </p>

                <div className="mt-6 space-y-3">
                  {careerMatch.resumeSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="flex gap-3 rounded-2xl border border-white/10 bg-black/10 p-4"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />

                      <p className="text-sm leading-6 text-slate-300">
                        {typeof suggestion === "string"
                          ? suggestion
                          : suggestion?.suggestion ||
                            suggestion?.reason ||
                            suggestion?.description ||
                            JSON.stringify(suggestion)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* ==================================================
            MORE DETAILS
        ================================================== */}

        <section className="mt-8">
          <button
            onClick={() => setShowMore(!showMore)}
            className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/[0.025] px-5 py-4 text-left transition hover:bg-white/[0.04]"
          >
            <div className="flex items-center gap-3">
              <Lightbulb className="h-5 w-5 text-violet-300" />

              <div>
                <p className="font-medium text-white">
                  More assessment details
                </p>

                <p className="text-xs text-slate-500">
                  Hidden, evidence and experience gaps
                </p>
              </div>
            </div>

            <ChevronDown
              className={`h-5 w-5 text-slate-500 transition ${
                showMore ? "rotate-180" : ""
              }`}
            />
          </button>

          <AnimatePresence>
            {showMore && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="grid gap-4 pt-4 md:grid-cols-3">
                  <DetailGroup
                    title="Hidden gaps"
                    items={hiddenGaps}
                  />

                  <DetailGroup
                    title="Evidence gaps"
                    items={evidenceGaps}
                  />

                  <DetailGroup
                    title="Experience gaps"
                    items={experienceGaps}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* ==================================================
            FINAL RECOMMENDATION
        ================================================== */}

        <motion.section
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 mb-10 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#15192b] to-[#0e121f] p-7 sm:p-9"
        >
          <div className="flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${recommendation.className}`}
                >
                  <RecommendationIcon className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                    CareerPilot recommendation
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-white">
                    {recommendation.label}
                  </h2>
                </div>
              </div>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400">
                This recommendation is based on the evidence available in
                your uploaded resume and the requirements of the target role.
              </p>
            </div>

            <button
              onClick={() => navigate("/career-match")}
              className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02] hover:shadow-xl"
            >
              New assessment
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </motion.section>
      </main>
    </div>
  );
}


// ============================================================
// DETAIL GROUP
// ============================================================

function DetailGroup({ title, items }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#101423] p-5">
      <h3 className="font-semibold text-white">{title}</h3>

      {items?.length > 0 ? (
        <div className="mt-4 space-y-3">
          {items.map((item, index) => {
            const text =
              typeof item === "string"
                ? item
                : item?.skill ||
                  item?.reason ||
                  item?.description ||
                  item?.requirement ||
                  JSON.stringify(item);

            return (
              <div
                key={index}
                className="flex gap-2 text-sm leading-6 text-slate-400"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />

                <span>{text}</span>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="mt-4 text-sm text-slate-600">
          No additional gaps identified.
        </p>
      )}
    </div>
  );
}