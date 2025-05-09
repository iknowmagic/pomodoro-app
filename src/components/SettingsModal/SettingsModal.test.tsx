// SettingsModal.test.tsx
import { render, screen } from '@testing-library/react'
import SettingsModal from './SettingsModal'

// Mock the stores
vi.mock('../../store/modalStore', () => ({
  useModalStore: () => ({
    modalVisible: true,
    closeModal: vi.fn(),
  }),
}))

vi.mock('../../store/timerStore', () => ({
  useTimerStore: () => ({
    timerMap: {
      pomodoro: { duration: 1500 },
      shortBreak: { duration: 300 },
      longBreak: { duration: 900 },
    },
    autoMode: true,
    showSeconds: true,
    showCompletedPomodoros: false,
    updateTimerSettings: vi.fn(),
    toggleAutoMode: vi.fn(),
    toggleShowSeconds: vi.fn(),
    toggleShowCompletedPomodoros: vi.fn(),
  }),
}))

vi.mock('../../store/themeStore', () => ({
  useThemeStore: () => ({
    themeFont: 'sans',
    themeColor: 'design-1',
    setThemeFont: vi.fn(),
    setThemeColor: vi.fn(),
  }),
}))

describe('SettingsModal', () => {
  it('renders the component', () => {
    render(<SettingsModal onApply={() => {}} />)
    expect(screen.getByTestId('settings-modal')).toBeInTheDocument()
  })
})
