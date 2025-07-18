<<<<<<< HEAD
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
    },
  },
  define: {
    global: 'window',
  },
  optimizeDeps: {
    include: ['buffer', 'process'],
  },
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
    historyApiFallback: true,
  },
=======
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
    },
  },
  define: {
    global: 'window',
  },
  optimizeDeps: {
    include: ['buffer', 'process'],
  },
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
    historyApiFallback: true,
  },
>>>>>>> 2204c7ff (Initial commit)
}); 