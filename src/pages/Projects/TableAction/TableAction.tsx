import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { EllipsisVertical, Eye, Pencil, Trash2 } from "lucide-react";

type Props = {
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export default function ActionsDropdown({
  onView,
  onEdit,
  onDelete,
}: Props) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="flex h-9 w-9 items-center justify-center rounded-lg border hover:bg-gray-100">
          <EllipsisVertical size={18} />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="bg-white shadow-lg rounded-xl p-2 w-40 border"
          sideOffset={5}
        >
          <DropdownMenu.Item
            onClick={onView}
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 cursor-pointer"
          >
            <Eye size={16} /> View
          </DropdownMenu.Item>

          <DropdownMenu.Item
            onClick={onEdit}
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 cursor-pointer"
          >
            <Pencil size={16} /> Edit
          </DropdownMenu.Item>

          <DropdownMenu.Item
            onClick={onDelete}
            className="flex items-center gap-2 p-2 rounded hover:bg-red-50 text-red-500 cursor-pointer"
          >
            <Trash2 size={16} /> Delete
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}