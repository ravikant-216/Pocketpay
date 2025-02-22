import React from 'react'
import { Story, Meta } from '@storybook/react'
import PaymentConfirmation, { PaymentConfirmationProps } from '.'
import theme from '../../../theme'

export default {
  title: 'organisms/PaymentConfirmation',
  component: PaymentConfirmation,
} as Meta

const Template: Story<PaymentConfirmationProps> = (args) => (
  <PaymentConfirmation {...args} />
)

export const Default = Template.bind({})
Default.args = {
  style: {
    width: theme.spacing(129),
  },
}
