import type { Meta, StoryObj } from '@storybook/react'
import TimerPills from './TimerPills'

const meta: Meta<typeof TimerPills> = {
  title: 'Components/TimerPills',
  component: TimerPills,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof TimerPills>

export const Default: Story = {
  args: {
    // Add default props here if needed
  },
}
