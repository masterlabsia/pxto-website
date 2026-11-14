import { z } from "zod";
import { contactLimits, needOptions } from "@/content/contact";

/**
 * Server only. Keep this out of anything a client component imports, or Zod
 * ends up in the browser bundle (see the note in contact.ts).
 */

/** The single contract for a submission. Only the Server Action parses it: the server never trusts the client. */
export const ContactSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(1, "Informe seu nome.")
    .max(contactLimits.nome, `Use até ${contactLimits.nome} caracteres no nome.`),
  empresa: z
    .string()
    .trim()
    .max(contactLimits.empresa, `Use até ${contactLimits.empresa} caracteres no nome da empresa.`)
    .optional()
    .default(""),
  email: z
    .string()
    .trim()
    .min(1, "Informe um e-mail para contato.")
    .max(contactLimits.email, "Esse e-mail é longo demais.")
    .email("Esse e-mail parece incorreto. Confira e tente novamente."),
  telefone: z
    .string()
    .trim()
    .max(contactLimits.telefone, "Esse número parece longo demais.")
    .optional()
    .default("")
    .refine((v) => v === "" || v.replace(/\D/g, "").length >= 10, {
      message: "Esse número parece incompleto.",
    }),
  necessidade: z.enum(needOptions).optional(),
  mensagem: z
    .string()
    .trim()
    .min(1, "Descreva brevemente o que precisa resolver.")
    .min(20, "Escreva um pouco mais para entendermos o contexto.")
    .max(
      contactLimits.mensagem,
      `Use até ${contactLimits.mensagem} caracteres. O restante a gente combina na conversa.`,
    ),
});

export type ContactInput = z.infer<typeof ContactSchema>;
