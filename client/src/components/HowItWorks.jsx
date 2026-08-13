import {
  Upload,
  BrainCircuit,
  Rocket,
} from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Resume",
    description:
      "Upload your resume securely and let CareerPilot begin the analysis.",
  },
  {
    icon: BrainCircuit,
    title: "AI Analysis",
    description:
      "Our AI evaluates your skills, experience and identifies improvement areas.",
  },
  {
    icon: Rocket,
    title: "Launch Your Career",
    description:
      "Receive your personalized roadmap, interview preparation and career recommendations.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-[#050816] py-32 text-white"
    >
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="text-center">

          <p className="font-semibold text-violet-400">
            HOW IT WORKS
          </p>

          <h2 className="mt-4 text-5xl font-bold">

            Three Simple Steps

          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">

            Your complete AI career journey in just a few minutes.

          </p>

        </div>

        {/* Timeline */}

        <div className="relative mt-24">

          {/* Line */}

          <div className="absolute left-0 right-0 top-10 hidden h-1 bg-gradient-to-r from-violet-500 via-cyan-500 to-pink-500 lg:block"></div>

          <div className="grid gap-10 lg:grid-cols-3">

            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={index}
                  className="relative text-center"
                >

                  {/* Circle */}

                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 shadow-xl">

                    <Icon size={36} />

                  </div>

                  {/* Number */}

                  <div className="mt-5 text-violet-400 font-bold">

                    Step {index + 1}

                  </div>

                  <h3 className="mt-3 text-2xl font-semibold">

                    {step.title}

                  </h3>

                  <p className="mt-4 leading-7 text-gray-400">

                    {step.description}

                  </p>

                </div>
              );
            })}

          </div>

        </div>

      </div>
    </section>
  );
}