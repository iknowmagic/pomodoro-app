import React from 'react'
import { motion } from 'framer-motion'
import { useTimerStore, TimerType } from '../../store/timerStore'

interface TimerPillsProps {
  onSelectTimer: (_type: TimerType) => void
}

interface TimerOption {
  timerType: TimerType
  label: string
}

export const TimerPills: React.FC<TimerPillsProps> = ({ onSelectTimer }) => {
  const timerType = useTimerStore((state) => state.timerType)

  const timerOptions: TimerOption[] = [
    {
      timerType: 'pomodoro',
      label: 'pomodoro',
    },
    {
      timerType: 'shortBreak',
      label: 'short break',
    },
    {
      timerType: 'longBreak',
      label: 'long break',
    },
  ]

  return (
    <nav
      role="navigation"
      className="items-center grid grid-cols-3 bg-gray-800 opacity-80 px-1 rounded-full w-full h-16 font-bold text-gray-300 text-sm md:text-base text-center"
      data-testid="timer-pills"
    >
      {timerOptions.map((option) => (
        <motion.div
          key={option.timerType}
          className={`
            cursor-pointer p-4 tracking-tight md:tracking-normal relative
            ${timerType === option.timerType ? 'text-gray-900' : 'hover:opacity-100'}
          `}
          onClick={() => onSelectTimer(option.timerType)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {timerType === option.timerType && (
            <motion.div
              className="absolute inset-0 bg-theme-color rounded-full"
              layoutId="pill-background"
              initial={false}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}
          <span
            className={`relative z-10 ${timerType === option.timerType ? 'opacity-100' : 'opacity-60'}`}
          >
            {option.label}
          </span>
        </motion.div>
      ))}
    </nav>
  )
}

export default TimerPills
