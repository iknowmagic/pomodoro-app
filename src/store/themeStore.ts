import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ThemeFont = 'sans' | 'serif' | 'mono'
export type ThemeColor = 'design-1' | 'design-2' | 'design-3'

interface ThemeStore {
  themeFont: ThemeFont
  themeColor: ThemeColor
  colors: Record<ThemeColor, string>

  setThemeFont: (_font: ThemeFont) => void
  setThemeColor: (_color: ThemeColor) => void
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      themeFont: 'sans',
      themeColor: 'design-1',
      colors: {
        'design-1': '#F87070', // Red
        'design-2': '#70F3F8', // Cyan
        'design-3': '#D881F8', // Purple
      },

      setThemeFont: (font) => set({ themeFont: font }),

      setThemeColor: (color) => {
        // Update CSS variable for theme color
        document.documentElement.style.setProperty(
          '--theme-color',
          `var(--${color})`,
        )
        return set({ themeColor: color })
      },
    }),
    {
      name: 'theme-storage',
    },
  ),
)
