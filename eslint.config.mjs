import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  { ignores: ['tests/**'] }, // Ignore test files
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.node },
    rules: {
      'no-unused-vars': 'warn',
    },
  },
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
]);
