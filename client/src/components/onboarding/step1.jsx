import { useRef } from "react";
import { Sparkles, Camera, User } from "lucide-react";
import toast from "react-hot-toast";

export default function Step1({
  formData,
  updateFormData,
}) {
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Check type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }

    // Max 2MB
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Profile picture must be smaller than 2 MB.");
      return;
    }

    updateFormData("profilePicture", file);
  };

  const preview = formData?.profilePicture
    ? URL.createObjectURL(formData.profilePicture)
    : null;

  return (
    <div className="text-center">

      {/* Welcome Icon */}

      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-violet-500/20">
        <Sparkles
          className="text-violet-300"
          size={36}
        />
      </div>

      <h1 className="mt-8 text-4xl font-bold text-white">
        Welcome to CareerPilot
      </h1>

      <p className="mt-4 text-lg text-gray-400">
        Let's personalize your AI Career Coach.
        <br />
        This takes less than 2 minutes.
      </p>

      {/* PROFILE PICTURE */}

      <div className="mt-10">

        <p className="mb-4 text-sm font-medium text-gray-300">
          Add a profile picture
          <span className="ml-1 text-gray-600">
            (optional)
          </span>
        </p>

        <div className="flex justify-center">

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="group relative"
          >

            {/* Avatar */}

            <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-2 border-white/10 bg-white/5 transition group-hover:border-violet-500/60">

              {preview ? (
                <img
                  src={preview}
                  alt="Profile preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <User
                  size={42}
                  className="text-gray-600"
                />
              )}

            </div>

            {/* Camera */}

            <div className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full border-4 border-[#09090B] bg-violet-600 text-white transition group-hover:bg-violet-500">
              <Camera size={16} />
            </div>

          </button>

        </div>

        <p className="mt-3 text-xs text-gray-600">
          JPG, PNG or WEBP · Maximum 2 MB
        </p>

        {/* Hidden input */}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={handleImageChange}
          className="hidden"
        />

      </div>

    </div>
  );
}