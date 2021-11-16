import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'
import eslintPlugin from 'vite-plugin-eslint'
import WindiCSS from 'vite-plugin-windicss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    WindiCSS(),
    eslintPlugin(),
    checker({
      vueTsc: true,
      eslint: {
        files: ['./src'],
        extensions: ['.ts']
      }
    })
  ]
})
