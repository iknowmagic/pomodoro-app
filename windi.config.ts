import colors from 'windicss/colors'
import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  extend: {
    theme: {
      colors: {
        gray: colors.gray,
        dark: colors.dark
      }
    }
  }
})
