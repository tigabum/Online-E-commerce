import querystring from 'query-string'
const create = (params, credentials, product) => {
    return fetch('/api/products/by/'+ params.shopId, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        },
        body: product
      })
      .then((response)=>{
          console.log("product_api no error")
          return response.json()
      })
      .catch((err)=>{
          console.log("product_api no error")
          console.log(err)
          
      })
     
}

const listByOwner = (params) => {
  return fetch('/api/products/by/'+params.shopId, {
      method: 'GET',
    })
    .then((response)=>{
        return response.json()
    }).catch(err=>console.log(err))
}

const remove =(params, credentials)=>{
    return fetch('/api/product/'+params.shopId + '/'+ params.productId,{
        method:'DELETE',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + credentials.t
        }
    })
    .then((response)=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}

const latestProducts = () =>{
    return fetch('/api/products/latest',{
        method:'GET',
     
    })
    .then((response)=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}

const relatedProducts = (params)=>{
        return fetch('/api/products/related/'+params.productId,{
            method:'GET',
           
        })
        .then((response)=>{
            console.log("related api", response)
            return response.json()
        })
        .catch(err=>console.log(err))
}

const readProduct = (params)=>{
    return fetch('/api/products/'+params.productId,{
        method:'GET'
    })
    .then((response)=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}

const updateProduct = (params,credentials, product)=>{
    return fetch('/api/product/'+params.shopId + '/' + params.productId,{
        method:'PUT',
        headers:{
            'Accept':'application/json',
            'Authorization':'Bearer ' + credentials.t,
           
        },
         body:product
    })
    .then((data)=>{
        return data.json()
    })
    .catch(err=>console.log(err))

}

const categoryList = ()=>{
    return fetch('/api/products/categories',{
        method:'GET'
    })
    .then((response)=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}

const List = (params)=>{
    const query = querystring.stringify(params)
    console.log("query", query)
    return fetch('/api/products/?'+query.anchor,{
        method:'GET'
    }).then((response)=>response.json())
    .catch(err=>console.log(err))

}
export {
    create,
    listByOwner,
    remove,
    latestProducts,
    relatedProducts,
    readProduct,
    updateProduct,
    categoryList,
    List
}