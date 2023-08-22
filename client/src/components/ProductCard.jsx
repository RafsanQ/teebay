

export function ProductCard(props){

    const productTitle = props.productTitle;
    const categories = props.categories;
    const description = props.description;
    const price = props.price;
    const rentPrice = props.rentPrice;
    const rentDuration = props.rentDuration;
    const datePosted = props.dateCreated;

    return (
        <div className="card">
            <h3>{productTitle}</h3>
            <br />
            <p>Categories: </p>
            {categories.map(category => (
                <p>{category}, </p>
            ))}
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