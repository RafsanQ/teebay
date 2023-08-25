import { useQuery } from "@apollo/client";
import { Button } from '@mantine/core';
import { Link } from "react-router-dom";
import { ProductCard } from "../../components/ProductCard";
import { LogOutButton } from "../../components/LogOutButton";
import { GET_PRODUCTS } from "../../graphql/Products.js"
import { StillProductCard } from "./StillProductCard";

export function BoughtProducts(){
    
    const { error, data, loading } = useQuery(GET_PRODUCTS);
    
    if(loading) return <div className="card">Loading...</div>

    if(error) return <div className="card">Error</div>

    const products = data.products || [];

    return (
        <div>
            {products.map(product => (
                <StillProductCard key={product.id} product={product}/>
            ))}
            
        </div>
    );
}