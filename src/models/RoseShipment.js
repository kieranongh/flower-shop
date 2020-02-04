import BaseFlowerShipment from "./BaseFlowerShipment"

const CODE = "R12"
const BUNDLE_TYPES = [
  {
    quantity: 10,
    price: 1299
  },
  {
    quantity: 5,
    price: 699
  }
]

export default class RoseShipment extends BaseFlowerShipment {
  static code = CODE
  static bundleTypes = BUNDLE_TYPES
  
  constructor(quantity) {    
    super({ code: CODE, bundleTypes: BUNDLE_TYPES, quantity })
  }
}