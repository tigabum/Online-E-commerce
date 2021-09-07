import React,{useState,useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import unicornbikeImg from './../assets/images/betteronline.jpg'
import { latestProducts,List,categoryList} from '../product/product_api'
import { Link } from 'react-router-dom'
import Suggestions from './../product/Suggestions'
import Grid from '@material-ui/core/Grid'
import Search from '../product/Search'
import Categories from '../product/Categories'


const useStyles = makeStyles(theme => ({
  root:{
      margin:20,
      flexGrow:1
  },
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5)
  },
  title: {
    padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle
  },
  media: {
    minHeight: 400
  },
  credit: {
    padding: 10,
    textAlign: 'right',
    backgroundColor: '#ededed',
    borderBottom: '1px solid #d0d0d0',
    '& a':{
      color: '#3f4771'
    } 
  }
}))

export default function Home(){
       const[latestproduct, setLatestProduct] = useState([{name:"one name"}])
        const[suggestionTitle,setSuggestionTitle]=useState('Latest Products')
        const[categories,setCategories] = useState([])

        useEffect(() => {
          latestProducts()
          .then((data,err)=>{
            if(err){
              console.log(err)
            }else{
             setLatestProduct(data)
                      }
          })
          
        }, [])

        useEffect(() => {
         categoryList()
         .then(response =>{
           console.log(response)
           setCategories(response)
         })
         .catch(err=>console.log(err))
        }, [])

     

        // useEffect(() => {
        //   categoryList()
        //   .then((response)=>{
        //     console.log(response)
        //     setCategoryData(response)
        //   })
        //   .catch(err=>{
        //     console.log("home error category")
        //     console.log(err)
        //   })
          
        // }, [])

  const classes = useStyles()
    return (
      <div className={classes.root} >
          <Grid container spacing={4}  >
        <Grid item xs={8} sm={8} >
          <Search categories={categories} />
          <Categories categories={categories} />
          </Grid>
        <Grid item xs={4} sm={4} >
             <Suggestions products={latestproduct} title={suggestionTitle} />
        </Grid>
         

      </Grid>

      </div>
    
     
    )
}

