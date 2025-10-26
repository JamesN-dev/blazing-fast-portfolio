import prettier from 'eslint-config-prettier';
import js from '@eslint/js';
import { includeIgnoreFile } from '@eslint/compat';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import svelteConfig from './svelte.config.js';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default [
  // Respect .gitignore
  includeIgnoreFile(gitignorePath),

  // ESLint JS base
  js.configs.recommended,

  // Svelte rules
  ...svelte.configs.recommended,

  // Prettier compatibility
  prettier,
  ...svelte.configs.prettier,

  // Global defaults
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node }
    },
    rules: {
      // You don't use route-relative hrefs; allow plain <a href="/...">
      'svelte/no-navigation-without-resolve': 'off'
    }
  },

  // Parse Svelte files with your svelte.config.js
  {
    files: ['**/*.svelte', '**/*.svelte.js'],
    languageOptions: { parserOptions: { svelteConfig } }
  },

  // SvelteKit-specific: layouts MUST accept `children`
  {
    files: ['src/routes/**/+layout.svelte'],
    rules: {
      'svelte/valid-prop-names-in-kit-pages': 'off'
    }
  },

  // Keep rule enforced on pages (only `data`/`errors`)
  {
    files: ['src/routes/**/+page.svelte'],
    rules: {
      'svelte/valid-prop-names-in-kit-pages': 'error'
    }
  }
];
