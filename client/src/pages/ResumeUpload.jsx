import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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
} from "lucide-react";

import {
  uploadResume,
  getResumeHistory,
  deleteResumes,
} from "../api/resumeApi";

export default function ResumeUpload() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [resumes, setResumes] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  // Selected resume IDs
  const [selectedResumes, setSelectedResumes] = useState([]);

  // Delete confirmation
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // ==========================================
  // LOAD RESUME HISTORY
  // ==========================================

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

  // ==========================================
  // FILE SELECT
  // ==========================================

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

  // ==========================================
  // UPLOAD RESUME
  // ==========================================

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

        console.log(
          "RESUME RESPONSE:",
          response.data
        );

        // Backend may return either id or _id
        const resumeId =
          response.data.resume._id ||
          response.data.resume.id;

        if (!resumeId) {
          toast.error(
            "Resume uploaded but ID was not returned."
          );
          return;
        }

        // Refresh history
        await loadResumeHistory();

        // Open analysis page
        navigate("/analysis", {
          state: {
            resumeId: resumeId,
          },
        });
      }
    } catch (error) {
      console.error(
        "RESUME UPLOAD ERROR:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to upload resume."
      );
    } finally {
      setUploading(false);
    }
  };

  // ==========================================
  // VIEW OLD RESUME
  // ==========================================

  const handleViewResume = (resume) => {
    navigate("/analysis", {
      state: {
        resumeId: resume._id,
      },
    });
  };

  // ==========================================
  // SELECT / UNSELECT RESUME
  // ==========================================

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

  // ==========================================
  // SELECT ALL
  // ==========================================

  const handleSelectAll = () => {
    if (selectedResumes.length === resumes.length) {
      setSelectedResumes([]);
    } else {
      setSelectedResumes(
        resumes.map((resume) => resume._id)
      );
    }
  };

  // ==========================================
  // OPEN DELETE CONFIRMATION
  // ==========================================

  const handleDeleteClick = () => {
    if (selectedResumes.length === 0) {
      toast.error(
        "Please select at least one resume."
      );
      return;
    }

    setShowDeleteModal(true);
  };

  // ==========================================
  // DELETE SELECTED RESUMES
  // ==========================================

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

        // Close modal
        setShowDeleteModal(false);

        // Clear selection
        setSelectedResumes([]);

        // Reload history
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

  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="min-h-screen bg-[#070712] px-5 py-10 text-white md:px-8">

      <div className="mx-auto max-w-5xl">
<button
  onClick={() => navigate("/dashboard")}
  className="mb-8 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-gray-300 transition hover:border-violet-500/30 hover:bg-white/10 hover:text-white"
>
  <ArrowLeft size={17} />
  Back to Dashboard
</button>
        {/* ==========================================
            HEADER
        =========================================== */}

        <div className="mb-10 text-center">

          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500">

            <FileText size={30} />

          </div>

          <h1 className="text-4xl font-bold">
            Upload Your Resume
          </h1>

          <p className="mt-3 text-gray-400">
            Let CareerPilot AI analyze your resume
            and build your personalized career path.
          </p>

        </div>

        {/* ==========================================
            UPLOAD CARD
        =========================================== */}

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

          {!file ? (

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/10 px-6 py-16 transition hover:border-violet-500 hover:bg-white/5">

              <Upload
                size={42}
                className="mb-4 text-violet-400"
              />

              <h2 className="text-lg font-semibold">
                Upload your resume
              </h2>

              <p className="mt-2 text-sm text-gray-400">
                PDF only · Maximum 5 MB
              </p>

              <input
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />

            </label>

          ) : (

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/20">

                    <FileText
                      size={24}
                      className="text-violet-400"
                    />

                  </div>

                  <div>

                    <p className="font-medium">
                      {file.name}
                    </p>

                    <p className="text-sm text-gray-400">
                      {(file.size / 1024 / 1024).toFixed(
                        2
                      )}{" "}
                      MB
                    </p>

                  </div>

                </div>

                <button
                  type="button"
                  onClick={() => setFile(null)}
                  disabled={uploading}
                  className="rounded-lg p-2 text-gray-400 transition hover:bg-white/10 hover:text-white"
                >
                  <X size={20} />
                </button>

              </div>

            </div>

          )}

          {/* ==========================================
              UPLOAD BUTTON
          =========================================== */}

          {file && (

            <button
              onClick={handleUpload}
              disabled={uploading}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 py-4 font-semibold transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
            >

              {uploading ? (

                <>
                  <Loader2
                    size={20}
                    className="animate-spin"
                  />

                  Analyzing Resume...
                </>

              ) : (

                <>
                  <Upload size={20} />

                  Upload & Analyze Resume
                </>

              )}

            </button>

          )}

        </div>

        {/* ==========================================
            RESUME HISTORY
        =========================================== */}

        <div className="mt-10">

          {/* HISTORY HEADER */}

          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10">

                <History
                  size={22}
                  className="text-violet-400"
                />

              </div>

              <div>

                <h2 className="text-2xl font-semibold">
                  Resume History
                </h2>

                <p className="text-sm text-gray-500">
                  View and manage your previous resume analyses
                </p>

              </div>

            </div>

            {/* DELETE BUTTON */}

            {resumes.length > 0 && (

              <button
                onClick={handleDeleteClick}
                disabled={
                  selectedResumes.length === 0
                }
                className="flex items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-3 text-sm font-medium text-red-300 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-40"
              >

                <Trash2 size={17} />

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

              <div className="mb-4 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">

                <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-400">

                  <input
                    type="checkbox"
                    checked={
                      selectedResumes.length ===
                        resumes.length &&
                      resumes.length > 0
                    }
                    onChange={handleSelectAll}
                    className="h-4 w-4 accent-violet-500"
                  />

                  Select All

                </label>

                {selectedResumes.length > 0 && (

                  <span className="text-sm text-violet-400">

                    {selectedResumes.length} selected

                  </span>

                )}

              </div>

            )}

          {/* ==========================================
              LOADING
          =========================================== */}

          {loadingHistory && (

            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">

              <Loader2
                size={30}
                className="mx-auto animate-spin text-violet-400"
              />

              <p className="mt-3 text-sm text-gray-400">
                Loading your resume history...
              </p>

            </div>

          )}

          {/* ==========================================
              EMPTY
          =========================================== */}

          {!loadingHistory &&
            resumes.length === 0 && (

              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">

                <FileText
                  size={35}
                  className="mx-auto text-gray-600"
                />

                <p className="mt-3 text-gray-400">
                  No previous resumes yet.
                </p>

                <p className="mt-1 text-sm text-gray-600">
                  Upload your first resume to get
                  started.
                </p>

              </div>

            )}

          {/* ==========================================
              RESUME LIST
          =========================================== */}

          {!loadingHistory &&
            resumes.length > 0 && (

              <div className="space-y-4">

                {resumes.map((resume) => {

                  const isSelected =
                    selectedResumes.includes(
                      resume._id
                    );

                  return (

                    <div
                      key={resume._id}
                      className={`flex flex-col gap-4 rounded-2xl border p-5 transition md:flex-row md:items-center md:justify-between ${
                        isSelected
                          ? "border-violet-500/40 bg-violet-500/10"
                          : "border-white/10 bg-white/5 hover:border-violet-500/30 hover:bg-white/[0.07]"
                      }`}
                    >

                      {/* LEFT SIDE */}

                      <div className="flex min-w-0 items-center gap-4">

                        {/* CHECKBOX */}

                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() =>
                            handleSelectResume(
                              resume._id
                            )
                          }
                          className="h-5 w-5 shrink-0 cursor-pointer accent-violet-500"
                        />

                        {/* ICON */}

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-500/10">

                          <FileText
                            size={22}
                            className="text-violet-400"
                          />

                        </div>

                        {/* INFO */}

                        <div className="min-w-0">

                          <div className="flex flex-wrap items-center gap-2">

                            <h3 className="truncate font-medium text-white">
                              {resume.fileName}
                            </h3>

                            {resume.isCurrent && (

                              <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-400">

                                <CheckCircle2 size={11} />

                                Current

                              </span>

                            )}

                          </div>

                          <p className="mt-1 text-sm text-gray-500">

                            Uploaded{" "}

                            {formatDate(
                              resume.uploadedAt ||
                                resume.createdAt
                            )}

                          </p>

                          {resume.analysis?.summary && (

                            <p className="mt-2 max-w-2xl truncate text-sm text-gray-500">

                              {resume.analysis.summary}

                            </p>

                          )}

                        </div>

                      </div>

                      {/* VIEW BUTTON */}

                      <button
                        onClick={() =>
                          handleViewResume(
                            resume
                          )
                        }
                        className="flex shrink-0 items-center justify-center gap-2 rounded-xl border border-violet-500/20 bg-violet-500/10 px-5 py-3 text-sm font-medium text-violet-300 transition hover:bg-violet-500/20"
                      >

                        <Eye size={17} />

                        View Analysis

                      </button>

                    </div>

                  );

                })}

              </div>

            )}

        </div>

      </div>

      {/* ==========================================
          DELETE CONFIRMATION MODAL
      =========================================== */}

      {showDeleteModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-5 backdrop-blur-sm">

          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#11111f] p-7 shadow-2xl">

            {/* ICON */}

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10">

              <AlertTriangle
                size={28}
                className="text-red-400"
              />

            </div>

            {/* TEXT */}

            <div className="mt-5 text-center">

              <h2 className="text-xl font-semibold text-white">
                Delete Selected Resumes?
              </h2>

              <p className="mt-3 leading-6 text-gray-400">

                Are you sure you want to delete{" "}

                <span className="font-semibold text-white">
                  {selectedResumes.length}{" "}
                  selected resume
                  {selectedResumes.length !== 1
                    ? "s"
                    : ""}
                </span>
                ?

              </p>

              <p className="mt-2 text-sm text-gray-500">
                This will permanently remove the selected
                resume{selectedResumes.length !== 1 ? "s" : ""}{" "}
                and its saved AI analysis.
              </p>

            </div>

            {/* BUTTONS */}

            <div className="mt-7 flex gap-3">

              <button
                onClick={() =>
                  setShowDeleteModal(false)
                }
                disabled={deleting}
                className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-medium text-gray-300 transition hover:bg-white/10 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteSelected}
                disabled={deleting}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-500/90 px-4 py-3 font-medium text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60"
              >

                {deleting ? (

                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />

                    Deleting...
                  </>

                ) : (

                  <>
                    <Trash2 size={18} />

                    Delete
                  </>

                )}

              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}