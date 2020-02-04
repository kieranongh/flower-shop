import RoseShipment from '../models/RoseShipment'

test('Create an instance, check simple properties', () => {
  const shipment = new RoseShipment(25)
  expect(shipment).toBeDefined()
  expect(shipment).toHaveProperty("uuid")
  expect(shipment).toHaveProperty("code", "R12")
  expect(shipment).toHaveProperty("quantity", 25)
  expect(shipment).toHaveProperty("bundleTypes", [
    {
      quantity: 10,
      price: 1299
    },
    {
      quantity: 5,
      price: 699
    }
  ])
  expect(shipment.error).toBeNull()
})

test('Create an instance, check valid orders are correct', () => {
  const shipment = new RoseShipment(25)
  expect(shipment).toBeDefined()
  // property that's used to calculate orders
  expect(shipment).not.toHaveProperty("remaining")
  expect(shipment).toHaveProperty("bundles.10", { quantity: 2, subtotalPrice: 2598 })
  expect(shipment).toHaveProperty("bundles.5", { quantity: 1, subtotalPrice: 699 })
  expect(shipment).toHaveProperty("totalPrice", 3297)
})

test('Create an instance, check unsolveable orders are handled', () => {
  const shipment = new RoseShipment(22)
  expect(shipment).toBeDefined()
  expect(shipment).toHaveProperty("bundles", {})
  expect(shipment).toHaveProperty("totalPrice", 0)
  expect(shipment.error).not.toBeNull()
})
