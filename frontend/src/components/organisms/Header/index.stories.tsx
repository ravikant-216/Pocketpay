import { StoryObj, Meta } from '@storybook/react'
import Header from '.'

const meta: Meta<typeof Header> = {
  title: 'organisms/Header',
  component: Header,
}

export default meta

type Story = StoryObj<typeof meta>

export const HeaderStory: Story = {
  name: 'Header',
}
