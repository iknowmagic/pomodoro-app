// FontSelector.test.tsx
import { render, screen } from '@testing-library/react'
import FontSelector from './FontSelector'

describe('FontSelector', () => {
  it('renders the component', () => {
    render(<FontSelector selectedFont="sans" onChange={() => {}} />)
    expect(screen.getByTestId('font-selector')).toBeInTheDocument()
  })
})
