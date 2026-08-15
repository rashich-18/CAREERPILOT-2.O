import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Camera,
  CameraOff,
  Mic,
  MicOff,
  Brain,
  ChevronRight,
  Square,
  Loader2,
  Sparkles,
  ShieldCheck,
  Radio,
  Clock3,
  CheckCircle2,
  Volume2,
  Waves,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getInterviewById,
  submitInterviewAnswer,
  completeInterview,
} from "../api/interviewApi";

export default function InterviewRoom() {
  const navigate = useNavigate();
  const { id } = useParams();

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const recognitionRef = useRef(null);

  const answerStartTimeRef = useRef(null);
  const finalTranscriptRef = useRef("");

  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);

  const [cameraOn, setCameraOn] = useState(false);
  const [micOn, setMicOn] = useState(false);
  const [listening, setListening] = useState(false);

  const [transcript, setTranscript] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [savingAnswer, setSavingAnswer] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  // ==========================================
  // FETCH INTERVIEW
  // ==========================================

  useEffect(() => {
    fetchInterview();

    return () => {
      cleanupMedia();
    };
  }, [id]);

  const fetchInterview = async () => {
    try {
      setLoading(true);

      const response = await getInterviewById(id);

      if (response.data.success) {
        setInterview(response.data.interview);
      }
    } catch (error) {
      console.error("FETCH INTERVIEW ERROR:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load interview."
      );

      navigate("/interview");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // INTERVIEW TIMER
  // ==========================================

  useEffect(() => {
    if (!interview) return;

    const timer = setInterval(() => {
      setElapsedTime((previous) => previous + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [interview]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");

    const secs = (seconds % 60)
      .toString()
      .padStart(2, "0");

    return `${minutes}:${secs}`;
  };

  // ==========================================
  // CLEANUP MEDIA
  // ==========================================

  const cleanupMedia = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // already stopped
      }

      recognitionRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });

      streamRef.current = null;
    }

    setCameraOn(false);
    setMicOn(false);
    setListening(false);
  };

  // ==========================================
  // CAMERA + MICROPHONE
  // ==========================================

  const startMedia = async () => {
    try {
      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

      streamRef.current = stream;

      setCameraOn(true);
      setMicOn(true);

      requestAnimationFrame(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;

          videoRef.current.play().catch((error) => {
            console.error("VIDEO PLAY ERROR:", error);
          });
        }
      });

      toast.success("Interview environment ready.");
    } catch (error) {
      console.error("MEDIA PERMISSION ERROR:", error);

      toast.error(
        "Please allow camera and microphone access to continue."
      );
    }
  };

  // ==========================================
  // ATTACH VIDEO STREAM
  // ==========================================

  useEffect(() => {
    if (
      cameraOn &&
      videoRef.current &&
      streamRef.current
    ) {
      videoRef.current.srcObject =
        streamRef.current;

      videoRef.current.play().catch(() => {});
    }
  }, [cameraOn]);

  // ==========================================
  // CAMERA TOGGLE
  // ==========================================

  const toggleCamera = () => {
    if (!streamRef.current) {
      startMedia();
      return;
    }

    const videoTrack =
      streamRef.current.getVideoTracks()[0];

    if (!videoTrack) return;

    videoTrack.enabled = !videoTrack.enabled;

    setCameraOn(videoTrack.enabled);
  };

  // ==========================================
  // MICROPHONE TOGGLE
  // ==========================================

  const toggleMicrophone = () => {
    if (!streamRef.current) {
      startMedia();
      return;
    }

    const audioTrack =
      streamRef.current.getAudioTracks()[0];

    if (!audioTrack) return;

    audioTrack.enabled = !audioTrack.enabled;

    setMicOn(audioTrack.enabled);

    if (!audioTrack.enabled && listening) {
      stopListening();
    }
  };

  // ==========================================
  // SPEECH RECOGNITION
  // ==========================================

  const startListening = () => {
    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      toast.error(
        "Speech recognition is not supported in this browser."
      );

      return;
    }

    if (!micOn) {
      toast.error("Please enable your microphone first.");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    answerStartTimeRef.current = Date.now();

    finalTranscriptRef.current = "";
    setTranscript("");

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onresult = (event) => {
      let finalText = "";
      let interimText = "";

      for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
      ) {
        const text =
          event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalText += `${text} `;
        } else {
          interimText += text;
        }
      }

      if (finalText.trim()) {
        finalTranscriptRef.current =
          `${finalTranscriptRef.current} ${finalText}`.trim();
      }

      setTranscript(
        `${finalTranscriptRef.current} ${interimText}`.trim()
      );
    };

    recognition.onerror = (event) => {
      console.error(
        "Speech recognition error:",
        event.error
      );

      setListening(false);

      if (event.error === "not-allowed") {
        toast.error(
          "Microphone permission was denied."
        );
      }

      if (event.error === "no-speech") {
        toast.error(
          "I couldn't detect speech. Try speaking clearly."
        );
      }
    };

    recognition.onend = () => {
      setListening(false);

      setTranscript(
        finalTranscriptRef.current.trim()
      );
    };

    recognitionRef.current = recognition;

    try {
      recognition.start();
    } catch (error) {
      console.error(
        "START SPEECH ERROR:",
        error
      );
    }
  };

  // ==========================================
  // STOP SPEECH
  // ==========================================

  const stopListening = () => {
    const recognition =
      recognitionRef.current;

    if (recognition) {
      recognitionRef.current = null;

      try {
        recognition.stop();
      } catch {
        // already stopped
      }
    }

    setListening(false);

    setTranscript(
      finalTranscriptRef.current.trim()
    );
  };

  // ==========================================
  // NEXT QUESTION
  // ==========================================

  const handleNextQuestion = async () => {
    if (!interview || savingAnswer) return;

    if (listening) {
      stopListening();
    }

    const currentQuestionData =
      interview.questions[currentQuestion];

    if (!currentQuestionData) {
      toast.error("Question not found.");
      return;
    }

    const finalAnswer =
      finalTranscriptRef.current.trim() ||
      transcript.trim();

    const duration =
      answerStartTimeRef.current
        ? Math.max(
            1,
            (Date.now() -
              answerStartTimeRef.current) /
              1000
          )
        : 1;

    try {
      setSavingAnswer(true);

      const response =
        await submitInterviewAnswer(
          interview._id,
          {
            questionId:
              currentQuestionData._id,

            answer: finalAnswer,

            transcript: finalAnswer,

            duration,
          }
        );

      if (!response.data.success) {
        toast.error(
          "Failed to save your answer."
        );

        return;
      }

      const totalQuestions =
        interview.questions.length;

      const isLastQuestion =
        currentQuestion >=
        totalQuestions - 1;

      if (!isLastQuestion) {
        setCurrentQuestion(
          (previous) => previous + 1
        );

        setTranscript("");
        finalTranscriptRef.current = "";
        answerStartTimeRef.current = null;

        return;
      }

      toast.loading(
        "CareerPilot AI is evaluating your interview...",
        {
          id: "interview-report",
        }
      );

      const completeResponse =
        await completeInterview(
          interview._id
        );

      toast.dismiss("interview-report");

      if (completeResponse.data.success) {
        toast.success(
          "Your AI report is ready!"
        );

        cleanupMedia();

        navigate(
          `/interview/${interview._id}/report`
        );
      } else {
        toast.error(
          "Failed to generate interview report."
        );
      }
    } catch (error) {
      console.error(
        "SAVE ANSWER / COMPLETE INTERVIEW ERROR:",
        error
      );

      toast.dismiss("interview-report");

      toast.error(
        error.response?.data?.message ||
          "Something went wrong while saving your answer."
      );
    } finally {
      setSavingAnswer(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#05060D] text-white">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(124,58,237,0.16),transparent_35%)]" />

        <div className="relative flex flex-col items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-300">
            <Brain
              size={25}
              className="animate-pulse"
            />
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Loader2
              size={16}
              className="animate-spin"
            />

            Preparing your AI interview...
          </div>

        </div>
      </main>
    );
  }

  // ==========================================
  // NO INTERVIEW
  // ==========================================

  if (!interview) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#05060D]">

        <div className="text-center">

          <p className="text-gray-400">
            Interview not found.
          </p>

           <motion.button
          type="button"
          onClick={() => navigate("/interview")}
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

          Back to AI Interview
        </motion.button>
        
        </div>

      </main>
    );
  }

  const question =
    interview.questions[currentQuestion];

  const totalQuestions =
    interview.questions.length;

  const progress =
    ((currentQuestion + 1) /
      totalQuestions) *
    100;

  // ==========================================
  // INTERVIEW ROOM
  // ==========================================

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05060D] text-white">

      {/* ========================================
          BACKGROUND
      ======================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute left-[-10%] top-[-10%] h-[450px] w-[450px] rounded-full bg-violet-600/10 blur-[120px]" />

        <div className="absolute bottom-[-15%] right-[-5%] h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:40px_40px]" />

      </div>

      <div className="relative mx-auto max-w-[1500px] px-4 py-5 sm:px-6 lg:px-8">

        {/* ======================================
            TOP NAV
        ====================================== */}

        <header className="mb-6 flex items-center justify-between">

          <motion.button
          type="button"
          onClick={() => {cleanupMedia();
            navigate("/interview");}}
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

          Back to AI Interview
        </motion.button>

          {/* CENTER BRAND */}

          <div className="hidden items-center gap-3 sm:flex">

            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-300">

              <Brain size={17} />

              <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />

            </div>

            <div>
              <p className="text-xs font-semibold text-white">
                CareerPilot AI
              </p>

              <p className="text-[10px] text-gray-600">
                Live Interview Console
              </p>
            </div>

          </div>

          {/* SESSION STATUS */}

          <div className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2 backdrop-blur-xl">

            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>

            <span className="hidden text-xs text-gray-400 sm:block">
              Live Session
            </span>

            <span className="text-xs font-medium text-white">
              {formatTime(elapsedTime)}
            </span>

          </div>

        </header>

        {/* ======================================
            INTERVIEW INFO
        ====================================== */}

        <section className="mb-6">

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

            <div>

              <div className="mb-2 flex items-center gap-2">

                <Sparkles
                  size={14}
                  className="text-violet-400"
                />

                <span className="text-xs font-medium uppercase tracking-[0.2em] text-violet-300">
                  AI Interview
                </span>

              </div>

              <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {interview.role}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                {interview.company ||
                  "CareerPilot Practice Session"}
              </p>

            </div>

            <div className="flex items-center gap-3">

              <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5">

                <p className="text-[10px] uppercase tracking-wider text-gray-600">
                  Difficulty
                </p>

                <p className="mt-0.5 text-xs font-medium capitalize text-gray-300">
                  {interview.difficulty}
                </p>

              </div>

              <div className="rounded-xl border border-violet-500/20 bg-violet-500/[0.06] px-4 py-2.5">

                <p className="text-[10px] uppercase tracking-wider text-violet-400/70">
                  Progress
                </p>

                <p className="mt-0.5 text-xs font-semibold text-violet-300">
                  {currentQuestion + 1} /{" "}
                  {totalQuestions}
                </p>

              </div>

            </div>

          </div>

          {/* PROGRESS */}

          <div className="mt-5 h-1 overflow-hidden rounded-full bg-white/[0.05]">

            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${progress}%`,
              }}
              transition={{
                duration: 0.5,
              }}
              className="h-full rounded-full bg-gradient-to-r from-violet-500 via-purple-400 to-cyan-400 shadow-[0_0_15px_rgba(139,92,246,0.6)]"
            />

          </div>

        </section>

        {/* ======================================
            MAIN INTERVIEW GRID
        ====================================== */}

        <div className="grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">

          {/* ====================================
              CAMERA PANEL
          ==================================== */}

          <motion.section
            initial={{
              opacity: 0,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            className="relative min-h-[470px] overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#090B13] shadow-2xl shadow-black/30"
          >

            {/* VIDEO */}

            {cameraOn ? (
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                style={{
                  transform: "scaleX(-1)",
                }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.12),transparent_40%)]">

                <div className="relative mb-5 flex h-20 w-20 items-center justify-center rounded-[24px] border border-violet-400/20 bg-violet-500/10 text-violet-300">

                  <Camera size={30} />

                  <div className="absolute inset-0 animate-pulse rounded-[24px] border border-violet-400/20" />

                </div>

                <p className="text-sm font-medium text-gray-300">
                  Camera is currently off
                </p>

                <p className="mt-1 text-xs text-gray-600">
                  Turn on your camera to begin the session.
                </p>

                <button
                  onClick={startMedia}
                  className="mt-5 rounded-xl bg-violet-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-violet-900/30 transition hover:bg-violet-500"
                >
                  Enable Camera & Mic
                </button>

              </div>
            )}

            {/* VIDEO OVERLAY */}

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

            {/* TOP STATUS */}

            <div className="absolute left-5 right-5 top-5 flex items-center justify-between">

              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-3 py-2 backdrop-blur-xl">

                <span
                  className={`h-2 w-2 rounded-full ${
                    cameraOn
                      ? "bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]"
                      : "bg-red-400"
                  }`}
                />

                <span className="text-[11px] font-medium text-white">
                  {cameraOn
                    ? "Camera active"
                    : "Camera offline"}
                </span>

              </div>

              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-3 py-2 backdrop-blur-xl">

                <ShieldCheck
                  size={13}
                  className="text-green-400"
                />

                <span className="text-[11px] text-gray-300">
                  Private session
                </span>

              </div>

            </div>

            {/* AI OBSERVER */}

            {cameraOn && (
              <div className="absolute bottom-5 left-5 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/45 px-4 py-3 backdrop-blur-xl">

                <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">

                  <Brain size={17} />

                  <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-cyan-400" />

                </div>

                <div>

                  <p className="text-xs font-semibold text-white">
                    AI Observer
                  </p>

                  <p className="text-[10px] text-gray-500">
                    {listening
                      ? "Analyzing speech..."
                      : "Monitoring session"}
                  </p>

                </div>

              </div>
            )}

            {/* MEDIA CONTROLS */}

            <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-3">

              <button
                type="button"
                onClick={toggleCamera}
                className={`flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-xl transition ${
                  cameraOn
                    ? "border-white/10 bg-black/50 text-white hover:bg-black/70"
                    : "border-red-400/20 bg-red-500/20 text-red-300"
                }`}
              >
                {cameraOn ? (
                  <Camera size={17} />
                ) : (
                  <CameraOff size={17} />
                )}
              </button>

              <button
                type="button"
                onClick={toggleMicrophone}
                className={`flex h-14 w-14 items-center justify-center rounded-full shadow-xl transition ${
                  micOn
                    ? "bg-gradient-to-br from-violet-600 to-purple-500 text-white shadow-violet-900/40"
                    : "bg-red-500 text-white shadow-red-900/30"
                }`}
              >
                {micOn ? (
                  <Mic size={20} />
                ) : (
                  <MicOff size={20} />
                )}
              </button>

              <div className="h-11 w-11" />

            </div>

          </motion.section>

          {/* ====================================
              QUESTION PANEL
          ==================================== */}

          <motion.section
            initial={{
              opacity: 0,
              x: 15,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.1,
            }}
            className="flex min-h-[470px] flex-col rounded-[28px] border border-white/[0.08] bg-[#090B13] p-5 shadow-2xl shadow-black/20 sm:p-7"
          >

            {/* AI HEADER */}

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-300">

                  <Brain size={19} />

                  <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />

                </div>

                <div>

                  <p className="text-sm font-semibold text-white">
                    CareerPilot AI
                  </p>

                  <p className="text-[11px] text-gray-600">
                    Your AI interviewer
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-cyan-400">

                <Radio
                  size={12}
                  className="animate-pulse"
                />

                Live

              </div>

            </div>

            {/* QUESTION */}

            <div className="mt-9 flex-1">

              <div className="mb-4 flex items-center gap-2">

                <span className="rounded-lg border border-violet-400/15 bg-violet-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-violet-300">
                  {question.questionType}
                </span>

                <span className="text-[10px] text-gray-700">
                  Question{" "}
                  {currentQuestion + 1}
                </span>

              </div>

              <AnimatePresence mode="wait">

                <motion.h2
                  key={currentQuestion}
                  initial={{
                    opacity: 0,
                    y: 8,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -8,
                  }}
                  className="text-xl font-medium leading-[1.6] tracking-tight text-white sm:text-[23px]"
                >
                  {question.question}
                </motion.h2>

              </AnimatePresence>

            </div>

            {/* ==================================
                LIVE TRANSCRIPT
            ================================== */}

            <div className="mb-4 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">

              <div className="mb-3 flex items-center justify-between">

                <div className="flex items-center gap-2">

                  <Waves
                    size={14}
                    className="text-violet-400"
                  />

                  <span className="text-[13px] font-medium uppercase tracking-wider text-gray-500">
                    Live Transcript
                  </span>

                </div>

                {listening && (
                  <div className="flex items-center gap-2">

                    <div className="flex items-end gap-[2px]">

                      {[1, 2, 3, 4, 5].map(
                        (bar) => (
                          <motion.span
                            key={bar}
                            animate={{
                              height: [
                                4,
                                12 + bar * 2,
                                5,
                              ],
                            }}
                            transition={{
                              duration:
                                0.6 +
                                bar * 0.08,
                              repeat: Infinity,
                              repeatType:
                                "mirror",
                            }}
                            className="w-[2px] rounded-full bg-violet-400"
                          />
                        )
                      )}

                    </div>

                    <span className="text-[10px] font-medium text-violet-300">
                      Listening
                    </span>

                  </div>
                )}

              </div>

              <div className="min-h-[72px] max-h-[105px] overflow-y-auto">

                <p className="text-xs leading-6 text-gray-400">

                  {transcript || (
                    <span className="text-gray-700">
                      Your spoken answer will appear here
                      in real time...
                    </span>
                  )}

                </p>

              </div>

            </div>

            {/* ==================================
                SPEECH STATUS
            ================================== */}

            <div className="mb-4 flex items-center justify-between">

              <div className="flex items-center gap-2">

                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-lg ${
                    micOn
                      ? "bg-green-500/10 text-green-400"
                      : "bg-red-500/10 text-red-400"
                  }`}
                >
                  {micOn ? (
                    <Mic size={13} />
                  ) : (
                    <MicOff size={13} />
                  )}
                </div>

                <div>

                  <p className="text-[10px] font-medium text-gray-400">
                    Microphone
                  </p>

                  <p className="text-[9px] text-gray-700">
                    {micOn
                      ? "Ready to listen"
                      : "Microphone disabled"}
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-2 text-[10px] text-gray-600">

                <Clock3 size={12} />

                {answerStartTimeRef.current
                  ? "Answer in progress"
                  : "Ready when you are"}

              </div>

            </div>

            {/* ==================================
                ACTIONS
            ================================== */}

            <div className="flex gap-3">

              {!listening ? (
                <button
                  type="button"
                  onClick={startListening}
                  disabled={!micOn || savingAnswer}
                  className="group flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-500 px-5 py-3.5 text-xs font-semibold text-white shadow-lg shadow-violet-900/20 transition hover:from-violet-500 hover:to-purple-400 disabled:cursor-not-allowed disabled:opacity-35"
                >
                  <Mic
                    size={16}
                    className="transition group-hover:scale-110"
                  />

                  Start Answer
                </button>
              ) : (
                <button
                  type="button"
                  onClick={stopListening}
                  disabled={savingAnswer}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-500/90 px-5 py-3.5 text-xs font-semibold text-white shadow-lg shadow-red-900/20 transition hover:bg-red-500 disabled:opacity-50"
                >
                  <Square size={14} />

                  Stop Answer
                </button>
              )}

              <button
                type="button"
                onClick={handleNextQuestion}
                disabled={savingAnswer}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/[0.09] bg-white/[0.04] px-5 py-3.5 text-xs font-semibold text-gray-300 transition hover:border-violet-400/20 hover:bg-violet-500/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {savingAnswer ? (
                  <>
                    <Loader2
                      size={15}
                      className="animate-spin"
                    />

                    <span className="hidden sm:inline">
                      {currentQuestion ===
                      totalQuestions - 1
                        ? "Generating..."
                        : "Saving..."}
                    </span>
                  </>
                ) : (
                  <>
                    <span>
                      {currentQuestion ===
                      totalQuestions - 1
                        ? "Finish"
                        : "Next"}
                    </span>

                    <ChevronRight size={16} />
                  </>
                )}
              </button>

            </div>

          </motion.section>

        </div>

        {/* ======================================
            BOTTOM SESSION BAR
        ====================================== */}

        <div className="mt-5 grid gap-3 sm:grid-cols-3">

          <SessionInfo
            icon={<Volume2 size={14} />}
            title="Audio Analysis"
            value={
              listening
                ? "Active"
                : "Standby"
            }
            active={listening}
          />

          <SessionInfo
            icon={<Camera size={14} />}
            title="Visual Presence"
            value={
              cameraOn
                ? "Connected"
                : "Disabled"
            }
            active={cameraOn}
          />

          <SessionInfo
            icon={<CheckCircle2 size={14} />}
            title="Interview Progress"
            value={`${Math.round(progress)}% complete`}
            active
          />

        </div>

      </div>
    </main>
  );
}

// ==========================================
// SESSION INFO
// ==========================================

function SessionInfo({
  icon,
  title,
  value,
  active,
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">

      <div className="flex items-center gap-3">

        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${
            active
              ? "bg-violet-500/10 text-violet-300"
              : "bg-white/[0.04] text-gray-600"
          }`}
        >
          {icon}
        </div>

        <span className="text-[11px] text-gray-500">
          {title}
        </span>

      </div>

      <div className="flex items-center gap-2">

        <span
          className={`h-1.5 w-1.5 rounded-full ${
            active
              ? "bg-green-400"
              : "bg-gray-700"
          }`}
        />

        <span className="text-[10px] font-medium text-gray-400">
          {value}
        </span>

      </div>

    </div>
  );
}