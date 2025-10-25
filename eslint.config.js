import prettier from 'eslint-config-prettier';
import js from '@eslint/js';
import { includeIgnoreFile } from '@eslint/compat';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import svelteConfig from './svelte.config.js';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default [
  // Respect .gitignore (files in .gitignore are ignored by the linter)
  includeIgnoreFile(gitignorePath),

  // Use ESLint’s recommended JS rules
  js.configs.recommended,

  // Use Svelte plugin’s recommended rules for Svelte components
  ...svelte.configs.recommended,

  // Extend Prettier to avoid rule conflicts with Prettier
  prettier,
  ...svelte.configs.prettier,

  {
    languageOptions: {
      // Make browser and Node globals available in the linter environment
      globals: { ...globals.browser, ...globals.node }
    },
    rules: {
      // Disable rule that warns about <a href="…"> without resolve()
      'svelte/no-navigation-without-resolve': 'off'
    }
  },

  // For .svelte and .svelte.js files, provide your svelte.config.js to the parser
  {
    files: ['**/*.svelte', '**/*.svelte.js'],
    languageOptions: { parserOptions: { svelteConfig } }
  }
];
