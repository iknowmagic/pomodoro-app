import colors from 'windicss/colors'
import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  theme: {
    screens: {
      sm: '375px',
      md: '768px',
      lg: '1440px'
    },
    fontSize: {
      base: '16px'
    },
    fontFamily: {
      sans: ['Kumbh Sans', 'sans-serif'],
      serif: ['Roboto Slab', 'serif'],
      mono: ['Space Mono', 'monospace']
    },

    colors: {
      gray: colors.gray,
      dark: colors.dark,
      blue: colors.blue,
      sky: colors.sky,
      'blue-gray': colors.blueGray,
      design: {
        theme: 'var(--theme-color)',
        '1': '#F87070',
        '2': '#70F3F8',
        '3': '#D881F8',
        '4': '#D7E0FF',
        '5': '#1E213F',
        '6': '#FFFFFF',
        '7': '#EFF1FA',
        '8': '#161932'
      }
    }
  },
  shortcuts: {
    'h1-lg': 'text-100px leading-120px tracking-[-5px] font-bold',
    'h1-sm': 'text-80px leading-80px tracking-[-4px] font-bold',
    'h1-serif': 'leading-106px tracking-[0px]',
    'h1-mono': 'font-normal tracking-[-8px]',
    'h2-lg': 'text-28px leading-28px font-bold',
    'h2-sm': 'text-20px leading-20px font-bold',
    'h3-lg': 'text-16px leading-19px tracking-15px uppercase font-bold',
    'h3-sm': 'text-14px leading-14px tracking-13px uppercase font-bold',
    'h4-lg': 'text-13px leading-16px tracking-5px uppercase font-bold',
    'h4-sm': 'text-11px leading-11px tracking-4px uppercase font-bold',
    'body-1': 'text-14px leading-18px font-bold',
    'body-2': 'text-12px leading-14px font-bold',
    'pill-selected': 'bg-design-theme rounded-26px text-design-5',
    'circle-font': `
      cursor-pointer
      rounded-full
      w-40px
      h-40px
      flex
      justify-center
      items-center
      font-bold
      `,
    'circle-color': `
      cursor-pointer
      rounded-full
      w-40px
      h-40px
      flex
      justify-center
      items-center
      font-bold
      `
  }
})
