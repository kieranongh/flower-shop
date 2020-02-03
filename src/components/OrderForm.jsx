import React from 'react'
import TextField from '@material-ui/core/TextField'

const OrderForm = () => {
  const [value, setValue] = React.useState('Enter orders here')

  const handleChange = event => {
    setValue(event.target.value)
  }

  return (
    <div>
      <TextField
        id="standard-multiline-flexible"
        label="Multiline"
        multiline
        rows="4"
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}

export default OrderForm