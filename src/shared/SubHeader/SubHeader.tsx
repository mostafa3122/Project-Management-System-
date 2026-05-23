import { BiPlus } from "react-icons/bi";

interface HeaderBarProps {
  title: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
}

const SubHeader = ({ title, buttonLabel, onButtonClick }: HeaderBarProps) => {
  return (
    <div className="bg-white flex justify-between items-center py-2 font-montserrat">
      <h2 className="px-10 py-4 text-[#4F4F4F] font-medium text-[28px]">
        {title}
      </h2>
      {buttonLabel && onButtonClick && (
        <button
          onClick={onButtonClick}
          className="text-white bg-[#EF9B28] hover:bg-[#d98a20] px-6 py-3 rounded-full font-normal text-sm font-montserrat flex items-center gap-2 mx-6 transition-colors shadow-sm cursor-pointer"
        >
          <BiPlus size={20} /> {buttonLabel}
        </button>
      )}
    </div>
  );
};

export default SubHeader;
