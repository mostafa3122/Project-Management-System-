import type z from "zod";
import type { registerSchema } from "../../../schema/auth.schema";
type RegisterFormData = z.infer<typeof registerSchema>;
export const registerInputs: {
  name: keyof RegisterFormData;
  label: string;
  type: string;
  placeholder: string;
}[] = [
  {
    name: "userName",
    label: "User Name",
    type: "text",
    placeholder: "Enter user name",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your E-mail",
  },
  {
    name: "country",
    label: "Country",
    type: "text",
    placeholder: "Enter your country",
  },
  {
    name: "phoneNumber",
    label: "Phone",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    placeholder: "Confirm your password",
  },
];
