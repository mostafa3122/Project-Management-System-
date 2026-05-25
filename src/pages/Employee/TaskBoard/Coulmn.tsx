import { useDroppable } from "@dnd-kit/core";
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
  const { setNodeRef } = useDroppable({
    id: coulmn.id,
  });

  return (
    <div className="flex flex-col flex-1">
      {/* ← التايتل على الـ background الأبيض */}
      <h2 className="text-gray-800 font-semibold mb-2 text-lg">
        {coulmn.title}
      </h2>

      {/* ← الكولوم الخضرا */}
      <div
        className="flex flex-col rounded-lg p-4"
        style={{ backgroundColor: "#2D6A5E" }}
      >
        <div className="flex flex-col gap-3 min-h-64 w-full" ref={setNodeRef}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
}
