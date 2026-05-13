import InputField from "../../../shared/InputField/InputField";
import AuthHeader from "../../../shared/AuthHeader/AuthHeader";
import bgForget from "../../../assets/PMS3.png";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";
import { useForm } from "react-hook-form";
import { resetPasswordSchema } from "../../../schema/auth.schema";
import axiosClient from "../../../services/api/axiosClient";
import { toast } from "react-toastify";
import { resetInputs } from "./reset.inputs";

export default function ResetPassword() {
  const Navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: z.infer<typeof resetPasswordSchema>) => {
    try {
      const response = await axiosClient.post("/Users/Reset", {
        email: data.email,
        seed: data.seed,
        password: data.newPassword,
        confirmPassword: data.confirmPassword,
      });

      console.log("Success Response:", response);
      toast.success(response.data.message || "Password reset successfully!");
      Navigate("/login");
    } catch (error: any) {
      console.error("API Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <>
      {" "}
      <div className="h-screen register-bg flex justify-center items-center">
        <div className="w-11/12 md:w-1/2 lg:w-5/12 flex flex-col items-center ">
          <div className="auth-logo mb-5">
            <img src={bgForget} alt="PMS logo" className="w-32 md:w-48" />
          </div>
          <div className="form w-full p-6 sm:p-8 md:px-20 md:py-10 bg-[#315951E5] rounded-2xl">
            <AuthHeader title={"Reset Password"} />
            <form onSubmit={handleSubmit(onSubmit)}>
              {resetInputs.map((input) => (
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

              <div className="text-center text-white mt-6">
                <button className="w-full cursor-pointer mx-auto bg-[#EF9B28] rounded-[96px] py-3 transition-colors hover:bg-orange-600">
                  {isSubmitting ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
