import { render, screen } from '@testing-library/react'
import PomodoroApp from './PomodoroApp'

// Mock React hooks to prevent timers from starting
vi.mock('react', async () => {
  const actual = await vi.importActual('react')
  return {
    ...actual,
    useEffect: vi.fn(() => {}), // Don't execute effect at all
    useRef: vi.fn(() => ({ current: null })), // Stable ref
  }
})

// Mock the stores
vi.mock('../../store/timerStore', () => ({
  useTimerStore: () => ({
    timerType: 'pomodoro',
    timer: 1500,
    isActive: false,
    percentage: 100,
    shouldResume: false,
    sessions: 0,
    pomodoros: 1,
    showSeconds: true,
    showCompletedPomodoros: false,
    timerMap: {
      pomodoro: { duration: 1500 },
      shortBreak: { duration: 300 },
      longBreak: { duration: 900 },
    },
    startTimer: vi.fn(),
    stopTimer: vi.fn(),
    tick: vi.fn(),
    changeTimerType: vi.fn(),
  }),
}))

vi.mock('../../store/themeStore', () => ({
  useThemeStore: () => ({
    themeFont: 'sans',
    themeColor: 'design-1',
    colors: {
      'design-1': '#F87070',
      'design-2': '#70F3F8',
      'design-3': '#D881F8',
    },
  }),
}))

vi.mock('../../store/modalStore', () => ({
  useModalStore: () => ({
    modalVisible: false,
    openModal: vi.fn(),
  }),
}))

// Mock the faviconUtils module completely
vi.mock('../../utils/faviconUtils', () => ({
  updateFavicon: vi.fn(),
  drawCircle: vi.fn(() => 'data:image/svg+xml;utf8,<svg></svg>'),
}))

describe('PomodoroApp', () => {
  it('renders the component without crashing', () => {
    // Use a try/catch to handle any errors and provide better debugging
    try {
      render(<PomodoroApp />)
      expect(screen.getByTestId('pomodoro-app')).toBeInTheDocument()
    } catch (e) {
      console.error('Error rendering PomodoroApp:', e)
      throw e
    }
  })
})
