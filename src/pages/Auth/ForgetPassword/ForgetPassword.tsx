import AuthHeader from "../../../shared/AuthHeader/AuthHeader";
import InputField from "../../../shared/InputField/InputField";
import type z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import axiosClient from "../../../services/api/axiosClient";
import { useNavigate } from "react-router-dom";
import { forgetPasswordSchema } from "../../../schema/auth.schema";

export default function ForgetPassword() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof forgetPasswordSchema>>({
    resolver: zodResolver(forgetPasswordSchema),
  });

  const onSubmit = async (data: z.infer<typeof forgetPasswordSchema>) => {
    try {
      const response = await axiosClient.post("/Users/Reset/Request", {
        email: data.email,
      });
      toast.success(response.data.message || "OTP sent to your email!");
      navigate("/reset-password");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="E-mail"
          inputName="email"
          type="email"
          register={register}
          error={errors.email?.message}
          placeholder="Enter your E-mail"
          fullWidth={true}
          containerClassName="py-3 md:py-6"
        />

        <div className="text-center text-white mt-10">
          <button className="w-full cursor-pointer bg-[#EF9B28] rounded-[96px] py-3 transition-colors hover:bg-orange-600">
            {isSubmitting ? "Verifying..." : "Verify"}
          </button>
        </div>
      </form>
    </>
  );
}