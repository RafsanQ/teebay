import { useQuery } from "@apollo/client";
import { GET_LENT_PRODUCTS } from "../../graphql/buyRentProducts.js"
import { StillProductCard } from "./StillProductCard";

export function LentProducts(){
    
    const { error, data, loading } = useQuery(GET_LENT_PRODUCTS, {
        variables: {
            userId: parseInt(localStorage.getItem("userId"))
        }
    });
    
    if(loading) return <div className="card">Loading...</div>

    if(error) return <div className="card">Error</div>

    const products = data.getLentProducts || [];
    return (
        <div>
            {products.map(product => (
                <StillProductCard key={product.id} product={product}/>
            ))}
            
        </div>
    );
}