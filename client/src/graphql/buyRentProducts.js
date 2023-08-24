import { gql } from '@apollo/client';

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
