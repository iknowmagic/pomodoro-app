// CheckBox.test.tsx
import { render, screen } from '@testing-library/react'
import CheckBox from './CheckBox'

describe('CheckBox', () => {
  it('renders the component', () => {
    render(<CheckBox label="Test Label" checked={false} onChange={() => {}} />)
    expect(screen.getByTestId('checkbox-test-label')).toBeInTheDocument()
  })
})
