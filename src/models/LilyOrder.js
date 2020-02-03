import FlowerOrder from "./FlowerOrder"

const CODE = "L09"
const BUNDLES = [
  {
    quantity: 9,
    price: 2495
  },
  {
    quantity: 6,
    price: 1695
  },
  {
    quantity: 3,
    price: 995
  }
]

export default class LilyOrder extends FlowerOrder {
  static code = CODE
  static bundles = BUNDLES
  
  constructor(quantity) {    
    super({ code: CODE, bundles: BUNDLES, quantity })
  }
}