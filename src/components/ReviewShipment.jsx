import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import { inCurrency } from '../utils'

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: '700',
  }
}))

const ReviewShipment = props => {
  const { orderResult = [], totalPrice = 0 } = props

  const classes = useStyles()

  return (
    <React.Fragment>
      <Typography variant="h6">Bundles</Typography>
      <List disablePadding>
        {orderResult.map(shipment => (
          <ListItem data-testid={`order-line-${shipment.uuid}`} className={classes.listItem} key={shipment.uuid}>
            <ListItemText
              primary={`${shipment.quantity} x ${shipment.code}`}
              secondary={!shipment.error ? Object.entries(shipment.bundles).map(([key, { quantity, subtotalPrice}]) => (
                <React.Fragment key={key}>
                  {/* eslint-disable-next-line */}
                  {quantity} bundle{quantity == 1 ? '' : 's'} of {key} = {inCurrency(subtotalPrice)}<br/>
                </React.Fragment>
              )) :
              (<React.Fragment>{shipment.error}</React.Fragment> )
            }
            />
            <Typography variant="body2">{inCurrency(shipment.totalPrice)}</Typography>
          </ListItem>
        ))}
        <ListItem data-testid="total-price" className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography data-testid="total-price-value" variant="subtitle1" className={classes.total}>
            {inCurrency(totalPrice)}
          </Typography>
        </ListItem>
      </List>
    </React.Fragment>
  )
}

export default ReviewShipment