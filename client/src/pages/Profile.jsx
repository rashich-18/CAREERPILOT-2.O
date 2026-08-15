import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import PageBackground from "../components/common/PageBackground";
import {
  User,
  BriefcaseBusiness,
  Globe,
  Camera,
  Save,
  Pencil,
  Code2,
  Heart,
  ArrowLeft,
  X,
  Loader2,
  Trash2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";

import API from "../api/profileApi";
import toast from "react-hot-toast";

export default function Profile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingPicture, setUploadingPicture] = useState(false);

  const fileInputRef = useRef(null);

  // ==========================================
  // FETCH PROFILE
  // ==========================================

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login again.");
        return;
      }

      const response = await API.get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        const user = response.data.user;

        localStorage.setItem("user", JSON.stringify(user));

        window.dispatchEvent(new Event("userUpdated"));

        setProfile({
          fullName: user.name || "",
          email: user.email || "",
          profilePicture: user.profilePicture || "",

          college: user.education?.college || "",
          degree: user.education?.degree || "",
          customDegree: user.education?.customDegree || "",
          branch: user.education?.branch || "",
          customBranch: user.education?.customBranch || "",
          graduationYear:
            user.education?.graduationYear || "",
          cgpa: user.education?.cgpa || "",

          dreamRole: user.career?.dreamRole || "",
          customDreamRole:
            user.career?.customDreamRole || "",
          dreamCompany:
            user.career?.dreamCompany || "",
          preferredDomain:
            user.career?.preferredDomain || "",
          customDomain:
            user.career?.customDomain || "",
          workMode:
            user.career?.workMode || "",

          skills: user.skills || [],
          interests: user.interests || [],

          github: user.profiles?.github || "",
          linkedin: user.profiles?.linkedin || "",
          portfolio: user.profiles?.portfolio || "",

          leetcode:
            user.codingProfiles?.leetcode || "",
          codeforces:
            user.codingProfiles?.codeforces || "",
          codechef:
            user.codingProfiles?.codechef || "",
          hackerrank:
            user.codingProfiles?.hackerrank || "",
        });
      }
    } catch (error) {
      console.error("Profile fetch error:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load profile."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // HANDLE PROFILE PICTURE
  // ==========================================

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error(
        "Profile picture must be smaller than 2 MB."
      );
      return;
    }

    try {
      setUploadingPicture(true);

      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login again.");
        navigate("/login");
        return;
      }

      const data = new FormData();
      data.append("profilePicture", file);

      const response = await API.put(
        "/profile",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Profile picture updated!");
        await fetchProfile();
      }
    } catch (error) {
      console.error(
        "PROFILE PICTURE ERROR:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to update profile picture."
      );
    } finally {
      setUploadingPicture(false);
      e.target.value = "";
    }
  };

  // ==========================================
  // REMOVE PROFILE PICTURE
  // ==========================================

  const handleRemoveProfilePicture = async () => {
    try {
      setUploadingPicture(true);

      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login again.");
        navigate("/login");
        return;
      }

      const response = await API.put(
        "/profile",
        { removeProfilePicture: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Profile picture removed!");
        await fetchProfile();
      }
    } catch (error) {
      console.error(
        "REMOVE PROFILE PICTURE ERROR:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to remove profile picture."
      );
    } finally {
      setUploadingPicture(false);
    }
  };

  // ==========================================
  // HANDLE SAVE
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      const response = await API.put(
        "/profile",
        {
          fullName: profile.fullName,

          college: profile.college,
          degree: profile.degree,
          customDegree: profile.customDegree,
          branch: profile.branch,
          customBranch: profile.customBranch,
          graduationYear: profile.graduationYear,
          cgpa: profile.cgpa,

          dreamRole: profile.dreamRole,
          customDreamRole: profile.customDreamRole,
          dreamCompany: profile.dreamCompany,
          preferredDomain: profile.preferredDomain,
          customDomain: profile.customDomain,
          workMode: profile.workMode,

          skills: profile.skills,
          interests: profile.interests,

          github: profile.github,
          linkedin: profile.linkedin,
          portfolio: profile.portfolio,

          leetcode: profile.leetcode,
          codeforces: profile.codeforces,
          codechef: profile.codechef,
          hackerrank: profile.hackerrank,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Profile updated successfully!");

        setEditing(false);

        await fetchProfile();
      }
    } catch (error) {
      console.error(
        "Profile update error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#070914]">
        <div className="animate-pulse text-sm text-gray-500">
          Loading your profile...
        </div>
      </main>
    );
  }

  // ==========================================
  // NO PROFILE
  // ==========================================

  if (!profile) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#070914]">
        <div className="text-center">
          <p className="text-gray-400">
            Unable to load your profile.
          </p>

          <button
            onClick={fetchProfile}
            className="mt-4 rounded-xl bg-violet-600 px-5 py-2 text-sm text-white transition hover:bg-violet-500"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  // ==========================================
  // PROFILE PAGE
  // ==========================================

  return (
    <main className="min-h-screen bg-[#070914] px-3 pb-10 pt-5 sm:px-4 lg:px-5">
      <PageBackground />

      {/* IMPORTANT:
          Wider desktop container + very small side padding
      */}

      <div className="relative mx-auto w-full max-w-[1400px]">

        {/* ================================= */}
        {/* BACK BUTTON */}
        {/* ================================= */}

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

        {/* ================================= */}
        {/* HEADER */}
        {/* ================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="mb-1.5 text-sm text-violet-300">
              Your profile
            </p>

            <h1 className="text-3xl font-semibold tracking-tight text-white">
              {editing
                ? "Edit your profile"
                : "Your career profile"}
            </h1>

            <p className="mt-1.5 max-w-2xl text-sm leading-6 text-gray-500">
              {editing
                ? "Update the information CareerPilot uses to personalize your career journey."
                : "Your academic background, career goals and professional information in one place."}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setEditing(!editing)}
            className="flex w-fit items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-gray-300 transition hover:border-violet-500/40 hover:bg-white/[0.07] hover:text-white"
          >
            {editing ? (
              <>
                <X size={16} />
                Cancel
              </>
            ) : (
              <>
                <Pencil size={16} />
                Edit Profile
              </>
            )}
          </button>
        </motion.div>

        {/* ================================= */}
        {/* FORM */}
        {/* ================================= */}

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {/* ================================= */}
          {/* PERSONAL */}
          {/* ================================= */}

          <ProfileCard
            icon={<User size={18} />}
            title="Personal Information"
            description="Your basic profile details"
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

              {/* AVATAR */}

              <div className="relative shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                  disabled={uploadingPicture}
                  className="group relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-violet-600/20 to-cyan-500/10"
                >
                  {profile.profilePicture ? (
                    <img
                      src={profile.profilePicture}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-3xl font-semibold text-violet-300">
                      {profile.fullName
                        ?.charAt(0)
                        ?.toUpperCase() || "U"}
                    </span>
                  )}

                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition group-hover:opacity-100">
                    <Camera
                      size={20}
                      className="text-white"
                    />
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                  disabled={uploadingPicture}
                  className="absolute -bottom-0.5 -right-2 flex h-9 w-9 items-center justify-center rounded-xl border border-[#070914] bg-violet-600 text-white transition hover:bg-violet-500 disabled:opacity-50"
                >
                  {uploadingPicture ? (
                    <Loader2
                      size={15}
                      className="animate-spin"
                    />
                  ) : (
                    <Camera size={16} />
                  )}
                </button>

                {editing &&
                  profile.profilePicture && (
                    <button
                      type="button"
                      onClick={
                        handleRemoveProfilePicture
                      }
                      disabled={uploadingPicture}
                      className="mt-2 flex h-8 w-8 items-center justify-center rounded-lg border border-red-500/20 bg-red-500/10 text-red-300 transition hover:bg-red-500/20 disabled:opacity-50"
                    >
                      <Trash2 size={12} />
                    </button>
                  )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={
                    handleProfilePictureChange
                  }
                  className="hidden"
                />
              </div>

              {/* NAME + EMAIL */}

              <div className="grid flex-1 gap-4 sm:grid-cols-2">
                <Input
                  label="Full Name"
                  name="fullName"
                  value={profile.fullName}
                  onChange={handleChange}
                  placeholder="Your full name"
                  disabled={!editing}
                />

                <Input
                  label="Email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  type="email"
                  disabled
                />
              </div>
            </div>
          </ProfileCard>

          {/* ================================= */}
          {/* CAREER */}
          {/* ================================= */}

          <ProfileCard
            icon={
              <BriefcaseBusiness size={18} />
            }
            title="Career Goals"
            description="Tell CareerPilot where you want to go"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Dream Company"
                name="dreamCompany"
                value={profile.dreamCompany}
                onChange={handleChange}
                placeholder="e.g. Google"
                disabled={!editing}
              />

              <Input
                label="Dream Role"
                name="dreamRole"
                value={profile.dreamRole}
                onChange={handleChange}
                placeholder="e.g. Software Engineer"
                disabled={!editing}
              />

              <Input
                label="Preferred Domain"
                name="preferredDomain"
                value={profile.preferredDomain}
                onChange={handleChange}
                placeholder="Full Stack"
                disabled={!editing}
              />

              <Input
                label="Work Mode"
                name="workMode"
                value={profile.workMode}
                onChange={handleChange}
                placeholder="Hybrid"
                disabled={!editing}
              />
            </div>
          </ProfileCard>

          {/* ================================= */}
          {/* SKILLS */}
          {/* ================================= */}

          <ProfileCard
            icon={<Code2 size={18} />}
            title="Technical Skills"
            description="Skills you've selected during onboarding"
          >
            <div className="flex flex-wrap gap-2">
              {profile.skills?.length > 0 ? (
                profile.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1.5 text-sm text-violet-200"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-sm text-gray-600">
                  No skills added yet.
                </p>
              )}
            </div>
          </ProfileCard>

          {/* ================================= */}
          {/* INTERESTS */}
          {/* ================================= */}

          <ProfileCard
            icon={<Heart size={18} />}
            title="Interests"
            description="Areas you're interested in"
          >
            <div className="flex flex-wrap gap-2">
              {profile.interests?.length > 0 ? (
                profile.interests.map((interest) => (
                  <span
                    key={interest}
                    className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1.5 text-sm text-cyan-200"
                  >
                    {interest}
                  </span>
                ))
              ) : (
                <p className="text-sm text-gray-600">
                  No interests added yet.
                </p>
              )}
            </div>
          </ProfileCard>

          {/* ================================= */}
          {/* PROFESSIONAL */}
          {/* ================================= */}

          <ProfileCard
            icon={<Globe size={18} />}
            title="Professional Presence"
            description="Your professional and coding profiles"
          >
            <div className="space-y-4">

              <SocialInput
                icon={<FaLinkedin size={18} />}
                label="LinkedIn"
                name="linkedin"
                value={profile.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/yourname"
                disabled={!editing}
              />

              <SocialInput
                icon={<FaGithub size={18} />}
                label="GitHub"
                name="github"
                value={profile.github}
                onChange={handleChange}
                placeholder="https://github.com/yourname"
                disabled={!editing}
              />

              <SocialInput
                icon={<Globe size={18} />}
                label="Portfolio"
                name="portfolio"
                value={profile.portfolio}
                onChange={handleChange}
                placeholder="https://yourportfolio.com"
                disabled={!editing}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label="LeetCode"
                  name="leetcode"
                  value={profile.leetcode}
                  onChange={handleChange}
                  placeholder="Username"
                  disabled={!editing}
                />

                <Input
                  label="Codeforces"
                  name="codeforces"
                  value={profile.codeforces}
                  onChange={handleChange}
                  placeholder="Username"
                  disabled={!editing}
                />

                <Input
                  label="CodeChef"
                  name="codechef"
                  value={profile.codechef}
                  onChange={handleChange}
                  placeholder="Username"
                  disabled={!editing}
                />

                <Input
                  label="HackerRank"
                  name="hackerrank"
                  value={profile.hackerrank}
                  onChange={handleChange}
                  placeholder="Username"
                  disabled={!editing}
                />
              </div>
            </div>
          </ProfileCard>

          {/* ================================= */}
          {/* SAVE */}
          {/* ================================= */}

          {editing && (
            <motion.div
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="flex justify-end gap-3 pt-1"
            >
              <button
                type="button"
                onClick={() => {
                  setEditing(false);
                  fetchProfile();
                }}
                className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-3 text-sm font-medium text-gray-400 transition hover:bg-white/[0.06] hover:text-white"
              >
                Cancel
              </button>

              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={saving}
                className={`flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-lg transition ${
                  saving
                    ? "cursor-not-allowed bg-gray-700"
                    : "bg-gradient-to-r from-violet-600 to-cyan-500 shadow-violet-900/20 hover:shadow-violet-900/40"
                }`}
              >
                <Save size={17} />

                {saving
                  ? "Saving..."
                  : "Save Changes"}
              </motion.button>
            </motion.div>
          )}
        </form>
      </div>
    </main>
  );
}

// ==========================================
// PROFILE CARD
// ==========================================

function ProfileCard({
  icon,
  title,
  description,
  children,
}) {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 12,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.45,
      }}
      className="rounded-3xl border border-white/[0.07] bg-[#0D0F18] p-5 sm:p-6"
    >
      <div className="mb-5 flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
          {icon}
        </div>

        <div>
          <h2 className="text-base font-semibold text-white">
            {title}
          </h2>

          <p className="mt-0.5 text-xs text-gray-600">
            {description}
          </p>
        </div>
      </div>

      {children}
    </motion.section>
  );
}

// ==========================================
// INPUT
// ==========================================

function Input({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  disabled = false,
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-gray-400">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
          disabled
            ? "cursor-default border-white/[0.04] bg-white/[0.015] text-gray-400"
            : "border-white/[0.07] bg-white/[0.025] text-white placeholder:text-gray-700 focus:border-violet-500/50 focus:bg-white/[0.04] focus:ring-1 focus:ring-violet-500/20"
        }`}
      />
    </div>
  );
}

// ==========================================
// SOCIAL INPUT
// ==========================================

function SocialInput({
  icon,
  label,
  name,
  value,
  onChange,
  placeholder,
  disabled = false,
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-gray-400">
        {label}
      </label>

      <div
        className={`flex items-center rounded-xl border transition ${
          disabled
            ? "border-white/[0.04] bg-white/[0.015]"
            : "border-white/[0.07] bg-white/[0.025] focus-within:border-violet-500/50 focus-within:ring-1 focus-within:ring-violet-500/20"
        }`}
      >
        <div className="pl-4 text-gray-500">
          {icon}
        </div>

        <input
          type="url"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-gray-700 disabled:cursor-default disabled:text-gray-400"
        />
      </div>
    </div>
  );
}