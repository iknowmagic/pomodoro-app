import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTimerStore } from '../../store/timerStore'
import { useThemeStore } from '../../store/themeStore'
import { drawCircle } from '../../utils/faviconUtils'
import { FaPlay, FaPause } from 'react-icons/fa'

interface TimerClockProps {
  timerDisplay: string
  isActive: boolean
  shouldResume: boolean
  onStart: () => void
  onStop: () => void
}

export const TimerClock: React.FC<TimerClockProps> = ({
  timerDisplay,
  isActive,
  shouldResume,
  onStart,
  onStop,
}) => {
  const { timerType, percentage, pomodoros, showCompletedPomodoros } =
    useTimerStore()
  const { themeFont, themeColor, colors } = useThemeStore()
  const [progressStyle, setProgressStyle] = useState<React.CSSProperties>({})

  // Update the progress ring background style
  useEffect(() => {
    // Get correct circle SVG using the static utility, not tied to any state updates
    const circleSvg = drawCircle(percentage || 100, {
      color: colors[themeColor],
    })

    setProgressStyle({
      backgroundImage: `url('${circleSvg}')`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: window.innerWidth >= 768 ? '366px 366px' : '275px 275px',
      backgroundPosition: 'center center',
    })
  }, [percentage, themeColor, colors])

  // Determine which font style to use based on the theme
  const getFontClass = () => {
    switch (themeFont) {
      case 'serif':
        return 'font-serif leading-[106px] tracking-[0px]'
      case 'mono':
        return 'font-mono font-normal tracking-[-8px]'
      default:
        return 'font-sans'
    }
  }

  // Determine size class based on timer display length
  const getTimerSizeClass = () => {
    if (timerDisplay.length === 2) {
      return 'text-6xl md:text-7xl font-bold pt-2'
    }
    return 'text-6xl md:text-7xl font-bold'
  }

  const handleClick = () => {
    if (isActive) {
      onStop()
    } else {
      onStart()
    }
  }

  return (
    <motion.div
      className="group flex flex-col justify-center items-center bg-gray-800 shadow-2xl rounded-full w-64 md:w-96 min-w-64 h-64 md:h-96 min-h-64"
      style={{
        background: 'linear-gradient(315deg, #2e325a 0%, #0e112a 100%)',
        boxShadow: '-50px -50px 100px #272c5a, 50px 50px 100px #121530',
      }}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      data-testid="timer-clock"
    >
      <motion.div
        className="flex flex-col justify-center items-center bg-gray-900 rounded-full w-[90%] h-[90%]"
        style={progressStyle}
        role="progressbar"
        aria-label="progress bar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percentage}
      >
        <motion.div
          className={`flex flex-col items-center justify-center text-center transition-opacity ${getFontClass()}`}
          key={timerDisplay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className={getTimerSizeClass()}>{timerDisplay}</div>

          {showCompletedPomodoros && pomodoros > 0 && (
            <div
              className={`text-xs md:text-sm mt-1 ${timerType !== 'pomodoro' ? 'text-gray-500' : ''}`}
            >
              {pomodoros} / 4
            </div>
          )}

          <motion.button
            className="mt-4 font-bold group-hover:text-theme-color text-sm md:text-base uppercase tracking-[13px] cursor-pointer"
            onClick={handleClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isActive ? (
                <motion.div
                  key="stop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center"
                >
                  <FaPause className="mr-2" /> stop
                </motion.div>
              ) : (
                <motion.div
                  key={shouldResume ? 'resume' : 'start'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center"
                >
                  {shouldResume ? (
                    <>
                      <FaPlay className="mr-2" /> resume
                    </>
                  ) : (
                    <>
                      <FaPlay className="mr-2" /> start
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default TimerClock
