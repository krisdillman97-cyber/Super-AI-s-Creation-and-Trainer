import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // 1. Next.js Core Web Vitals & TypeScript configs (via compatibility layer)
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  
  // 2. Prettier configuration (disables conflicting ESLint styling rules)
  ...compat.extends('prettier'),

  // 3. Directory ignores
  {
    ignores: [
      '.next/**',
      'out/**',
      'build/**',
      'dist/**',
      'node_modules/**',
      'next-env.d.ts',
    ],
  },

  // 4. Custom rule overrides
  {
    rules: {
      // Example: Warn on unused variables, but allow prefixing with an underscore
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
      ],
      // Adjust other rules as preferred by your team
    },
  },
];

export default eslintConfig;
