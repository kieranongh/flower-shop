import TulipOrder from '../models/TulipOrder'

test('Create an instance, check simple properties', () => {
  const order = new TulipOrder(13)
  expect(order).toBeDefined()
  expect(order).toHaveProperty("uuid")
  expect(order).toHaveProperty("code", "T58")
  expect(order).toHaveProperty("quantity", 13)
  expect(order).toHaveProperty("bundles", [
    {
      quantity: 9,
      price: 1699
    },
    {
      quantity: 5,
      price: 995
    },
    {
      quantity: 3,
      price: 595
    }
  ])
  expect(order.error).toBeNull()
})

test('Create an instance, check valid orders are correct', () => {
  const order = new TulipOrder(13)
  expect(order).toBeDefined()
  // property that's used to calculate orders
  expect(order).not.toHaveProperty("remaining")
  expect(order).toHaveProperty("order.5", { quantity: 2, subtotalPrice: 1990 })
  expect(order).toHaveProperty("order.3", { quantity: 1, subtotalPrice: 595 })
  expect(order).toHaveProperty("totalPrice", 2585)
})

test('Create an instance, check unsolveable orders are handled', () => {
  const order = new TulipOrder(11)
  expect(order).toBeDefined()
  expect(order).toHaveProperty("order", {})
  expect(order).toHaveProperty("totalPrice", 0)
  expect(order.error).not.toBeNull()
})
