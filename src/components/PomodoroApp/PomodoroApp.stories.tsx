import type { Meta, StoryObj } from '@storybook/react'
import PomodoroApp from './PomodoroApp'

const meta: Meta<typeof PomodoroApp> = {
  title: 'Components/PomodoroApp',
  component: PomodoroApp,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof PomodoroApp>

export const Default: Story = {
  args: {
    // Add default props here if needed
  },
}
