import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

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

const FlowerShop = () => {
  const classes = useStyles()
  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Grid container justify="center" spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper}>
              <OrderForm />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper}>
              <ReviewOrder />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  )
}

export default FlowerShop