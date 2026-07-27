import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#050816]">

      {/* Main Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1023] via-[#090B18] to-[#070B18]" />

      {/* Purple Blob */}
      <motion.div
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -50, 30, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-40 -left-32 h-[450px] w-[450px] rounded-full bg-violet-500/25 blur-[130px]"
      />

      {/* Blue Blob */}
      <motion.div
        animate={{
          x: [0, -60, 50, 0],
          y: [0, 60, -20, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-0 top-20 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[150px]"
      />

      {/* Pink Blob */}
      <motion.div
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -40, 40, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-0 left-1/3 h-[350px] w-[350px] rounded-full bg-fuchsia-500/15 blur-[120px]"
      />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.2) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Bottom Fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050816]" />
    </div>
  );
}