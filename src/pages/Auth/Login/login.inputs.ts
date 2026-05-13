import type z from "zod";
import type { loginSchema } from "../../../schema/auth.schema";
type LoginFormData = z.infer<typeof loginSchema>;
export const loginInputs: {
  name: keyof LoginFormData;
  label: string;
  type: string;
  placeholder: string;
}[] = [
 
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your E-mail",
  },
 
 
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
  },
 
];
