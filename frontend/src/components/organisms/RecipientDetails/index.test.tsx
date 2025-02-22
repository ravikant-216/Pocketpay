import { ThemeProvider } from '@emotion/react'
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import theme from '../../../theme'
import RecipientDetails from '.'
import '@testing-library/jest-dom/extend-expect'
import axios from 'axios'
import { Provider } from 'react-redux'
import { store } from '../../../utils/store'
const data = {
  firstName: '',
  lastName: '',
  email: '',
  accountNumber: '',
  ifsc: '',
  accountType: '',
}
jest.mock('axios')
afterEach(cleanup)
const axiosMock = axios as jest.Mocked<typeof axios>
axiosMock.get.mockResolvedValue({
  data: [
    {
      id: 1,
      email: 'mario.gabriel@gmail.com',
      account: '123456885865',
      firstName: 'Mario',
      lastName: 'Gabriel',
      ifsc: 'ABFJ12929GH',
      accountType: 'Checking',
    },
  ],
})
const renderWithTheme = (T: React.ReactNode) => {
  render(
    <ThemeProvider theme={theme}>
      <Provider store={store}>{T}</Provider>
    </ThemeProvider>
  )
}

describe('Recipient Details', () => {
  const mockOnClick = jest.fn()
  it('should pre-fill form fields with email data', async () => {
    renderWithTheme(<RecipientDetails onClick={mockOnClick} data={data} />)

    const emailInput = screen.getByLabelText('Email')

    act(() => {
      fireEvent.change(emailInput, {
        target: { name: 'email', value: 'mario.gabriel@gmail.com' },
      })
    })

    expect(emailInput).toHaveValue('mario.gabriel@gmail.com')
  })

  it('should enable the button if all fields are filled', () => {
    const { getByLabelText, getByText } = render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <RecipientDetails onClick={mockOnClick} data={data} />
        </Provider>
      </ThemeProvider>
    )
    const emailInput = getByLabelText('Email')
    const accountInput = getByLabelText('Account number')
    const firstNameInput = getByLabelText('First name')
    const lastNameInput = getByLabelText('Last name')
    const ifscInput = getByLabelText('IFSC code')
    const accountType = getByLabelText('Account Type')
    const continueButton = screen.getByTestId('continueButton')

    fireEvent.change(emailInput, {
      target: { name: 'email', value: 'test@example.com' },
    })
    fireEvent.change(accountInput, {
      target: { name: 'accountNumber', value: '123456789012' },
    })
    fireEvent.change(firstNameInput, {
      target: { name: 'firstName', value: 'Johny' },
    })
    fireEvent.change(lastNameInput, {
      target: { name: 'lastName', value: 'Michael' },
    })
    fireEvent.change(ifscInput, {
      target: { name: 'ifsc', value: 'ABCD1234567' },
    })
    fireEvent.mouseDown(accountType)
    fireEvent.click(getByText('Checking'))

    expect(emailInput.getAttribute('value')).toBe('test@example.com')
    expect(accountInput.getAttribute('value')).toBe('123456789012')
    expect(firstNameInput.getAttribute('value')).toBe('Johny')
    expect(lastNameInput.getAttribute('value')).toBe('Michael')
    expect(ifscInput.getAttribute('value')).toBe('ABCD1234567')
    expect(continueButton).toBeEnabled()
  })

  it('should disable the button if any field is empty', () => {
    const { getByLabelText } = render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <RecipientDetails onClick={mockOnClick} data={data} />
        </Provider>
      </ThemeProvider>
    )
    const emailInput = getByLabelText('Email')
    const continueButton = screen.getByTestId('continueButton')

    fireEvent.change(emailInput, {
      target: { name: 'email', value: 'test@example.com' },
    })

    expect(emailInput.getAttribute('value')).toBe('test@example.com')
    expect(continueButton).toBeDisabled()
  })

  it('calls onClick with correct values when button is clicked', () => {
    const mockOnClick = jest.fn()
    const { getByText, getByLabelText } = render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <RecipientDetails onClick={mockOnClick} data={data} />
        </Provider>
      </ThemeProvider>
    )

    const emailInput = getByLabelText('Email')
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })

    const accountInput = getByLabelText('Account number')
    fireEvent.change(accountInput, { target: { value: '123456789012' } })

    const firstNameInput = getByLabelText('First name')
    fireEvent.change(firstNameInput, { target: { value: 'John' } })

    const lastNameInput = getByLabelText('Last name')
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } })

    const ifscInput = getByLabelText('IFSC code')
    fireEvent.change(ifscInput, { target: { value: 'ABCD0123456' } })
    const accountType = getByLabelText('Account Type')
    const continueButton = screen.getByTestId('continueButton')
    expect(continueButton).toBeDisabled()
    fireEvent.mouseDown(accountType)
    fireEvent.click(getByText('Checking'))
    fireEvent.click(continueButton)

    expect(mockOnClick).toHaveBeenCalledWith({
      email: 'test@example.com',
      accountNumber: '123456789012',
      firstName: 'John',
      lastName: 'Doe',
      ifsc: 'ABCD0123456',
      accountType: 'Checking',
    })
  })
  it('should empty other fields when email field is empty', () => {
    const { getByLabelText } = render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <RecipientDetails onClick={mockOnClick} data={data} />
        </Provider>
      </ThemeProvider>
    )

    const emailInput = getByLabelText('Email')
    const accountInput = getByLabelText('Account number')
    const firstNameInput = getByLabelText('First name')
    const lastNameInput = getByLabelText('Last name')
    const ifscInput = getByLabelText('IFSC code')

    fireEvent.change(emailInput, {
      target: { value: '' },
    })

    expect(emailInput.getAttribute('value')).toBe('')
    expect(accountInput.getAttribute('value')).toBe('')
    expect(firstNameInput.getAttribute('value')).toBe('')
    expect(lastNameInput.getAttribute('value')).toBe('')
    expect(ifscInput.getAttribute('value')).toBe('')
    const continueButton = screen.getByTestId('continueButton')
    expect(continueButton).toBeDisabled()
  })
  it('should render messages when given validation fails', () => {
    const { getByLabelText } = render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <RecipientDetails onClick={mockOnClick} data={data} />
        </Provider>
      </ThemeProvider>
    )

    const emailInput = getByLabelText('Email')
    const ifscInput = getByLabelText('IFSC code')
    const accountInput = getByLabelText('Account number')

    fireEvent.change(emailInput, {
      target: { value: 'mario.gabriel@gmail.com' },
    })

    fireEvent.change(emailInput, {
      target: { value: '' },
    })

    fireEvent.change(emailInput, {
      target: { value: 'user@gmail' },
    })
    fireEvent.change(ifscInput, {
      target: { value: '123' },
    })

    fireEvent.change(accountInput, {
      target: { value: '133' },
    })

    const emailError = screen.getByText('Invalid email address')
    const ifscError = screen.getByText('Invalid ifsc code')

    const accountError = screen.getByText('Invalid account number')
    expect(emailError).toBeInTheDocument()
    expect(ifscError).toBeInTheDocument()
    expect(accountError).toBeInTheDocument()
  })
})
