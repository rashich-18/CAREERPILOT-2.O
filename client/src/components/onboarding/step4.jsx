import { Code2, Sparkles, Plus } from "lucide-react";

export default function Step4({ formData, updateFormData }) {
  const skillCategories = {
    "Programming Languages": [
      "C",
      "C++",
      "Java",
      "Python",
      "JavaScript",
      "TypeScript",
      "Go",
      "Rust",
      "Kotlin",
      "Swift",
    ],

    Frontend: [
      "HTML",
      "CSS",
      "React",
      "Next.js",
      "Angular",
      "Vue",
      "Tailwind CSS",
    ],

    Backend: [
      "Node.js",
      "Express.js",
      "Django",
      "Spring Boot",
      ".NET",
    ],

    Database: [
      "MongoDB",
      "MySQL",
      "PostgreSQL",
      "Firebase",
      "Supabase",
      "Redis",
    ],

    "Cloud & DevOps": [
      "AWS",
      "Azure",
      "Google Cloud",
      "Docker",
      "Kubernetes",
      "GitHub Actions",
    ],

    AI: [
      "TensorFlow",
      "PyTorch",
      "LangChain",
      "OpenCV",
      "Scikit-learn",
    ],

    Tools: [
      "Git",
      "GitHub",
      "Figma",
      "Postman",
      "Linux",
      "VS Code",
    ],
  };

  const interestCategories = {
    Development: [
      "Web Development",
      "App Development",
      "Game Development",
      "Frontend",
      "Backend",
      "Full Stack",
    ],

    AI: [
      "Artificial Intelligence",
      "Machine Learning",
      "Deep Learning",
      "Generative AI",
      "Computer Vision",
      "NLP",
    ],

    Data: [
      "Data Science",
      "Big Data",
      "Analytics",
    ],

    Security: [
      "Cyber Security",
      "Ethical Hacking",
    ],

    Others: [
      "Blockchain",
      "Cloud Computing",
      "DevOps",
      "UI/UX",
      "Open Source",
      "Competitive Programming",
    ],
  };

  // =========================
  // TOGGLE SKILL
  // =========================

  const toggleSkill = (skill) => {
    const currentSkills = formData.skills || [];

    const updatedSkills = currentSkills.includes(skill)
      ? currentSkills.filter((item) => item !== skill)
      : [...currentSkills, skill];

    updateFormData("skills", updatedSkills);
  };

  // =========================
  // TOGGLE INTEREST
  // =========================

  const toggleInterest = (interest) => {
    const currentInterests = formData.interests || [];

    const updatedInterests = currentInterests.includes(interest)
      ? currentInterests.filter((item) => item !== interest)
      : [...currentInterests, interest];

    updateFormData("interests", updatedInterests);
  };

  // =========================
  // ADD CUSTOM SKILL
  // =========================

  const addCustomSkill = () => {
    const value = formData.customSkill?.trim();

    if (!value) return;

    const currentSkills = formData.skills || [];

    if (!currentSkills.includes(value)) {
      updateFormData("skills", [
        ...currentSkills,
        value,
      ]);
    }

    updateFormData("customSkill", "");
  };

  // =========================
  // ADD CUSTOM INTEREST
  // =========================

  const addCustomInterest = () => {
    const value = formData.customInterest?.trim();

    if (!value) return;

    const currentInterests = formData.interests || [];

    if (!currentInterests.includes(value)) {
      updateFormData("interests", [
        ...currentInterests,
        value,
      ]);
    }

    updateFormData("customInterest", "");
  };

  const selectedSkills = formData.skills || [];
  const selectedInterests = formData.interests || [];

  return (
    <div className="space-y-10">

      {/* =========================
          HEADING
      ========================= */}

      <div>
        <h2 className="text-3xl font-bold text-white">
          Skills & Interests
        </h2>

        <p className="mt-2 text-gray-400">
          Select your current skills and interests.
          This helps AI create your personalized roadmap.
        </p>
      </div>

      {/* =========================
          TECHNICAL SKILLS
      ========================= */}

      <div>

        <div className="mb-6 flex items-center gap-2">

          <Code2
            className="text-violet-400"
            size={22}
          />

          <h3 className="text-xl font-semibold text-white">
            Technical Skills
          </h3>

        </div>

        {Object.entries(skillCategories).map(
          ([category, skills]) => (
            <div
              key={category}
              className="mb-8"
            >

              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-violet-300">
                {category}
              </h4>

              <div className="flex flex-wrap gap-3">

                {skills.map((skill) => {

                  const selected =
                    selectedSkills.includes(skill);

                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() =>
                        toggleSkill(skill)
                      }
                      className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                        selected
                          ? "bg-violet-600 text-white shadow-lg shadow-violet-500/30"
                          : "border border-white/10 bg-white/5 text-gray-300 hover:border-violet-500 hover:bg-white/10"
                      }`}
                    >
                      {skill}
                    </button>
                  );
                })}

              </div>

            </div>
          )
        )}

        {/* =========================
            CUSTOM SKILL
        ========================= */}

        <div className="mt-6 rounded-2xl border border-dashed border-violet-500/40 bg-white/5 p-5">

          <p className="mb-4 font-medium text-white">
            Can't find your skill?
          </p>

          <div className="flex gap-3">

            <input
              value={formData.customSkill || ""}
              onChange={(e) =>
                updateFormData(
                  "customSkill",
                  e.target.value
                )
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addCustomSkill();
                }
              }}
              placeholder="Add custom skill"
              className="flex-1 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-gray-500"
            />

            <button
              type="button"
              onClick={addCustomSkill}
              className="rounded-xl bg-violet-600 px-5 text-white transition hover:bg-violet-700"
            >
              <Plus size={18} />
            </button>

          </div>

        </div>

      </div>

      {/* =========================
          INTERESTS
      ========================= */}

      <div>

        <div className="mb-6 flex items-center gap-2">

          <Sparkles
            className="text-cyan-400"
            size={22}
          />

          <h3 className="text-xl font-semibold text-white">
            Career Interests
          </h3>

        </div>

        {Object.entries(interestCategories).map(
          ([category, interests]) => (
            <div
              key={category}
              className="mb-8"
            >

              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-cyan-300">
                {category}
              </h4>

              <div className="flex flex-wrap gap-3">

                {interests.map((interest) => {

                  const selected =
                    selectedInterests.includes(interest);

                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() =>
                        toggleInterest(interest)
                      }
                      className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                        selected
                          ? "bg-cyan-600 text-white shadow-lg shadow-cyan-500/30"
                          : "border border-white/10 bg-white/5 text-gray-300 hover:border-cyan-500 hover:bg-white/10"
                      }`}
                    >
                      {interest}
                    </button>
                  );
                })}

              </div>

            </div>
          )
        )}

        {/* =========================
            CUSTOM INTEREST
        ========================= */}

        <div className="rounded-2xl border border-dashed border-cyan-500/40 bg-white/5 p-5">

          <p className="mb-4 font-medium text-white">
            Can't find your interest?
          </p>

          <div className="flex gap-3">

            <input
              value={formData.customInterest || ""}
              onChange={(e) =>
                updateFormData(
                  "customInterest",
                  e.target.value
                )
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addCustomInterest();
                }
              }}
              placeholder="Add custom interest"
              className="flex-1 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-gray-500"
            />

            <button
              type="button"
              onClick={addCustomInterest}
              className="rounded-xl bg-cyan-600 px-5 text-white transition hover:bg-cyan-700"
            >
              <Plus size={18} />
            </button>

          </div>

        </div>

      </div>

      {/* =========================
          SELECTED SUMMARY
      ========================= */}

      <div className="space-y-6">

        {/* Skills */}

        <div className="rounded-2xl border border-violet-500/20 bg-violet-500/10 p-5">

          <h3 className="mb-4 text-lg font-semibold text-white">
            Selected Skills ({selectedSkills.length})
          </h3>

          {selectedSkills.length > 0 ? (
            <div className="flex flex-wrap gap-2">

              {selectedSkills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-violet-600 px-3 py-1 text-sm text-white"
                >
                  {skill}
                </span>
              ))}

            </div>
          ) : (
            <p className="text-sm text-gray-400">
              No skills selected yet.
            </p>
          )}

        </div>

        {/* Interests */}

        <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">

          <h3 className="mb-4 text-lg font-semibold text-white">
            Selected Interests ({selectedInterests.length})
          </h3>

          {selectedInterests.length > 0 ? (
            <div className="flex flex-wrap gap-2">

              {selectedInterests.map((interest) => (
                <span
                  key={interest}
                  className="rounded-full bg-cyan-600 px-3 py-1 text-sm text-white"
                >
                  {interest}
                </span>
              ))}

            </div>
          ) : (
            <p className="text-sm text-gray-400">
              No interests selected yet.
            </p>
          )}

        </div>

        {/* =========================
            VALIDATION
        ========================= */}

        {selectedSkills.length < 3 && (
          <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/10 p-4">

            <p className="text-yellow-300">
              ⚠ Please select at least
              <span className="font-semibold">
                {" "}3 skills{" "}
              </span>
              so CareerPilot AI can generate better
              recommendations.
            </p>

          </div>
        )}

        {selectedSkills.length >= 3 && (
          <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-4">

            <p className="text-green-300">
              🤖 Awesome! CareerPilot AI now has enough
              information to personalize your learning
              roadmap and career guidance.
            </p>

          </div>
        )}

      </div>

    </div>
  );
}