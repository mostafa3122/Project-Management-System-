import { z } from "zod";
import { VALIDATIONS } from "../constant/validation";

export const loginSchema = z
  .object({
    email: z
      .string()
      .min(1, VALIDATIONS.email.required)
      .regex(VALIDATIONS.email.regex, VALIDATIONS.email.invalid),
       password: z
      .string()
      .min(1, VALIDATIONS.password.required)
      .regex(VALIDATIONS.password.regex, VALIDATIONS.password.invalid),
  
  })
export const registerSchema = z
  .object({
    userName: z
      .string()
      .min(1, VALIDATIONS.username.required)
      .min(3, VALIDATIONS.username.min)
      .max(20, VALIDATIONS.username.max)
      .regex(VALIDATIONS.username.regex, VALIDATIONS.username.invalid),

    email: z
      .string()
      .min(1, VALIDATIONS.email.required)
      .regex(VALIDATIONS.email.regex, VALIDATIONS.email.invalid),

    country: z
      .string()
      .min(1, VALIDATIONS.country.required)
      .regex(VALIDATIONS.country.regex, VALIDATIONS.country.invalid),

    phoneNumber: z
      .string()
      .min(1, VALIDATIONS.phone.required)
      .regex(VALIDATIONS.phone.regex, VALIDATIONS.phone.invalid),

    password: z
      .string()
      .min(1, VALIDATIONS.password.required)
      .regex(VALIDATIONS.password.regex, VALIDATIONS.password.invalid),

    confirmPassword: z.string().min(1, VALIDATIONS.confirmPassword.required),
    profileImage: z.any().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const forgetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, VALIDATIONS.email.required)
    .regex(VALIDATIONS.email.regex, VALIDATIONS.email.invalid),
});

export const resetPasswordSchema = z
  .object({
    email: z
      .string()
      .min(1, VALIDATIONS.email.required)
      .regex(VALIDATIONS.email.regex, VALIDATIONS.email.invalid),
    seed: z
      .string()
      .min(1, VALIDATIONS.seed.required)
      .length(4, VALIDATIONS.seed.invalid),
    newPassword: z
      .string()
      .min(1, VALIDATIONS.password.required)
      .regex(VALIDATIONS.password.regex, VALIDATIONS.password.invalid),
    confirmPassword: z.string().min(1, VALIDATIONS.confirmPassword.required),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export const verifyPasswordSchema = z.object({
  email: z
    .string()
    .min(1, VALIDATIONS.email.required)
    .regex(VALIDATIONS.email.regex, VALIDATIONS.email.invalid),
  code: z
    .string()
    .min(1, VALIDATIONS.seed.required)
    .length(4, VALIDATIONS.seed.invalid),
});

export const changePasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(1, VALIDATIONS.password.required)
      .regex(VALIDATIONS.password.regex, VALIDATIONS.password.invalid),
    newPassword: z
      .string()
      .min(1, VALIDATIONS.password.required)
      .regex(VALIDATIONS.password.regex, VALIDATIONS.password.invalid),
    confirmPassword: z.string().min(1, VALIDATIONS.confirmPassword.required),
  })
<<<<<<< HEAD
  
=======
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
>>>>>>> 534b5fa (implement forget and reset password pages with reusable InputField)
