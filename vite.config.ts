import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'
import eslintPlugin from 'vite-plugin-eslint'
import { EsLinter, linterPlugin, TypeScriptLinter } from 'vite-plugin-linter'
import WindiCSS from 'vite-plugin-windicss'

const hash = Math.floor(Math.random() * 90000) + 10000

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    WindiCSS(),
    // linterPlugin({
    //   include: ['./src/**/*.ts', './src/**/*.tsx', './src/**/*.vue'],
    //   linters: [new EsLinter(), new TypeScriptLinter()]
    // }),
    eslintPlugin()
    // checker({
    //   vueTsc: true,
    //   eslint: {
    //     files: ['./src'],
    //     extensions: ['.ts', '.vue']
    //   }
    // })
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
