import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Fudomore/', // required for GitHub Pages: https://vitatseng.github.io/Fudomore/
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
});
