import { Meta, Story } from '@storybook/react'
import LloydsConfirmation, { LlooydsConfirmationProps } from '.'
import theme from '../../../theme'

export default {
  title: 'organisms/LloydsConfirmation',
  component: LloydsConfirmation,
  decorators: [(Story) => <Story />],
  tags: ['autodocs'],
} as Meta

const template: Story<LlooydsConfirmationProps> = (args) => (
  <LloydsConfirmation {...args} />
)

export const LloydsConfirmationStory = template.bind({})

LloydsConfirmationStory.args = {
  amount: 75.38,
  currency: 'GBP',
  style: {
    width: theme.spacing(129),
  },
}
