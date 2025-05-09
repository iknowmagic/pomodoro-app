import { describe, it, expect, beforeEach } from 'vitest'
import { useTimerStore, TimerType } from './timerStore'

// Clear localStorage before each test
beforeEach(() => {
  localStorage.clear()

  // Reset the store with proper typed values
  const initialState = {
    timerType: 'pomodoro' as TimerType,
    timer: 1500,
    percentage: 100,
    pomodoros: 1,
    sessions: 0,
    autoMode: true,
    showSeconds: true,
    showCompletedPomodoros: false,
    isActive: false,
    shouldResume: false,
    timerMap: {
      pomodoro: { duration: 1500 },
      shortBreak: { duration: 300 },
      longBreak: { duration: 900 },
    },
  }

  // Use type assertion to safely set the state
  useTimerStore.setState(initialState as any)
})

describe('Timer Store', () => {
  it('initializes with default values', () => {
    const state = useTimerStore.getState()

    expect(state.timerType).toBe('pomodoro')
    expect(state.timer).toBe(1500)
    expect(state.percentage).toBe(100)
    expect(state.autoMode).toBe(true)
  })

  it('can change timer type', () => {
    // Get a reference to the changeTimerType function
    const { changeTimerType } = useTimerStore.getState()

    // Call the function directly with proper type
    changeTimerType('shortBreak' as TimerType)

    // Get the updated state
    const updatedState = useTimerStore.getState()

    // Verify the updates
    expect(updatedState.timerType).toBe('shortBreak')
    expect(updatedState.timer).toBe(300)
  })

  it('can set timer value', () => {
    // Get a reference to the setTimer function
    const { setTimer } = useTimerStore.getState()

    // Call the function directly
    setTimer(600)

    // Get the updated state
    const updatedState = useTimerStore.getState()

    // Verify the timer value was updated
    expect(updatedState.timer).toBe(600)
  })
})
