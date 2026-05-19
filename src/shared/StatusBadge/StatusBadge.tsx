interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const s = status?.toLowerCase();
  if (s === "todo" || s === "to do") {
    return (
      <span className="inline-block px-3 py-1 bg-[#E4E1F5] text-white rounded-full text-xs font-normal lowercase text-center">
        to do
      </span>
    );
  }
  if (s === "inprogress" || s === "in progress") {
    return (
      <span className="inline-block px-3 py-1 bg-[#EF9B28A3] text-white rounded-full text-xs font-normal lowercase text-center">
        in progress
      </span>
    );
  }
  if (s === "done") {
    return (
      <span className="inline-block px-3 py-1 bg-[#009247] text-white rounded-full text-xs font-normal lowercase text-center">
        done
      </span>
    );
  }
  return (
    <span className="inline-block px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs font-normal lowercase text-center">
      {status}
    </span>
  );
}
