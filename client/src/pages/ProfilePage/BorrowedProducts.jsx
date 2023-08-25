import { useQuery } from "@apollo/client";
import { GET_BORROWED_PRODUCTS } from "../../graphql/buyRentProducts.js"
import { StillProductCard } from "./StillProductCard";

export function BorrowedProducts(){
    
    const { error, data, loading } = useQuery(GET_BORROWED_PRODUCTS, {
        variables: {
            userId: parseInt(localStorage.getItem("userId"))
        }
    });
    
    if(loading) return <div className="card">Loading...</div>

    if(error) return <div className="card">Error</div>

    const products = data.getBorrowedProducts || [];
    return (
        <div>
            {products.map(product => (
                <StillProductCard key={product.id} product={product} isBorrowing={true}/>
            ))}
            
        </div>
    );
}