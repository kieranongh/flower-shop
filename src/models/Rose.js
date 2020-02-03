export default class RoseOrder {
  static bundles = [
    {
      quantity: 10,
      price: 1299
    },
    {
      quantity: 5,
      price: 699
    }
  ]
  
  constructor(quantity) {
    this.quantity = quantity
  }

  get order() {
    console.log(`this => `, this)
    let orderQuantity = this.quantity
    let myOrder = RoseOrder.bundles.reduce(
      (acc, curr) => {
        console.log(`acc, curr => `, acc, curr)
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
    return myOrder
  }

}