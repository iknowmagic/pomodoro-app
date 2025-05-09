import React, { useState, useEffect, useId } from 'react'
import { FaChevronUp, FaChevronDown } from 'react-icons/fa'
import { motion } from 'framer-motion'

interface InputNumberProps {
  value: number
  label: string
  onChange: (_value: number) => void
  min?: number
  max?: number
}

export const InputNumber: React.FC<InputNumberProps> = ({
  value,
  label,
  onChange,
  min = 1,
  max = 99,
}) => {
  const [currentValue, setCurrentValue] = useState(value)
  const id = useId()

  useEffect(() => {
    setCurrentValue(value)
  }, [value])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10)
    setCurrentValue(newValue)
  }

  const handleBlur = () => {
    // Validate and update the value when the input loses focus
    if (isNaN(currentValue) || currentValue < min) {
      setCurrentValue(min)
      onChange(min)
    } else if (currentValue > max) {
      setCurrentValue(max)
      onChange(max)
    } else {
      onChange(currentValue)
    }
  }

  const increment = () => {
    if (currentValue < max) {
      const newValue = currentValue + 1
      setCurrentValue(newValue)
      onChange(newValue)
    }
  }

  const decrement = () => {
    if (currentValue > min) {
      const newValue = currentValue - 1
      setCurrentValue(newValue)
      onChange(newValue)
    }
  }

  return (
    <div className="items-center md:gap-2 grid grid-cols-2 md:grid-cols-1">
      <label
        htmlFor={id}
        className="font-medium text-gray-700 dark:text-gray-300 text-sm"
      >
        {label}
      </label>

      <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-md w-full h-10 md:h-12 input-box">
        <input
          id={id}
          type="number"
          value={currentValue}
          className="bg-transparent px-4 focus:outline-none w-full font-bold text-gray-800 dark:text-gray-200 text-sm leading-tight"
          min={min}
          max={max}
          onChange={handleInputChange}
          onBlur={handleBlur}
          data-testid={`input-number-${label.replace(/\s+/g, '-').toLowerCase()}`}
        />

        <div className="grid grid-rows-2 pr-3 h-full">
          <motion.button
            type="button"
            className="bg-transparent opacity-50 hover:opacity-100 text-gray-700 dark:text-gray-300 transition-opacity"
            onClick={increment}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            disabled={currentValue >= max}
            aria-label="Increase value"
          >
            <FaChevronUp />
          </motion.button>

          <motion.button
            type="button"
            className="bg-transparent opacity-50 hover:opacity-100 text-gray-700 dark:text-gray-300 transition-opacity"
            onClick={decrement}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            disabled={currentValue <= min}
            aria-label="Decrease value"
          >
            <FaChevronDown />
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default InputNumber
