import React from 'react'

import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

const OrderForm = props => {
  const {
    orderInput = "", setOrderInput
  } = props

  return (
    <React.Fragment>
      <Typography variant="h6">Orders</Typography>
      <TextField
        id="standard-multiline-flexible"
        label="Orders"
        multiline
        fullWidth
        rows="4"
        value={orderInput}
        onChange={setOrderInput}
      />
    </React.Fragment>
  )
}

export default OrderForm