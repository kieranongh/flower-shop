import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import logo from '../static/android-chrome-192x192.png'
import OrderForm from './OrderForm'
import ReviewShipment from './ReviewShipment'
import { parseOrderInput } from '../utils'

const useStyles = makeStyles(theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  paper: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(2)
  },
}))

const TEST = `10 R12
15 L09
13 T58
11 L09`

const FlowerShop = () => {
  const classes = useStyles()
  const [orderInput, setOrderInput] = React.useState(TEST)
  const [orderResult, setOrderResult] = React.useState([])
  const [error, setError] = React.useState(null)

  const calculateOrders = () => {
    setError(null)
    try {
      const shipments = parseOrderInput(orderInput)
      setOrderResult(shipments)
    }
    catch (e) {
      setError("Cannot read order string, is it correct?")
      console.log(e)
    }
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className={classes.layout}>
        <div className={classes.paper} style={{ textAlign: "center" }}>
          <Typography variant="h4">Flower Supply Shop</Typography>
        </div>
        <Grid container justify="center" spacing={3}>
          {error && (
            <Grid item xs={12}>
              <Paper className={classes.paper} style={{ textAlign: "center" }}>
                <Typography color="error">{error}</Typography>
              </Paper>
            </Grid>
          )}
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper}>
              <OrderForm
                orderInput={orderInput}
                setOrderInput={setOrderInput}
                calculateOrders={calculateOrders}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper}>
              <ReviewShipment
                orderResult={orderResult}
              />
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Grid className={classes.paper} container justify="center">
              <img src={logo} alt="FSS logo" style={{opacity: 0.5}} />
            </Grid>
          </Grid>

        </Grid>
      </Container>
    </React.Fragment>
  )
}

export default FlowerShop