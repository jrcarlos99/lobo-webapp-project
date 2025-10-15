import { z } from "zod";

export const accountInfoSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  email: z.string().email({ message: "E-mail inválido" }),
  lastname: z.string().min(1, { message: "Sobrenome é obrigatório" }),
  phone: z
    .string()
    .min(10, { message: "Telefone deve ter pelo menos 10 dígitos" }),
  nip: z.string().min(1, { message: "NIP é obrigatório" }),
});

export const passwordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: "Senha atual é obrigatória" }),
    newPassword: z
      .string()
      .min(6, { message: "Nova senha deve ter pelo menos 6 caracteres" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirmação de senha é obrigatória" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Senhas não coincidem",
    path: ["confirmPassword"],
  });

export const privacySchema = z.object({
  shareAnalytics: z.boolean(),
  profileVisibility: z.string(),
});

export type AccountInfoFormData = z.infer<typeof accountInfoSchema>;
export type PasswordFormData = z.infer<typeof passwordSchema>;
export type PrivacyFormData = z.infer<typeof privacySchema>;
