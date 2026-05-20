import AnimatedPage from "../../components/ui/AnimatedPage";
import NotFoundImage from "../../assets/not-found.jpg";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <AnimatedPage showBackground={false}>
      
      <div className="relative flex flex-col items-center justify-center min-h-screen px-4 gap-8">

        <motion.h1
          initial={{ opacity: 0, x: 40, rotate: -15 }}
          animate={{ opacity: 1, x: 0, rotate: -8 }}
          transition={{ duration: 0.8 }}
          className="
            absolute
            top-10
            right-6
            md:right-20
            z-20
            text-5xl md:text-7xl
            font-black
            text-[#F5A623]
            drop-shadow-xl
            tracking-wide
          "
        >
          Oops!
        </motion.h1>

        <motion.img
          src={NotFoundImage}
          alt="not found"
          className="
            relative z-10
            w-full max-w-[700px]
            rounded-[2rem]
            shadow-2xl
          "
          initial={{ opacity: 0, y: 30, scale: 0.85 }}
          animate={{
            opacity: 1,
            y: [0, -14, 0],
            scale: 1,
          }}
          transition={{
            opacity: { duration: 0.8 },
            scale: { duration: 0.8 },
            y: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        />

        <div className="relative z-10 flex flex-wrap items-center justify-center gap-5">

          <motion.button
            onClick={() => navigate(-1)}
            whileHover={{
              scale: 1.08,
              y: -4,
            }}
            whileTap={{ scale: 0.92 }}
            className="
              group
              relative
              overflow-hidden
              flex items-center gap-3
              px-7 py-4
              rounded-2xl
              bg-white
              text-[#0e382f]
              font-bold
              shadow-xl
              transition
            "
          >
            <span
              className="
                absolute inset-0
                bg-gradient-to-r
                from-[#F5A623]/20
                to-transparent
                opacity-0
                group-hover:opacity-100
                transition
              "
            />

            <ArrowLeft
              size={20}
              className="relative z-10 group-hover:-translate-x-1 transition"
            />

            <span className="relative z-10">
              Go Back
            </span>
          </motion.button>

          <motion.button
            onClick={() => navigate("/login")}
            whileHover={{
              scale: 1.08,
              y: -4,
            }}
            whileTap={{ scale: 0.92 }}
            className="
              group
              relative
              overflow-hidden
              flex items-center gap-3
              px-7 py-4
              rounded-2xl
              bg-[#F5A623]
              text-[#07140f]
              font-black
              shadow-xl
              transition
            "
          >
            <span
              className="
                absolute
                top-0 left-[-120%]
                w-full h-full
                bg-white/30
                skew-x-12
                group-hover:left-[120%]
                transition-all
                duration-700
              "
            />

            <Home
              size={20}
              className="relative z-10 group-hover:rotate-12 transition"
            />

            <span className="relative z-10">
              Home
            </span>
          </motion.button>

        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            relative z-10
            text-[#F5A623]
            tracking-[0.6em]
            text-xl
            font-black
            drop-shadow-md
          "
        >
          — PMS —
        </motion.p>

      </div>

    </AnimatedPage>
  );
}