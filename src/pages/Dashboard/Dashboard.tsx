import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../context/userContext";

import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axiosClient from "../../services/api/axiosClient";

// ── Types ─────────────────────────────────────────────────────────────────────
interface TaskCount {
  toDo: number;
  inProgress: number;
  done: number;
}

interface UserCount {
  activatedEmployeeCount: number;
  deactivatedEmployeeCount: number;
}

// ── Animation variants ────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 },
  }),
};

// ── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({
  icon,
  label,
  value,
  bg,
  index,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  bg: string;
  index: number;
}) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className={`${bg} rounded-2xl p-5 flex flex-col gap-3 shadow-sm`}
    >
      <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/60">
        {icon}
      </div>
      <p className="text-sm text-gray-500 font-medium">{label}</p>
      <p className="text-xl font-bold text-gray-800">{value}</p>
    </motion.div>
  );
}

// ── Donut Chart Card ──────────────────────────────────────────────────────────
const CHART_COLORS = ["#4C9BE8", "#EF9B28", "#315951"];

function DonutCard({
  title,
  subtitle,
  data,
  index,
}: {
  title: string;
  subtitle: string;
  data: { name: string; value: number }[];
  index: number;
}) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const pct = total > 0 ? Math.round((data[0].value / total) * 100) : 0;

  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="bg-white rounded-2xl p-6 shadow-sm"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-1 h-10 rounded-full bg-[#EF9B28]" />
        <div>
          <p className="font-semibold text-gray-800 text-base">{title}</p>
          <p className="text-xs text-gray-400">{subtitle}</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={3}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => [value, ""]}
            contentStyle={{ borderRadius: 8, border: "none", fontSize: 13 }}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Center percentage */}
      <div className="flex justify-center -mt-4 mb-4">
        <span className="text-2xl font-bold text-gray-700">{pct}%</span>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center">
        {data.map((d, i) => (
          <div key={d.name} className="flex items-center gap-1.5 text-xs text-gray-500">
            <span
              className="w-2.5 h-2.5 rounded-full inline-block"
              style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }}
            />
            {d.name}: <strong className="text-gray-700 ml-0.5">{d.value}</strong>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ── SVG Icons ─────────────────────────────────────────────────────────────────
const IconProgress = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#315951" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);
const IconTaskList = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#315951" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <path d="M8 12l2 2 4-4" />
  </svg>
);
const IconProjects = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#315951" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
  </svg>
);
const IconUserActive = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#315951" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const IconUserInactive = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <line x1="23" y1="11" x2="17" y2="17" />
    <line x1="17" y1="11" x2="23" y2="17" />
  </svg>
);

// ── Dashboard ─────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const { userData } = useContext(userContext);
  const [taskCount, setTaskCount] = useState<TaskCount | null>(null);
  const [userCount, setUserCount] = useState<UserCount | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [taskRes, userRes] = await Promise.all([
          axiosClient.get("/Task/count"),
          axiosClient.get("/Users/count"),
        ]);
        setTaskCount(taskRes.data);
        setUserCount(userRes.data);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const taskChartData = taskCount
    ? [
        { name: "To Do",       value: taskCount.toDo },
        { name: "In Progress", value: taskCount.inProgress },
        { name: "Done",        value: taskCount.done },
      ]
    : [];

  const userChartData = userCount
    ? [
        { name: "Active",   value: userCount.activatedEmployeeCount },
        { name: "Inactive", value: userCount.deactivatedEmployeeCount },
      ]
    : [];

  return (
    <div className="p-6 bg-[#F5F5F5] dark:bg-slate-900 min-h-screen transition-colors duration-200">

    {/* ── Welcome Banner ── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="dashboard-bg relative w-full mb-12 rounded-2xl overflow-hidden border-2 border-[#EF9B28]/40"
        style={{ minHeight: 400 }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 z-[1]" />

        {/* Text */}
        <div className="absolute inset-0 z-10 flex flex-col justify-center gap-8 p-10">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl text-white"
          >
            Welcome{" "}
            <span className="text-[#EF9B28]">
              {userData?.userName ?? "..."}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.32, duration: 0.5 }}
            className="text-white/80 text-4xl"
          >
            You can add project and assign tasks to your team
          </motion.p>
        </div>
      </motion.div>

      {/* ── Stats + Charts ── */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[0, 1].map((i) => (
            <div key={i} className="animate-pulse space-y-4">
              <div className="h-5 w-24 bg-gray-200 rounded" />
              <div className="grid grid-cols-3 gap-4">
                {[0, 1, 2].map((j) => (
                  <div key={j} className="h-28 bg-gray-200 rounded-2xl" />
                ))}
              </div>
              <div className="h-72 bg-gray-200 rounded-2xl" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Tasks column */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-1 h-10 rounded-full bg-[#EF9B28]" />
              <div>
                <p className="font-semibold text-gray-800 text-base">Tasks</p>
                <p className="text-xs text-gray-400">Lorem ipsum dolor sit amet, consecteture</p>
              </div>
            </div>

            {/* 3 task cards in a row */}
            <div className="grid grid-cols-3 gap-3">
              <StatCard index={0} icon={<IconProgress />}  label="To Do"        value={taskCount?.toDo ?? 0}        bg="bg-[#edeaf5]" />
              <StatCard index={1} icon={<IconTaskList />}  label="In Progress"  value={ taskCount?.inProgress ?? 0}  bg="bg-[#f5f0e8]" />
              <StatCard index={2} icon={<IconProjects />}  label="Done"         value={taskCount?.done ?? 0}        bg="bg-[#fde8f0]" />
            </div>

            <DonutCard
              title="Tasks"
              subtitle="Lorem ipsum dolor sit amet, consecteture"
              data={taskChartData}
              index={3}
            />
          </div>

          {/* Users column */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-1 h-10 rounded-full bg-[#EF9B28]" />
              <div>
                <p className="font-semibold text-gray-800 text-base">Users</p>
                <p className="text-xs text-gray-400">Lorem ipsum dolor sit amet, consecteture</p>
              </div>
            </div>

            {/* 2 user cards in a row */}
            <div className="grid grid-cols-2 gap-3">
              <StatCard index={4} icon={<IconUserActive />}   label="active"   value={userCount?.activatedEmployeeCount ?? 0}   bg="bg-[#e8f0f5]" />
              <StatCard index={5} icon={<IconUserInactive />} label="inactive" value={userCount?.deactivatedEmployeeCount ?? 0} bg="bg-[#f5f0e8]" />
            </div>

            <DonutCard
              title="Users"
              subtitle="Lorem ipsum dolor sit amet, consecteture"
              data={userChartData}
              index={6}
            />
          </div>

        </div>
      )}
    </div>
  );
}