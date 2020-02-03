import React from 'react'

import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

const OrderForm = () => {
  const [value, setValue] = React.useState('Enter orders here')

  const handleChange = event => {
    setValue(event.target.value)
  }

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