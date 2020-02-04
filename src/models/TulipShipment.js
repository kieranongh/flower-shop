import BaseFlowerShipment from "./BaseFlowerShipment"

const CODE = "T58"
const BUNDLES_TYPES = [
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

export default class TulipShipment extends BaseFlowerShipment {
  static code = CODE
  static bundleTypes = BUNDLES_TYPES
  
  constructor(quantity) {    
    super({ code: CODE, bundleTypes: BUNDLES_TYPES, quantity })
  }
}