import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import AddCartIcon from '@material-ui/icons/AddShoppingCart'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  iconButton: {
    width: '28px',
    height: '28px'
  },
  disabledIconButton: {
    color: '#7f7563',
    width: '28px',
    height: '28px'
  }
}))

function AddToCart() {
    const classes = useStyles()

    return (
        <span>
       <IconButton color="secondary" > 
           <AddCartIcon className={classes.iconButton} />
       </IconButton>
        </span>
    )
}

export default AddToCart
