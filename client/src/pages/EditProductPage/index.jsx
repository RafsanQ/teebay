import { useParams } from "react-router-dom"
import { useQuery, useMutation } from "@apollo/client";
import { TextInput, Button, Textarea, NumberInput, Grid, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import toast, { Toaster } from 'react-hot-toast';

import { GET_SINGLE_PRODUCT, UPDATE_PRODUCT, ADD_CATEGORY, CLEAR_ALL_CATEGORIES } from "../../graphql/Products.js"

import { CategoriesList } from "./CategoriesList.jsx";
import './index.css'
import { GET_PRODUCTS } from './../../graphql/Products';

export function EditProductPage(){

    let { productid } = useParams();
    const form = useForm({
        initialValues: {
            title: '',
            description: '',
            price: '',
            rent: '',
            rentDuration: '',
        }
    });
    const { error: queryError, loading: queryLoading } = useQuery(GET_SINGLE_PRODUCT, {
        variables: {
            productId: parseInt(productid)
        },
        onCompleted( data ){
            form.setValues({
                title: data?.getSingleProduct.title,
                description: data?.getSingleProduct.description,
                price: data?.getSingleProduct.price,
                rent: data?.getSingleProduct.rentPrice,
                rentDuration: data?.getSingleProduct.rentDuration,
            })
        }
    })

    const [updateProduct, { error: updateError, loading: updateLoading }] = useMutation(UPDATE_PRODUCT);

    const [addCategory, { error: addCategoryError, loading: addCategoryLoading }] = useMutation(ADD_CATEGORY);
    const [clearAllCategories, { error: clearCategoryError, loading: clearCategoryLoading }] = useMutation(CLEAR_ALL_CATEGORIES);
    
    

    if(queryLoading || updateLoading || addCategoryLoading || clearCategoryLoading){
        return (
            <div className="card-noborder">
                <h3>Loading...</h3>
            </div>
        )
    }

    if(queryError || updateError || addCategoryError || clearCategoryError){
        console.log({queryError}, {updateError}, {addCategoryError}, {clearCategoryError});
        toast("We ran into an error", {
            style: {
                backgroundColor: 'red',
                color: 'white'
            }
        });
        return (
            
            <div className="card-noborder">
                <h3>Error Getting Product</h3>
                <Toaster/>
            </div>
        )
    }

    let catagories = [];
    function updateCategories(values){
        catagories = values;
        console.log({catagories});
    }

    async function handleSave(values){
        console.log({values, productid});
        await updateProduct({
            variables: {
                productId: parseInt(productid),
                title: values.title,
                description: values.description,
                price: values.price,
                rentPrice: values.rent,
                rentDuration: values.rentDuration,
            },
            refetchQueries: {
                GET_SINGLE_PRODUCT,
                GET_PRODUCTS,
            }
        });

        await clearAllCategories({
            variables: {
                productId: parseInt(productid)
            }
        })

        if(catagories.length > 0){  
            for(const category of catagories){
                await addCategory({
                    variables: {
                        productId: parseInt(productid),
                        categoryId: parseInt(category.value)
                    }
                })
            }
        }

        window.location.reload(false);
    }


    return (
        
        <div className="card-noborder">
            <form onSubmit={form.onSubmit((values) => handleSave(values))}>
                <TextInput
                label="Title"
                {...form.getInputProps('title')}
                />
                <CategoriesList productId={productid} updateCategories={updateCategories} />
                <Textarea
                label="Description"
                {...form.getInputProps('description')}
                />
                <br />
                <Grid grow>
                    <Grid.Col span={5}>
                        <NumberInput
                        label="Price"
                        {...form.getInputProps('price')}
                        />
                    </Grid.Col>
                    
                    <Grid.Col span={3}>
                        <NumberInput
                        label="Rent"
                        {...form.getInputProps('rent')}
                        />
                    </Grid.Col>

                    <Grid.Col span={2}>
                        <Select
                        label="Per"
                        data={[
                            { value: 'hour', label: 'Hour' },
                            { value: 'day', label: 'Day' },
                            { value: 'week', label: 'Week' },
                            { value: 'month', label: 'Month' },
                        ]}
                        {...form.getInputProps('rentDuration')}
                        />
                    </Grid.Col>
                </Grid>
                <br />
                <div className="submitButton"><Button type="submit" color="violet" >Save</Button></div>
            </form>

            
        </div>
    )
}