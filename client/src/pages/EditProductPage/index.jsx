import { useParams } from "react-router-dom"
import { useQuery } from "@apollo/client";
import { TextInput, Button, Textarea, NumberInput, Grid, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { GET_SINGLE_PRODUCT } from "../../graphql/Products.js"
import './index.css'
import { CategoriesList } from "./CategoriesList.jsx";

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
    
    

    if(queryLoading){
        return (
            <div className="card-noborder">
                <h3>Getting Product</h3>
            </div>
        )
    }

    if(queryError){
        return (
            <div className="card-noborder">
                <h3>Error Getting Product</h3>
            </div>
        )
    }

    let catagories = [];
    function updateCategories(values){
        catagories = values;
        console.log({catagories});
    }

    

    return (
        <div className="card-noborder">
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
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