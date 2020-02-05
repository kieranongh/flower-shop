import TulipShipment from '../models/TulipShipment'

test('Create an instance, check simple properties', () => {
  const shipment = new TulipShipment(13)
  expect(shipment).toBeDefined()
  expect(shipment).toHaveProperty("uuid")
  expect(shipment).toHaveProperty("code", "T58")
  expect(shipment).toHaveProperty("quantity", 13)
  expect(shipment).toHaveProperty("bundleTypes", [
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
  expect(shipment.error).toBeNull()
})

test('Create an instance, check valid orders are correct', () => {
  const shipment = new TulipShipment(13)
  expect(shipment).toBeDefined()
  // property that's used to calculate orders
  expect(shipment).not.toHaveProperty("remaining")
  expect(shipment).toHaveProperty("bundles.5", { quantity: 2, subtotalPrice: 1990 })
  expect(shipment).toHaveProperty("bundles.3", { quantity: 1, subtotalPrice: 595 })
  expect(shipment).toHaveProperty("totalPrice", 2585)
})

test('Check complex order logic is correct', () => {
  const shipment = new TulipShipment(49)
  expect(shipment).toBeDefined()
  // property that's used to calculate orders
  expect(shipment).not.toHaveProperty("remaining")
  expect(shipment).toHaveProperty("bundles.9", { quantity: 4, subtotalPrice: 6796 })
  expect(shipment).toHaveProperty("bundles.5", { quantity: 2, subtotalPrice: 1990 })
  expect(shipment).toHaveProperty("bundles.3", { quantity: 1, subtotalPrice: 595 })
  expect(shipment).toHaveProperty("totalPrice", 2585)
})

test('Create an instance, check unsolveable orders are handled', () => {
  const shipment = new TulipShipment(11)
  expect(shipment).toBeDefined()
  expect(shipment).toHaveProperty("bundles", {})
  expect(shipment).toHaveProperty("totalPrice", 0)
  expect(shipment.error).not.toBeNull()
})
