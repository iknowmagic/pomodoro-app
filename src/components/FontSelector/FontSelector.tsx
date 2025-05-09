import React from 'react'
import { motion } from 'framer-motion'
import { ThemeFont } from '../../store/themeStore'

interface FontSelectorProps {
  selectedFont: ThemeFont
  onChange: (_font: ThemeFont) => void
}

interface FontOption {
  key: ThemeFont
  fontClass: string
  label: string
}

export const FontSelector: React.FC<FontSelectorProps> = ({
  selectedFont,
  onChange,
}) => {
  const fontOptions: FontOption[] = [
    { key: 'sans', fontClass: 'font-sans', label: 'Aa' },
    { key: 'serif', fontClass: 'font-serif', label: 'Aa' },
    { key: 'mono', fontClass: 'font-mono', label: 'Aa' },
  ]

  return (
    <div
      className="flex flex-row justify-center md:justify-end gap-4"
      data-testid="font-selector"
    >
      {fontOptions.map((font) => (
        <motion.div
          key={font.key}
          className="group hover:border hover:border-gray-400 rounded-full cursor-pointer"
          onClick={() => onChange(font.key)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className={`
              ${font.fontClass} rounded-full w-10 h-10 flex justify-center
              items-center m-1 group-hover:m-0.5
              ${
                selectedFont === font.key
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }
            `}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {font.label}
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}

export default FontSelector
