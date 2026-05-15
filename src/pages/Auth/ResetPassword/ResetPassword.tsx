import InputField from "../../../shared/InputField/InputField";
import AuthHeader from "../../../shared/AuthHeader/AuthHeader";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";
import { useForm } from "react-hook-form";
import { resetPasswordSchema } from "../../../schema/auth.schema";
import axiosClient from "../../../services/api/axiosClient";
import { toast } from "react-toastify";
import { resetInputs } from "./reset.inputs";
import AuthButton from "../../../components/AuthButton";

export default function ResetPassword() {
  const navigate = useNavigate();

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
      toast.success(response.data.message || "Password reset successfully!");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
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
          <AuthButton isSubmitting={isSubmitting} label="Save" />
        </div>
      </form>
    </>
  );
}