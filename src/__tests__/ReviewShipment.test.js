import React from 'react'
import { render } from '@testing-library/react'
import ReviewShipment from '../components/ReviewShipment'
import { inCurrency } from '../utils'

const exampleRoseShipment = {
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

test('total price exists and is set to default value', () => {
  const { getByTestId } = render(<ReviewShipment />)
  const totalPriceValue = getByTestId("total-price-value")
  expect(totalPriceValue).toBeInTheDocument()
  expect(totalPriceValue).toHaveTextContent("$0.00")
})

test('valid items for 1 shipment are calculated and displayed', () => {
  const orderResult = [
    exampleRoseShipment
  ]
  const { getByTestId } = render(<ReviewShipment orderResult={orderResult} />)

  const orderLine = getByTestId(`order-line-${exampleRoseShipment.uuid}`)
  expect(orderLine).toBeInTheDocument()
  
  // quantity is listed and correct
  expect(orderLine).toHaveTextContent(exampleRoseShipment.quantity)

  // code is listed and correct
  expect(orderLine).toHaveTextContent(exampleRoseShipment.code)

  const orderedBundles = Object.entries(exampleRoseShipment.bundles)
  orderedBundles.forEach(([key, { quantity, subtotalPrice}]) => {
    // correct quantity of each bundle is listed
    expect(orderLine).toHaveTextContent(`${quantity} bundles of ${key}`)
    // subtotal price is listed and in the right format
    expect(orderLine).toHaveTextContent(`${inCurrency(subtotalPrice)}`)
    // total price for order line is listed, formatted and correct
    expect(orderLine).toHaveTextContent(`${inCurrency(exampleRoseShipment.totalPrice)}`)
  })
})

test('valid items for multiple shipments are calculated and displayed', () => {
  const repeats = 5
  const orderResult = Array(repeats).fill(exampleRoseShipment).map((line, i) => ({
      ...line,
      uuid: line.uuid += i
    })
  )
  const { getByTestId } = render(<ReviewShipment orderResult={orderResult} />)

  orderResult.forEach(line => {
    const orderLine = getByTestId(`order-line-${line.uuid}`)
    expect(orderLine).toBeInTheDocument()
    
    // quantity is listed and correct
    expect(orderLine).toHaveTextContent(exampleRoseShipment.quantity)

    // code is listed and correct
    expect(orderLine).toHaveTextContent(exampleRoseShipment.code)

    const orderedBundles = Object.entries(exampleRoseShipment.bundles)
    orderedBundles.forEach(([key, { quantity, subtotalPrice}]) => {
      // correct quantity of each bundle is listed
      expect(orderLine).toHaveTextContent(`${quantity} bundle${quantity == 1 ? '' : 's'} of ${key}`)
      // subtotal price is listed and in the right format
      expect(orderLine).toHaveTextContent(`${inCurrency(subtotalPrice)}`)
      // total price for order line is listed, formatted and correct
      expect(orderLine).toHaveTextContent(`${inCurrency(exampleRoseShipment.totalPrice)}`)
    })
  })
})

