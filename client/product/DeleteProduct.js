import React,{useState} from 'react'
import { Button, ListItemSecondaryAction, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import {remove} from './product_api'
import auth from './../auth/auth-helper'

function DeleteProduct(props) {
    const[open, setOpen] = useState(false)
    const openDialog = ()=>{
        setOpen(true)
    }
    const handleDialogClose = ()=>{
        setOpen(false)
    }
    const handleProductDelete = ()=>{
        const jwt = auth.isAuthenticated()
        remove({shopId:props.shopId,
                productId:props.product._id},{
                    t:jwt.token
                })
                .then((data)=>{
                    if(data.error){
                        console.log(data.error)
                    }else{
                        setOpen(false)
                        props.onRemove(props.product)
                    }
                })
        console.log("Delete button")
    }
    return (
        <span>
          <IconButton color="secondary" onClick={openDialog} >
              <DeleteIcon/>
          </IconButton>
          <Dialog open={open} onClose={handleDialogClose} >
              <DialogTitle>
                  {"Delete your " + props.product.name + " product" }
              </DialogTitle>
              <DialogContent>
                  <DialogContentText>
                      Confirm to Delete your Product.
                  </DialogContentText>
              </DialogContent>
              <DialogActions>
                  <Button onClick={handleDialogClose} color="primary" >
                      Cancel
                  </Button>
                  <Button onClick={handleProductDelete} color="secondary" >
                      Confirm
                  </Button>
              </DialogActions>

          </Dialog>
        </span>
    )
}

export default DeleteProduct
