
import InputField from "../../../shared/InputField/InputField";
import type z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import axiosClient from "../../../services/api/axiosClient";
import { useNavigate } from "react-router-dom";
import { changePasswordSchema } from "../../../schema/auth.schema";
import { changeInputs } from "./change.inputs.ts";
import AuthButton from "../../../components/AuthButton.tsx";

export default function ChangePassword() {
  const navigate = useNavigate();

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
      toast.success(response.data.message || "Password changed successfully!");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
   
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
          <AuthButton isSubmitting={isSubmitting} label="Verify" /> 
        </div>
      </form>
    </>
  );
}