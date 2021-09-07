const create = async (params, credentials, shop) => {
  try {
    let response = await fetch('/api/shops/by/'+ params.userId, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: shop
    })
      return response.json()
    } catch(err) { 
      console.log(err)
    }
}

const list = ()=>{
  return fetch('/api/shops',{
    method:'GET'
  }).then(response =>{
    return response.json()
  })
  .catch(err=>console.log(err))
}

const read = (params)=>{
  return fetch('/api/shop/'+params.shopId,{
    method:'GET'
  }).then((response)=>{
    return response.json()
  }).catch(err =>console.log(err))
}

const listByOwner = (params, credentials)=>{
      return fetch('/api/shops/by/'+params.userId,{
        method:'GET',
        headers:{
          'Accept':'application/json',
          'Authorization':'Bearer ' + credentials.t
        }
      }).then((response)=>{
        return response.json()
      }).catch(err=>console.log(err))

}
const remove = (params, credentials)=>{
  return fetch('/api/shops/'+params.shopId,{
    method:'DELETE',
    headers:{
      'Accept':'application/json',
      'Authorization':'Bearer '+ credentials.t
    }
  } )
}

const update =  (params, credentials,shop)=>{
  return fetch('/api/shops/'+params.shopId,{
    method:'PUT',
     headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body:shop
  }).then((data)=>{
    return data.json()
  }).catch(err=>console.log(err))
}

export {
    create,
    list,
    listByOwner,
    remove,
    read,
    update
}