import { verifyPasswordSchema } from "../../../schema/auth.schema";
import type z from "zod";

type IVerifyData = z.infer<typeof verifyPasswordSchema>;

export const VerifyInputs: {
  name: keyof IVerifyData;
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
    name: "code",
    label: "OTP Verification",
    type: "text",
    placeholder: "Enter you code Verification",
  },
  
];
