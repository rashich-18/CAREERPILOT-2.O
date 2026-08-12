import { CheckCircle, Circle } from "lucide-react";

export default function Requirement({ valid, text }) {
  return (
    <div
      className={`flex items-center gap-2 text-sm transition-all duration-300 ${
        valid ? "text-green-400" : "text-red-400"
      }`}
    >
      {valid ? (
        <CheckCircle size={16} />
      ) : (
        <Circle size={16} />
      )}

      <span>{text}</span>
    </div>
  );
}