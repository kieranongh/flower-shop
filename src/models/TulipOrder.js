import FlowerOrder from "./FlowerOrder"

const CODE = "T58"
const BUNDLES = [
  {
    quantity: 9,
    price: 1699
  },
  {
    quantity: 5,
    price: 995
  },
  {
    quantity: 3,
    price: 595
  }
]

export default class TulipOrder extends FlowerOrder {
  static code = CODE
  static bundles = BUNDLES
  
  constructor(quantity) {    
    super({ code: CODE, bundles: BUNDLES, quantity })
  }
}