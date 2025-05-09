import React from 'react'
import { motion } from 'framer-motion'
import { FaCheck } from 'react-icons/fa'
import { ThemeColor } from '../../store/themeStore'

interface ColorSelectorProps {
  selectedColor: ThemeColor
  onChange: (_color: ThemeColor) => void
}

interface ColorOption {
  key: ThemeColor
  bgClass: string
}

export const ColorSelector: React.FC<ColorSelectorProps> = ({
  selectedColor,
  onChange,
}) => {
  const colorOptions: ColorOption[] = [
    { key: 'design-1', bgClass: 'bg-red-400' },
    { key: 'design-2', bgClass: 'bg-cyan-400' },
    { key: 'design-3', bgClass: 'bg-purple-400' },
  ]

  return (
    <div
      className="flex flex-row justify-center md:justify-end gap-3"
      data-testid="color-selector"
    >
      {colorOptions.map((color) => (
        <motion.div
          key={color.key}
          className="group hover:border hover:border-gray-400 rounded-full cursor-pointer"
          onClick={() => onChange(color.key)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className={`
              ${color.bgClass} rounded-full w-10 h-10 flex justify-center 
              items-center m-1 group-hover:m-0.5
            `}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {selectedColor === color.key && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              >
                <FaCheck className="text-white" />
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}

export default ColorSelector
