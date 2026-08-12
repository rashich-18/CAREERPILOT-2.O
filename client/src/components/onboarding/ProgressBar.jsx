import { motion } from "framer-motion";

export default function ProgressBar({
  step,
  totalSteps,
}) {

  return (

    <div>

      <div className="flex justify-between text-sm text-gray-400">

        <span>
          Step {step} of {totalSteps}
        </span>

        <span>
          {Math.round((step/totalSteps)*100)}%
        </span>

      </div>

      <div className="mt-3 h-2 rounded-full bg-white/10 overflow-hidden">

        <motion.div

          initial={{width:0}}

          animate={{
            width:`${(step/totalSteps)*100}%`
          }}

          transition={{duration:0.4}}

          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-500"

        />

      </div>

    </div>

  );

}