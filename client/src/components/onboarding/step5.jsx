import {
  Globe,
  Trophy,
  Sparkles,
  UploadCloud,
  FileText,
  CheckCircle2,
} from "lucide-react";
import { FaGithub,FaLinkedin } from "react-icons/fa";
export default function Step5({ formData, updateFormData }) {

  const handleResumeUpload = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Basic validation
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a PDF or DOC/DOCX file.");
      return;
    }

    // 5 MB limit
    if (file.size > 5 * 1024 * 1024) {
      alert("Resume must be smaller than 5 MB.");
      return;
    }

    updateFormData("resume", file);
  };

  return (
    <div className="space-y-10">

      {/* =========================
          HEADING
      ========================= */}

      <div className="text-center">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-violet-500/20">

          <Sparkles
            size={38}
            className="text-violet-300"
          />

        </div>

        <h2 className="mt-5 text-3xl font-bold text-white">
          Final Setup
        </h2>

        <p className="mt-2 text-gray-400">
          Connect your profiles to unlock personalized AI guidance.
        </p>

      </div>

      {/* =========================
          PROFESSIONAL PROFILES
      ========================= */}

      <div className="space-y-5">

        <h3 className="text-xl font-semibold text-white">
          Professional Profiles
        </h3>

        {/* GitHub */}

        <Input
          icon={<FaGithub size={18} />}
          placeholder="https://github.com/username"
          label="GitHub Profile"
          value={formData.github}
          onChange={(value) =>
            updateFormData("github", value)
          }
        />

        {/* LinkedIn */}

        <Input
          icon={<FaLinkedin size={18} />}
          placeholder="https://linkedin.com/in/username"
          label="LinkedIn Profile"
          value={formData.linkedin}
          onChange={(value) =>
            updateFormData("linkedin", value)
          }
        />

        {/* Portfolio */}

        <Input
          icon={<Globe size={18} />}
          placeholder="https://yourportfolio.com"
          label="Portfolio Website (Optional)"
          value={formData.portfolio}
          onChange={(value) =>
            updateFormData("portfolio", value)
          }
        />

      </div>

      {/* =========================
          CODING PROFILES
      ========================= */}

      <div className="space-y-5">

        <h3 className="text-xl font-semibold text-white">
          Coding Profiles
        </h3>

        <Input
          icon={<Trophy size={18} />}
          placeholder="LeetCode Username"
          label="LeetCode"
          value={formData.leetcode}
          onChange={(value) =>
            updateFormData("leetcode", value)
          }
        />

        <Input
          icon={<Trophy size={18} />}
          placeholder="Codeforces Username"
          label="Codeforces"
          value={formData.codeforces}
          onChange={(value) =>
            updateFormData("codeforces", value)
          }
        />

        <Input
          icon={<Trophy size={18} />}
          placeholder="CodeChef Username"
          label="CodeChef"
          value={formData.codechef}
          onChange={(value) =>
            updateFormData("codechef", value)
          }
        />

        <Input
          icon={<Trophy size={18} />}
          placeholder="HackerRank Username"
          label="HackerRank"
          value={formData.hackerrank}
          onChange={(value) =>
            updateFormData("hackerrank", value)
          }
        />

      </div>

      {/* =========================
          RESUME
      ========================= */}

      <div>

        <h3 className="mb-4 text-xl font-semibold text-white">
          Resume
        </h3>

        <label className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-violet-500/40 bg-white/5 py-10 transition-all duration-300 hover:border-violet-400 hover:bg-white/10">

          {formData.resume ? (
            <>
              <CheckCircle2
                size={40}
                className="text-green-400"
              />

              <p className="mt-4 text-lg font-medium text-white">
                Resume Selected
              </p>

              <div className="mt-2 flex items-center gap-2 text-sm text-gray-400">
                <FileText size={16} />
                {formData.resume.name}
              </div>

              <p className="mt-3 text-xs text-violet-300">
                Click to replace
              </p>
            </>
          ) : (
            <>
              <UploadCloud
                size={40}
                className="text-violet-300 transition-transform duration-300 group-hover:-translate-y-1"
              />

              <p className="mt-4 text-lg font-medium text-white">
                Upload Resume
              </p>

              <p className="mt-2 text-sm text-gray-400">
                PDF or DOCX • Max 5 MB
              </p>
            </>
          )}

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={handleResumeUpload}
          />

        </label>

        <p className="mt-3 text-center text-xs text-gray-500">
          You can also upload it later from the Dashboard.
        </p>

      </div>

      {/* =========================
          AI READY
      ========================= */}

      <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-r from-violet-500/10 to-cyan-500/10 p-6">

        <h3 className="text-xl font-semibold text-white">
          🤖 Your AI Career Coach is Ready
        </h3>

        <div className="mt-5 space-y-3 text-gray-300">

          <p>✅ Analyze your resume</p>

          <p>✅ Detect missing skills</p>

          <p>✅ Build a personalized roadmap</p>

          <p>✅ Generate interview questions</p>

          <p>✅ Recommend jobs & internships</p>

          <p>✅ Track your career readiness</p>

        </div>

      </div>

      {/* =========================
          COMPLETION
      ========================= */}

      <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-5">

        <div className="flex justify-between text-sm text-gray-300">

          <span>
            Onboarding Complete
          </span>

          <span>
            100%
          </span>

        </div>

        <div className="mt-3 h-3 rounded-full bg-white/10">

          <div className="h-full w-full rounded-full bg-gradient-to-r from-green-500 to-cyan-500" />

        </div>

      </div>

    </div>
  );
}


/* =====================================================
   REUSABLE INPUT
===================================================== */

function Input({
  icon,
  label,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div>

      <label className="mb-2 block text-sm text-gray-300">
        {label}
      </label>

      <div className="flex items-center rounded-xl border border-white/10 bg-white/5 px-4 transition-all duration-300 focus-within:border-violet-500 focus-within:shadow-[0_0_20px_rgba(139,92,246,0.15)]">

        <div className="text-gray-400">
          {icon}
        </div>

        <input
          type="text"
          value={value || ""}
          placeholder={placeholder}
          onChange={(e) =>
            onChange(e.target.value)
          }
          className="w-full bg-transparent px-3 py-4 text-white outline-none placeholder:text-gray-500"
        />

      </div>

    </div>
  );
}