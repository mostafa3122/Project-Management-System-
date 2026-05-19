import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// ── Icons ─────────────────────────────────────────────────────────────────────
const IconHome = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
    <path d="M9 21V12h6v9" />
  </svg>
);

const IconUsers = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const IconProjects = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const IconTasks = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <circle cx="3" cy="6"  r="1" fill="currentColor" stroke="none" />
    <circle cx="3" cy="12" r="1" fill="currentColor" stroke="none" />
    <circle cx="3" cy="18" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const IconChevron = ({ flipped }: { flipped: boolean }) => (
  <motion.svg
    animate={{ rotate: flipped ? 180 : 0 }}
    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    width="14" height="14" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth={3}
    strokeLinecap="round" strokeLinejoin="round"
  >
    <path d="M9 18l6-6-6-6" />
  </motion.svg>
);

// ── Nav items ─────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { label: "Home",     to: "/dashboard",        icon: <IconHome />     },
  { label: "Users",    to: "/dashboard/users",   icon: <IconUsers />    },
  { label: "Projects", to: "/dashboard/projects",icon: <IconProjects /> },
  { label: "Tasks",    to: "/dashboard/tasks",   icon: <IconTasks />    },
];

// ── Sidebar ───────────────────────────────────────────────────────────────────
export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.aside
      animate={{ width: expanded ? 200 : 64 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col h-screen bg-[#1e3a35] shrink-0 overflow-visible z-40"
    >

      <motion.button
        onClick={() => setExpanded((p) => !p)}
        animate={{
          right: expanded ? 0 : -28,
          borderRadius: expanded ? "9999px 0 0 9999px" : "0 9999px 9999px 0",
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-2 z-50 w-7 h-7 bg-[#EF9B28] flex items-center justify-center text-white shadow-md hover:bg-[#d98820] transition-colors"
        aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
      >
        <IconChevron flipped={expanded} />
      </motion.button>

      {/* Nav links */}
      <nav className="flex flex-col gap-1 mt-10 pt-6 px-2">
        {NAV_ITEMS.map(({ label, to, icon }) => (
          <NavLink
            key={label}
            to={to}
            end={to === "/dashboard"}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-3 transition-colors duration-200 group
               ${isActive
                 ? "text-[#EF9B28]"
                 : "text-white/60 hover:text-white hover:bg-white/5"
               }`
            }
          >
            {({ isActive }) => (
              <>
                {/* Icon */}
                <span className={`shrink-0 transition-colors duration-200 ${isActive ? "text-[#EF9B28]" : ""}`}>
                  {icon}
                </span>

                {/* Label — only visible when expanded */}
                <AnimatePresence>
                  {expanded && (
                    <motion.span
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -6 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="text-sm font-medium whitespace-nowrap overflow-hidden"
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </motion.aside>
  );
}
