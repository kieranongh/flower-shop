import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import ReviewOrder from '../components/ReviewOrder'

const exampleRoseOrder = {
  "uuid": "fb9c0830-b037-4eb8-babe-5d170dc0b745",
  "code": "R12",
  "bundles": [
    {
      "quantity": 10,
      "price": 1299
    },
    {
      "quantity": 5,
      "price": 699
    }
  ],
  "quantity": "10",
  "error": null,
  "order": {
    "5": {
      "quantity": 0,
      "subtotalPrice": 0
    },
    "10": {
      "quantity": 1,
      "subtotalPrice": 1299
    }
  },
  "totalPrice": 1299
}

const inCurrency = value => {
  return `$${(value/100).toFixed(2)}`
}

test('total price exists and is set to default value', () => {
  const { getByTestId } = render(<ReviewOrder />)
  const totalPriceValue = getByTestId("total-price-value")
  expect(totalPriceValue).toBeInTheDocument()
  expect(totalPriceValue).toHaveTextContent("$0.00")
})

test('valid orders for 1 order are calculated and displayed', () => {
  const orderResult = [
    exampleRoseOrder
  ]
  const { getByTestId } = render(<ReviewOrder orderResult={orderResult} />)

  const orderLine = getByTestId(`order-line-${exampleRoseOrder.uuid}`)
  expect(orderLine).toBeInTheDocument()
  
  // quantity is listed and correct
  expect(orderLine).toHaveTextContent(exampleRoseOrder.quantity)

  // code is listed and correct
  expect(orderLine).toHaveTextContent(exampleRoseOrder.code)

  const orderedBundles = Object.entries(exampleRoseOrder.order)
  orderedBundles.forEach(([key, { quantity, subtotalPrice}]) => {
    // correct quantity of each bundle is listed
    expect(orderLine).toHaveTextContent(`${quantity} bundles of ${key}`)
    // subtotal price is listed and in the right format
    expect(orderLine).toHaveTextContent(`${inCurrency(subtotalPrice)}`)
    // total price for order line is listed, formatted and correct
    expect(orderLine).toHaveTextContent(`${inCurrency(exampleRoseOrder.totalPrice)}`)
  })

  const totalPriceValue = getByTestId("total-price-value")
  expect(totalPriceValue).toBeInTheDocument()
  // same value as one order
  expect(totalPriceValue).toHaveTextContent(inCurrency(exampleRoseOrder.totalPrice))
})

test('valid orders for multiple orders are calculated and displayed', () => {
  const repeats = 5
  const orderResult = Array(repeats).fill(exampleRoseOrder).map((line, i) => ({
      ...line,
      uuid: line.uuid += i
    })
  )
  const { getByTestId } = render(<ReviewOrder orderResult={orderResult} />)

  orderResult.forEach(line => {
    const orderLine = getByTestId(`order-line-${line.uuid}`)
    expect(orderLine).toBeInTheDocument()
    
    // quantity is listed and correct
    expect(orderLine).toHaveTextContent(exampleRoseOrder.quantity)

    // code is listed and correct
    expect(orderLine).toHaveTextContent(exampleRoseOrder.code)

    const orderedBundles = Object.entries(exampleRoseOrder.order)
    orderedBundles.forEach(([key, { quantity, subtotalPrice}]) => {
      // correct quantity of each bundle is listed
      expect(orderLine).toHaveTextContent(`${quantity} bundles of ${key}`)
      // subtotal price is listed and in the right format
      expect(orderLine).toHaveTextContent(`${inCurrency(subtotalPrice)}`)
      // total price for order line is listed, formatted and correct
      expect(orderLine).toHaveTextContent(`${inCurrency(exampleRoseOrder.totalPrice)}`)
    })
  })

  const totalPriceValue = getByTestId("total-price-value")
  expect(totalPriceValue).toBeInTheDocument()
  // same value as one order
  expect(totalPriceValue).toHaveTextContent(inCurrency(repeats * exampleRoseOrder.totalPrice))
})

