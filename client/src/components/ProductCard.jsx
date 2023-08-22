
export function ProductCard({product}){

    const productTitle = product.title;
    const categories = product.categories;
    const description = product.description;
    const price = product.price;
    const rentPrice = product.rentPrice;
    const rentDuration = product.rentDuration;
    const datePosted = product.created_at;

    console.log( {productTitle, categories, description, price, rentPrice, rentDuration, datePosted} );

    return (
        <div className="card">
            <h3>{productTitle}</h3>
            <br />
            <p>Categories: </p>
            {/* {categories.map(category => (
                <p>{category}, </p>
            ))} */}
            <br />
            <p>Price: ${price} | Rent: ${rentPrice} {rentDuration}ly</p>
            <br />
            <p>{description}</p>
            <br />
            <br />
            <p>Date posted: {datePosted}</p>
        </div>
    )
}