import path from 'node:path';
import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue2';
import env from './build/env.js';

export default defineConfig({
  plugins: [vue()],
  define: Object.fromEntries(Object.entries(env('test')).map(([k, v]) => [`process.env.${k}`, v])),
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
      components: path.resolve(__dirname, 'src/components'),
    },
  },
  test: {
    environment: 'jsdom',
    include: ['test/**/*.spec.js'],
  },
});
