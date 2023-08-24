import { gql } from '@apollo/client';

export const BUY_PRODUCT = gql`
mutation buyProduct($productId: Int!, $userId: Int!){
        buyProduct(productId: $productId, userId: $userId){
        id
    }
}
`
