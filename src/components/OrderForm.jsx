import React from 'react'

import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Grid } from '@material-ui/core'

const OrderForm = props => {
  const {
    orderInput = "", setOrderInput,
    calculateOrders
  } = props

  const handleChange = event => {
    setOrderInput(event.target.value)
  }

  return (
    <React.Fragment>
      <Typography variant="h6">Orders</Typography>
      <Grid container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={12}>
          <TextField
            id="input-orders"
            label="Orders"
            multiline
            fullWidth
            value={orderInput}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={calculateOrders}
            >
            Calculate Orders
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default OrderForm