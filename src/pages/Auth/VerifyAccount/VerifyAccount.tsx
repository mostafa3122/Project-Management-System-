import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type z from "zod";
import bgForget from "../../../assets/PMS3.png";
import { verifyPasswordSchema } from "../../../schema/auth.schema";
import { VerifyApi } from "../../../services/api/auth";
import AuthHeader from "../../../shared/AuthHeader/AuthHeader";
import InputField from "../../../shared/InputField/InputField";
import { VerifyInputs } from "./verify.inputs";

export default function VerifyAccount() {
  const Navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof verifyPasswordSchema>>({
    resolver: zodResolver(verifyPasswordSchema),
  });

  const onSubmit = async (data: z.infer<typeof verifyPasswordSchema>) => {
    try {
      const response = await VerifyApi(data);
      toast.success(response.data.message || "Account Verified successfully!");
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
            <AuthHeader title={"Verify Account"} />
            <form onSubmit={handleSubmit(onSubmit)}>
              {VerifyInputs.map((input) => (
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
