import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './core/Home'
import Users from './user/Users'
import Signup from './user/Signup'
import Signin from './auth/Signin'
import EditProfile from './user/EditProfile'
import Profile from './user/Profile'
import PrivateRoute from './auth/PrivateRoute'
import Menu from './core/Menu'
import NewShop from './shop/NewShop'
import Shops from './shop/Shops'
import MyShop from './shop/MyShop'
import NoPage from './user/noPage'
import Shop from './shop/Shop'
import EditShop from './shop/EditShop'
import NewProduct from './product/NewProduct'
import Product from './product/Product'
import EditProduct from './product/EditProduct'

const MainRouter = () => {
    return (<div>
      <Menu/>
      <Switch>
         
        <Route exact path="/" component={Home}/>
        <Route path="/users" component={Users}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/signin" component={Signin}/>
        <PrivateRoute path="/user/edit/:userId" component={EditProfile}/>
        <PrivateRoute path="/seller/shop/new" component={NewShop} />
        <Route path="/user/:userId" component={Profile}/>
        <Route path="/shops/all" component={Shops} />
        <PrivateRoute path="/seller/shops" component={MyShop} />
        <Route path="/shops/:shopId" component={Shop} />
        <Route path="/seller/shop/edit/:shopId" component={EditShop} />
        <PrivateRoute path="/seller/:shopId/products/new" component={NewProduct} />
        <Route path="/product/:productId" component={Product} />
          <PrivateRoute path="/seller/:shopId/:productId/edit" component={EditProduct} />
        {/* <Route exact component={NoPage} /> */}
       
        
      </Switch>
    </div>)
}

export default MainRouter
