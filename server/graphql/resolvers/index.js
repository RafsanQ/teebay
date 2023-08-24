import authResolver from './auth.js'
import productResolver from './products.js'
import buyRentProducts from './buyRentProducts.js'


const rootResolver = {
    ...authResolver,
    ...productResolver,
    ...buyRentProducts,
}

export default rootResolver
  