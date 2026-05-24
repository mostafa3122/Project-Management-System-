import { BiPlus } from "react-icons/bi";

interface HeaderBarProps {
  title: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
}

const SubHeader = ({ title, buttonLabel, onButtonClick }: HeaderBarProps) => {
  return (
    <div className="bg-white dark:bg-slate-800 flex justify-between items-center py-2 font-montserrat transition-colors duration-200">
      <h2 className="pl-4 sm:pl-6 md:pl-10 py-3 text-[#4F4F4F] dark:text-white font-medium text-xl md:text-[28px] transition-colors duration-200">
        {title}
      </h2>
      {buttonLabel && onButtonClick && (
        <button
          onClick={onButtonClick}
          style={{ whiteSpace: "nowrap" }}
          className="text-white bg-[#EF9B28] hover:bg-[#d98a20] px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 rounded-full font-normal text-xs md:text-sm font-montserrat flex items-center gap-1.5 mr-4 sm:mr-6 md:mr-10 transition-colors shadow-sm cursor-pointer whitespace-nowrap shrink-0"
        >
          <BiPlus size={18} className="shrink-0" /> {buttonLabel}
        </button>
      )}
    </div>
  );
};

export default SubHeader;
