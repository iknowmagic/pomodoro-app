import { render, screen } from '@testing-library/react'
import { TimerClock } from './TimerClock' // Import directly to avoid hooks running

// Mock all the React hooks that might cause timers
vi.mock('react', async () => {
  const actual = await vi.importActual('react')
  return {
    ...actual,
    useEffect: vi.fn((fn) => fn()), // Mock useEffect to execute callback once without cleanup
    useState: vi.fn((initial) => [initial, vi.fn()]), // Return stable state
    useRef: vi.fn(() => ({ current: null })), // Return stable ref
  }
})

// Mock the stores
vi.mock('../../store/timerStore', () => ({
  useTimerStore: () => ({
    timerType: 'pomodoro',
    percentage: 80,
    pomodoros: 2,
    showCompletedPomodoros: true,
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

vi.mock('../../utils/faviconUtils', () => ({
  drawCircle: vi.fn(() => 'data:image/svg+xml;utf8,<svg></svg>'),
}))

// Mock clearInterval and setInterval to prevent actual timers
beforeAll(() => {
  vi.spyOn(window, 'setInterval').mockImplementation(() => 123 as any)
  vi.spyOn(window, 'clearInterval').mockImplementation(() => {})
})

afterAll(() => {
  vi.restoreAllMocks()
})

describe('TimerClock', () => {
  it('renders correctly', () => {
    render(
      <TimerClock
        timerDisplay="25:00"
        isActive={false}
        shouldResume={false}
        onStart={() => {}}
        onStop={() => {}}
      />,
    )

    // Basic rendering check
    expect(screen.getByTestId('timer-clock')).toBeInTheDocument()

    // Check if the time is displayed
    expect(screen.getByText('25:00')).toBeInTheDocument()

    // Check if the start button is displayed (not the stop button)
    expect(screen.getByText(/start/i)).toBeInTheDocument()
  })
})
