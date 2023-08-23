import { useParams } from "react-router-dom"

export function EditProductPage(){

    let { productid } = useParams();
    console.log(productid);

    return (
        <div>
            Edit Products Page for productId 
            <h3>ID: {productid}</h3>
        </div>
    )
}