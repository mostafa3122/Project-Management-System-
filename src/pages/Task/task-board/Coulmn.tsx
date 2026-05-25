import { useDroppable } from "@dnd-kit/core";
import { motion } from "framer-motion";
import TaskCard from "./TaskCard";
import type {
  ITask,
  Column as ColumnType,
} from "../../../interfaces/task.interface";

type Props = {
  coulmn: ColumnType;
  tasks: ITask[];
};

export default function Column({ coulmn, tasks }: Props) {
  const { setNodeRef, isOver } = useDroppable({
    id: coulmn.id,
  });

  return (
    <div className="flex flex-col flex-1">
      <h4 className="text-gray-600 dark:text-gray-300 font-semibold mb-3 text-2xl">
        {coulmn.title}
      </h4>

      <motion.div
        animate={{
          backgroundColor: isOver ? "#25594e" : "#2D6A5E",
        }}
        transition={{ duration: 0.2 }}
        className="flex flex-col rounded-xl p-4"
      >
        <div ref={setNodeRef} className="flex flex-col gap-3 min-h-80 w-full">
          {tasks.map((task, i) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: i * 0.05, ease: "easeOut" }}
            >
              <TaskCard task={task} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
