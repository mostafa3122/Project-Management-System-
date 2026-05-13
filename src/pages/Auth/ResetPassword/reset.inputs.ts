import { resetPasswordSchema } from "../../../schema/auth.schema";
import type z from "zod";

type IResetData = z.infer<typeof resetPasswordSchema>;

export const resetInputs: {
  name: keyof IResetData;
  label: string;
  type: string;
  placeholder: string;
}[] = [
  {
    name: "email",
    label: "E-mail",
    type: "email",
    placeholder: "Enter your E-mail",
  },
  {
    name: "seed",
    label: "OTP Verification",
    type: "text",
    placeholder: "Enter you OTP Verification",
  },
  {
    name: "newPassword",
    label: "New Password",
    type: "password",
    placeholder: "Enter you New Password",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    placeholder: "Confirm New Password",
  },
];
