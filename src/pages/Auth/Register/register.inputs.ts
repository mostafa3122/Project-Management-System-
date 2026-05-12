import type { IRegisterData } from "../../../interfaces/auth.interface";

export const registerInputs: {
  name: keyof IRegisterData;
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
