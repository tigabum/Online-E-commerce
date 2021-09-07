import React,{useEffect,useState} from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import {read} from './shop_api'
import { listByOwner} from './../product/product_api'
import Products from './../product/Products'
import {Link} from 'react-router-dom'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: 30,
  },
  card: {
    maxWidth: 600,
    margin: 20,
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2)
  },
 
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle
  },
  bigAvat:{
    width:80,
    height:80
  },
   productTitle: {
    padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(1)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
    width: '100%',
    fontSize: '1.2em'
  }
 
 
}))

function Shop(props) {
     const classes = useStyles()
    const[shop, setShop] = useState({})
    const[product, setProduct] = useState([])
    useEffect(()=>{
        read({shopId:props.match.params.shopId})
        .then((data)=>{
          console.log(data)
            setShop(data)

        }).catch(err=>console.log(err))

    }, [])

    useEffect(() => {
      listByOwner({shopId:props.match.params.shopId})
      .then((data)=>{
        console.log(data)
        console.log("list by owner working")
        setProduct(data)
      }).catch(err=>console.log(err))
    }, [])

    return (
      <div className={classes.root} >
        <Grid container spacing={8} >
          <Grid item xs={4} sm={4} >
             <Card className={classes.card}>
        <CardContent>
          <Typography type="headline" component="h2">
            {shop.name}
          </Typography>
          <Avatar className={classes.bigAvat} src={'/api/shops/logo/'+shop._id+"?" + new Date().getTime()} />
          <Typography type="subheading" component="h2" >
              {shop.description}
          </Typography> 
        </CardContent>
        
         </Card>
          </Grid>
<Grid item xs={8} sm={8} >
  <Card>
    <Typography type="title" component="h2" className={classes.productTitle} >Products</Typography>
    <Products products={product} searched={true} />
  </Card>
</Grid>
        </Grid>

      </div>
      
    )
}

export default Shop

