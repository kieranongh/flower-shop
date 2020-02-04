import React from 'react'
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
  return `$${value/100}`
}

const ReviewOrder = props => {
  const { orderResult = "" } = props

  console.log(`orderResult => `, orderResult)

  const classes = useStyles()

  return (
    <React.Fragment>
      <Typography variant="h6">Bundles</Typography>
      <List disablePadding>
        {orderResult.map(order => (
          // needs uuids
          <ListItem className={classes.listItem} key={order.code}>
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
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            $34.06
          </Typography>
        </ListItem>
      </List>
    </React.Fragment>
  )
}

export default ReviewOrder