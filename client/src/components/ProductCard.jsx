
export function ProductCard({product}){

    function parseISOString(s) {
        var b = s.split(/\D+/);
        return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
    }

    const ownerId = product.owner.id;
    const productTitle = product.title;
    let categories = product.categories || [];
    const description = product.description;
    const price = product.price;
    const rentPrice = product.rentPrice;
    const rentDuration = product.rentDuration;
    const datePosted = parseISOString(product.created_at).toString().substring(0,15);

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