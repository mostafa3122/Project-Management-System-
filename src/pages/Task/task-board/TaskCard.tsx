import { useDraggable } from "@dnd-kit/core";
import type { ITask } from "../../../interfaces/task.interface";

type Props = {
  task: ITask;
};

export default function TaskCard({ task }: Props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id as number,
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{ ...style, backgroundColor: "#F5A623" }}
      className="cursor-move rounded-lg p-3 shadow-md flex items-center justify-between   w-full"
    >
      <h3 className="font-medium text-white">{task.title}</h3>
    </div>
  );
}
