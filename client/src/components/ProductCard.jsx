import { useMutation } from '@apollo/client';
import { Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { DELETE_PRODUCT } from '../graphql/Products';

export function ProductCard({product}){

    const openModal = () => modals.openConfirmModal({
        title: 'Are you sure you want to delete this product?',
        centered: true,
        children: (
          <Text size="sm">
            Deleting this would mean that the product will be permanently removed from out system. All records including those who are currently renting it will be lost.
          </Text>
        ),
        labels: { confirm: 'Yes', cancel: 'No' },
        confirmProps: { color: 'red' },
        onCancel: () => console.log('Cancel'),
        onConfirm: () => handleDelete(),
      });

    function parseISOString(s) {
        var b = s.split(/\D+/);
        return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
    }

    const [deleteProduct, {error, loading}] = useMutation(DELETE_PRODUCT);

    async function handleDelete(){

        await deleteProduct({
            variables: {
                productId: parseInt(product.id)
            },
            onCompleted(){
                console.log("Product deleted");
            }
        });
        
    }

    function handleClick(e){
        e.stopPropagation();
        openModal();
    }

    if(error){
        return (
            <div className="card">
                There was an error
            </div>
        )
    }

    if(loading){
        return (
            <div className="card">
                Loading...
            </div>
        )
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
            <img src="/trash-bin.png" onClick={handleClick} className="trashcan" alt="Logo" />
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
            <div className="rightSide" >
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