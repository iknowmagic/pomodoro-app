import React, { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes } from 'react-icons/fa'
import { useModalStore } from '../../store/modalStore'
import { useTimerStore } from '../../store/timerStore'
import { useThemeStore, ThemeFont, ThemeColor } from '../../store/themeStore'
import InputNumber from '../InputNumber/InputNumber'
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch'
import CheckBox from '../CheckBox/CheckBox'
import ColorSelector from '../ColorSelector/ColorSelector'
import FontSelector from '../FontSelector/FontSelector'

interface SettingsModalProps {
  onApply: () => void
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ onApply }) => {
  const modalStore = useModalStore()
  const timerStore = useTimerStore()
  const themeStore = useThemeStore()

  const modalRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Create temp state for settings
  const [pomodoroValue, setPomodoroValue] = useState(
    Math.floor(timerStore.timerMap.pomodoro.duration / 60),
  )
  const [shortBreakValue, setShortBreakValue] = useState(
    Math.floor(timerStore.timerMap.shortBreak.duration / 60),
  )
  const [longBreakValue, setLongBreakValue] = useState(
    Math.floor(timerStore.timerMap.longBreak.duration / 60),
  )

  const [tempAutoMode, setTempAutoMode] = useState(timerStore.autoMode)
  const [tempShowSeconds, setTempShowSeconds] = useState(timerStore.showSeconds)
  const [tempShowCompletedPomodoros, setTempShowCompletedPomodoros] = useState(
    timerStore.showCompletedPomodoros,
  )

  const [tempThemeFont, setTempThemeFont] = useState<ThemeFont>(
    themeStore.themeFont,
  )
  const [tempThemeColor, setTempThemeColor] = useState<ThemeColor>(
    themeStore.themeColor,
  )

  const [resetOnApply, setResetOnApply] = useState(false)

  // Update local state if store values change
  useEffect(() => {
    setPomodoroValue(Math.floor(timerStore.timerMap.pomodoro.duration / 60))
    setShortBreakValue(Math.floor(timerStore.timerMap.shortBreak.duration / 60))
    setLongBreakValue(Math.floor(timerStore.timerMap.longBreak.duration / 60))
    setTempAutoMode(timerStore.autoMode)
    setTempShowSeconds(timerStore.showSeconds)
    setTempShowCompletedPomodoros(timerStore.showCompletedPomodoros)
    setTempThemeFont(themeStore.themeFont)
    setTempThemeColor(themeStore.themeColor)
  }, [modalStore.modalVisible, timerStore, themeStore])

  // Simplified effect - just ensure proper scroll behavior
  useEffect(() => {
    const checkScroll = () => {
      // No need to check scroll properties with always-visible scrollbar
      // Just keeping the function for resize event management
    }

    // Check initially and add listener
    checkScroll()
    window.addEventListener('resize', checkScroll)

    // Also check after content is rendered
    const timeoutId = setTimeout(checkScroll, 100)

    return () => {
      window.removeEventListener('resize', checkScroll)
      clearTimeout(timeoutId)
    }
  }, [modalStore.modalVisible])

  // Check if there are changes that would require a reset
  const needsReset =
    pomodoroValue * 60 !== timerStore.timerMap.pomodoro.duration ||
    shortBreakValue * 60 !== timerStore.timerMap.shortBreak.duration ||
    longBreakValue * 60 !== timerStore.timerMap.longBreak.duration

  const handleApply = () => {
    // Update timer map
    timerStore.updateTimerSettings({
      pomodoro: pomodoroValue,
      shortBreak: shortBreakValue,
      longBreak: longBreakValue,
    })

    // Update theme settings
    themeStore.setThemeFont(tempThemeFont)
    themeStore.setThemeColor(tempThemeColor)

    // Update auto mode setting
    if (tempAutoMode !== timerStore.autoMode) {
      timerStore.toggleAutoMode()
    }

    // Update show seconds setting
    if (tempShowSeconds !== timerStore.showSeconds) {
      timerStore.toggleShowSeconds()
    }

    // Update show completed pomodoros setting
    if (tempShowCompletedPomodoros !== timerStore.showCompletedPomodoros) {
      timerStore.toggleShowCompletedPomodoros()
    }

    // Close modal
    modalStore.closeModal()

    // If reset is checked or timer durations changed, reset the timer
    if (resetOnApply || needsReset) {
      onApply()
    }
  }

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      modalStore.closeModal()
    }
  }

  return (
    <AnimatePresence>
      {modalStore.modalVisible && (
        <motion.div
          className="z-50 fixed inset-0 flex justify-center items-center bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClickOutside}
          data-testid="settings-modal"
        >
          <motion.div
            ref={modalRef}
            className="flex flex-col items-center mx-4 w-full max-w-md md:max-w-lg"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 500 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-white dark:bg-gray-800 shadow-xl rounded-xl w-full overflow-hidden">
              <div className="flex flex-row justify-between items-center px-8 py-6 border-gray-200 dark:border-gray-700 border-b">
                <h2 className="font-bold text-gray-800 dark:text-gray-200 text-lg md:text-2xl">
                  Settings
                </h2>
                <button
                  className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                  onClick={() => modalStore.closeModal()}
                  aria-label="Close settings"
                >
                  <FaTimes />
                </button>
              </div>

              <div
                ref={contentRef}
                className="space-y-6 px-8 py-6 max-h-[calc(60vh-120px)] md:max-h-[calc(70vh-140px)] overflow-y-auto scrollbar-custom"
              >
                <div className="space-y-4">
                  <h3 className="font-bold text-gray-800 dark:text-gray-200 text-sm md:text-left text-center uppercase tracking-widest">
                    Time (minutes)
                  </h3>
                  <div className="gap-4 grid md:grid-cols-3">
                    <InputNumber
                      label="pomodoro"
                      value={pomodoroValue}
                      onChange={setPomodoroValue}
                      min={1}
                      max={60}
                    />
                    <InputNumber
                      label="short break"
                      value={shortBreakValue}
                      onChange={setShortBreakValue}
                      min={1}
                      max={30}
                    />
                    <InputNumber
                      label="long break"
                      value={longBreakValue}
                      onChange={setLongBreakValue}
                      min={5}
                      max={60}
                    />
                  </div>
                </div>

                <div className="bg-gray-200 dark:bg-gray-700 w-full h-px" />
                <div className="items-center gap-4 grid md:grid-cols-2">
                  <h3 className="font-bold text-gray-800 dark:text-gray-200 text-sm md:text-left text-center uppercase tracking-widest">
                    Font
                  </h3>
                  <FontSelector
                    selectedFont={tempThemeFont}
                    onChange={setTempThemeFont}
                  />
                </div>

                <div className="bg-gray-200 dark:bg-gray-700 w-full h-px" />
                <div className="items-center gap-4 grid md:grid-cols-2">
                  <h3 className="font-bold text-gray-800 dark:text-gray-200 text-sm md:text-left text-center uppercase tracking-widest">
                    Color
                  </h3>
                  <ColorSelector
                    selectedColor={tempThemeColor}
                    onChange={setTempThemeColor}
                  />
                </div>

                <div className="bg-gray-200 dark:bg-gray-700 w-full h-px" />
                <div className="items-center gap-4 grid md:grid-cols-2">
                  <h3 className="font-bold text-gray-800 dark:text-gray-200 text-sm md:text-left text-center uppercase tracking-widest">
                    Options
                  </h3>
                  <div className="space-y-4">
                    <ToggleSwitch
                      label="auto mode"
                      active={tempAutoMode}
                      onChange={setTempAutoMode}
                    />
                    <ToggleSwitch
                      label="show seconds"
                      active={tempShowSeconds}
                      onChange={setTempShowSeconds}
                    />
                    <ToggleSwitch
                      label="show completed pomodoros"
                      active={tempShowCompletedPomodoros}
                      onChange={setTempShowCompletedPomodoros}
                    />
                    <CheckBox
                      label="reset timer on apply"
                      checked={resetOnApply}
                      onChange={setResetOnApply}
                    />
                  </div>
                </div>
              </div>

              {/* No scroll indicator needed with always-visible scrollbar */}

              {/* Apply button inside the modal */}
              <div className="flex justify-center bg-white dark:bg-gray-800 pt-3 pb-6 border-gray-200 dark:border-gray-700 border-t w-full">
                <motion.button
                  className="group bg-theme-color shadow-lg px-10 py-3 rounded-full font-bold text-white"
                  onClick={handleApply}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="group-hover:opacity-80 transition-opacity">
                    Apply
                  </span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SettingsModal
