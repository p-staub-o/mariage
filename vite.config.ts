import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  base: '/mariage/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        saveTheDate: resolve(__dirname, 'save-the-date/index.html'),
      },
    },
  },
  plugins: [react()],
})
