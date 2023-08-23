import { useParams } from "react-router-dom"
import { useQuery } from "@apollo/client";
import { Button } from '@mantine/core';
import { GET_SINGLE_PRODUCT } from "../../graphql/Products.js"

export function EditProductPage(){

    let { productid } = useParams();
    
    const { error: queryError, data: queryData, loading: queryLoading } = useQuery(GET_SINGLE_PRODUCT, {
        variables: {
            productId: parseInt(productid)
        }
    })

    if(queryLoading){
        return (
            <div className="card-noborder">
                <h3>Getting Product</h3>
            </div>
        )
    }

    if(queryError){
        return (
            <div className="card-noborder">
                <h3>Error Getting Product</h3>
            </div>
        )
    }


    return (
        <div className="card-noborder">
            
        </div>
    )
}