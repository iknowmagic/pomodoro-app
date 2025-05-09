import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type TimerType = 'pomodoro' | 'shortBreak' | 'longBreak'

interface TimerConfig {
  duration: number
}

interface TimerState {
  timerType: TimerType
  timer: number
  isActive: boolean
  pomodoros: number
  sessions: number
  percentage: number
  autoMode: boolean
  showSeconds: boolean
  showCompletedPomodoros: boolean
  timerMap: Record<TimerType, TimerConfig>
  shouldResume: boolean
}

interface TimerActions {
  setTimer: (_time: number) => void
  startTimer: () => void
  stopTimer: () => void
  resetTimer: () => void
  updatePercentage: () => void
  changeTimerType: (_type: TimerType) => void
  tick: () => void
  toggleAutoMode: () => void
  toggleShowSeconds: () => void
  toggleShowCompletedPomodoros: () => void
  updateTimerSettings: (_settings: {
    pomodoro?: number
    shortBreak?: number
    longBreak?: number
  }) => void
}

// Create the store
export const useTimerStore = create<TimerState & TimerActions>()(
  persist(
    (set, get) => ({
      // State
      timerType: 'pomodoro',
      timer: 25 * 60,
      isActive: false,
      pomodoros: 1,
      sessions: 0,
      percentage: 100,
      autoMode: true,
      showSeconds: true,
      showCompletedPomodoros: false,
      timerMap: {
        pomodoro: { duration: 25 * 60 },
        shortBreak: { duration: 5 * 60 },
        longBreak: { duration: 15 * 60 },
      },
      shouldResume: false,

      // Actions
      setTimer: (time) => set({ timer: time }),

      startTimer: () => {
        set({ isActive: true, shouldResume: false })
        // Save to localStorage directly to avoid nested updates
        localStorage.setItem('timerActive', 'true')
      },

      stopTimer: () => {
        set({ isActive: false })
        localStorage.setItem('timerActive', 'false')
      },

      resetTimer: () => {
        const { timerType, timerMap } = get()
        set({
          timer: timerMap[timerType].duration,
          isActive: false,
          shouldResume: false,
          percentage: 100,
        })
        localStorage.setItem('timerActive', 'false')
      },

      updatePercentage: () => {
        const { timer, timerType, timerMap } = get()
        const duration = timerMap[timerType].duration
        const newPercentage = Math.floor((timer / duration) * 100)

        // Only update if percentage actually changed
        if (newPercentage !== get().percentage) {
          set({ percentage: newPercentage })
        }
      },

      changeTimerType: (type) => {
        const { timerMap } = get()
        set({
          timerType: type,
          timer: timerMap[type].duration,
          percentage: 100,
        })
      },

      tick: () => {
        const { timer, timerType, timerMap, pomodoros, autoMode } = get()

        if (timer <= 1) {
          // Timer complete
          if (timerType === 'pomodoro') {
            // Increment sessions
            const newSessions = get().sessions + 1

            // Cycle through pomodoros
            if (pomodoros < 4) {
              set({
                sessions: newSessions,
                pomodoros: pomodoros + 1,
                timerType: 'shortBreak',
                timer: timerMap.shortBreak.duration,
                percentage: 100,
                isActive: autoMode,
              })
            } else {
              set({
                sessions: newSessions,
                pomodoros: 1,
                timerType: 'longBreak',
                timer: timerMap.longBreak.duration,
                percentage: 100,
                isActive: autoMode,
              })
            }
          } else {
            // Return to pomodoro after a break
            set({
              timerType: 'pomodoro',
              timer: timerMap.pomodoro.duration,
              percentage: 100,
              isActive: autoMode,
            })
          }
        } else {
          // Just decrement the timer by 1 second
          set({ timer: timer - 1 })

          // Update percentage
          const duration = timerMap[timerType].duration
          const newPercentage = Math.floor(((timer - 1) / duration) * 100)
          if (newPercentage !== get().percentage) {
            set({ percentage: newPercentage })
          }
        }
      },

      toggleAutoMode: () => {
        set((state) => ({ autoMode: !state.autoMode }))
      },

      toggleShowSeconds: () => {
        set((state) => ({ showSeconds: !state.showSeconds }))
      },

      toggleShowCompletedPomodoros: () => {
        set((state) => ({
          showCompletedPomodoros: !state.showCompletedPomodoros,
        }))
      },

      updateTimerSettings: ({ pomodoro, shortBreak, longBreak }) => {
        const newTimerMap = { ...get().timerMap }

        if (pomodoro) newTimerMap.pomodoro.duration = pomodoro * 60
        if (shortBreak) newTimerMap.shortBreak.duration = shortBreak * 60
        if (longBreak) newTimerMap.longBreak.duration = longBreak * 60

        const { timerType } = get()
        set({
          timerMap: newTimerMap,
          timer: newTimerMap[timerType].duration,
          percentage: 100,
        })
      },
    }),
    {
      name: 'timer-storage',
      partialize: (state) => ({
        timerType: state.timerType,
        timer: state.timer,
        pomodoros: state.pomodoros,
        sessions: state.sessions,
        autoMode: state.autoMode,
        showSeconds: state.showSeconds,
        showCompletedPomodoros: state.showCompletedPomodoros,
        timerMap: state.timerMap,
      }),
    },
  ),
)
