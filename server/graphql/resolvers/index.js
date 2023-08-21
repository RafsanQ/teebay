import authResolver from './auth.js'
import productResolver from './products.js'


const rootResolver = {
    ...authResolver,
    ...productResolver,
}

export default rootResolver
  