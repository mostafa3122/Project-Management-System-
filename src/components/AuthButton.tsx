
interface AuthButtonProps {
  isSubmitting?: boolean;
  label?: string;
}

export default function AuthButton({
  isSubmitting,
  label = "Submit",
}: AuthButtonProps) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="w-full mt-6 cursor-pointer bg-[#EF9B28] text-white rounded-full py-3 
                 transition-colors hover:bg-orange-600 
                 disabled:opacity-50 disabled:cursor-not-allowed
                 flex items-center justify-center gap-2"
    >
      {isSubmitting && (
        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      )}
      {isSubmitting ? "Loading..." : label}
    </button>
  );
}