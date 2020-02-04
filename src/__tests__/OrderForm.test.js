import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import OrderForm from '../components/OrderForm'
// import { jssPreset } from '@material-ui/core';

test('renders a calculate button', () => {
  const { getByText } = render(<OrderForm />)
  const calculateButton = getByText(/calculate/i)
  expect(calculateButton).toBeInTheDocument()
})

test('clicking calculate button triggers a handler', () => {
  const calculateOrders = jest.fn()
  const { getByText } = render(<OrderForm calculateOrders={calculateOrders} />)
  const calculateButton = getByText(/calculate/i)
  
  fireEvent.click(calculateButton)
  
  expect(calculateOrders).toBeCalledTimes(1)
})

test('renders a textfield to input orders', () => {
  const { getByLabelText } = render(<OrderForm />)
  const orderTextField = getByLabelText(/orders/i)
  expect(orderTextField).toBeInTheDocument()
})

test('entering an order triggers a handler', () => {
  const setOrderInput = jest.fn()
  const inputString = "13 L09"
  const { getByLabelText } = render(<OrderForm orderInput=""
    setOrderInput={setOrderInput} />)
  const orderTextField = getByLabelText(/orders/i)

  fireEvent.change(orderTextField, { target: { value: inputString } })

  expect(setOrderInput).toBeCalledTimes(1)
  expect(setOrderInput).toBeCalledWith(inputString)
})
