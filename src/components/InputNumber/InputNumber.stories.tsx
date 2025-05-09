import type { Meta, StoryObj } from '@storybook/react'
import InputNumber from './InputNumber'

const meta: Meta<typeof InputNumber> = {
  title: 'Components/InputNumber',
  component: InputNumber,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof InputNumber>

export const Default: Story = {
  args: {
    // Add default props here if needed
  },
}
