
export function ProductCard({product}){

    const ownerId = product.owner.id;
    const productTitle = product.title;
    let categories = product.categories || [];
    const description = product.description;
    const price = product.price;
    const rentPrice = product.rentPrice;
    const rentDuration = product.rentDuration;
    const datePosted = product.created_at;

    let trashCanButton = null;
    if(ownerId === localStorage.getItem('userId')) {
        trashCanButton = (
            <img src="/trash-bin.png" className="trashcan" alt="Logo" />
        );
    }

    if(categories.length > 0){
        let tempCategories = [];

        categories.forEach(category => {
            tempCategories.push(category.title);
        });
        categories = tempCategories.join(', ');
    }

    return (
        <div className="card">
            <div className="rightSide">
                {trashCanButton}
            </div>
            <div className="leftSide">
                <h2>{productTitle}</h2>
                {/* <div>
                    {categories.length > 0 &&
                        (
                            <h5 className="categories">
                                Categories: {categories.map(category =>(
                                    <p key={category.id}>{category.title}, </p>
                                ))}
                            </h5>
                        )
                    }
                </div> */}

                {categories.length > 0 &&
                    (
                        <div className="categories">
                            <h5>Categories: {categories}</h5>
                        </div>
                    )
                }
                
                
                <p>Price: ${price} | Rent: ${rentPrice} per {rentDuration}</p>
                <p className="description">{description}</p>
  
                <p className="date">Date posted: {datePosted}</p>
            </div>
            
        </div>
    )
}