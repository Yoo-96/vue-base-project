import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // __dirname找不到，需要安装 npm install @types/node --save-dev
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
