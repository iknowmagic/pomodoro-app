// ToggleSwitch.test.tsx
import { render, screen } from '@testing-library/react'
import ToggleSwitch from './ToggleSwitch'

describe('ToggleSwitch', () => {
  it('renders the component', () => {
    render(
      <ToggleSwitch label="Test Toggle" active={false} onChange={() => {}} />,
    )
    expect(screen.getByTestId('toggle-test-toggle')).toBeInTheDocument()
  })
})
