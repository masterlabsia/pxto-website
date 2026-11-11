import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
});

const config = [
  ...compat.extends("next/core-web-vitals", "next/typescript", "plugin:jsx-a11y/recommended"),
  {
    // .next-audit e a saida do build de auditoria, que roda num distDir
    // separado para nao derrubar o dev server. Sem ele aqui, `npm run lint`
    // varre codigo gerado e devolve milhares de problemas falsos.
    ignores: [".next/**", ".next-audit/**", "node_modules/**", "next-env.d.ts"],
  },
  {
    rules: {
      // Accessibility is a build gate, not advisory (PRD 35).
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/anchor-is-valid": "error",
      "jsx-a11y/label-has-associated-control": "error",
      "@typescript-eslint/no-explicit-any": "error",
    },
  },
];

export default config;
