import type { Meta, StoryObj } from '@storybook/react'
import ColorSelector from './ColorSelector'

const meta: Meta<typeof ColorSelector> = {
  title: 'Components/ColorSelector',
  component: ColorSelector,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof ColorSelector>

export const Default: Story = {
  args: {
    // Add default props here if needed
  },
}
