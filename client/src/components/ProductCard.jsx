
export function ProductCard({product}){

    const productTitle = product.title;
    const categories = product.categories || [];
    const description = product.description;
    const price = product.price;
    const rentPrice = product.rentPrice;
    const rentDuration = product.rentDuration;
    const datePosted = product.created_at;

    return (
        <div className="card">
            <div className="leftSide">
                <h2>{productTitle}</h2>
                <div>
                    {categories.length > 0 &&
                        (
                            <p className="categories">
                                Categories: {categories.map(category =>(
                                    <p>{category.title}, </p>
                                ))}
                            </p>
                        )
                    }
                </div>
                
                <p>Price: ${price} | Rent: ${rentPrice} per {rentDuration}</p>
                <p className="description">{description}</p>
  
                <p className="date">Date posted: {datePosted}</p>
            </div>
        </div>
    )
}