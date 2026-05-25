import { useEffect, useState } from "react";
import Column from "./Coulmn";
import { DndContext } from "@dnd-kit/core";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import type { TasksState, ITask } from "../../../interfaces/task.interface";
import { GetMyTasks, ChangeTaskStatus } from "../../../services/api/tasks";
import SubHeader from "../../../shared/SubHeader/SubHeader";

const COLUMNS = [
  { id: "ToDo", title: "To Do", status: "ToDo" as const },
  { id: "InProgress", title: "In Progress", status: "InProgress" as const },
  { id: "Done", title: "Done", status: "Done" as const },
];

const INITIAL_TASKS: TasksState = {
  data: { ToDo: [], InProgress: [], Done: [] },
  dataLength: 0,
  columns: [
    { id: "1", title: "To Do", status: "ToDo" },
    { id: "2", title: "In Progress", status: "InProgress" },
    { id: "3", title: "Done", status: "Done" },
  ],
  columnOrder: ["ToDo", "InProgress", "Done"],
};

export default function MyTasks() {
  const [tasks, setTasks] = useState<TasksState>(INITIAL_TASKS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await GetMyTasks({ pageSize: 100, pageNumber: 1 });
      const data: ITask[] = res.data.data;
      setTasks((prev) => ({
        ...prev,
        dataLength: data.length,
        data: {
          ToDo: data.filter((t) => t.status === "ToDo"),
          InProgress: data.filter((t) => t.status === "InProgress"),
          Done: data.filter((t) => t.status === "Done"),
        },
      }));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  async function handleDragEnd(event: any) {
    const { active, over } = event;
    if (!over) return;

    const taskId = Number(active.id);
    const newStatus = over.id as string;

    setTasks((prev) => {
      const allTasks = [
        ...prev.data.ToDo,
        ...prev.data.InProgress,
        ...prev.data.Done,
      ];
      const movedTask = allTasks.find((t) => t.id === taskId);
      if (!movedTask) return prev;
      const updatedTask = { ...movedTask, status: newStatus };
      return {
        ...prev,
        data: {
          ToDo: prev.data.ToDo.filter((t) => t.id !== taskId).concat(
            newStatus === "ToDo" ? updatedTask : [],
          ),
          InProgress: prev.data.InProgress.filter(
            (t) => t.id !== taskId,
          ).concat(newStatus === "InProgress" ? updatedTask : []),
          Done: prev.data.Done.filter((t) => t.id !== taskId).concat(
            newStatus === "Done" ? updatedTask : [],
          ),
        },
      };
    });

    try {
      await ChangeTaskStatus(taskId, newStatus);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to update status");
      }
    }
  }

  return (
    <div className=" dark:bg-slate-900">
      <SubHeader title="Task Board" />

      <div className="p-4 md:p-6">
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 p-3 rounded-lg bg-red-100 text-red-700 text-sm"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-10 h-10 border-4 border-[#1e3a35] border-t-[#EF9B28] rounded-full animate-spin" />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col md:flex-row gap-4 md:gap-6 p-4 md:p-6 rounded-2xl bg-gray-200 dark:bg-slate-800"
          >
            <DndContext onDragEnd={handleDragEnd}>
              {COLUMNS.map((column, i) => (
                <motion.div
                  key={column.id}
                  className="flex-1"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Column coulmn={column} tasks={tasks.data[column.id]} />
                </motion.div>
              ))}
            </DndContext>
          </motion.div>
        )}
      </div>
    </div>
  );
}
