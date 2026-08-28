import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
});

const config = [
  ...compat.extends("next/core-web-vitals", "next/typescript", "plugin:jsx-a11y/recommended"),
  {
    ignores: [".next/**", "node_modules/**", "next-env.d.ts"],
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
