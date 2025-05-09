// ColorSelector.test.tsx
import { render, screen } from '@testing-library/react'
import ColorSelector from './ColorSelector'

describe('ColorSelector', () => {
  it('renders the component', () => {
    render(<ColorSelector selectedColor="design-1" onChange={() => {}} />)
    expect(screen.getByTestId('color-selector')).toBeInTheDocument()
  })
})
