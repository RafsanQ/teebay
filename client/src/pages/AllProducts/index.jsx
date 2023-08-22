import { useQuery, gql } from "@apollo/client";

import { ProductCard } from "../../components/ProductCard";
import { LogOutButton } from "../../components/LogOutButton";

const GET_PRODUCTS = gql`
query{
    products{
        id,
        title,
        description,
        price,
      	rentPrice,
      	rentDuration,
        created_at,
        owner{
            email
        },
        categories {
            id,
            title,
            created_at
        }
    }
}
`


const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

function IsLoggedIn() {
    console.log("Checking if logged in...");
    const { data } = useQuery(IS_LOGGED_IN);
    return data.isLoggedIn;
}


export function AllProductsPage(){

    const { error, data, loading } = useQuery(GET_PRODUCTS);
    

    if(loading) return <div className="card">Loading...</div>

    if(error) return <div className="card">Error</div>

    const products = data.products || [];

    console.log({products: products})

    return (
        <div>
            <LogOutButton />
            <h2 className="pageTitle">All Products</h2>

            <h4>User Logged In? {}</h4>
            {products.map(product => (
                <ProductCard key={product.id} product={product}/>
            ))}
            
        </div>
    );
}