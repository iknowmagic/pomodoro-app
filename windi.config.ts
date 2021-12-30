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
    'h1-lg': 'text-[100px] line-height-[120px] tracking-[-5px] font-bold',
    // 'h1-sm': 'text-[80px] line-height-[80px] tracking-[0px] font-bold',
    'h1-sm': 'text-4.5rem font-bold',
    'h2-lg': 'text-[28px] font-bold',
    'h2-sm': 'text-[1.5rem] font-bold',
    'h3-sm': 'text-[0.85rem] tracking-[0.85rem] font-bold uppercase',
    'h4-sm': 'text-[11px] tracking-[4px] font-bold uppercase',
    'body-1': 'text-[0.75rem] font-bold',
    'body-2': 'text-[12px] font-bold',
    'pill-selected': 'bg-design-1 rounded-[3rem] p-1.2rem text-design-5'
  }
})
