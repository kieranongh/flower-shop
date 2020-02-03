import React from 'react'
import RoseOrder from './models/RoseOrder'
import FlowerShop from './components/FlowerShop'

const App = () => {
  let rose1 = new RoseOrder(25)
  console.log(`rose1 => `, rose1)
  console.log(`rose1.quantity => `, rose1.quantity)
  console.log(`rose1.order => `, rose1.order)
  return (
    <FlowerShop />
  )
}

export default App;
