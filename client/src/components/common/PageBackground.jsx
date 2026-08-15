export default function PageBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">

      {/* Violet Glow */}
      <div className="absolute left-[8%] top-[-10%] h-[420px] w-[420px] rounded-full bg-violet-600/10 blur-[120px]" />

      {/* Cyan Glow */}
      <div className="absolute right-[-5%] top-[20%] h-[350px] w-[350px] rounded-full bg-cyan-500/8 blur-[120px]" />

      {/* Indigo Glow */}
      <div className="absolute bottom-[-10%] left-[35%] h-[400px] w-[400px] rounded-full bg-indigo-600/8 blur-[130px]" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />

    </div>
  );
}