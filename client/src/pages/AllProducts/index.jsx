import { useQuery } from "@apollo/client";
import { Button } from '@mantine/core';
import { Link } from "react-router-dom";
import { ProductCard } from "../../components/ProductCard";
import { LogOutButton } from "../../components/LogOutButton";
import { GET_PRODUCTS } from "../../graphql/Products.js"

export function AllProductsPage(){
    
    const { error, data, loading } = useQuery(GET_PRODUCTS);
    

    if(loading) return <div className="card">Loading...</div>

    if(error) return <div className="card">Error</div>

    const products = data.products || [];

    return (
        <div>
            <div className="rightSideButtons">
                <LogOutButton />
                <Link to="/userproducts">
                    <Button className='rightSideButtons' color="violet" uppercase>
                        My Products
                    </Button>
                </Link>
            </div>

            <div className="leftSideButtons">
                <Link to="/profile">
                    <Button className='leftSideButtons' color="violet" uppercase>
                        My Profile
                    </Button>
                </Link>
            </div>
            
            <h2 className="pageTitle">All Products</h2>

            {products.map(product => (
                <ProductCard key={product.id} product={product}/>
            ))}
            
        </div>
    );
}