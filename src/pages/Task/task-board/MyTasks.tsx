import { useEffect, useState } from "react";
import Column from "./Coulmn";
import { DndContext } from "@dnd-kit/core";
import axios from "axios";
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
            newStatus === "ToDo" ? updatedTask : []
          ),
          InProgress: prev.data.InProgress.filter(
            (t) => t.id !== taskId
          ).concat(newStatus === "InProgress" ? updatedTask : []),
          Done: prev.data.Done.filter((t) => t.id !== taskId).concat(
            newStatus === "Done" ? updatedTask : []
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
    <div className="p-8 min-h-screen" style={{ backgroundColor: "#F5F5F5" }}>
      <div className="p-4 mb-6 " style={{ backgroundColor: "#FFFFFF" }}>
        <SubHeader title="Task Board" />
      </div>
        
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700 text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-10 h-10 border-4 border-[#1e3a35] border-t-[#EF9B28] rounded-full animate-spin" />
        </div>
      ) : (
        <div className="flex gap-6 p-6 rounded-xl" style={{ backgroundColor: "#E0E0E0" }}>
          <DndContext onDragEnd={handleDragEnd}>
            {COLUMNS.map((column) => (
              <Column
                key={column.id}
                coulmn={column}
                tasks={tasks.data[column.id]}
              />
            ))}
          </DndContext>
        </div>
      )}
    </div>
  );
}