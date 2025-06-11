import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
// @ts-ignore
import tailwindcss from '@tailwindcss/vite'

const isDev = process.env.NODE_ENV === 'development'
const mainBuildPlugins = {
  plugins: [externalizeDepsPlugin()],
}
const mainBuildConfig = isDev ? mainBuildPlugins : Object.assign({}, mainBuildPlugins, {
  build: {
    rollupOptions: {
      external: [
        'electron-store',
      ]
    }
  }
})

export default defineConfig({
  main: mainBuildConfig,
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
