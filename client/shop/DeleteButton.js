import React,{useState} from 'react'
import { Button, ListItemSecondaryAction, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import auth from './../auth/auth-helper'
import {remove} from './shop_api'

function DeleteButton(props) {
    const[open, setOpen] = useState(false)
    const openDialog = ()=>{
        setOpen(true)
    }
    const handleCloseRequest = ()=>{
        setOpen(false)
    }
    const handleDeleteConfirm = ()=>{
        const jwt = auth.isAuthenticated()

        remove({shopId:props.shop._id},{
            t:jwt.token
        }).then((data)=>{
            if(data.error){
                console.log("remove error:", data.error)
            }else{
                setOpen(false)
                props.onRemove(props.shop)
            }
        })


    }
    return (
        <span>
         <IconButton onClick={openDialog} color="secondary" >
             <DeleteIcon/>
         </IconButton>
            <Dialog open={open} onClose={handleCloseRequest}>
                <DialogTitle>
                    {"Delete your "+ props.shop.name + " shop" }
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Confirm to delete your Shop.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button  onClick={handleCloseRequest} color="primary" >
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="secondary" >
                        Confirm
                    </Button>
                </DialogActions>

            </Dialog>

        </span>
    )
}

export default DeleteButton
