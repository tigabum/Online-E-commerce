import React,{useState, useEffect} from 'react'
import { listByOwner } from './shop_api'
import auth from './../auth/auth-helper'
import { Redirect,Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper';
import { Button, ListItemSecondaryAction, Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles'
import Icon from '@material-ui/core/Icon'
import Edit from '@material-ui/icons/Edit'
import IconButton from '@material-ui/core/IconButton'
import DeleteButton from './DeleteButton';

const useStyles = makeStyles(theme => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(5)
  }),
  title: {
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(3)}px ${theme.spacing(1)}px` ,
    color: theme.palette.protectedTitle,
    fontSize: '1.2em'
  },
  addButton:{
    float:'right'
  },
  leftIcon: {
    marginRight: "8px"
  }
}))

const elevation = 5;

export default function MyShop(){
        const classes = useStyles()
        const[shops, setShops] = useState([])
        const[redirectToSignin, setRedirectToSignin] = useState(false)
        const jwt = auth.isAuthenticated()
    

useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    listByOwner({
      userId: jwt.user._id
    }, {t: jwt.token}, signal).then((data) => {
      if (data.error) {
        setRedirectToSignin(true)
      } else {
        setShops(data)
      }
    })
    return function cleanup(){
      abortController.abort()
    }
  }, [])

const onRemove = (shop)=>{
  const updatedShops = [...shops]
  const updatedIndex = updatedShops.indexOf(shop)
  updatedShops.splice(updatedIndex, 1)
  setShops(updatedShops)

}


if(redirectToSignin){
    <Redirect to='/signin'/>
}

return (
    <div>
        <Paper className={classes.root} elevation={elevation}>
            <Typography type="title" className={classes.title} >
                Your Shop
                <span>
                    <Link to="/seller/shop/new">
                        <Button color="primary" variant="contained" className={classes.addButton} >
                            <Icon className={classes.leftIcon}>add_box</Icon>New Shop</Button>
                    </Link>
                </span>
            </Typography>
                <List>
                    {shops.map((shop, index)=>{
                        return (
                            <span key={index} >
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar src={'/api/shops/logo/'+shop._id+"?" + new Date().getTime()} />
                                        </ListItemAvatar>
                                        <ListItemText
                                        primary={shop.name}
                                        secondary={shop.description}
                                        />
                                        {
                                            auth.isAuthenticated().user && auth.isAuthenticated().user._id == shop.owner._id &&(
                                                <ListItemSecondaryAction>
                                                    <Link to={'/seller/shop/edit/'+ shop._id}>
                                                        <IconButton color="primary" >
                                                            <Edit/>
                                                        </IconButton>
                                                    </Link>
                                                    <DeleteButton shop={shop} onRemove={onRemove} />
                                                </ListItemSecondaryAction>

                                            )
                                        }
                                    
                                </ListItem>
                            </span>
                        )
                    })}
                </List>
            </Paper>

    </div>
)


}