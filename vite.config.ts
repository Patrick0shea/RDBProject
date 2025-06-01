import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/Testing/setup.ts',
    include: ['src/Testing/**/*.test.tsx'],
  },
});

// https://vite.dev/config/
