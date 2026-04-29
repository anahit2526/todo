import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/todo',
  resolve: {
    alias: {
        '@': path.resolve(__dirname, 'src'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '@slices': path.resolve(__dirname, './src/store/slices'),
        '@my-types': path.resolve(__dirname, './src/types'),
        '@store': path.resolve(__dirname, './src/store'),
    }
}
})
