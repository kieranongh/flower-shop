import BaseFlowerShipment from './models/BaseFlowerShipment'

const parseOrderInput = (bundleConfigurations, orderInput) => {
  const orders = orderInput.split(/\n/).map(line => {
    const [quantityRaw, code] = line.split(/\s/)
    const quantity = +quantityRaw
    if(!Number.isInteger(quantity)) {
      throw new Error("Quantity must be an integer")
    }
    return { code, quantity }
  })
  
  const shipments = orders.map(order => {
    const flowerType = bundleConfigurations.find(b => b.code === order.code)
    if(flowerType) {
      return new BaseFlowerShipment({
        code: flowerType.code,
        bundleTypes: flowerType.bundleTypes,
        quantity: order.quantity
      })
    }
    else {
      throw new Error(`Flower type: ${order.code} does not exist`)
    }
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