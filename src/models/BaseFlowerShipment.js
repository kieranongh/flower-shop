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
    var calcBundles

    let i = 0
    while (i !== this.bundleTypes.length) {
      calcBundles = this.bundleTypes.slice(i).reduce(
        (acc, curr) => {
          let myQuantity = Math.floor(acc.remaining / curr.quantity)
          let remaining = acc.remaining % curr.quantity
          let subtotalPrice = myQuantity * curr.price

          const newObj = { 
            ...acc,
            remaining
          }

          if(myQuantity > 0) {
            newObj[curr.quantity] = {
              quantity: myQuantity,
              subtotalPrice
            }
          }

          return newObj
        },
        {
          remaining: totalShipmentQuantity
        } // initial
      )
      
      if(calcBundles.remaining !== 0) {
        i++
      }
      else {
        // remove the temporary variable
        delete calcBundles.remaining
        return calcBundles
      }

    }
    // if no solution found, set an error and return an empty order
    if (! (i < this.bundleTypes.length)) {
      this.error = "Order cannot be met with bundles, try another quantity"
      return { }
    }
  }

  generateTotalPrice() {
    return Object.values(this.bundles).reduce(
      (acc, curr) => (acc + curr.subtotalPrice),
      0
    )
  }
}