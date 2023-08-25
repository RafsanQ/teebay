import { gql } from '@apollo/client';
import { RentForm } from './../pages/ViewProductPage/RentForm';

export const BUY_PRODUCT = gql`
mutation buyProduct($productId: Int!, $userId: Int!){
    buyProduct(productId: $productId, userId: $userId){
        id
    }
}
`

export const RENT_PRODUCT = gql`
mutation rentProduct($productId: Int!, $userId: Int!, $startDate: ISODate!, $endDate: ISODate!){
    rentOut(productId: $productId, userId: $userId, startDate: $startDate, endDate: $endDate){
        id,
    }
}
`

export const GET_BOUGHT_PRODUCTS = gql`
query getBoughtProducts($userId: Int!){
  getBoughtProducts(userId: $userId) {
    id,
    title,
    price,
    rentPrice,
    rentDuration,
    categories{
      title
    },
    owner{
      name,
      email
    },
    created_at
  }
}
`

export const GET_SOLD_PRODUCTS = gql`
query getSoldProducts($userId: Int!){
  getSoldProducts(userId: $userId) {
    id,
    title,
    price,
    rentPrice,
    rentDuration,
    categories{
      title
    },
    owner{
      email
    },
    created_at
  }
}
`
