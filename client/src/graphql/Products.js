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