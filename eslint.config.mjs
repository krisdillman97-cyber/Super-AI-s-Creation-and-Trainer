import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Downgrade unused variables and 'any' types from errors to warnings
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      // Turn off rule for unescaped characters like single quotes in JSX
      "react/no-unescaped-entities": "off",
      // Downgrade regular HTML image tag warnings to warnings
      "@next/next/no-img-element": "warn"
    }
  }
];

export default eslintConfig;
