import { useDraggable } from "@dnd-kit/core";
import { motion } from "framer-motion";
import { BiEdit } from "react-icons/bi";
import { FiCalendar } from "react-icons/fi";
import type { ITask } from "../../../interfaces/task.interface";

type Props = {
  task: ITask;
};

export default function TaskCard({ task }: Props) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id as number,
    });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  const formatDate = (date?: string) => {
    if (!date) return null;

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusColor = () => {
    switch (task.status) {
      case "Done":
        return "bg-green-100 text-green-700";
      case "InProgress":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-orange-100 text-orange-700";
    }
  };

  return (
    <motion.div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      initial={{ opacity: 0, y: 8 }}
      animate={{
        opacity: isDragging ? 0.5 : 1,
        rotate: isDragging ? 1.5 : 0,
        scale: isDragging ? 1.03 : 1,
      }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="cursor-move rounded-2xl p-3 w-full bg-gradient-to-r from-[#F5A623] to-[#f0b84a] shadow-md border border-orange-300/40"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <h3 className="font-semibold text-white text-base leading-snug">
            {task.title}
          </h3>
        </div>

        {/* <BiEdit
          size={20}
          className="shrink-0 text-white/80 hover:text-white transition"
        /> */}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}
        >
          {task.status}
        </span>

        {task.creationDate && (
          <div className="flex items-center gap-1 text-xs text-white/85">
            <FiCalendar size={13} />
            <span>{formatDate(task.creationDate)}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
