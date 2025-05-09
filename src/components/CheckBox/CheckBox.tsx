import React, { useId } from 'react'
import { motion } from 'framer-motion'
import { FaCheck } from 'react-icons/fa'

interface CheckBoxProps {
  label: string
  checked: boolean
  onChange: (_checked: boolean) => void
}

export const CheckBox: React.FC<CheckBoxProps> = ({
  label,
  checked,
  onChange,
}) => {
  const id = useId()

  const handleToggle = () => {
    onChange(!checked)
  }

  return (
    <div
      className="flex justify-between items-center font-medium text-sm cursor-pointer"
      onClick={handleToggle}
      data-testid={`checkbox-${label.replace(/\s+/g, '-').toLowerCase()}`}
    >
      <label htmlFor={id} className="text-gray-700 dark:text-gray-300">
        {label}
      </label>

      <div className="relative flex items-center w-12 h-6">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={handleToggle}
          className="absolute opacity-0 w-0 h-0 cursor-pointer"
        />
        <motion.div
          className={`
            absolute flex justify-center items-center w-6 h-6 rounded-full 
            ${checked ? 'bg-theme-color' : 'bg-gray-300 dark:bg-gray-600'}
          `}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          {checked && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FaCheck className="text-white text-xs" />
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default CheckBox
