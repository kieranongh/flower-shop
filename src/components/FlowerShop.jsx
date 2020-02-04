import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import FlowerTypes from '../models/FlowerTypes'
import OrderForm from './OrderForm'
import ReviewOrder from './ReviewOrder'

const useStyles = makeStyles(theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
}))

const TEST = `10 R12
15 L09
13 T58
11 T58`

const FlowerShop = () => {
  const classes = useStyles()
  const [orderInput, setOrderInput] = React.useState(TEST)
  const [orderResult, setOrderResult] = React.useState([])
  
  const handleChange = event => {
    setOrderInput(event.target.value)
  }

  useEffect(() => {
    // try
    const requests = orderInput.split(/\n/).map(line => {
      const [quantity, code] = line.split(/\s/)
      return { code, quantity }
    })
    console.log(`FlowerTypes => `, FlowerTypes)
    const newOrderResult = requests.map(req => {
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

    console.log(`newOrderResult => `, newOrderResult)

    setOrderResult(newOrderResult)

  }, [orderInput])

  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Grid container justify="center" spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper}>
              <OrderForm
                orderInput={orderInput}
                setOrderInput={handleChange}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper}>
              <ReviewOrder
                orderResult={orderResult}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  )
}

export default FlowerShop