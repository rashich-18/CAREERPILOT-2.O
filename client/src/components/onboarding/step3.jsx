import {
  Target,
  Building2,
  Briefcase,
  MapPin,
} from "lucide-react";

export default function Step3({ formData, updateFormData }) {
  return (
    <div className="space-y-8">

      {/* =========================
          HEADING
      ========================= */}

      <div>
        <h2 className="text-3xl font-bold text-white">
          Career Goals
        </h2>

        <p className="mt-2 text-gray-400">
          Help AI understand your dream career.
        </p>
      </div>

      {/* =========================
          DREAM ROLE
      ========================= */}

      <div>

        <label className="mb-2 block text-sm text-gray-300">
          Dream Role
        </label>

        <div className="flex items-center rounded-xl border border-white/10 bg-white/5 px-4 transition focus-within:border-violet-500">

          <Target
            size={18}
            className="text-gray-400"
          />

          <select
            value={formData.dreamRole}
            onChange={(e) =>
              updateFormData("dreamRole", e.target.value)
            }
            className="w-full bg-transparent px-3 py-4 text-white outline-none"
          >

            <option
              value=""
              className="bg-[#09090B]"
            >
              Select your dream role
            </option>

            <option className="bg-[#09090B]">
              Software Engineer
            </option>

            <option className="bg-[#09090B]">
              Frontend Developer
            </option>

            <option className="bg-[#09090B]">
              Backend Developer
            </option>

            <option className="bg-[#09090B]">
              Full Stack Developer
            </option>

            <option className="bg-[#09090B]">
              AI Engineer
            </option>

            <option className="bg-[#09090B]">
              Data Scientist
            </option>

            <option className="bg-[#09090B]">
              Other
            </option>

          </select>

        </div>

        {/* Custom Dream Role */}

        {formData.dreamRole === "Other" && (
          <input
            type="text"
            value={formData.customDreamRole}
            onChange={(e) =>
              updateFormData(
                "customDreamRole",
                e.target.value
              )
            }
            placeholder="Enter your dream role"
            className="mt-3 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-violet-500"
          />
        )}

      </div>

      {/* =========================
          DREAM COMPANY
      ========================= */}

      <div>

        <label className="mb-2 block text-sm text-gray-300">
          Dream Company
        </label>

        <div className="flex items-center rounded-xl border border-white/10 bg-white/5 px-4 transition focus-within:border-violet-500">

          <Building2
            size={18}
            className="text-gray-400"
          />

          <input
            type="text"
            value={formData.dreamCompany}
            onChange={(e) =>
              updateFormData(
                "dreamCompany",
                e.target.value
              )
            }
            placeholder="Google, Microsoft, Amazon..."
            className="w-full bg-transparent px-3 py-4 text-white outline-none placeholder:text-gray-500"
          />

        </div>

      </div>

      {/* =========================
          DOMAIN + WORK MODE
      ========================= */}

      <div className="grid gap-6 md:grid-cols-2">

        {/* =========================
            PREFERRED DOMAIN
        ========================= */}

        <div>

          <label className="mb-2 block text-sm text-gray-300">
            Preferred Domain
          </label>

          <div className="flex items-center rounded-xl border border-white/10 bg-white/5 px-4 transition focus-within:border-violet-500">

            <Briefcase
              size={18}
              className="text-gray-400"
            />

            <select
              value={formData.preferredDomain}
              onChange={(e) =>
                updateFormData(
                  "preferredDomain",
                  e.target.value
                )
              }
              className="w-full bg-transparent px-3 py-4 text-white outline-none"
            >

              <option
                value=""
                className="bg-[#09090B]"
              >
                Select domain
              </option>

              <option className="bg-[#09090B]">
                Full Stack
              </option>

              <option className="bg-[#09090B]">
                Frontend
              </option>

              <option className="bg-[#09090B]">
                Backend
              </option>

              <option className="bg-[#09090B]">
                AI / ML
              </option>

              <option className="bg-[#09090B]">
                Data Science
              </option>

              <option className="bg-[#09090B]">
                Cyber Security
              </option>

              <option className="bg-[#09090B]">
                Blockchain
              </option>

              <option className="bg-[#09090B]">
                Other
              </option>

            </select>

          </div>

          {/* Custom Domain */}

          {formData.preferredDomain === "Other" && (
            <input
              type="text"
              value={formData.customDomain}
              onChange={(e) =>
                updateFormData(
                  "customDomain",
                  e.target.value
                )
              }
              placeholder="Enter your preferred domain"
              className="mt-3 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-violet-500"
            />
          )}

        </div>

        {/* =========================
            WORK MODE
        ========================= */}

        <div>

          <label className="mb-2 block text-sm text-gray-300">
            Preferred Work Mode
          </label>

          <div className="flex items-center rounded-xl border border-white/10 bg-white/5 px-4 transition focus-within:border-violet-500">

            <MapPin
              size={18}
              className="text-gray-400"
            />

            <select
              value={formData.workMode}
              onChange={(e) =>
                updateFormData(
                  "workMode",
                  e.target.value
                )
              }
              className="w-full bg-transparent px-3 py-4 text-white outline-none"
            >

              <option
                value=""
                className="bg-[#09090B]"
              >
                Select work mode
              </option>

              <option className="bg-[#09090B]">
                Hybrid
              </option>

              <option className="bg-[#09090B]">
                Remote
              </option>

              <option className="bg-[#09090B]">
                On-site
              </option>

            </select>

          </div>

        </div>

      </div>

    </div>
  );
}