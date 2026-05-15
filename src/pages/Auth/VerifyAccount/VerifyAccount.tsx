import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type z from "zod";
import { verifyPasswordSchema } from "../../../schema/auth.schema";
import { VerifyApi } from "../../../services/api/auth";
import AuthHeader from "../../../shared/AuthHeader/AuthHeader";
import InputField from "../../../shared/InputField/InputField";
import { VerifyInputs } from "./verify.inputs";
import AuthButton from "../../../components/AuthButton";

export default function VerifyAccount() {
  const navigate = useNavigate();

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
      toast.success(response.data.message || "Account verified successfully!");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
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
        <AuthButton isSubmitting={isSubmitting} label="Save" />
        </div>
      </form>
    </>
  );
}