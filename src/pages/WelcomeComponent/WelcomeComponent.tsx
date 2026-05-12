import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { Bubble } from "../../interfaces/bubble.interface";

const bubbles: Bubble[] = Array.from(
  { length: 25 },
  (_, i): Bubble => ({
    id: i,
    size: Math.random() * 10 + 4,
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 5,
  }),
);

export default function WelcomeComponent() {
  const navigate = useNavigate();

  return (
    <div className="landing relative min-h-screen overflow-hidden flex items-center justify-center px-4 sm:px-6">
      <div className="absolute inset-0 overflow-hidden z-0">
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            className="absolute rounded-full bg-[#F5A623]"
            style={{
              width: bubble.size,
              height: bubble.size,
              left: `${bubble.left}%`,
              top: `${bubble.top}%`,
              opacity: 0.25,
            }}
            animate={{
              y: [0, -60, 15, 0],
              x: [0, 20, -15, 0],
              scale: [1, 1.3, 0.9, 1],
              opacity: [0.2, 0.5, 0.3, 0.2],
            }}
            transition={{
              duration: bubble.duration,
              delay: bubble.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="content  relative z-10 flex flex-col items-center text-center gap-5 sm:gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src="/fivIcon-pms.svg"
            alt="logo"
            className="w-44 sm:w-60 md:w-72"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-white text-3xl sm:text-4xl md:text-5xl font-black tracking-[0.2em]"
        >
          PMS
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-white/60 text-[10px] sm:text-xs md:text-sm tracking-[0.25em] uppercase"
        >
          Project Management System
        </motion.p>

        <motion.button
          onClick={() => navigate("/login")}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="
        px-12
        py-4
        h-14 
           w-60
        bg-[#F5A623]
        text-[#07140f]
        rounded-md
        font-bold
        shadow-md
         cursor-pointer
        flex items-center justify-center
      "
        >
          Get Started
        </motion.button>
      </div>
    </div>
  );
}
