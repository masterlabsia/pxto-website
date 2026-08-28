import { z } from "zod";

/**
 * Contact form contract and copy.
 * Copy source: docs/content/WEBSITE_COPY.md section 11.3 to 11.5.
 * Fields are FIXED by PRD 28. Only these six are collected (PRD 44).
 */

export const needOptions = [
  "Integração",
  "Automação",
  "Software",
  "Site",
  "Outro",
] as const;

/** One schema, shared by client and server. The server never trusts the client parse. */
export const ContactSchema = z.object({
  nome: z.string().trim().min(1, "Informe seu nome."),
  empresa: z.string().trim().optional().default(""),
  email: z
    .string()
    .trim()
    .min(1, "Informe um e-mail para contato.")
    .email("Esse e-mail parece incorreto. Confira e tente novamente."),
  telefone: z
    .string()
    .trim()
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
    .min(20, "Escreva um pouco mais para entendermos o contexto."),
});

export type ContactInput = z.infer<typeof ContactSchema>;

export const contactCopy = {
  fields: {
    nome: { label: "Nome", placeholder: "Como podemos chamar você" },
    empresa: { label: "Empresa", placeholder: "Nome da empresa" },
    email: { label: "E-mail", placeholder: "seu@email.com" },
    telefone: { label: "Telefone / WhatsApp", placeholder: "(00) 00000-0000" },
    necessidade: {
      label: "O que você precisa?",
      placeholder: "Selecione",
      helper:
        'Se não souber qual escolher, selecione "Outro". Descobrir isso é parte do trabalho.',
    },
    mensagem: {
      label: "Sua mensagem",
      placeholder: "Descreva o problema que precisa resolver",
      helper:
        "Não precisa ser formal nem detalhado. O essencial é entender o que está acontecendo hoje.",
    },
  },
  submit: "Enviar mensagem",
  submitting: "Enviando...",
  success: {
    heading: "Mensagem recebida.",
    /** Deliberately promises no timeframe: the response commitment is undefined. */
    body: "Obrigado pelo contato. Vamos ler com atenção e responder no seu e-mail.",
  },
  error: {
    generic:
      "Não foi possível enviar sua mensagem. Tente novamente em instantes.",
    /** Surfaced only in a non-configured environment, never to a visitor in production. */
    notConfigured:
      "O envio ainda não está configurado. O destino do contato precisa ser definido antes da publicação.",
  },
} as const;
