import uuid from 'uuid'

export default class FlowerOrder {
  
  constructor({ code, bundles, quantity }) {
    this.uuid = uuid()
    this.code = code
    this.bundles = bundles
    this.quantity = quantity
    this.error = null
    this.order = this.generateOrder()
    this.totalPrice = this.generateTotalPrice()
  }

  generateOrder() {
    let orderQuantity = this.quantity
    var myOrder

    let i = 0
    while (i !== this.bundles.length) {
      myOrder = this.bundles.slice(i).reduce(
        (acc, curr) => {
          let myQuantity = Math.floor(acc.remaining / curr.quantity)
          let remaining = acc.remaining % curr.quantity
          let subtotalPrice = myQuantity * curr.price

          return {
            ...acc,
            [curr.quantity]: {
              quantity: myQuantity,
              subtotalPrice
            },
            remaining
          }
        },
        {
          remaining: orderQuantity
        } // initial
      )
      
      if(myOrder.remaining !== 0) {
        console.log(myOrder.remaining)
        i++
      }
      else {
        // remove the temporary variable
        delete myOrder.remaining
        return myOrder
      }

    }
    // if no solution found, set an error and return an empty order
    if (! (i < this.bundles.length)) {
      this.error = "Order cannot be met with bundles, try another quantity"
      return { }
    }
  }

  generateTotalPrice() {
    return Object.values(this.order).reduce(
      (acc, curr) => (acc + curr.subtotalPrice),
      0
    )
  }
}