import RoseOrder from '../models/RoseOrder'

test('Create an instance, check simple properties', () => {
  const order = new RoseOrder(25)
  expect(order).toBeDefined()
  expect(order).toHaveProperty("uuid")
  expect(order).toHaveProperty("code", "R12")
  expect(order).toHaveProperty("quantity", 25)
  expect(order).toHaveProperty("bundles", [
    {
      quantity: 10,
      price: 1299
    },
    {
      quantity: 5,
      price: 699
    }
  ])
  expect(order.error).toBeNull()
})

test('Create an instance, check valid orders are correct', () => {
  const order = new RoseOrder(25)
  expect(order).toBeDefined()
  expect(order).toHaveProperty("order.10", { quantity: 2, subtotalPrice: 2598 })
  expect(order).toHaveProperty("order.5", { quantity: 1, subtotalPrice: 699 })
  expect(order).toHaveProperty("totalPrice", 3297)
})

test('Create an instance, check unsolveable orders are handled', () => {
  const order = new RoseOrder(22)
  expect(order).toBeDefined()
  expect(order).toHaveProperty("order", {})
  expect(order).toHaveProperty("totalPrice", 0)
  expect(order.error).not.toBeNull()
})
