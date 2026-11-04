import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import js from '@eslint/js';
import { configs as tseslintConfigs } from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import { flatConfigs as importXFlatConfigs, importX } from 'eslint-plugin-import-x';

const typeCheckConfigs = [
  ...tseslintConfigs.strictTypeChecked,
  ...tseslintConfigs.stylisticTypeChecked,
].map((config) => ({
  ...config,
  files: ['**/*.{ts,tsx}'],
}));

export default defineConfig([
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "dist",
    "node_modules",
    "src/lib/api/v1.d.ts",
  ]),

  js.configs.recommended,
  ...nextVitals,
  ...nextTs,
  ...typeCheckConfigs,
  importXFlatConfigs.recommended,
  importXFlatConfigs.typescript,

  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@stylistic': stylistic,
      'simple-import-sort': simpleImportSort,
      'import-x': importX,
    },
    rules: {
      // --- Import ---
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
      'import-x/extensions': ['warn', 'ignorePackages', { js: 'never', jsx: 'never', ts: 'never', tsx: 'never' }],

      // --- TypeScript ---
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-non-null-assertion': 'off',

      // --- React ---
      'react/jsx-no-leaked-render': ['warn', { validStrategies: ['ternary'] }],
      'react/forward-ref-uses-ref': 'warn',
      'react/no-array-index-key': 'warn',
      'react/jsx-tag-spacing': ['warn', { beforeSelfClosing: 'always' }],

      // --- Styling ---
      '@stylistic/object-curly-spacing': ['warn', 'always'],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/quotes': ['warn', 'double'],
      '@stylistic/jsx-quotes': ['warn', 'prefer-double'],
      '@stylistic/comma-dangle': ['warn', 'always-multiline'],
      '@stylistic/max-len': ['warn', { code: 120, tabWidth: 2, ignoreUrls: true, ignoreStrings: true, ignoreTemplateLiterals: true, ignoreRegExpLiterals: true }],
      '@stylistic/jsx-max-props-per-line': ['warn', { maximum: { single: 2, multi: 1 } }],
      '@stylistic/jsx-first-prop-new-line': ['warn', 'multiline'],
      '@stylistic/jsx-closing-bracket-location': ['warn', 'tag-aligned'],

      // --- Next ---
      '@next/next/no-html-link-for-pages': 'error',
    },
    settings: {
      'import-x/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: ['./tsconfig.json'],
        },
      },
      polyfills: ['fetch', 'URL', 'Object.assign'],
      lintAllEsApis: true,
    },
  },
]);
