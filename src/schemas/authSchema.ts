import { z } from "zod/v4";

const passwordSchema = z
  .string({
    error: "Ingresa un correo electrónico válido.",
  })
  .min(6, {
    error: "La contraseña debe tener al menos 6 caracteres.",
  })
  .max(20, {
    error: "La contraseña no puede tener más de 20 caracteres.",
  });

const emailSchema = z.email({
  error: "Ingresa un correo electrónico válido.",
});

const authBaseSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

const forgotPasswordSchema = z.object({ email: emailSchema });
const resetPasswordSchema = z.object({ password: passwordSchema });
const loginSchema = authBaseSchema;
const registerSchema = authBaseSchema;

export { loginSchema, registerSchema, forgotPasswordSchema, resetPasswordSchema };

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
