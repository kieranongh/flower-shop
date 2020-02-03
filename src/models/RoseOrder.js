import FlowerOrder from "./FlowerOrder"

export default class RoseOrder extends FlowerOrder {
  
  constructor(quantity) {
    const CODE = "R12"
    const BUNDLES = [
      {
        quantity: 10,
        price: 1299
      },
      {
        quantity: 5,
        price: 699
      }
    ]
    super({ CODE, BUNDLES, quantity })
  }

}