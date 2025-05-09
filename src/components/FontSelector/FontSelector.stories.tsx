import type { Meta, StoryObj } from '@storybook/react'
import FontSelector from './FontSelector'

const meta: Meta<typeof FontSelector> = {
  title: 'Components/FontSelector',
  component: FontSelector,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof FontSelector>

export const Default: Story = {
  args: {
    // Add default props here if needed
  },
}
