// InputNumber.test.tsx
import { render, screen } from '@testing-library/react'
import InputNumber from './InputNumber'

describe('InputNumber', () => {
  it('renders the component', () => {
    render(
      <InputNumber
        label="Test Input"
        value={5}
        min={0}
        max={10}
        onChange={() => {}}
      />,
    )
    expect(screen.getByTestId('input-number-test-input')).toBeInTheDocument()
  })
})
