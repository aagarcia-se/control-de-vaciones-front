import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/app/' // Cambia '/app/' al path donde estará tu aplicación.
});
