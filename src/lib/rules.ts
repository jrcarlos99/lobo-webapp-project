import z from "zod";

export const LoginFormSchema = z.object({
  email: z.email({ message: "Email Inválido" }),
  password: z
    .string()
    .min(1, { message: "Não pode estar vázio" })
    .min(5, { message: "A senha precisa ter mais de 5 caracteres. " })
    .regex(/[a-zA-Z]/, {
      message: "A senha precisa ter pelo menos uma letra.",
    })
    .regex(/[0-9]/, { message: "A senha precisa ter pelo menos um número." })
    .regex(/[a-zA-Z0-9]/, {
      message: "A senha precisa ter pelo menos um caractere especial.",
    }),
});
