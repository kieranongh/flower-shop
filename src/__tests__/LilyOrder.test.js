import LilyOrder from '../models/LilyOrder'

test('Create an instance, check simple properties', () => {
  const order = new LilyOrder(15)
  expect(order).toBeDefined()
  expect(order).toHaveProperty("uuid")
  expect(order).toHaveProperty("code", "L09")
  expect(order).toHaveProperty("quantity", 15)
  expect(order).toHaveProperty("bundles", [
    {
      quantity: 9,
      price: 2495
    },
    {
      quantity: 6,
      price: 1695
    },
    {
      quantity: 3,
      price: 995
    }
  ])
  expect(order.error).toBeNull()
})

test('Create an instance, check valid orders are correct', () => {
  const order = new LilyOrder(15)
  expect(order).toBeDefined()
  // property that's used to calculate orders
  expect(order).not.toHaveProperty("remaining")
  expect(order).toHaveProperty("order.9", { quantity: 1, subtotalPrice: 2495 })
  expect(order).toHaveProperty("order.6", { quantity: 1, subtotalPrice: 1695 })
  expect(order).toHaveProperty("order.3", { quantity: 0, subtotalPrice: 0 })
  expect(order).toHaveProperty("totalPrice", 4190)
})

test('Create an instance, check unsolveable orders are handled', () => {
  const order = new LilyOrder(13)
  expect(order).toBeDefined()
  expect(order).toHaveProperty("order", {})
  expect(order).toHaveProperty("totalPrice", 0)
  expect(order.error).not.toBeNull()
})
