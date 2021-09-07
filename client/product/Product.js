import React,{useState,useEffect} from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'
import {Link} from 'react-router-dom'
import {readProduct,relatedProducts} from './product_api'
import AddToCart from '../cart/AddToCart'
import Suggestions from './Suggestions'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: 30,
  },
  flex:{
    display:'flex'
  },
  card: {
    padding:'24px 40px 40px'
  },    
  subheading: {
    margin: '24px',
    color: theme.palette.openTitle
  },
  price: {
    padding: '16px',
    margin: '16px 0px',
    display: 'flex',
    backgroundColor: '#93c5ae3d',
    fontSize: '1.3em',
    color: '#375a53',
  },
  media: {
    height: 400,
    display: 'inline-block',
    width: '75%',
    marginLeft: '24px'
  },
  icon: {
    verticalAlign: 'sub'
  },
  link:{
    color: '#3e4c54b3',
    fontSize: '0.9em'
  },
  addCart: {
    width: '35px',
    height: '35px',
    padding: '10px 12px',
    borderRadius: '0.25em',
    backgroundColor: '#5f7c8b'
  },
  action: {
    margin: '8px 24px',
    display: 'inline-block'
  }
}))


function Product(props) {
     const classes = useStyles()
    const[product, setProduct]=useState({})
    const[relatedProduct, setRelatedProduct]=useState([])
    useEffect(() => {
       readProduct({productId:props.match.params.productId})
       .then((response)=>{
          
           setProduct(response)

       }).catch(err=>console.log(err))
    }, [props.match.params.productId])
      useEffect(() => {
       relatedProducts({productId:props.match.params.productId})
       .then((response)=>{
           setRelatedProduct(response)
           console.log("related products", response)

       }).catch(err=>{
         console.log("no related products found")
         console.log(err)
       })
    }, [props.match.params.productId])
  
    let imageUrl = product._id ?(
        `/api/product/image/${product._id}?${new Date().getTime()}`
    ):(
        '/api/product/defaultPhoto'
    )
    return (
       
        <div className={classes.root} >
           <Grid container spacing={8} >
               <Grid item xs={7} sm={7}  >
                   <Card className={classes.card} >
                       <CardHeader
                       title={product.name}
                        subheader={product.quantity > 0 ? 'In Stock': 'Out Of Stock'}
                        action={
                            <span className={classes.action} >
                                <AddToCart cartStyle={classes.addCart} />
                            </span>
                        }
                       />
                       <div className={classes.flex} >
                           <CardMedia
                           className={classes.media}
                           image={imageUrl}
                           title={product.name}
                           />
                          <Typography component="p" variant="subtitle1" className={classes.subheading}>
                    {product.description}<br/>
                    <span className={classes.price}>$ {product.price}</span>
                    {
                        product.shop ?(
                             <Link to={'/shops/'+product.shop._id} className={classes.link}>
                      <span>
                        <Icon className={classes.icon}>shopping_basket</Icon> {product.shop.name}
                      </span>
                    </Link>

                        ):(
                            ""
                        )
                    }
                   
                  </Typography>
                       </div>
                   </Card>

               </Grid>
               {
                   
                       <Grid item xs={5} sm={5}>
                   <Suggestions products={relatedProduct} title={'Related Products'} />
                     </Grid>

                   
               }
               
           </Grid>
        </div>
    )
}

export default Product
