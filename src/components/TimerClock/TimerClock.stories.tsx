import type { Meta, StoryObj } from '@storybook/react'
import TimerClock from './TimerClock'

const meta: Meta<typeof TimerClock> = {
  title: 'Components/TimerClock',
  component: TimerClock,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof TimerClock>

export const Default: Story = {
  args: {
    // Add default props here if needed
  },
}
