import type { Meta, StoryObj } from '@storybook/react'
import ToggleSwitch from './ToggleSwitch'

const meta: Meta<typeof ToggleSwitch> = {
  title: 'Components/ToggleSwitch',
  component: ToggleSwitch,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof ToggleSwitch>

export const Default: Story = {
  args: {
    // Add default props here if needed
  },
}
