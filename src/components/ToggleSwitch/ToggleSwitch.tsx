import React from 'react'
import { motion } from 'framer-motion'

interface ToggleSwitchProps {
  label: string
  active: boolean
  onChange: (_active: boolean) => void
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  label,
  active,
  onChange,
}) => {
  const handleToggle = () => {
    onChange(!active)
  }

  return (
    <div
      className="flex justify-between items-center font-medium text-sm cursor-pointer"
      onClick={handleToggle}
      data-testid={`toggle-${label.replace(/\s+/g, '-').toLowerCase()}`}
    >
      <div className="text-gray-700 dark:text-gray-300">{label}</div>

      <div
        className={`
          w-12 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out
          ${active ? 'bg-theme-color' : 'bg-gray-300 dark:bg-gray-600'}
        `}
      >
        <motion.div
          className="bg-white shadow-md rounded-full w-4 h-4"
          initial={false}
          animate={{
            x: active ? 24 : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
          }}
        />
      </div>
    </div>
  )
}

export default ToggleSwitch
