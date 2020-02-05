import FlowerTypes from './models/FlowerTypes'

const parseOrderInput = orderInput => {
  const orders = orderInput.split(/\n/).map(line => {
    const [quantityRaw, code] = line.split(/\s/)
    const quantity = +quantityRaw
    if(!Number.isInteger(quantity)) {
      throw new Error("Quantity must be an integer")
    }
    return { code, quantity }
  })
  
  const shipments = orders.map(order => {
    const flowerType = FlowerTypes[order.code]
    const shipment = flowerType ? new flowerType(order.quantity) : null

    if(!shipment) {
      throw new Error(`Flower type: ${order.code} does not exist`)
    }
    return shipment
  })


  return shipments
}

const inCurrency = value => {
  return `$${(value/100).toFixed(2)}`
}

export {
  parseOrderInput,
  inCurrency
}