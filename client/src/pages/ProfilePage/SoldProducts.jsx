import { useQuery } from "@apollo/client";
import { GET_SOLD_PRODUCTS } from "../../graphql/buyRentProducts.js"
import { StillProductCard } from "./StillProductCard";

export function SoldProducts(){
    
    const { error, data, loading } = useQuery(GET_SOLD_PRODUCTS, {
        variables: {
            userId: parseInt(localStorage.getItem("userId"))
        }
    });
    
    if(loading) return <div className="card">Loading...</div>

    if(error) return <div className="card">Error</div>

    const products = data.getSoldProducts || [];
    return (
        <div>
            {products.map(product => (
                <StillProductCard key={product.id} product={product}/>
            ))}
        </div>
    );
}