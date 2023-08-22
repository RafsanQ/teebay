import { useQuery, gql } from "@apollo/client";

const GET_PRODUCTS = gql`
query{
    products{
        id,
        title,
        description,
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

export function AllProductsPage(){

    const { error, data, loading } = useQuery(GET_PRODUCTS);
    console.log( { error, loading, data } )

    // return (
    //     <div>
    //         <h2 className="pageTitle">All Products</h2>
    //         {products.map(product => (
    //             <div className="card">
    //                 <h3>{product.Name}</h3>
    //             </div>
    //         ))}
            
    //     </div>
    // );
}