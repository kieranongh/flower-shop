import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: '700',
  }
}))

const inCurrency = value => {
  return `$${(value/100).toFixed(2)}`
}

const ReviewOrder = props => {
  const { orderResult = []} = props

  const [totalPrice, setTotalPrice] = React.useState(0)

  useEffect(() => {
      const total = orderResult.reduce((acc, curr) => (acc + curr.totalPrice), 0)
      setTotalPrice(total)
    },
    [orderResult]
  )

  const classes = useStyles()

  return (
    <React.Fragment>
      <Typography variant="h6">Bundles</Typography>
      <List disablePadding>
        {orderResult.map(order => (
          <ListItem data-testid={`order-line-${order.uuid}`} className={classes.listItem} key={order.uuid}>
            <ListItemText
              primary={`${order.quantity} x ${order.code}`}
              secondary={!order.error ? Object.entries(order.order).map(([key, val]) => {
                return (<React.Fragment key={key}>{val.quantity} bundles of {key} = {inCurrency(val.subtotalPrice)}<br/></React.Fragment>)
              }) :
              (<React.Fragment>{order.error}</React.Fragment> )
            }
            />
            <Typography variant="body2">{inCurrency(order.totalPrice)}</Typography>
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

export default ReviewOrder