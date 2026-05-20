import type { ReactNode } from "react";
import { motion } from "framer-motion";
import type { Bubble } from "../../interfaces/bubble.interface";

const bubbles: Bubble[] = Array.from({ length: 25 }, (_, i): Bubble => ({
  id:       i,
  size:     Math.random() * 10 + 4,
  left:     Math.random() * 100,
  top:      Math.random() * 100,
  duration: Math.random() * 8 + 6,
  delay:    Math.random() * 5,
}));

interface AnimatedPageProps {
  children: ReactNode;
  showBackground?: boolean; 
}

export default function AnimatedPage({ children, showBackground = true }: AnimatedPageProps) {
  return (
    <div className={`${showBackground ? "landing" : "bg-[#0e382f]"} relative min-h-screen overflow-hidden flex items-center justify-center px-4 sm:px-6 bg-green`}>
      
      <div className="    absolute inset-0 overflow-hidden z-20 pointer-events-none">
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            className="absolute rounded-full bg-[#F5A623]"
            style={{ width: bubble.size, height: bubble.size, left: `${bubble.left}%`, top: `${bubble.top}%`, opacity: 0.25 }}
            animate={{ y: [0,-60,15,0], x: [0,20,-15,0], scale: [1,1.3,0.9,1], opacity: [0.2,0.5,0.3,0.2] }}
            transition={{ duration: bubble.duration, delay: bubble.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center text-center gap-5 sm:gap-6">
        {children}
      </div>

    </div>
  );
}