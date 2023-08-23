import { gql } from '@apollo/client';


export const GET_PRODUCTS = gql`
query{
    products{
        id,
        title,
        description,
        price,
      	rentPrice,
      	rentDuration,
        created_at,
        owner{
            id
        },
        categories {
            id,
            title,
            created_at
        }
    }
}
`

export const GET_PRODUCTS_BY_USER = gql`
query getProductsByUser($userId: Int!){
  productsOwnedBy(ownerId: $userId) {
    id,
    title,
    description,
    price,
    rentPrice,
    rentDuration,
    created_at,
    owner{
        id
    },
    categories {
        title
    }
  }
}
`

export const GET_SINGLE_PRODUCT = gql`
query getSingleProduct($productId: Int!){
  getSingleProduct(productId: $productId) {
    id,
    title,
    price,
    rentPrice
    rentDuration,
    description,
		categories {
		  id,
      title
		}
  }
}
`