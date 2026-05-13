import type z from "zod";
import { changePasswordSchema } from "../../../schema/auth.schema";

type IChangeData = z.infer<typeof changePasswordSchema>;

export const changeInputs: {
  name: keyof IChangeData;
  label: string;
  type: string;
  placeholder: string;
}[] = [
  {
    name: "oldPassword",
    label: "Old Password",
    type: "password",
    placeholder: "Enter you Old Password",
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
