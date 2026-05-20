export default function Loading() {
  return (
    <div className="text-center py-10">
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 border-4 border-[#315951]/20 border-t-[#315951] rounded-full animate-spin"></div>
        <p className="text-[#315951] font-medium text-sm">Loading...</p>
      </div>
    </div>
  );
}
