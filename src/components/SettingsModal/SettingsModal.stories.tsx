import type { Meta, StoryObj } from '@storybook/react'
import SettingsModal from './SettingsModal'

const meta: Meta<typeof SettingsModal> = {
  title: 'Components/SettingsModal',
  component: SettingsModal,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof SettingsModal>

export const Default: Story = {
  args: {
    // Add default props here if needed
  },
}
