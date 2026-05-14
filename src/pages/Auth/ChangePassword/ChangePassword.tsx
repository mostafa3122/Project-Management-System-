import AuthHeader from "../../../shared/AuthHeader/AuthHeader";
import bgForget from "../../../assets/PMS3.png";
import InputField from "../../../shared/InputField/InputField";
import type z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import axiosClient from "../../../services/api/axiosClient";
import { useNavigate } from "react-router-dom";
import { changePasswordSchema } from "../../../schema/auth.schema";
import { changeInputs } from "./change.inputs.ts";

export default function ChangePassword() {
  const Navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (data: z.infer<typeof changePasswordSchema>) => {
    try {
      const response = await axiosClient.put("/Users/ChangePassword", {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
        confirmNewPassword: data.confirmNewPassword,
      });
      console.log(response);

      toast.success(response.data.message || "Passwword Changed Successfully");
      Navigate("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <div className="h-screen register-bg flex justify-center items-center">
        <div className="w-11/12 md:w-1/2 lg:w-5/12 flex flex-col items-center ">
          <div className="auth-logo mb-5">
            <img src={bgForget} alt="PMS logo" className="w-32 md:w-48" />
          </div>
          <div className="form w-full p-6 sm:p-8 md:px-20 md:py-10 bg-[#315951E5] rounded-2xl">
            <AuthHeader title={"Change Password"} />
            <form onSubmit={handleSubmit(onSubmit)}>
              {changeInputs.map((input) => (
                <InputField
                  key={input.name}
                  label={input.label}
                  inputName={input.name as any}
                  type={input.type}
                  register={register}
                  error={(errors as any)[input.name]?.message}
                  placeholder={input.placeholder}
                  fullWidth={true}
                />
              ))}
              <div className="text-center text-white mt-10">
                <button className="w-full cursor-pointer mx-auto bg-[#EF9B28] rounded-[96px] py-3 transition-colors hover:bg-orange-600">
                  {isSubmitting ? "Verifying..." : "Verify"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
