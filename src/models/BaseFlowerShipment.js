import uuid from 'uuid'

export default class BaseFlowerShipment {
  
  constructor({ code, bundleTypes, quantity }) {
    this.uuid = uuid()
    this.code = code
    this.bundleTypes = bundleTypes
    this.quantity = quantity
    this.error = null
    this.bundles = this.generateShipment()
    this.totalPrice = this.generateTotalPrice()
  }

  generateShipment() {
    const totalShipmentQuantity = this.quantity

    // Try to solve using largest bundles first
    for(let i = 0; i < this.bundleTypes.length; ++i) {
      // Reduce the number of large bundles used gradually, move to next largest if no solution found
      const maxBundles = Math.floor(totalShipmentQuantity / this.bundleTypes[i].quantity)
      for(let j = 0; j < maxBundles; ++j) {
        var remaining = totalShipmentQuantity
        const bundles = { }

        // try possible quantities of each bundle type
        for(let k = i; k < this.bundleTypes.length; ++k) {
          let bundleDelta
          // bundle type
          const bt = this.bundleTypes[k] 

          // if the current bundle type is the largest one being tried
          // reduce by 1 x quantity each time until this bundle type is exhausted
          if(k === i) {
            bundleDelta = j * bt.quantity
          }
          else {
            bundleDelta = 0
          }

          const bundleQtyAttempt = Math.floor((remaining - bundleDelta) / bt.quantity)
          remaining = (remaining - bundleDelta) % bt.quantity + bundleDelta
          const subtotalPrice = bundleQtyAttempt * bt.price
          
          // if 1 or more bundles fit, store it as a possible solution
          if(bundleQtyAttempt > 0) {
            bundles[bt.quantity] = {
              quantity: bundleQtyAttempt,
              subtotalPrice
            }
          }

          // if all items have been allocated to bundles,
          // return this as a valid solution
          if(remaining === 0) {
            return bundles
          }

        }
      }

    }
    // if no solution found, set an error and return an empty shipment
    this.error = "Shipment cannot be met with bundles, try another quantity"
    return { }
  }

  generateTotalPrice() {
    return Object.values(this.bundles).reduce(
      (acc, curr) => (acc + curr.subtotalPrice),
      0
    )
  }
}