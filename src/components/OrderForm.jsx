import React, { useEffect } from 'react'

import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import FlowerTypes from '../models/FlowerTypes'

const TEST = `10 R12
15 L09
13 T58`

const OrderForm = () => {
  const [value, setValue] = React.useState(TEST)

  const handleChange = event => {
    setValue(event.target.value)    
  }

  useEffect(() => {
    // try
    const requests = value.split(/\n/).map(line => {
      const [quantity, code] = line.split(/\s/)
      return { code, quantity }
    })
    console.log(`FlowerTypes => `, FlowerTypes)
    requests.map(req => {
      console.log(`req => `, req)
      const flowerType = FlowerTypes[req.code]
      const order = flowerType ? new flowerType(req.quantity) : null

      if(order) {
        console.log(`order => `, order)
        console.log(`order.quantity => `, order.quantity)
        console.log(`order.order => `, order.order)
      }
      else {
        console.log('Flower type does not exist')
      }
      return order
    })
  }, [value])

  return (
    <React.Fragment>
      <Typography variant="h6">Orders</Typography>
      <TextField
        id="standard-multiline-flexible"
        label="Orders"
        multiline
        fullWidth
        rows="4"
        value={value}
        onChange={handleChange}
        />
    </React.Fragment>
  )
}

export default OrderForm