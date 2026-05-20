import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import type {  FieldValues, Path, UseFormRegister } from "react-hook-form";
type InputFieldProps<T extends FieldValues> = {
  label: string;
  inputName: Path<T>;
  type: string;
  placeholder: string;
  value?: string;
  register: UseFormRegister<T>;
  error?: string ;
  fullWidth?: boolean;
  containerClassName?: string;
};
export default function InputField<T extends FieldValues>({
  label,
  inputName,
  type,
  register,
  error,
  placeholder,
  fullWidth,
  containerClassName,
}: 
InputFieldProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <div
        className={`${
          fullWidth ? "w-full" : "w-full md:w-[calc(50%-18px)]"
        }  custom-input mb-3 ${containerClassName || ""} `}
      >
        <div className="border-b-2 border-gray-400 py-2 flex flex-col gap-0.5 relative">
          {/* lable */}
          <label htmlFor="userName" className="text-[#EF9B28] ">
            {" "}
            {label}
          </label>
          {/* input */}
          <input
            type={type === "password" && showPassword ? "text" : type}
            name={inputName}
            // onChange={onChange}
            placeholder={placeholder}
            {...register(inputName)}
            className=" relative border-0 font-normal text-sm  text-[#EF9B28] placeholder:letter-spacing-[1%] placeholder:text-md placeholder:font-normal  placeholder-white border-gray-500 bg-transparent  focus:outline-none focus:border-blue-500
             transition-colors duration-200 "
          />
          {type === "password" && (
            <div
              className="absolute right-2 bottom-3 cursor-pointer text-white"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          )}
        </div>
        {/* error */}
        
        {error && (
          <p className="bg-red-200 rounded py-2 px-3 text-red-500 text-sm mt-1">
            {error}
          </p>
        )}
      </div>
    </>
  );
}
