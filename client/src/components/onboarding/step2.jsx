import { useState } from "react";
import {
  User,
  GraduationCap,
  Camera,
  Calendar,
  BookOpen,
} from "lucide-react";

export default function Step2({ formData, updateFormData }) {
  const [profilePreview, setProfilePreview] = useState(null);

  const colleges = [
    "IGDTUW",
    "DTU",
    "NSUT",
    "IIIT Delhi",
    "IIT Delhi",
    "Delhi University",
  ];

  // =========================
  // PROFILE PICTURE
  // =========================

  const handleProfilePicture = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    updateFormData("profilePicture", file);

    setProfilePreview(URL.createObjectURL(file));
  };

  return (
    <div className="space-y-8">

      {/* =========================
          HEADING
      ========================= */}

      <div>
        <h2 className="text-3xl font-bold text-white">
          Education Details
        </h2>

        <p className="mt-2 text-gray-400">
          Tell us about your education so we can personalize
          your career journey.
        </p>
      </div>

      {/* =========================
          PROFILE PICTURE
      ========================= */}

      <div className="flex justify-center">

        <label className="group cursor-pointer">

          <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-violet-500/40 bg-white/5 transition-all duration-300 hover:border-violet-400 hover:bg-white/10">

            {profilePreview ? (
              <img
                src={profilePreview}
                alt="Profile preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <Camera
                size={32}
                className="text-violet-300 transition group-hover:scale-110"
              />
            )}

          </div>

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleProfilePicture}
          />

        </label>

      </div>

      {/* =========================
          FULL NAME
      ========================= */}

      <div>

        <label className="mb-2 block text-sm text-gray-300">
          Full Name *
        </label>

        <div className="flex items-center rounded-xl border border-white/10 bg-white/5 px-4 transition focus-within:border-violet-500">

          <User
            size={18}
            className="text-gray-400"
          />

          <input
            type="text"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={(e) =>
              updateFormData("fullName", e.target.value)
            }
            className="w-full bg-transparent px-3 py-4 text-white outline-none placeholder:text-gray-500"
          />

        </div>

      </div>

      {/* =========================
          COLLEGE
      ========================= */}

      <div>

        <label className="mb-2 block text-sm text-gray-300">
          College / University *
        </label>

        <input
          list="college-list"
          value={formData.college}
          onChange={(e) =>
            updateFormData("college", e.target.value)
          }
          placeholder="Search or type your college..."
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-white outline-none placeholder:text-gray-500 transition focus:border-violet-500"
        />

        <datalist id="college-list">
          {colleges.map((college) => (
            <option
              key={college}
              value={college}
            />
          ))}
        </datalist>

        <p className="mt-2 text-xs text-gray-500">
          Can't find your college? Just type it.
        </p>

      </div>

      {/* =========================
          DEGREE + BRANCH
      ========================= */}

      <div className="grid gap-6 md:grid-cols-2">

        {/* DEGREE */}

        <div>

          <label className="mb-2 block text-sm text-gray-300">
            Degree *
          </label>

          <select
            value={formData.degree}
            onChange={(e) =>
              updateFormData("degree", e.target.value)
            }
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-white outline-none transition focus:border-violet-500"
          >

            <option
              value=""
              className="bg-[#09090B]"
            >
              Select Degree
            </option>

            <option className="bg-[#09090B]">
              B.Tech
            </option>

            <option className="bg-[#09090B]">
              B.E.
            </option>

            <option className="bg-[#09090B]">
              BCA
            </option>

            <option className="bg-[#09090B]">
              B.Sc.
            </option>

            <option className="bg-[#09090B]">
              M.Tech
            </option>

            <option className="bg-[#09090B]">
              MBA
            </option>

            <option className="bg-[#09090B]">
              Other
            </option>

          </select>

          {/* CUSTOM DEGREE */}

          {formData.degree === "Other" && (
            <input
              type="text"
              value={formData.customDegree}
              onChange={(e) =>
                updateFormData(
                  "customDegree",
                  e.target.value
                )
              }
              placeholder="Enter your degree"
              className="mt-3 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-violet-500"
            />
          )}

        </div>

        {/* BRANCH */}

        <div>

          <label className="mb-2 block text-sm text-gray-300">
            Branch *
          </label>

          <select
            value={formData.branch}
            onChange={(e) =>
              updateFormData("branch", e.target.value)
            }
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-white outline-none transition focus:border-violet-500"
          >

            <option
              value=""
              className="bg-[#09090B]"
            >
              Select Branch
            </option>

            <option className="bg-[#09090B]">
              Computer Science
            </option>

            <option className="bg-[#09090B]">
              Information Technology
            </option>

            <option className="bg-[#09090B]">
              Artificial Intelligence
            </option>

            <option className="bg-[#09090B]">
              Electronics
            </option>

            <option className="bg-[#09090B]">
              Mechanical
            </option>

            <option className="bg-[#09090B]">
              Civil
            </option>

            <option className="bg-[#09090B]">
              Other
            </option>

          </select>

          {/* CUSTOM BRANCH */}

          {formData.branch === "Other" && (
            <input
              type="text"
              value={formData.customBranch}
              onChange={(e) =>
                updateFormData(
                  "customBranch",
                  e.target.value
                )
              }
              placeholder="Enter your branch"
              className="mt-3 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-violet-500"
            />
          )}

        </div>

      </div>

      {/* =========================
          GRADUATION + CGPA
      ========================= */}

      <div className="grid gap-6 md:grid-cols-2">

        {/* GRADUATION YEAR */}

        <div>

          <label className="mb-2 block text-sm text-gray-300">
            Graduation Year *
          </label>

          <div className="flex items-center rounded-xl border border-white/10 bg-white/5 px-4">

            <Calendar
              size={18}
              className="text-gray-400"
            />

            <select
              value={formData.graduationYear}
              onChange={(e) =>
                updateFormData(
                  "graduationYear",
                  e.target.value
                )
              }
              className="w-full bg-transparent px-3 py-4 text-white outline-none"
            >

              <option
                value=""
                className="bg-[#09090B]"
              >
                Select Year
              </option>

              <option className="bg-[#09090B]">
                2026
              </option>

              <option className="bg-[#09090B]">
                2027
              </option>

              <option className="bg-[#09090B]">
                2028
              </option>

              <option className="bg-[#09090B]">
                2029
              </option>

              <option className="bg-[#09090B]">
                2030
              </option>

              <option className="bg-[#09090B]">
                2031
              </option>

            </select>

          </div>

        </div>

        {/* CGPA */}

        <div>

          <label className="mb-2 block text-sm text-gray-300">
            Current CGPA
            <span className="text-gray-500">
              {" "} (Optional)
            </span>
          </label>

          <div className="flex items-center rounded-xl border border-white/10 bg-white/5 px-4">

            <BookOpen
              size={18}
              className="text-gray-400"
            />

            <input
              type="number"
              step="0.01"
              min="0"
              max="10"
              placeholder="8.50"
              value={formData.cgpa}
              onChange={(e) =>
                updateFormData(
                  "cgpa",
                  e.target.value
                )
              }
              className="w-full bg-transparent px-3 py-4 text-white outline-none placeholder:text-gray-500"
            />

          </div>

        </div>

      </div>

    </div>
  );
}