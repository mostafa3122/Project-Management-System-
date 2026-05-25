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
      <h4 className="text-gray-600 font-semibold mb-5 text-2xl">
        {coulmn.title}
      </h4>

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
