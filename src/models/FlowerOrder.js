export default class FlowerOrder {
  
  constructor({ CODE, BUNDLES, quantity }) {
    this.CODE = CODE
    this.BUNDLES = BUNDLES
    this.quantity = quantity
  }

  get order() {
    let orderQuantity = this.quantity
    let myOrder = this.BUNDLES.reduce(
      (acc, curr) => {
        let myQuantity = Math.floor(acc.remaining / curr.quantity)
        let remaining = acc.remaining % curr.quantity
        let subtotalPrice = myQuantity * curr.price
        let totalPrice = acc.totalPrice + subtotalPrice

        return {
          ...acc,
          [curr.quantity]: {
            quantity: myQuantity,
            subtotalPrice
          },
          remaining,
          totalPrice
        }
      },
      {
        remaining: orderQuantity,
        totalPrice: 0
      } // initial
    )
    // remove the temporary variable
    delete myOrder.remaining
    return myOrder
  }

}