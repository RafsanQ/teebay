import { useQuery } from "@apollo/client";
import { Button } from '@mantine/core';
import { Link } from "react-router-dom";
import { ProductCard } from "../../components/ProductCard";
import { LogOutButton } from "../../components/LogOutButton";
import { GET_PRODUCTS_BY_USER } from "../../graphql/Products";

export function UserProductsPage(){
    
    let { error, loading, data } = useQuery(GET_PRODUCTS_BY_USER, {
        variables: {
            userId: parseInt(localStorage.getItem("userId"))
        }
    });
    

    if(loading) return <div className="card">Loading...</div>

    if(error) return <div className="card">Error <p>{error.message}</p> </div>

    const products = data.productsOwnedBy || [];

    return (
        <div>
            <div className="rightSideButtons">
                <LogOutButton />
                
                <Link to="/products">
                    <Button className='rightSideButtons' color="violet" uppercase>
                        All Products
                    </Button>
                </Link>
            </div>
            <h2 className="pageTitle">My Products</h2>

            {products.map(product => (
                <div  >
                    <ProductCard key={product.id} product={product}/>
                </div>
            ))}

            <div className="bottomSection">
                <Link to="addproduct">
                    <Button  color="violet">Add Product</Button>
                </Link>
            </div>
            
        </div>
    );
}