import js from '@eslint/js';
import vue from 'eslint-plugin-vue';
import globals from 'globals';

export default [
  { ignores: ['dist/', 'node_modules/'] },
  js.configs.recommended,
  ...vue.configs['flat/vue2-essential'],
  {
    files: ['src/**/*.{js,vue}', 'test/**/*.js'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.webextensions, ...globals.commonjs, process: 'readonly' },
    },
    rules: {
      // Leftovers from disabled recognisers and old code paths; to be removed in the Vue 3 rewrite
      'no-unused-vars': ['warn', { args: 'none', caughtErrors: 'none' }],
    },
  },
  {
    files: ['*.{js,mjs}', 'build/**/*.js'],
    languageOptions: { globals: globals.node },
  },
];
