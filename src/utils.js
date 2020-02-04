import FlowerTypes from './models/FlowerTypes'

const parseOrderInput = orderInput => {
  const requests = orderInput.split(/\n/).map(line => {
    const [quantity, code] = line.split(/\s/)
    return { code, quantity }
  })
  
  const shipments = requests.map(req => {
    const flowerType = FlowerTypes[req.code]
    const order = flowerType ? new flowerType(req.quantity) : null

    if(!order) {
      throw new Error('Flower type does not exist')
    }
    return order
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