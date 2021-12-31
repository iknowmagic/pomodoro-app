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
      base: '16px',
      h4: [
        '13px',
        {
          letterSpacing: '5px',
          lineHeight: '16px'
        }
      ],
      'body-1': ['14px', '18px'],
      'body-2': ['12px', '14px']
    },
    fontFamily: {
      sans: ['Kumbh Sans', 'sans-serif'],
      serif: ['Roboto Slab', 'serif'],
      mono: ['Space Mono', 'monospace']
    },

    colors: {
      gray: colors.gray,
      dark: colors.dark,
      design: {
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
    'h1-sm': 'text-80px leading-80px tracking-[-3px] font-bold',
    'h2-lg': 'text-28px leading-28px font-bold',
    'h2-sm': 'text-20px leading-20px font-bold',
    'h3-lg': 'text-16px leading-19px tracking-15px uppercase font-bold',
    'h3-sm': 'text-14px leading-14px tracking-13px uppercase font-bold',
    'h4-lg': 'text-13px leading-16px tracking-5px uppercase font-bold',
    'h4-sm': 'text-11px leading-11px tracking-4px uppercase font-bold',
    'body-1': 'text-14px leading-18px font-bold',
    'body-2': 'text-12px leading-14px font-bold',
    'pill-selected': 'bg-design-1 rounded-26px p-1.2rem text-design-5 '
  }
})
