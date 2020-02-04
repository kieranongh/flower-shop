import React from 'react'

import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const OrderForm = props => {
  const {
    orderInput = "", setOrderInput,
    calculateOrders
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
      <Button
        variant="contained"
        color="primary"
        onClick={calculateOrders}
      >
        Calculate Orders
      </Button>
    </React.Fragment>
  )
}

export default OrderForm