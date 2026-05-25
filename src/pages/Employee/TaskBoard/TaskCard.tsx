import { useDraggable } from "@dnd-kit/core";
import type { ITask } from "../../../interfaces/task.interface";

// type للـ props عشان نحل مشكلة implicit any
type Props = {
  task: ITask;
};

export default function TaskCard({ task }: Props) {
  //اوبجكت بيبق عايز بس الايضى
  // بيشل ايضى تاسك
  // بياخد منى تلات حاجات وبروح اربطهم عن طريق ريف بالحاجه اربط الرف بالميثود وبعد كدا هعمل ديسترك لبقيه الحااجات الى مديهالى

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id as number,
    // هنا هنشا ترانسفورم
    // هسال هل ترانفورم موجوده يعنى بتروسى فاليو ؟ لو موجوده هعمل حاجه لومش موجوده هعمل اندفايند طب لو موجوده هعمل استايل ليه علاقه بالترانسفورم
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : // هوك ستايل الى ببعتها لازم تكون اوبجكت
      undefined;

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
