import FlowerOrder from "./FlowerOrder"

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

export default class RoseOrder extends FlowerOrder {
  static code = CODE
  static bundles = BUNDLES
  
  constructor(quantity) {    
    super({ code: CODE, bundles: BUNDLES, quantity })
  }
}