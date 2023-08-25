import { useQuery } from "@apollo/client";
import { GET_BOUGHT_PRODUCTS } from "../../graphql/buyRentProducts.js"
import { StillProductCard } from "./StillProductCard";

export function BoughtProducts(){
    
    const { error, data, loading } = useQuery(GET_BOUGHT_PRODUCTS, {
        variables: {
            userId: parseInt(localStorage.getItem("userId"))
        }
    });
    
    if(loading) return <div className="card">Loading...</div>

    if(error) return <div className="card">Error</div>

    const products = data.getBoughtProducts || [];
    return (
        <div>
            {products.map(product => (
                <StillProductCard key={product.id} product={product}/>
            ))}
            
        </div>
    );
}