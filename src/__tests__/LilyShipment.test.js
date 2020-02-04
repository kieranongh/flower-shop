import LilyShipment from '../models/LilyShipment'

test('Create an instance, check simple properties', () => {
  const shipment = new LilyShipment(15)
  expect(shipment).toBeDefined()
  expect(shipment).toHaveProperty("uuid")
  expect(shipment).toHaveProperty("code", "L09")
  expect(shipment).toHaveProperty("quantity", 15)
  expect(shipment).toHaveProperty("bundleTypes", [
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
  expect(shipment.error).toBeNull()
})

test('Create an instance, check valid orders are correct', () => {
  const shipment = new LilyShipment(15)
  expect(shipment).toBeDefined()
  // property that's used to calculate orders
  expect(shipment).not.toHaveProperty("remaining")
  expect(shipment).toHaveProperty("bundles.9", { quantity: 1, subtotalPrice: 2495 })
  expect(shipment).toHaveProperty("bundles.6", { quantity: 1, subtotalPrice: 1695 })
  expect(shipment).toHaveProperty("totalPrice", 4190)
})

test('Create an instance, check unsolveable orders are handled', () => {
  const shipment = new LilyShipment(13)
  expect(shipment).toBeDefined()
  expect(shipment).toHaveProperty("bundles", {})
  expect(shipment).toHaveProperty("totalPrice", 0)
  expect(shipment.error).not.toBeNull()
})
