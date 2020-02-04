import BaseFlowerShipment from "./BaseFlowerShipment"

const CODE = "L09"
const BUNDLES_TYPES = [
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

export default class LilyShipment extends BaseFlowerShipment {
  static code = CODE
  static bundleTypes = BUNDLES_TYPES
  
  constructor(quantity) {    
    super({ code: CODE, bundleTypes: BUNDLES_TYPES, quantity })
  }
}