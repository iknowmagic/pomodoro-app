import type { Meta, StoryObj } from '@storybook/react'
import CheckBox from './CheckBox'

const meta: Meta<typeof CheckBox> = {
  title: 'Components/CheckBox',
  component: CheckBox,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof CheckBox>

export const Default: Story = {
  args: {
    // Add default props here if needed
  },
}
