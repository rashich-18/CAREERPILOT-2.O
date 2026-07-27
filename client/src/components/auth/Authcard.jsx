import { motion } from "framer-motion";
import AnimatedBorder from "./AnimatedBorder";

export default function AuthCard({ children }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
        scale: 0.96,
      }}
      animate={{
        opacity: 1,
        y: [0, -5, 0],
        scale: 1,
      }}
      transition={{
        opacity: {
          duration: 0.8,
        },
        scale: {
          duration: 0.8,
        },
        y: {
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      <AnimatedBorder>
        <div className="p-8 md:p-10">
          {children}
        </div>
      </AnimatedBorder>
    </motion.div>
  );
}