function AnimatedBorder({ children }) {
  return (
    <div className="relative w-full max-w-lg">

      {/* Soft Glow */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-violet-500/30 via-cyan-500/30 to-violet-500/30 blur-xl" />

      {/* Card */}
      <div className="relative rounded-3xl border border-white/10 bg-white/8 backdrop-blur-2xl shadow-[0_0_60px_rgba(124,58,237,0.15)]">
        {children}
      </div>

    </div>
  );
}

export default AnimatedBorder;