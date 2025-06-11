import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
// @ts-ignore
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    build: {
      rollupOptions: {
        external: [
          'electron-store',
        ]
      }
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin(), tailwindcss()],
  },
  renderer: {
    publicDir: resolve(__dirname, 'src/renderer/src/assets'),
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@': resolve('src')
      }
    },
    plugins: [react()]
  },
})
