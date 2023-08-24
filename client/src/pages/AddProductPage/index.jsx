import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useMutation } from '@apollo/client';

import { PageOne } from './PageOne';
import { PageTwo } from './PageTwo';
import { PageThree } from './PageThree';
import { PageFour } from './PageFour';
import { PageFive } from './PageFive';
import toast from 'react-hot-toast';

import './index.css';
import { ADD_CATEGORY, CREATE_NEW_PRODUCT } from '../../graphql/Products';



export function AddProductForm() {

    const navigate = useNavigate();
    const [createNewProduct] = useMutation(CREATE_NEW_PRODUCT);
    const [addCategory] = useMutation(ADD_CATEGORY);


    // For keeping track of form data
    const [formData, setFormData] = useState({
        title: '',
        descrition: '',
        categories: [],
        price: 0,
        rentPrice: 0,
        rentDuration: ''
    });

    async function handleSubmit(){
        try {
            const { data } = await createNewProduct({
                variables: {
                    title: formData.title,
                    descrition: formData.descrition,
                    price: formData.price,
                    rentPrice: formData.rentPrice,
                    rentDuration: formData.rentDuration,
                    userId: parseInt(localStorage.getItem("userId"))
                }
            });
            
            console.log({data});
            const newProductId = parseInt(data.createProduct.id);
            if(formData.categories.length > 0){  
                for(const category of formData.categories){
                    await addCategory({
                        variables: {
                            productId: newProductId,
                            categoryId: parseInt(category.value)
                        },
                        onError(error){
                            console.log(error);
                            toast("Categories were not asssigned :)");
                        }
                    })
                }
            }
            navigate('/userproducts');
            toast("New Product Added!");
            
        }catch(error){
            toast("We ran into an error while creating new product");
            console.log({error});
        }
    }

    const [page, setPage] = useState(0);
    const PageRendered = () => {
        switch(page){
            case 0:
                return <PageOne formData={formData} setFormData={setFormData} page={page} setPage={setPage} />;
            case 1:
                return <PageTwo formData={formData} setFormData={setFormData} page={page} setPage={setPage} />
            case 2:
                return <PageThree formData={formData} setFormData={setFormData} page={page} setPage={setPage} />;
            case 3:
                return <PageFour formData={formData} setFormData={setFormData} page={page} setPage={setPage} />;
            case 4:
                return <PageFive formData={formData} setFormData={setFormData} page={page} setPage={setPage} handleSubmit={handleSubmit}/>;
            default:
                return <PageOne formData={formData} setFormData={setFormData} page={page} setPage={setPage} handleSubmit={handleSubmit}/>
        }
    };

    return (
        <div className='card-addProduct'>
            {<PageRendered/>}
        </div>
    );
}