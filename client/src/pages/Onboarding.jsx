import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import ProgressBar from "../components/onboarding/ProgressBar";
import NavigationButtons from "../components/onboarding/NavigationButtons";

import Step1 from "../components/onboarding/Step1";
import Step2 from "../components/onboarding/Step2";
import Step3 from "../components/onboarding/Step3";
import Step4 from "../components/onboarding/Step4";
import Step5 from "../components/onboarding/Step5";

import API from "../api/onboardingApi";

export default function Onboarding() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const totalSteps = 5;

  // ==========================================
  // ALL ONBOARDING DATA
  // ==========================================

  const [formData, setFormData] = useState({
    // Education
    fullName: "",
    college: "",
    degree: "",
    customDegree: "",
    branch: "",
    customBranch: "",
    graduationYear: "",
    cgpa: "",

    // Career
    dreamRole: "",
    customDreamRole: "",
    dreamCompany: "",
    preferredDomain: "",
    customDomain: "",
    workMode: "",

    // Skills
    skills: [],
    interests: [],

    // Professional Profiles
    github: "",
    linkedin: "",
    portfolio: "",

    // Coding Profiles
    leetcode: "",
    codeforces: "",
    codechef: "",
    hackerrank: "",

    // Files
    resume: null,
    profilePicture: null,
  });

  // ==========================================
  // UPDATE FORM DATA
  // ==========================================

  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ==========================================
  // NEXT STEP
  // ==========================================

  const nextStep = () => {
    if (step < totalSteps) {
      setStep((prev) => prev + 1);
    } else {
      handleComplete();
    }
  };

  // ==========================================
  // PREVIOUS STEP
  // ==========================================

  const prevStep = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  // ==========================================
  // COMPLETE ONBOARDING
  // ==========================================

  const handleComplete = async () => {
    if (submitting) return;

    try {
      setSubmitting(true);

      // Check login token
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login again.");
        navigate("/login");
        return;
      }

      // ==========================================
      // VALIDATION
      // ==========================================

      if (
        !formData.fullName ||
        !formData.college ||
        !formData.degree ||
        !formData.branch
      ) {
        toast.error("Please complete your education details.");
        setStep(2);
        return;
      }

      if (!formData.skills || formData.skills.length < 3) {
        toast.error("Please select at least 3 skills.");
        setStep(4);
        return;
      }

      // ==========================================
      // CREATE FORM DATA
      // ==========================================

      const data = new FormData();

      // Normal fields
      data.append("fullName", formData.fullName);
      data.append("college", formData.college);
      data.append("degree", formData.degree);
      data.append("customDegree", formData.customDegree);
      data.append("branch", formData.branch);
      data.append("customBranch", formData.customBranch);
      data.append("graduationYear", formData.graduationYear);
      data.append("cgpa", formData.cgpa);

      // Career
      data.append("dreamRole", formData.dreamRole);
      data.append("customDreamRole", formData.customDreamRole);
      data.append("dreamCompany", formData.dreamCompany);
      data.append("preferredDomain", formData.preferredDomain);
      data.append("customDomain", formData.customDomain);
      data.append("workMode", formData.workMode);

      // Arrays
      data.append(
        "skills",
        JSON.stringify(formData.skills)
      );

      data.append(
        "interests",
        JSON.stringify(formData.interests)
      );

      // Professional profiles
      data.append("github", formData.github);
      data.append("linkedin", formData.linkedin);
      data.append("portfolio", formData.portfolio);

      // Coding profiles
      data.append("leetcode", formData.leetcode);
      data.append("codeforces", formData.codeforces);
      data.append("codechef", formData.codechef);
      data.append("hackerrank", formData.hackerrank);

      // ==========================================
// FILES
// ==========================================

if (formData.resume) {
  data.append("resume", formData.resume);
}

if (formData.profilePicture) {
  data.append("profilePicture", formData.profilePicture);
}


      // ==========================================
      // SEND TO BACKEND
      // ==========================================

      const response = await API.post(
        "/",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success(
          "Onboarding completed successfully!"
        );

        // Go to dashboard
        navigate("/dashboard");
      }

    } catch (error) {
      console.error(
        "ONBOARDING ERROR:",
        error
      );

      toast.error(
        error.response?.data?.message ||
        "Failed to save onboarding data."
      );

    } finally {
      setSubmitting(false);
    }
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#09090B] px-4 py-10">

      {/* Background Glow */}

      <div className="fixed inset-0 -z-10 overflow-hidden">

        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-violet-600/20 blur-[120px]" />

        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px]" />

      </div>

      {/* Main Card */}

      <div className="w-full max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl">

        <ProgressBar
          step={step}
          totalSteps={totalSteps}
        />

        <div className="mt-10">

          {step === 1 && (
            <Step1
              formData={formData}
              updateFormData={updateFormData}
            />
          )}

          {step === 2 && (
            <Step2
              formData={formData}
              updateFormData={updateFormData}
            />
          )}

          {step === 3 && (
            <Step3
              formData={formData}
              updateFormData={updateFormData}
            />
          )}

          {step === 4 && (
            <Step4
              formData={formData}
              updateFormData={updateFormData}
            />
          )}

          {step === 5 && (
            <Step5
              formData={formData}
              updateFormData={updateFormData}
            />
          )}

        </div>

        <NavigationButtons
          step={step}
          totalSteps={totalSteps}
          nextStep={nextStep}
          prevStep={prevStep}
          loading={submitting}
        />

      </div>

    </div>
  );
}