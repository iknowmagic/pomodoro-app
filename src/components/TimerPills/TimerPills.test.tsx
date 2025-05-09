// TimerPills.test.tsx
import { render, screen } from '@testing-library/react'
import TimerPills from './TimerPills'

// Mock the store
vi.mock('../../store/timerStore', () => ({
  useTimerStore: () => ({
    timerType: 'pomodoro',
  }),
}))

describe('TimerPills', () => {
  it('renders the component', () => {
    render(<TimerPills onSelectTimer={() => {}} />)
    expect(screen.getByTestId('timer-pills')).toBeInTheDocument()
  })
})
