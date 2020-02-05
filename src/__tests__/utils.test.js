import { parseOrderInput, inCurrency } from '../utils'

test('Check valid, solveable parsing', () => {
  const orderInput = "10 R12\n" +
    "15 L09\n" +
    "13 T58"
  
  const shipments = parseOrderInput(orderInput)
  
  expect(shipments).toHaveLength(3)
  
  const rose = shipments[0]
  expect(rose).toHaveProperty("code", "R12")
  expect(rose).toHaveProperty("quantity", 10)
  expect(rose.error).toBeNull()
  
  const lily = shipments[1]
  expect(lily).toHaveProperty("code", "L09")
  expect(lily).toHaveProperty("quantity", 15)
  expect(lily.error).toBeNull()

  const tulip = shipments[2]
  expect(tulip).toHaveProperty("code", "T58")
  expect(tulip).toHaveProperty("quantity", 13)
  expect(tulip.error).toBeNull()  
})

test('Check valid, unresolveable parsing', () => {
  const orderInput = "10 R12\n" +
    "14 L09\n" +
    "4 T58"
  
  const shipments = parseOrderInput(orderInput)
  
  expect(shipments).toHaveLength(3)
  
  const rose = shipments[0]
  expect(rose).toHaveProperty("code", "R12")
  expect(rose).toHaveProperty("quantity", 10)
  expect(rose.error).toBeNull()
  
  const lily = shipments[1]
  expect(lily).toHaveProperty("code", "L09")
  expect(lily).toHaveProperty("quantity", 14)
  expect(lily.error).not.toBeNull()

  const tulip = shipments[2]
  expect(tulip).toHaveProperty("code", "T58")
  expect(tulip).toHaveProperty("quantity", 4)
  expect(tulip.error).not.toBeNull()  
})

test('Check invalid parsing - quantity NaN', () => {
  const orderInput = "10 R12\n" +
    "15 L09\n" +
    "zx13 T58"
  
  let shipments

  expect(() => {
    shipments = parseOrderInput(orderInput)
  }).toThrow(/integer/i)
  
  expect(shipments).not.toBeDefined()
})

test('Check invalid parsing - unknown code', () => {
  const orderInput = "10 R12\n" +
    "15 L09\n" +
    "13 T58zx"
  
    let shipments

    expect(() => {
      shipments = parseOrderInput(orderInput)
    }).toThrow(/flower type/i)
    
    expect(shipments).not.toBeDefined()
})

test('conversion to currency looks correct', () => {
  const value = 1699

  const currency = inCurrency(value)

  expect(currency).toBe("$16.99")
})
