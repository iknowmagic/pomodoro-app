import vue from '@vitejs/plugin-vue'
import dotenv from 'dotenv'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'
import eslintPlugin from 'vite-plugin-eslint'
import { injectHtml } from 'vite-plugin-html'
import WindiCSS from 'vite-plugin-windicss'

dotenv.config()

const hash = Math.floor(Math.random() * 90000) + 10000

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    WindiCSS(),
    injectHtml({
      data: {
        title: process.env.VITE_APP_TITLE,
        base: process.env.VITE_APP_BASE,
        fonts: `

        `
      }
    }),
    eslintPlugin(),
    checker({
      vueTsc: true,
      typescript: true,
      eslint: {
        files: ['./src'],
        extensions: ['.ts', '.vue']
      }
    })
  ],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `[name]` + hash + `.js`,
        chunkFileNames: `[name]` + hash + `.js`,
        assetFileNames: `[name]` + hash + `.[ext]`
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
})
